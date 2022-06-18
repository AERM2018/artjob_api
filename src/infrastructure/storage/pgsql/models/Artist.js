'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Portafolio, { foreignKey: 'portafolio_id' });
    }
  }
  Artist.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: sequelize.literal('uuid_generate_v4()') },
      user_id: DataTypes.UUID,
      portafolio_id: DataTypes.UUID,
      experience: DataTypes.ENUM('titled', 'independent'),
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artists',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Artist;
};
