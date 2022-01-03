"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      deadline: {
        type: Sequelize.DATE,
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        validate: {
          min: 1,
          max: 10,
        },
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
