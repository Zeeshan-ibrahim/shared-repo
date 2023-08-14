const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const authController = require("../controllers/auth");
const { Op } = require("sequelize");

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please Enter a Valid Email.")
      .normalizeEmail()
      .custom(async (email) => {
        const existingUser = await models.User.findOne({
          where: {
            email: {
              [Op.eq]: email, // Use [Op.eq] for exact match
            },
          },
        });
        if (existingUser) {
          return Promise.reject("Email address already exists!");
        }
      }),
    body("password").trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.post("/patient", authController.addPatient);

router.post("/case", authController.addCase);

router.get("/patient", authController.getAllPatients);

// router.post("./appoint", authController.addAppoint);

module.exports = router;
