const express = require("express");
const router = express.Router();
const specialtyController = require("../controllers/auth");


router.get("/all", specialtyController.getAll);
router.get("/id", specialtyController.getById);

module.exports = router;
