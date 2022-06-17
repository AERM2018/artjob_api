'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Art_sell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'seller_user_id' })
      this.belongsTo(models.User, { foreignKey: 'buyer_user_id' })
    }
  }
  Art_sell.init({
    seller_user_id: DataTypes.UUID,
    buyer_user_id: DataTypes.UUID,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    is_sold: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Art_sell',
    tableName: 'art_sells',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Art_sell;
};