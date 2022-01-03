"use strict";

const defaultRobot = require('../public/images/default.png');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Robots", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      fuelType: {
        type: Sequelize.STRING,
        defaultValue: "Electric",
      },
      fuelLevel: {
        type: Sequelize.DECIMAL,
        defaultValue: 100,
        validate: {
          min: 0,
          max: 100,
        },
      },
      imageUrl: {
        type: Sequelize.TEXT,
        defaultValue: defaultRobot,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Robots");
  },
};
