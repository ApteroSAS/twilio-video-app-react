import 'module-alias/register';
const express = require('express')
const app = express()
let bodyParser = require('body-parser');

let cors = require('cors');
import {TwilioApiService} from "@root/service/twilio/TwilioApiService";
import {TwilioService} from './service/twilio/TwilioService';

console.log("Docker image version : "+(require('../dockflow.json').version || "latest"));

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(cors());
// Parse JSON and form HTTP bodies
expressApp.use(bodyParser.urlencoded({extended: true}));

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    console.error(reason);
});

let port = 8194;
expressApp.listen(port, () => {
    let mailService = new TwilioService();
    let apiService: TwilioApiService = new TwilioApiService(mailService);
    apiService.start(expressApp);
    console.log('Listening on '+port);
});
