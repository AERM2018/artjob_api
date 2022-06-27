'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portafolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Artist, { foreignKey: 'portafolio_id' });
    }
  }
  Portafolio.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: sequelize.literal('uuid_generate_v4()') },
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Portafolio',
      tableName: 'portafolios',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Portafolio;
};
