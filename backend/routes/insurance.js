const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insurance");


router.get("/all", insuranceController.getAll);
router.get("/id", insuranceController.getById);

module.exports = router;
