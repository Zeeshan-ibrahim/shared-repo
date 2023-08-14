const models = require("../models");
const { validationResult } = require("express-validator");

const addCase = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error in AddCase controllers/auth.js");
    res.json("ADD Case NOT WORKING!");
  }
  const {
    practiceLocation,
    category,
    purposeOfVisit,
    caseType,
    doa,
    insuranceName,
    insuranceCity,
    insuranceState,
    insuranceZip,
    firmName,
    firmCity,
    firmState,
    firmZip,
  } = req.body;

  await models.Case.addCase(
    practiceLocation,
    category,
    purposeOfVisit,
    caseType,
    doa,
    insuranceName,
    insuranceCity,
    insuranceState,
    insuranceZip,
    firmName,
    firmCity,
    firmState,
    firmZip
  );
  res.status(201).json({ message: "User registered!" });

  next(errors);
};

module.exports = {
  addCase
};