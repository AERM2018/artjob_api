'use strict';

const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
    });
  },

  async down(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.removeColumn('users', 'name');
  },
};
