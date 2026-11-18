const express = require('express');
const users = require('../controllers/user.controller');
const {
    listingValidator
} = require('../validators/blog.validators');
const { detailsValidator, changeStatusValidator } = require('../validators/user.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/users/listing/{pageNumber}:
     *  get:
     *      summary: User listing
     *      tags:
     *          - Users
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
    router.get('/listing/:pageNumber', listingValidator, users.listing);

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *      summary: User details
     *      tags:
     *          - Users
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
     *              description: Invalid User id
     *          404:
     *              description: User not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, users.details);

    /**
     * @swagger
     * /api/users/{id}:
     *   patch:
     *      summary: Partially update user
     *      description: Update specific fields on user
     *      tags:
     *          - Users
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: User Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                           status:
     *                              type: string
     *                              enum: [Active, Inactive]
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          404:
     *              description: User not found
     *          500:
     *              description: Internal server error
     */
    router.patch('/:id', changeStatusValidator, users.changeStatus);

    app.use('/api/users', router);
}