const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const models = require("../models");

const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error here");
    res.json("email already exists");
    return 0;
  }
  let { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await models.User.createUser(name, email, hashedPassword);
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log("wow : ", err);
    console.log("coming in catch");
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    console.log("Login Email:", email);
    const storedUser = await models.User.findByEmail(email);

    if (!storedUser) {
      const error = new Error("User with this email is not found");
      error.statusCode = 401;
      throw error;
    }

    console.log("STORED USER INFO : ", storedUser);

    const isEqual = await bcrypt.compare(password, storedUser.password);
    console.log(" Checking PW : ", isEqual);

    if (!isEqual) {
      const error = new Error("Wrong Password!");
      error.statusCode = 401;
      throw error;
    }
    let token;
    if (storedUser.id) {
      token = jwt.sign(
        {
          email: storedUser.email,
          userId: storedUser.id,
        },
        "secretfortoken",
        { expiresIn: "1h" }
      );
    } else {
      // Handle the case where the user doesn't have a valid ID
      const error = new Error("Invalid user data");
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({ token: token, userId: storedUser.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log("coming in catch LOGIN CONTROLLER AUTH");
    next(err);
  }
};

exports.addPatient = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log(req.body);
    console.log("Error in AddPatient controllers/auth.js");
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

exports.addCase = async (req, res, next) => {
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

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await models.Patient.getAllPatients(); // You need to implement a method to fetch all patients from your database

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found." });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getAllPatients:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
