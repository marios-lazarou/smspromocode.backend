import { ValidatorService } from '../../services/ValidatorService';
import { FileSystemService } from '../../services/FileSystemService';
import { TwilioService } from '../../services/TwilioService';
import { HTTPResponses } from '../../http/HTTPResponses';

export class MessagingController {
    private fileSystemService: FileSystemService;
    private twilioService: TwilioService;
    private validatorService: ValidatorService;

    constructor() {
        this.fileSystemService = new FileSystemService();
        this.twilioService = new TwilioService();
        this.validatorService = new ValidatorService();
    }

    public async sendSMS(phone: any): Promise<any> {
        await this.validatorService.isPhoneValidTelephoneNumber(phone)
            .then(() => { },
                (err) => { return Promise.reject(err); });

        await this.twilioService.isTelephoneNumberAValidTwilioNumber(phone)
            .then(() => { },
                (err) => { return Promise.reject(err); });

        await this.fileSystemService.isTelephoneNumberAlreadyRegistered(phone)
            .then(() => { },
                (err) => { return Promise.reject(err); });

        await this.twilioService.sendMessage(phone)
            .then(() => { },
                (err) => { return Promise.reject(err); });

        await this.fileSystemService.registerTelephoneNumber(phone)
            .then(() => { },
                (err) => { return Promise.reject(err); });

        return Promise.resolve(HTTPResponses.SUCCESS);
    }
}
