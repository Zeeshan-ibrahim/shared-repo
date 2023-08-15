const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const models = require("../models");
const authController = require("../controllers/auth");
const { Op } = require("sequelize");

router.post(
  "/",
  [
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

router.get("/home", authController.verifyToken, authController.getAllPatients);
router.post("/login", authController.verifyToken, authController.login);

router.post("/patient", authController.verifyToken, authController.addPatient);

router.post("/case", authController.verifyToken, authController.addCase);

// router.get("/patient", authController.verifyToken, authController.addPatient);

// router.post("./appoint", authController.addAppoint);

module.exports = router;
