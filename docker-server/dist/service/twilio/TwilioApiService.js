"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioApiService = void 0;
const express_1 = __importDefault(require("express"));
class TwilioApiService {
    service;
    expressApp;
    constructor(service) {
        this.service = service;
    }
    mountAPI() {
        let router = express_1.default.Router();
        router.get('/api/version', (req, res) => {
            res.json("1.0.0"); //increment this each time you change the api and break the backward compatibility (semver)
        });
        router.post('/token', async (req, res) => {
            try {
                let json = req.body;
                const jwtToken = await this.service.getToken(json);
                res.json({ token: jwtToken });
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        });
        this.expressApp.use('/', router);
    }
    start(expressApp) {
        this.expressApp = expressApp;
        this.mountAPI();
    }
}
exports.TwilioApiService = TwilioApiService;
//# sourceMappingURL=TwilioApiService.js.map