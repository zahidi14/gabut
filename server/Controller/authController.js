const secret = "fuck";
const users = require("../Model/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createSecToken } = require("../Util/createSecToken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;

    const exist = await users.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "user allready exist" });
    }
    const user = await users.create({ name, email, password });
    const token = createSecToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User Signed Successfully",
      success: true,
      user,
    });
    next();
    console.log("req", req.body);
  } catch (err) {
    console.log("error register", err);
  }
};

exports.user = (req, res) => {
  users
    .find()
    .then((result) => {
      res.status(200).json({
        message: "data Fetched",
        data: result,
      });
    })
    .catch((err) => {
      console.log("error get user", err);
    });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "incoreect email and password" });
    }
    const token = createSecToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "user logged in successfully",
    });
    next();
  } catch (err) {
    console.log("error login", err);
  }

  // ((user) => user.email === email);
  // if (!user) {

  // }
};
