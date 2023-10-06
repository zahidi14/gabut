const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const studentController = require("../Controller/studentController");

const { studentVerif } = require("../Util/studentMidleware");
const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};

router.post(
  "/student-register",
  [
    body("name").isLength({ min: 3 }).withMessage("Enter Valid Name"),
    body("email").isEmail().withMessage("Enter Valid Email").normalizeEmail(),
    body("password").isLength({ min: 3 }).withMessage("Minimum 8 Character"),
  ],
  validate,
  studentController.register
);

router.post(
  "/student-login",
  [
    body("email").isLength({ min: 3 }).withMessage("Enter Valid Email"),
    body("password").isLength({ min: 3 }).withMessage("Minimum 8 Character"),
  ],
  validate,
  studentController.login
);

router.get("/student-list", studentController.studentAll);
router.post("/student", studentVerif);
module.exports = router;
