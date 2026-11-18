const express = require('express');
const banquetBookings = require('../controllers/banquet_booking.controller');
const { listingValidator } = require('../validators/blog.validators');
const { detailsValidator } = require('../validators/banquet_booking.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/banquet-bookings/listing/{pageNumber}:
     *   get:
     *      summary: Banquet booking listing
     *      tags:
     *          - Banquet bookings
     *      parameters:
     *          - in: path
     *            name: pageNumber
     *            required: true
     *            schema:
     *              type: integer
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid page number
     *          500:
     *              description: Internal server error
     */
    router.get('/listing/:pageNumber', listingValidator, banquetBookings.listing);

    /**
     * @swagger
     * /api/banquet-bookings/{id}:
     *   get:
     *      summary: Banquet booking details
     *      tags:
     *          - Banquet bookings
     *      description: Retrieve booking by id
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid booking Id
     *          404:
     *              description: Booking not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, banquetBookings.details);

    /**
     * @swagger
     * /api/banquet-bookings/{id}:
     *   patch:
     *      summary: Partially update booking
     *      description: Update specific fields on booking
     *      tags:
     *          - Banquet bookings
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Banquet booking Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          title:
     *                              type: string
     *                          text:
     *                              type: string
     *                          status:
     *                              type: string
     *                              enum: [Draft, Publish, Archive]
     *                              example: Draft
     *                          image:
     *                              type: string
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          404:
     *              description: Booking not found
     *          500:
     *              description: Internal server error
     */
    router.patch('/:id', detailsValidator, banquetBookings.updateBookingDetails);

    app.use('/api/banquet-bookings', router);
}