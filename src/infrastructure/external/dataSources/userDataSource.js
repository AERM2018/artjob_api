const UserRepository = require('../../../domain/ports/userRepository');
const userSerializer = require('../../../domain/serializers/userSerializer');
const db = require('../../storage/pgsql/models');

class UserDataSource extends UserRepository {
  async getUserByEmail(email) {
    return await db.User.findOne({ where: { email } });
  }

  async getUserById(id) {
    return await db.User.findByPk(id);
  }
  // User will be an object with all user's props
  async signUpUser(user) {
    const { id } = await db.User.create(user);
    return id;
  }

  async updateUser(userId, user) {
    const userDB = await db.User.findOne({ where: { id: userId } });
    await userDB.update(user);
    return { id: userDB.id, type: userDB.type };
  }

  async deleteUser(userId) {
    throw Error('No implemented.');
  }

  async rateUser(rate, userIdRated) {
    await db.User.update({ rate }, { where: { id: userIdRated } });
  }
}

module.exports = UserDataSource;
