const express = require("express");
const router = express.Router();
const specialtyController = require("../controllers/specialty");

router.get("/all", specialtyController.getAll);
router.get("/id/:id", specialtyController.getById);

module.exports = router;
