class JobOfferRepository {
  async createJobOffer(jobOffer) {
    throw Error('No implemented.');
  }
  async getJobOfferById(id) {
    throw Error('No implemented.');
  }
  async getJobOffersByCompany(companyUserId) {
    throw Error('No implemented.');
  }
  async addProspectToJobOffer(artistUserId, jobOfferId) {
    throw Error('No implemented.');
  }
  async showProspectsFromJobOffer(id) {
    throw Error('No implemented.');
  }
}

module.exports = JobOfferRepository;
