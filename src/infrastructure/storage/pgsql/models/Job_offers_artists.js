'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_offers_artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'artist_user_id' });
      this.belongsTo(models.Job_offer, { foreignKey: 'job_offer_id' });
    }
  }
  Job_offers_artists.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: sequelize.literal('uuid_generate_v4()') },
      artist_user_id: DataTypes.UUID,
      job_offer_id: DataTypes.UUID,
      is_hired: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Job_offers_artists',
      tableName: 'job_offers_artists',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Job_offers_artists;
};
