'use strict';

const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.changeColumn('art_sells', 'is_sold', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface = new sequelize.QueryInterface(), Sequelize) {
    await queryInterface.changeColumn('art_sells', 'is_sold', {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
      allowNull: true,
    });
  },
};
