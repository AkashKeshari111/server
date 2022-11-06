const { Router } = require("express");
const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentication } = require("../Middleware/authentication");
const dotenv = require("dotenv").config();

const app = Router();

app.post("/signup", async (req, res) => {
  const { name, email, password, mobile_no, user_role } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      res.status(404).send({ msg: "User already exists , please login" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          res
            .status(401)
            .send({ msg: "Something went Wrong please try after some time" });
        }
        const new_user = new UserModel({
          name,
          email,
          password: hash,
          mobile_no,
          user_role,
        });

        await new_user.save();
        res.send({ msg: "User Signup Successfully" });
      });
    }
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (user) {
      const hash = user.password;
      const user_id = user._id;

      await bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          res
            .status(404)
            .send({ msg: "Something went Wrong Please try after some time" });
        }
        if (result) {
          const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
            expiresIn: "24h",
          });
          res.send({ msg: "Login Success", token });
        } else {
          res.send({ msg: "Wrong Credential, Login failed!" });
        }
      });
    } else {
      res.send({ msg: "Please signup , user not exists" });
    }
  } catch (err) {
    res.send(`login error => ${err}`);
  }
});

app.patch("/signup/:id", async (req, res) => {
  const { id } = req.params;
  const { user_role } = req.body;
  try {
    const updated_role = await UserModel.updateOne(
      { _id: id },
      { $set: { user_role } }
    );
    res.send(updated_role);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
