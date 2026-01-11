const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const memberService = require('./member.service');
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
    let data = await db.Donation.findByPk(id, {
        include: {
            model: db.DonationContribution,
            attributes: ['id', 'donation_id', 'user_id', 'amount', 'payment_status', 'createdAt']
        }
    });
    data = data.toJSON();

    data.DonationContributions = await Promise.all(data.DonationContributions.map(async (contribution) => {
        const user = await memberService.getDetails(contribution.user_id);
        return {
            ...contribution,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };
    }));

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