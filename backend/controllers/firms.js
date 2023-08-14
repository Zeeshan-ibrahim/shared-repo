const models = require("../models");
const getAll = async (req, res, next) => {
  try {
    const Firms = await models.Firm.findAll();
    if (!Firms || Firms.length === 0) {
      return res.status(404).json({ message: "No Firms found." });
    }
    res.status(200).json(Firms);
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

const getById = async (req, res) => {
  const firmsId = req.params.id;
  try {
    const firms = await models.Firm.findByPk(firmsId);
    if (!firms) {
      return res.status(404).json({ message: 'Firms not found' });
    }
    res.json(firms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getById,
  getAll
};