const noteRoutes = require('./routes');

module.exports = (app: any, db: any) => {
    noteRoutes(app, db);
};
