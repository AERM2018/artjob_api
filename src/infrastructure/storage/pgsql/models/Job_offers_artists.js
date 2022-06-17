'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_offers_artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'artist_user_id' })
      this.belongsTo(models.Job_offer, { foreignKey: 'job_offer_id' })
    }
  }
  Job_offers_artists.init({
    artist_user_id: DataTypes.UUID,
    job_offer_id: DataTypes.UUID,
    is_hired: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Job_offers_artists',
  });
  return Job_offers_artists;
};