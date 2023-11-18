import {TokenRequest, TwilioService,} from "./TwilioService";
import express from "express";

export class TwilioApiService {
    private expressApp: express.Application;

    constructor(public service: TwilioService) {
    }

    mountAPI() {
        let router = express.Router();

        router.get('/api/version', (req, res) => {
            res.json("1.0.0");//increment this each time you change the api and break the backward compatibility (semver)
        });

        router.post('/token', async (req, res) => {
            try {
                let json = req.body as TokenRequest;
                const respjson = await this.service.getToken(json);
                res.json(respjson);
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        });

        this.expressApp.use('/', router);
    }

    start(expressApp: express.Application): void {
        this.expressApp = expressApp;
        this.mountAPI();
    }

}
