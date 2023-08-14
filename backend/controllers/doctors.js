const models = require("../models");

const getAll = async (req, res, next) => {
  try {
    const doctors = await models.Doctors.findAll();
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found." });
    }
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

const getById = async (req, res) => {
  const doctorsId = req.params.id;
  try {
    const doctors = await models.Doctors.findByPk(doctorsId);
    if (!doctors) {
      return res.status(404).json({ message: 'doctors not found' });
    }
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getById,
  getAll
};