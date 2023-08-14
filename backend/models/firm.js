"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Firm extends Model {
    static associate(models) {}
  }
  Firm.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Firm",
    }
  );
  return Firm;
};
