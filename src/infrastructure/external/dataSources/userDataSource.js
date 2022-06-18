const UserRepository = require('../../../domain/ports/userRepository');
const userSerializer = require('../../../domain/serializers/userSerializer');
const db = require('../../storage/pgsql/models');

class UserDataSource extends UserRepository {
  async getUserByEmail(email) {
    const user = await db.User.findOne({ where: { email } });
    return userSerializer(user);
  }
  async getUserById(id) {
    // Do join with the table of the user's type
    let user = await db.User.findByPk(id);
    let userDetails;
    switch (user.type) {
      case 'artist':
        userDetails = await db.Artist.findOne({ where: { user_id: id } });
        break;
      case 'company':
        userDetails = await db.Company.findOne({ where: { user_id: id } });
        break;
    }
    user.details = userDetails;
    return userSerializer(user);
  }
  // User will be an object with all user's props
  async signUpUser(user) {
    const { id } = await db.User.create(user);
    return id;
  }
}

module.exports = UserDataSource;
