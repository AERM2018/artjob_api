const CompanyRepository = require('../../../domain/ports/companyRepository');
const db = require('../../storage/pgsql/models');

class CompanyDataSource extends CompanyRepository {
  async createCompany(userId, address) {
    await db.Company.create({ user_id: userId, address });
  }
}

module.exports = CompanyDataSource;
