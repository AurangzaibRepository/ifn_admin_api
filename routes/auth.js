const express = require('express');
const auth = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validators');
const router = express.Router();

module.exports = (app) => {
    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *      summary: Login 
     *      description: Login
     *      tags:
     *          - Auth
     *      requestBody:
     *          reuquired: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required:
     *                          - email
     *                          - password
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *      responses:
     *          201:
     *              description: Success
     *          400:
     *              description: Validation error
     *          500:
     *              description: Internal server error
     */
    router.post('/login', loginValidator, auth.login);

    app.use('/api/auth', router);
}