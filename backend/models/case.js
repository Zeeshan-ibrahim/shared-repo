"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
      // define association here
    }
    static addCase(
      practiceLocation,
      category,
      purposeOfVisit,
      caseType,
      doa,
      insuranceName,
      insuranceCity,
      insuranceState,
      insuranceZip,
      firmName,
      firmCity,
      firmState,
      firmZip
    ) {
      return Case.create({
        category,
        purposeOfVisit,
        caseType,
        doa,
        insuranceName,
        insuranceCity,
        insuranceState,
        insuranceZip,
        firmName,
        firmCity,
        firmState,
        firmZip,
      });
    }
  }
  Case.init(
    {
      category: DataTypes.STRING,
      purposeOfVisit: DataTypes.STRING,
      caseType: DataTypes.STRING,
      doa: DataTypes.STRING,
      insuranceName: DataTypes.STRING,
      insuranceCity: DataTypes.STRING,
      insuranceState: DataTypes.STRING,
      insuranceZip: DataTypes.STRING,
      firmName: DataTypes.STRING,
      firmCity: DataTypes.STRING,
      firmState: DataTypes.STRING,
      firmZip: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Case",
    }
  );
  return Case;
};
