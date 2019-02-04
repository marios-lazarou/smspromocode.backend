import * as chai from 'chai';
import { TwilioService } from "../../src/services/TwilioService";
import { FileUtils } from "../utils/file-utils";
import { HTTPResponseCodes } from "../../src/http/HTTPResponseCodes";
import { HTTPResponseMessages } from "../../src/http/HTTPResponseMessages";

let service: TwilioService;
let fileName: string;
let phone: any;

const should = chai.should();

/*
 * TwilioService.ts - isTelephoneNumberAValidTwilioNumber(phone: any) testing
 */
describe('Test Twilio System Service - isTelephoneNumberAValidTwilioNumber(phone: any)', () => {
    before(() => {
        service = new TwilioService();
    });

    it('Valid phone number', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '+35799139135' }

        await service.isTelephoneNumberAValidTwilioNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Null value passed instead of phone', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': null }

        await service.isTelephoneNumberAValidTwilioNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Empty value passed instead of phone', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '' }

        await service.isTelephoneNumberAValidTwilioNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Invalid phone format pass', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'invalid': '+35799139135' }

        await service.isTelephoneNumberAValidTwilioNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });
});

/*
 * TwilioService.ts - sendMessage(phone: any) testing
 */
describe('Test Twilio System Service - sendMessage(phone: any)', async () => {
    before(() => {
        service = new TwilioService();
    });

    it('Valid phone number', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '+35799139135' }

        await service.sendMessage(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.MESSAGE_FAILED_TO_BE_SENT);
            });
    });

    it('Null value passed instead of phone', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': null }

        await service.sendMessage(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.SYSTEM_ERROR);
            });
    });

    it('Empty value passed instead of phone', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '' }

        service.sendMessage(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.MESSAGE_FAILED_TO_BE_SENT);
            });
    });

    it('Invalid phone format pass', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'invalid': '+35799139135' }

        await service.sendMessage(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.SYSTEM_ERROR);
            });
    });
});