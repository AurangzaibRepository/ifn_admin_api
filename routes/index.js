module.exports = (app) => {
    require('./member.routes')(app);
    require('./event.routes')(app);
    require('./blog.routes')(app);
}