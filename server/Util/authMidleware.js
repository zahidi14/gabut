const users = require("./../Model/auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.userVerif = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      message: "error token ",
      status: false,
    });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ message: "token key verify error", status: false });
    } else {
      const user = await users.findById(data.id);
      if (user) return res.json({ status: true, user: user.name });
      else return res.json({ status: false });
    }
  });
};
