const getUserExtraInfo = require('../../../domain/common/getUserExtraInfo');
const ArtSellRepository = require('../../../domain/ports/artSellRepository');
const artSellSerializer = require('../../../domain/serializers/artSellSerializer');
const db = require('../../storage/pgsql/models');

class ArtSellDataSource extends ArtSellRepository {
  async createArtSell(artSell) {
    return await db.Art_sell.create(artSell);
  }
  async getArtSells() {
    return await db.Art_sell.findAll({
      include: [
        { model: db.User, as: 'seller' },
        { model: db.User, as: 'buyer' },
      ],
    });
  }
  async getArtSellById(id) {
    return await db.Art_sell.findOne({
      where: { id },
      include: [
        { model: db.User, as: 'seller' },
        { model: db.User, as: 'buyer' },
      ],
    });
  }
  async buyArtSell(artSellId, buyerUserId) {
    await db.Art_sell.update({ buyer_user_id: buyerUserId, is_sold: true }, { where: { id: artSellId } });
  }
  async updateArtSell(artSellId, artSell) {
    await db.Art_sell.update(artSell, { where: { id: artSellId } });
  }
  async deleteArtSell(artSellId) {
    await db.Art_sell.destroy({ where: { id: artSellId } });
  }
}

module.exports = ArtSellDataSource;
