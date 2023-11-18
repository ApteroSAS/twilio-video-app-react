"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const properties_1 = require("@root/properties/properties");
const Twilio = __importStar(require("twilio"));
const AccessToken = Twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const MAX_ALLOWED_SESSION_DURATION = 86400;
const twilioAccountSid = properties_1.properties.TWILIO_ACCOUNT_SID;
const twilioAuthToken = properties_1.properties.TWILIO_AUTH_TOKEN;
const twilioApiKeySID = properties_1.properties.TWILIO_API_KEY_SID;
const twilioApiKeySecret = properties_1.properties.TWILIO_API_KEY_SECRET;
class TwilioService {
    //based on https://github.com/twilio-labs/plugin-rtc/blob/master/src/serverless/functions/token.js
    async getToken({ user_identity, room_name }) {
        //https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens
        const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
            ttl: MAX_ALLOWED_SESSION_DURATION,
            identity: user_identity,
        });
        const videoGrant = new VideoGrant({ room: room_name });
        token.addGrant(videoGrant);
        // Return token and room type
        return { token: token.toJwt(), room_type: 'group' };
    }
}
exports.TwilioService = TwilioService;
//# sourceMappingURL=TwilioService.js.map