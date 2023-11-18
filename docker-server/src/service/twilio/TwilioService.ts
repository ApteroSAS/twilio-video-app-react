import {properties} from "@root/properties/properties"
import * as Twilio from 'twilio';

const AccessToken = Twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;

const MAX_ALLOWED_SESSION_DURATION = 86400;
const twilioAccountSid = properties.TWILIO_ACCOUNT_SID;
const twilioAuthToken  = properties.TWILIO_AUTH_TOKEN;
const twilioApiKeySID = properties.TWILIO_API_KEY_SID;
const twilioApiKeySecret = properties.TWILIO_API_KEY_SECRET;

export interface TokenRequest {
    user_identity: string;
    room_name: string;
}

export class TwilioService {

    //based on https://github.com/twilio-labs/plugin-rtc/blob/master/src/serverless/functions/token.js
    async getToken({ user_identity, room_name}:TokenRequest):Promise<{ token:string,room_type:string }>{
        //https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens
        const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
            ttl:MAX_ALLOWED_SESSION_DURATION,
            identity: user_identity,
        });

        const videoGrant = new VideoGrant({ room: room_name });
        token.addGrant(videoGrant);

        // Return token and room type
        return { token: token.toJwt(), room_type:'group' };
    }
}
