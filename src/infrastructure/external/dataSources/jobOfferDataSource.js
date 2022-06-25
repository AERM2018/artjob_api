const JobOfferRepository = require('../../../domain/ports/jobOfferRepository');
const applicationSerializer = require('../../../domain/serializers/applicationSerializer');
const jobOfferProspectSerializer = require('../../../domain/serializers/applicationSerializer');
const serializeJobOffer = require('../../../domain/serializers/jobOfferSerializer');
const serializeUser = require('../../../domain/serializers/userSerializer');
const db = require('../../storage/pgsql/models');

class JobOfferDataSource extends JobOfferRepository {
  async createJobOffer(jobOffer) {
    const { id } = await db.Job_offer.create(jobOffer);
    return id;
  }

  async getJobOfferById(id) {
    const jobOffer = await db.Job_offer.findOne({
      where: { id },
      include: { model: db.User, as: 'company' },
    });
    // Look for user details in table that makes reference to the user's type
    // Due it's not possible to do a join, do a query with the user id in the other table
    jobOffer.company.details = await db.Company.findOne({ where: { user_id: jobOffer.company_user_id } });
    if (jobOffer.has_prospect_chosen) {
      // Search the prospect info and put it in the job offer to add when it's serialized
      const applicationAccepted = await db.Job_offers_artists.findOne({
        where: {
          job_offer_id: id,
          is_hired: true,
        },
        include: { model: db.User },
      });
      jobOffer.application = applicationAccepted;
    }
    return serializeJobOffer(jobOffer);
  }

  async getJobOffers(companyUserId) {
    // Look for all the job offers or by company user id if it's send
    const condition = companyUserId ? { company_user_id: companyUserId } : undefined;
    const jobOffers = await db.Job_offer.findAll({
      where: condition,
      include: { model: db.User, as: 'company' },
    });
    // Return all the job offers serialized
    return await Promise.all(
      jobOffers.map(async (jobOffer) => {
        // This process it's the same as when a job offer is found by id
        jobOffer.company.details = await db.Company.findOne({ where: { user_id: jobOffer.company_user_id } });
        if (jobOffer.has_prospect_chosen) {
          //  Search the prospect info and put it in the job offer to add when it's serialized
          const applicationAccepted = await db.Job_offers_artists.findOne({
            where: {
              job_offer_id: jobOffer.id,
              is_hired: true,
            },
            include: { model: db.User },
          });
          applicationAccepted.User.details = await db.Artist.findOne({ user_id: applicationAccepted.User.id });
          jobOffer.application = applicationAccepted;
        }
        return serializeJobOffer(jobOffer);
      }),
    );
  }

  async addProspectToJobOffer(artistUserId, jobOfferId) {
    await db.Job_offers_artists.create({ artist_user_id: artistUserId, job_offer_id: jobOfferId });
  }

  async showApplicationsFromJobOffer(id) {
    const applications = await db.Job_offers_artists.findAll({
      where: { job_offer_id: id },
      include: { model: db.User },
    });
    return await Promise.all(
      applications.map(async (application) => {
        const applicationProspectDetails = await db.Artist.findOne({ where: { user_id: application.User.id } });
        application.User.details = applicationProspectDetails;
        return applicationSerializer(application);
      }),
    );
  }

  async acceptApplicationForJobOffer(applicationId) {
    const application = await db.Job_offers_artists.findByPk(applicationId);
    application.is_hired = true;
    await application.save();
    await db.Job_offer.update({ has_prospect_chosen: true }, { where: { id: application.job_offer_id } });
    return application.job_offer_id;
  }
}

module.exports = JobOfferDataSource;
