'use strict';

const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.addColumn('users', 'type', {
      type: Sequelize.ENUM('artist', 'company'),
      defaultValue: 'artist',
      allowNull: false,
    });
  },

  async down(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.removeColumn('users', 'type');
  },
};
