const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
//[username,email,refferalBonus,referral_code, parent_user, children_user,password]
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("invalide Email");
      }
    },
  },
  refferalBonus: {
    type: Number,
  },
  referral_code: {
    type: String,
  },
  parent_user: { type: Schema.Types.ObjectId, ref: "User" },

  children_user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  password: {
    type: String,
    unique: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;

module.exports.createUser = (data, callback) => {
  User.create(data, callback);
};

module.exports.findRefrralUser = (data, callback) => {
  return User.findOne(
    {
      referral_code: data.referralCode,
    },
    "username email children_user",
    callback
  );
};
module.exports.updateUser = (data) => {
  return User.updateOne({ _id: data.Id }, data);
};
