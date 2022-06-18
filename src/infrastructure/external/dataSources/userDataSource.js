const UserRepository = require('../../../domain/ports/userRepository');
const userSerializer = require('../../../domain/serializers/userSerializer');
const db = require('../../storage/pgsql/models');

class UserDataSource extends UserRepository {
  async getUserByEmail(email) {
    const user = await db.User.findOne({ where: { email } });
    return userSerializer(user);
  }
  // User will be an object with all user's props
  async signUpUser(user) {
    const newUser = await db.User.create(user);
    return userSerializer(newUser);
  }
}

module.exports = UserDataSource;
