const models = require("../models");
const { validationResult } = require("express-validator");

const addPatient = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log("Error in AddPatient controllers/auth.js", req.body);
    res.json("ADD PATIENT NOT WORKING!");
  }
  const {
    first_name,
    middle_name,
    last_name,
    email,
    ssn,
    address,
    city,
    state,
    gender,
    zip,
    date_of_birth,
  } = req.body;
  const storedDoB = await models.Patient.findByDoB(date_of_birth);

  if (storedDoB) {
    console.log("Patient with same Date of Birth already exists!");
    res
      .status(400)
      .json(console.log("Patient with same Date of Birth already exists!!"));
    return 0;
  }
  await models.Patient.addPatient(
    first_name,
    middle_name,
    last_name,
    email,
    ssn,
    address,
    city,
    state,
    gender,
    zip,
    date_of_birth
  );
  res.status(201).json({ message: "User registered!" });

  next(errors);
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await models.Patient.getAllPatients();

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found." });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getAllPatients:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updatePatient = async (req, res) => { }

const deletePatient = async (req, res) => { }

module.exports = {
  addPatient,
  updatePatient,
  deletePatient,
  getAllPatients
};