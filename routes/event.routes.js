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
    /**
     * @swagger
     * /api/events/listing/{pageNumber}:
     *   get:
     *      summary: Event listing
     *      tags:
     *          - Events
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
    router.get('/listing/:pageNumber', listingValidator, events.listing);

    /**
     * @swagger
     * /api/events/{id}:
     *  get:
     *      summary: Event details
     *      tags:
     *          - Events
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
     *              description: Invalid Event Id
     *          404:
     *              description: Event not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, events.details);

    /**
     * @swagger
     * /api/events:
     *   post:
     *      summary: Create event
     *      description: Create a event
     *      tags:
     *          - Events
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - start_date
     *                          - end_date
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
     *                          total_seats:
     *                              type: number
     *                          seats_booked:
     *                              type: number
     *                          start_date:
     *                              type: string
     *                              format: date
     *                              example: 2026-11-16
     *                          end_date:
     *                              type: string
     *                              format: date
     *                              example: '2026-11-25'
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post(
        '/',
        upload('images/events').single('file'),
        createValidator,
        events.create
    );

    /**
     * @swagger
     * /api/events/{id}:
     *   put:
     *      summary: Update event
     *      description: Update a event
     *      tags:
     *          - Events
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Event Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - start_date
     *                          - end_date
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
     *                          total_seats:
     *                              type: number
     *                          seats_booked:
     *                              type: number
     *                          start_date:
     *                              type: string
     *                              format: date
     *                              example: 2026-11-16
     *                          end_date:
     *                              type: string
     *                              format: date
     *                              example: '2026-11-25'
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.put(
        '/:id',
        upload('images/events').single('file'),
        updateValidator,
        events.update
    );
    router.patch('/:id', detailsValidator, events.updateEventDetails);
    
    app.use('/api/events', router);
}