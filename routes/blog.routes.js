const express = require('express');
const blogs = require('../controllers/blog.controller');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', blogs.listing);
    router.get('/:id', blogs.listing);

    app.use('/api/blogs', router);
}