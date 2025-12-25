const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');
const { formatListing } = require('../utils/formatter.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Donation.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    let where = {};
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);

    // Apply filters
    if (keyword) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${keyword}%` }
                },
                Sequelize.literal(`MATCH(description) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
            ]
        };
    }

    const { count, rows } = await db.Donation.findAndCountAll({
            where,
            limit,
            offset
        });

    return formatListing(pageNumber, count, rows);
}

exports.getDetails = async (id) => {
    const data = await db.Donation.findByPk(id, {
        include: {
            model: db.DonationContribution
        }
    });

    return data;
}

exports.createRecord = async (data) => {
    await db.Donation.create(data);
}

exports.updateRecord = async (id, data) => {
    await db.Donation.update(data, {
        where: { id }
    });
}