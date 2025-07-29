const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const app = require('../backend/server');

setGlobalOptions({ maxInstances: 10 });

exports.api = onRequest(app);
