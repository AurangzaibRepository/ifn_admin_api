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
    router.get('/listing/:pageNumber', listingValidator, blogs.listing);
    router.get('/:id', detailsValidator, blogs.details);
    router.post(
        '/',
        upload('images/blogs').single('file'),
        createValidator,
        blogs.create
    );
    router.put(
        '/:id',
        upload('images/blogs').single('file'),
        updateValidator,
        blogs.update
    );

    app.use('/api/blogs', router);
}