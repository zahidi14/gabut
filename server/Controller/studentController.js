const students = require("../Model/students");
const { createSecToken } = require("../Util/createSecToken");
const bcrypt = require("bcrypt");
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exist = await students.findOne({ email });
    if (exist) {
      return res.status(401).json({ message: "user allready exist" });
    }
    const student = await students.create({ name, email, password });
    const token = createSecToken(student._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      message: "Student Registered Successfully",
      success: true,
      student,
    });
    console.log(" ", req.body);
    next();
  } catch (err) {
    console.log("error register", err);
  }
};

exports.studentAll = (req, res) => {
  students
    .find()
    .then((result) => {
      res.status(200).json({
        message: "data Fetched",
        data: result,
      });
    })
    .catch((err) => {
      console.log("error fetch", err);
    });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await students.findOne({ email });
    if (!student) {
      res.status(400).json({
        message: "user not exist",
      });
    }
    const auth = await bcrypt.compare(password, student.password);
    if (!auth) {
      res.status(400).json({
        message: "incorrect email and password",
      });
    }
    const token = createSecToken(student._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      message: "student Logged in Successfully",
    });
    next();
  } catch (err) {
    console.log("error login", err);
  }
};
