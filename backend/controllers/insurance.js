const models = require("../models");

const getAll = async (req, res, next) => {
  try {
    const insurance = await models.Insurance.findAll();
    if (!insurance || insurance.length === 0) {
      return res.status(404).json({ message: "No insurance found." });
    }
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

const getById = async (req, res) => {
  const insuranceId = req.params.id;
  try {
    const insurance = await models.Insurance.findByPk(insuranceId);
    if (!insurance) {
      return res.status(404).json({ message: 'insurance not found' });
    }
    res.json(insurance);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getById,
  getAll
};