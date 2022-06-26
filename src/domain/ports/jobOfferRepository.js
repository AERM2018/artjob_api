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
  async deleteApplicationFromJobOffer(userId, jobOfferId) {
    throw Error('No implemented.');
  }
  async showProspectsFromJobOffer(id) {
    throw Error('No implemented.');
  }
  async acceptApplicationForJobOffer(applicationId) {
    throw Error('No implemented.');
  }
  async updateJobOffer(id, jobOffer) {
    throw Error('No implemented.');
  }
  async deleteProspectFromJobOffer(id) {
    throw Error('No implemented.');
  }
  async deleteJobOffer(id) {
    throw Error('No implemented.');
  }
}

module.exports = JobOfferRepository;
