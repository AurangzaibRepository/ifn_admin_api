const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');
const formatUtil = require('../utils/formatter.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.BanquetBooking.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    let where = {};
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);

    // Filter
    if (keyword) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${keyword}%` }
                },
                Sequelize.literal(`Match(description) AGAINST('${keyword}' IN BOOLEAN MODE)`)
            ]
        };
    }

    const { count, rows } = await db.BanquetBooking.findAndCountAll({
        where,
        limit,
        offset
    });

    return formatUtil.formatListing(pageNumber, count, rows);
}

exports.getDetails = async (id) => {
    const data = await db.BanquetBooking.findByPk(id);

    return data;
}