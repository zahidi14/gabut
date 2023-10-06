const students = require("../Model/students");
require("dotenv").config();

module.exports.studentVerif = (req, res) => {
  const token = res.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "error token",
    });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      re.status(401).json({
        message: "error token key",
        status: false,
      });
    } else {
      const student = await students.findById(data.id);
      if (student) {
        return res.status(201).json({ status: true });
      } else {
        return res.json({ status: false });
      }
    }
  });
};
