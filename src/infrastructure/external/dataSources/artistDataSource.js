const ArtistRepository = require('../../../domain/ports/artistRepository');
const db = require('../../storage/pgsql/models');

class ArtistDataSource extends ArtistRepository {
  async createArtist(userId, experience) {
    await db.Artist.create({ user_id: userId, experience });
  }
  async updateArtist(userId, experience) {
    await db.Artist.update({ experience }, { where: { user_id: userId } });
  }
  async getArtistInfo(userId) {
    return await db.Artist.findOne({ where: { user_id: userId }, include: { model: db.Portafolio } });
  }
  async uploadPortafolioImage(userId, image_url) {
    let artist = await db.Artist.findOne({ where: { user_id: userId } });
    if (!artist.portafolio_id) {
      const portafolio = await db.Portafolio.create({ image_url });
      artist.portafolio_id = portafolio.id;
      await artist.save();
    } else {
      await db.Portafolio.update({ image_url }, { where: { id: artist.portafolio_id } });
    }
  }
}

module.exports = ArtistDataSource;
