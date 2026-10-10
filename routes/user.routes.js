const express = require('express');
const users = require('../controllers/user.controller');
const {
    listingValidator
} = require('../validators/blog.validators');
const { detailsValidator, changeStatusValidator } = require('../validators/user.validators');
const { upload } = require('../utils/file.util');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:pageNumber', listingValidator, users.listing);
    router.get('/:id', detailsValidator, users.details);
    router.put('/:id', changeStatusValidator, users.changeStatus);

    app.use('/api/users', router);
}