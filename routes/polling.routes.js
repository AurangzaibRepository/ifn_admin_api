const express = require('express');
const pollings = require('../controllers/polling.controller');
const { listingValidator } = require('../validators/blog.validators');
const {
    detailsValidator,
    createValidator,
    updateValidator
} = require('../validators/polling.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/pollings/listing/{pageNumber}:
     *   get:
     *      summary: Polling listing
     *      tags:
     *          - Polling
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
    router.get('/listing/:pageNumber', listingValidator, pollings.listing);

    /**
     * @swagger
     * /api/pollings/votes/{id}:
     *   get:
     *      summary: Polling votes
     *      tags:
     *          - Polling
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
     *              description: Invalid Polling Id
     *          404: 
     *              description: Polling not found
     *          500:
     *              description: Internal server error
     */
    router.get('/votes/:id', detailsValidator, pollings.votes );

    /**
     * @swagger
     * /api/pollings/{id}:
     *   get:
     *      summary: Polling details
     *      tags:
     *          - Polling
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
     *              description: Invalid Polling Id
     *          404:
     *              description: Polling not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, pollings.details);

    /**
     * @swagger
     * /api/pollings:
     *   post:
     *      summary: Create polling
     *      description: Create a polling
     *      tags:
     *          - Pollings
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - description
     *                          - start_date
     *                          - end_date
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
     *                          start_date:
     *                              type: string
     *                              format: date
     *                          end_date:
     *                              type: string
     *                              format: date
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/', createValidator, pollings.create);

    /**
     * @swagger
     * /api/pollings/{id}
     *   put:
     *      summary: Update polling
     *      description: Update a polling
     *      tags:
     *          - Pollings
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Polling Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - description
     *                          - start_date
     *                          - end_date
     *                      properties:
     *                          title:
     *                              type: string
     *                          description:
     *                              type: string
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
    router.put('/:id', updateValidator, pollings.update);

    app.use('/api/pollings', router);
}