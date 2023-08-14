const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patients");

router.post("/add", patientController.addPatient);
router.get("/all", patientController.getAllPatients);

module.exports = router;
