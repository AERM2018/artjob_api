'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Company, { foreignKey: 'user_id' });
      this.hasOne(models.Artist, { foreignKey: 'user_id' });
      this.hasMany(models.Art_sell, { foreignKey: 'seller_user_id' });
      this.hasMany(models.Art_sell, { foreignKey: 'buyer_user_id' });
      this.hasMany(models.Job_offer, { foreignKey: 'company_user_id' });
      this.hasMany(models.Art_sell, { foreignKey: 'artist_user_id' });
    }
  }
  User.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: sequelize.literal('uuid_generate_v4()') },
      email: DataTypes.STRING,
      description: DataTypes.STRING,
      rate: DataTypes.DOUBLE,
      phone_number: DataTypes.STRING,
      location: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
  });
  return User;
};
