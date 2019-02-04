import { HTTPResponseUtils, IResponseMessage } from './HTTPResponseUtils';
import { HTTPResponseCodes } from "./HTTPResponseCodes";
import { HTTPResponseMessages } from './HTTPResponseMessages';

export class HTTPResponses {
    public static get SUCCESS(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(true, HTTPResponseCodes.SUCCESS, HTTPResponseMessages.SUCCESS_MSG)
    }

    public static get INVALID_TWILIO_NUMBER(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.NON_EXISTING_PHONE_NUMBER);
    }

    public static get SOMETHING_WENT_WRONG(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.SYSTEM_ERROR);
    }

    public static get PHONE_REGISTRATION(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
    }

    public static get ALREADY_REGISTERED(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
    }

    public static get MESSAGE_FAILED(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.MESSAGE_FAILED_TO_BE_SENT);
    }

    public static get INVALID_PHONE(): IResponseMessage {
        return HTTPResponseUtils.messageStatusStatus(false, HTTPResponseCodes.ERROR, HTTPResponseMessages.INVALID_PHONE_NUMBER);
    }
}