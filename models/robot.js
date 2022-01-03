'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Robot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Robot.init({
    name: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    fuelLevel: DataTypes.DECIMAL,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Robot',
  });
  return Robot;
};
