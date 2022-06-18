'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_offers_artists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      artist_user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      job_offer_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'job_offers',
          },
          key: 'id',
        },
      },
      is_hired: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('job_offers_artists');
  },
};
