/**
 * Created by Dhara on 5/31/2016.
 */
module.exports = function(app) {

    // create a default connection string
    var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';

    // use remote connection string
    // if running in remote server
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var mongoose = require("mongoose");
    // connect to the database -- on OPENSHIFT 
    // mongoose.connect(connectionString);  // uncomment this line when uploading the code to OpenShift

    // connect to local database
    mongoose.connect('mongodb://localhost/cs5610summer1');  // comment this line when uploading the code to OpenShift

    var models = require("./models/models.server.js")();
    
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};