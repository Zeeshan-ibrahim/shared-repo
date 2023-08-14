const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firms");


router.get("/all", firmController.getAll);
router.get("/id/:id", firmController.getById);

module.exports = router;
