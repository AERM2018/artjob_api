'use strict';

const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.addColumn('art_sells', 'image_url', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
    });
  },

  async down(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.removeColumn('art_sells', 'image_url');
  },
};
