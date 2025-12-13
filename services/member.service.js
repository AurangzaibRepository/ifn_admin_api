const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.User.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    let where = {};

    // Add filter
    if (keyword) {
        where = {
            [Op.or]: {
                [Op.like]: {first_name: `%${keyword}%`},
                [Op.like]: {last_name: `%${keyword}%`},
                [Op.like]: {email: `%${keyword}%`}
            }
        };
    }

    const data = await db.User.findAll({
        where,
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.User.findByPk(id);

    return data;
}