const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');
const formatUtil = require('../utils/formatter.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Polling.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    let where = {};
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);

    // Apply filter
    if (keyword) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${title}%` }
                },
                Sequelize.literal(`MATCH(description) AGAINST '${keyword}' IN BOOLEAN MODE`)
            ]
        };
    }

    const { count, rows } = await db.Polling.findAndCountAll({
        where,
        limit,
        offset
    });

    return formatUtil.formatListing(pageNumber, count, rows);
}

exports.getDetails = async (id) => {
    const data = await db.Polling.findByPk(id, {
        include: {
            model: db.PollingParticipant
        }
    });

    return data;
}

exports.getVotes = async (pollingId) => {
    const data = await db.PollingVote.findAll({
        where: { polling_id: pollingId },
        include: {
            model: db.PollingParticipant
        }
    });

    return data;
}

exports.createRecord = async (data) => {
    const polling = await db.Polling.create(data);

    return polling;
}

exports.updateRecord = async (id, data) => {
    await db.Polling.update(data, {
        where: { id }
    });
}