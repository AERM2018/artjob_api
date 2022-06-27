class UserRepository {
  async getUserByEmail(email) {
    throw Error('No implemented.');
  }
  async getUserById(id) {
    throw Error('No implemented.');
  }
  async signUpUser(user) {
    throw Error('No implemented.');
  }
  async updateUser(userId, user) {
    throw Error('No implemented.');
  }
  async deleteUser(userId) {
    throw Error('No implemented.');
  }
  async rateUser(rate, userIdRated) {
    throw Error('No implemented.');
  }
}

module.exports = UserRepository;
