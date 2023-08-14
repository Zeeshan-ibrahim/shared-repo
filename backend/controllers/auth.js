const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const models = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log("Error here", req.body);
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
    console.log("coming in catch", err);
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
exports.signOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User signed out successfully." });
  } catch (err) {
    console.error("Error signing out:", err);
    res.status(500).json({ message: "Error signing out." });
  }
};
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, "secretfortoken", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.userData = decodedToken;
    next();
  });
};
