const CompanyRepository = require('../../../domain/ports/companyRepository');
const db = require('../../storage/pgsql/models');

class CompanyDataSource extends CompanyRepository {
  async createCompany(userId, address) {
    await db.Company.create({ user_id: userId, address });
  }
  async getCompanyInfo(userId) {
    return await db.Company.findOne({ where: { user_id: userId } });
  }
  async updateCompany(userId, address) {
    await db.Company.update({ address }, { where: { user_id: userId } });
  }
}

module.exports = CompanyDataSource;
