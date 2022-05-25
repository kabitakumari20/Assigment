const ControllerUser = require("../controller/user");



const express = require("express");

const router = express.Router();

router.get("/:id", ControllerUser.getById);


router.get("/", ControllerUser.get);

router.post("/register", ControllerUser.signup);



// router.delete("/:id", ControllerUser.remove);

// router.post("/login", ControllerUser.login);

module.exports = router;
