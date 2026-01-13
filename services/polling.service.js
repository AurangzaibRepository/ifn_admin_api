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
    let data = await db.PollingVote.findAll({
        where: { polling_id: pollingId },
        include: {
            model: db.User,
            attributes: ['id','first_name','last_name','email','picture']
        }
    });

    // Group by participant_id
    data = data.reduce((participant, row) => {
       if (! participant[row.participant_id]) {
            participant[row.participant_id] = [];
       }

       participant[row.participant_id].push({
            first_name: row.User.first_name,
            last_name: row.User.last_name,
            email: row.User.email,
            picture: row.User.picture,
        });

        return participant;
    }, {});

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