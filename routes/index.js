module.exports = (app) => {
    require('./user.routes')(app);
    require('./event.routes')(app);
    require('./blog.routes')(app);
    require('./donation.routes')(app);
    require('./banquet_booking.routes')(app);
    require('./polling.routes')(app);
}