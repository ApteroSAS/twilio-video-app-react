"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
const TwilioApiService_1 = require("@root/service/twilio/TwilioApiService");
const TwilioService_1 = require("./service/twilio/TwilioService");
console.log("Docker image version : " + (require('../dockflow.json').version || "latest"));
let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(cors());
// Parse JSON and form HTTP bodies
expressApp.use(bodyParser.urlencoded({ extended: true }));
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    console.error(reason);
});
let port = 8194;
expressApp.listen(port, () => {
    let mailService = new TwilioService_1.TwilioService();
    let apiService = new TwilioApiService_1.TwilioApiService(mailService);
    apiService.start(expressApp);
    console.log('Listening on ' + port);
});
//# sourceMappingURL=index.js.map