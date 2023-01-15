const express = require("express");
const { UserModel } = require("../Models/User.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const data = req.body;
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    const user = new UserModel({ ...data, password: hash });
    try {
      await user.save();
      res.send({ msg: "Signed Up Successfully" });
    } catch (e) {
      res.status(400);
      res.send({ msg: "Signed Up failed", err: e });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ ...user[0] }, "priyank");
          res.send({ msg: "Logged In Successfully", token });
        } else {
          res.status(401);
          res.send({ msg: "Invalid credentials" });
        }
      });
    }
  } catch (e) {
    res.send({ msg: "Signed Up failed", err: e });
  }
});

module.exports = { userRouter };
