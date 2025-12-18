const express = require('express');
const donations = require('../controllers/donation.controller');
const {
    listingValidator,
    detailsValidator,
    createValidator,
    updateValidator
} = require('../validators/donation.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, donations.listing);
    router.get('/:id', detailsValidator, donations.details);
    router.post('/', createValidator, donations.create);
    router.put('/:id', updateValidator, donations.update);

    app.use('/api/donations', router);
}