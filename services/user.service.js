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
            [Op.or]: [
                { first_name: { [Op.like]: `%${keyword}%` } },
                { last_name: { [Op.like]: `%${keyword}%` } },
                { email: { [Op.like]: `%${keyword}%` } }
            ]
        };
    }

    const data = await db.User.findAll({
        where,
        order: [['first_name', 'ASC']],
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    const data = await db.User.findByPk(id);

    return data;
}

exports.changeStatus = async (id, status) => {
    await db.User.update({ status }, {
        where: { id }
    });
}