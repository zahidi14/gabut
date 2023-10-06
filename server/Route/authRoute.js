const express = require("express");
const routes = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../Controller/authController");
const { userVerif } = require("../Util/authMidleware");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

routes.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("not meet minimum ccharacter"),

    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  handleValidation,
  authController.register
);
routes.get("/user", authController.user);

routes.post("/admin-login", authController.login);
routes.post("/admin", userVerif);
module.exports = routes;
