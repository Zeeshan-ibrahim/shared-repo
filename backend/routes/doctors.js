const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctors");


router.get("/all", doctorsController.getAll);
router.get("/id/:id", doctorsController.getById);

module.exports = router;
