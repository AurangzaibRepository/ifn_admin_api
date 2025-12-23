const express = require('express');
const pollings = require('../controllers/polling.controller');
const {
    listingValidator,
    detailsValidator,
    createValidator,
    updateValidator
} = require('../validators/polling.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, pollings.listing);
    router.get('/:id', detailsValidator, pollings.details);
    router.post('/', createValidator, pollings.create);
    router.put('/:id', updateValidator, pollings.update);

    app.use('/api/pollings', router);
}