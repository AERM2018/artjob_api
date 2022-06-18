'use strict';

const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn('users', 'rate', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    });
  },

  async down(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: false,
    });
    await queryInterface.changeColumn('users', 'rate', {
      type: Sequelize.FLOAT,
      defaultValue: null,
    });
  },
};
