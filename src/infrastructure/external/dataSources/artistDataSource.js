const ArtistRepository = require('../../../domain/ports/artistRepository');
const db = require('../../storage/pgsql/models');

class ArtistDataSource extends ArtistRepository {
  async createArtist(userId, experience) {
    await db.Artist.create({ user_id: userId, experience });
  }
}

module.exports = ArtistDataSource;
