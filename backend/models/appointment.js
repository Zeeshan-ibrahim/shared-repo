"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {}
  }
  Appointment.init(
    {
      appointment_datetime: DataTypes.DATE,
      appointment_type: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
