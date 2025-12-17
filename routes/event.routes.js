const express = require('express');
const {
    listingValidator,
    detailsValidator,
    createValidator,
    updateValidator
} = require('../validators/event.validators');
const events = require('../controllers/event.controller');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, events.listing);
    router.get('/:id', detailsValidator, events.details);
    router.post(
        '/',
        upload('images/events').single('file'),
        createValidator,
        events.create
    );
    router.put(
        '/:id',
        upload('images/events').single('file'),
        updateValidator,
        events.update
    );
    
    app.use('/api/events', router);
}