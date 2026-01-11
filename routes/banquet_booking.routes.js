const express = require('express');
const BanquetBookings = require('../controllers/banquet_booking.controller');
const { listingValidator } = require('../validators/blog.validators');
const { detailsValidator } = require('../validators/banquet_booking.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, BanquetBookings.listing);
    router.get('/:id', detailsValidator, BanquetBookings.details);

    app.use('/api/banquet-bookings', router);
}