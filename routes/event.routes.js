const express = require('express');
const { listingValidator, detailsValidator } = require('../validators/event.validators');
const events = require('../controllers/event.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, events.listing);
    router.get('/:id', detailsValidator, events.details);
    
    app.use('/api/events', router);
}