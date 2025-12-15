const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Event.findByOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    const where = {}

    // Add filter for full text search
    if (keyword) {
        keyword = {
            //[Op.or]:
        }
    }

    const data = await db.Event.findAll({
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    let data = await db.Event.findByPk(id, {
        include: {
            model: db.EventRegistration
        }
    });
    data = data.toJSON();

    data.registrations = data.EventRegistration.map((registration) => ({
        first_name: registration.User.first_name,
        last_name: registration.User.last_name,
        email: registration.User.email,
        picture: registration.User.picture
    }));
    delete data.EventREgistration

    return data;
}