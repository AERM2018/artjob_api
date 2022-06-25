class UserRepository {
  async getUserByEmail(email) {
    throw Error('No implemented.');
  }
  async getUserById(id) {
    throw Error('No implemented.');
  }
  async getArtists() {
    throw Error('No implemented.');
  }
  async signUpUser(user) {
    throw Error('No implemented.');
  }
  async rateUser(rate, userIdRated) {
    throw Error('No implemented.');
  }
}

module.exports = UserRepository;
