'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'company_user_id' });
    }
  }
  Job_offer.init({
    company_user_id: DataTypes.UUID,
    description: DataTypes.STRING,
    revenue: DataTypes.DOUBLE,
    has_prospect_chosen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Job_offer',
    tableName: 'job_offers',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Job_offer;
};