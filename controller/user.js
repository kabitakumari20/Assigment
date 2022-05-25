const userModel = require("../model/user");

const bcrypt = require("bcrypt");

const { json } = require("express");
const { header } = require("express/lib/request");
const helper = require("../helper/helper");

const signup = async (req, res) => {
  try {
    let data = req.body;
    const pass = await bcrypt.hash(req.body.password, 10);
    data.password = pass;

    //console.log(data);

    const result = await userModel.findOne({ email: data.email });
    if (result) {
      return res.json({
        status: "failure",
        message: "Email is alreaday taken  take another email or signup",
      });
    }
    if (data.referralCode) {
      let findRefrralUser = await userModel.findRefrralUser(data);
      console.log("findRefrralUser===>", findRefrralUser);

      if (!findRefrralUser)
        return res.json({
          status: "failure",
          message: "Invalid referral code",
        });

      data.parent_user = findRefrralUser._id;
      var refferalBonus = await helper.getReferralAmount(
        findRefrralUser.children_user.length
      );
      console.log("refferalBonus:", refferalBonus);
    }
    data.referral_code = helper.genratorRandom();
    userModel.createUser(data, async (err, resdata) => {
      console.log(err);
      if (err) {
        return res.json({ status: "failure", message: "Internal DB error" });
      }

      let refrralUserobj = {
        $addToSet: { children_user: resdata._id },
        refferalBonus: refferalBonus,
      };

      await userModel.updateOne({ _id: data.parent_user }, refrralUserobj);

      return res.json({
        status: "success",
        message: "User register successfully created",
        data: resdata,
      });
    });
  } catch (err) {
    console.log("error", err);
    return res
      .status(500)
      .send({ status: 500, message: "Something went wrong" });
  }
};

const get = async (req, res) => {
  try {
    const data = await userModel
      .find()
      .sort({ _id: -1 })
      .populate("parent_user children_user");
    // console.log(data);
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(400).send(error);
  }
};


// const get = async (req, res) => {
//   try {
//     const data = await userModel
//       .find()
//       .sort({ _id: -1 })
//       .populate("parent_user children_user");
//     // console.log(data);
//     return res.status(200).json({ data: data });
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };

const getById = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await userModel
      .findById(_id)
      .populate("parent_user children_user");
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).send(e);
  }
};
const deleteUser = async (req, res) => {
  if (!data._id) {
    return res.json({
      status: "failure",
      message: "Id is required",
    });
  }
};

module.exports = {
  signup,
  get,
  getById,
};
