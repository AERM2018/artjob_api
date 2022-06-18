'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Company.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: sequelize.literal('uuid_generate_v4()') },
      user_id: DataTypes.UUID,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'companies',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Company;
};
