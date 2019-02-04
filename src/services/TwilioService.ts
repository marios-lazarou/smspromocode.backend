import { Twilio } from 'twilio';
import { HTTPResponses } from '../http/HTTPResponses';
import { Globals } from '../utils/Globals';

export class TwilioService {

    private readonly twilioTelephoneNumber: string = '+18085184072'; // Your Twilio number from www.twilio.com/console
    private readonly accountSid: string = 'ACd7221ce122bbacb9829591ff6b229f34'; // Your Account SID from www.twilio.com/console
    private readonly authToken: string = 'a3aedd4c2fa721d7a6afd94101a9e0ba';   // Your Auth Token from www.twilio.com/console

    private client: Twilio;
    private lookupsClient: any;

    constructor() {
        this.client = new Twilio(this.accountSid, this.authToken);
        this.lookupsClient = require('twilio')(this.accountSid, this.authToken);
    }

    public isTelephoneNumberAValidTwilioNumber(phone: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                this.lookupsClient.lookups.phoneNumbers(phone['phone'])
                    .fetch({
                        type: 'carrier'
                    })
                    .then(() => {
                        resolve();
                    }, () => {
                        reject(HTTPResponses.INVALID_TWILIO_NUMBER);
                    })
                    .catch(() => {
                        reject(HTTPResponses.SOMETHING_WENT_WRONG);
                    })
                    .done();
            }
            catch {
                reject(HTTPResponses.SOMETHING_WENT_WRONG);
            }
        });
    }

    public sendMessage(phone: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                this.client.messages.create({
                    body: Globals.getSmsMessage(),
                    to: phone['phone'],
                    from: this.twilioTelephoneNumber
                })
                    .then(() => {
                        resolve();
                    }, () => {
                        reject(HTTPResponses.MESSAGE_FAILED);
                    })
                    .catch(() => {
                        reject(HTTPResponses.SOMETHING_WENT_WRONG);
                    });
            } catch {
                reject(HTTPResponses.SOMETHING_WENT_WRONG);
            }
        })
    }
}