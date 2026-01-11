const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const { listingValidator } = require('../validators/blog.validators');
const { detailsValidator } = require('../validators/banquet_booking.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, banquetBookings.listing);
    router.get('/:id', detailsValidator, banquetBookings.details);
    router.patch('/:id', detailsValidator, banquetBookings.updateBookingDetails);

    app.use('/api/banquet-bookings', router);
}