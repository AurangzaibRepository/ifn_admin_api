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
    /**
     * @swagger
     * /api/donations/listing/{pageNumber}:
     *   get:
     *      summary: Donation listing
     *      tags:
     *          - Donations
     *      description: Retrieve donation listing
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
    router.get('/listing/:pageNumber', listingValidator, donations.listing);

    /**
     * @swagger
     * /api/donations/{id}:
     *  get:
     *      summary: Donation details
     *      tags:
     *          - Donations
     *      description: Retrieve a donation by id
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
     *              descripton: Invalid donation Id
     *          404:
     *              description: Donation not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, donations.details);

    /**
     * @swagger
     * /api/donations:
     *   post:
     *      summary: Create donation
     *      description: Create a donation
     *      tags:
     *          - Donations
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - description
     *                          - goal
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
     *                          goal:
     *                              type: number
     *                              format: double
     *                          start_date:
     *                              type: string
     *                              format: date
     *                          end_date:
     *                              type: string
     *                              format: date
     *                          total_contribution:
     *                              type: number
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/', createValidator, donations.create);

    /**
     * @swagger
     * /api/donations/{id}:
     *   put:
     *      summary: Update donation
     *      description: Update a donation
     *      tags:
     *          - Donations
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Donation Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - description
     *                          - goal
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
     *                          goal:
     *                              type: number
     *                              format: double
     *                          start_date:
     *                              type: string
     *                              format: date
     *                          end_date:
     *                              type: string
     *                              format: date
     *                          total_contribution:
     *                              type: number
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.put('/:id', updateValidator, donations.update);
    router.patch('/:id', detailsValidator, donations.update);

    app.use('/api/donations', router);
}