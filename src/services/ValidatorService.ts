import { PhoneValidator } from '../validators/PhoneValidator';
import { HTTPResponses } from '../http/HTTPResponses';

export class ValidatorService {

    private phoneValidator: PhoneValidator

    constructor() {
        this.phoneValidator = new PhoneValidator();
    }

    public isPhoneValidTelephoneNumber(phone: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const results = this.phoneValidator.validate(phone);
            results.error && results.error.name === 'ValidationError'
                ? reject(HTTPResponses.INVALID_PHONE)
                : resolve();
        });
    }
}