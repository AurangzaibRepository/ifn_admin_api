const express = require('express');
const blogs = require('../controllers/blog.controller');
const {
    listingValidator,
    detailsValidator,
    createValidator,
    updateValidator
} = require('../validators/blog.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/blogs/listing/{pageNumber}:
     *   get:
     *      summary: Blog listing
     *      tags:
     *          - Blogs
     *      description: Retrieve all members page wise
     *      parameters:
     *          - in: path
     *            name: pageNumber
     *            required: true
     *            schema:
     *              type: integer
     *              default: 1
     *            description: Page number
     *      responses:
     *          200:
     *              description: Success
     *          400:
     *              description: Invalid page number
     *          500:
     *              description: Internal server error
     */
    router.get('/listing/:pageNumber', listingValidator, blogs.listing);

    /**
     * @swagger
     * /api/blogs/{id}:
     *   get:
     *      summary: Blog details
     *      tags:
     *          - Blogs
     *      description: Retrieve specific blog by id
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
     *              description: Invalid blog Id
     *          404:
     *              description: Blog not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:id', detailsValidator, blogs.details);

    /**
     * @swagger
     * /api/blogs:
     *   post:
     *      summary: Create blog
     *      description: Create a blog
     *      tags:
     *          - Blogs
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - text
     *                      properties:
     *                          title:
     *                              type: string
     *                          text:
     *                              type: string
     *                          image:
     *                              type: string
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
        upload('images/blogs').single('file'),
        createValidator,
        blogs.create
    );

    /**
     * @swagger
     * /api/blogs/{id}:
     *   put:
     *      summary: Update blog
     *      description: Update a blog
     *      tags:
     *          - Blogs
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            schema:
     *              type: integer
     *            description: Blog Id
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - title
     *                          - text
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
     *          500:
     *              description: Internal server error
     */
    router.put(
        '/:id',
        upload('images/blogs').single('file'),
        updateValidator,
        blogs.update
    );
    router.patch('/:id', detailsValidator, blogs.update);

    app.use('/api/blogs', router);
}