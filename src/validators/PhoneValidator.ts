import { Globals } from '../utils/Globals';
import * as Joi from 'joi';

const phoneControlSchema = Joi.object().keys({
    phone: Joi.string().regex(Globals.GET_TELEPHONE_NUMBER_REG_EXPRESSION()).required(),
});

export class PhoneValidator {
    public validate(phone: string) {
        const options = {
            abortEarly: false,
            convert: true
        };
        return Joi.validate(phone, phoneControlSchema, options);
    }
}