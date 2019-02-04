import * as chai from 'chai';
import { ValidatorService } from './../../src/services/ValidatorService';
import { FileUtils } from '../utils/file-utils';
import { HTTPResponseCodes } from '../../src/http/HTTPResponseCodes';
import { HTTPResponseMessages } from '../../src/http/HTTPResponseMessages';

let service: ValidatorService;
let fileName: string;
let phone: any;

const should = chai.should();

/*
 * ValidatorService.ts - isPhoneValidTelephoneNumber(phone: any) testing
 */
describe('Test Validator Service - isPhoneValidTelephoneNumber(phone: any)', () => {

    before(() => {
        service = new ValidatorService();
    });

    it('Valid phone number', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '+35799139135' }

        await service.isPhoneValidTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Phone Number including letters', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '+357991sf39135' }

        await service.isPhoneValidTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Valid hone number but without the "+" sign', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '35799139135' }

        await service.isPhoneValidTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Null', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = null;

        await service.isPhoneValidTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });

    it('Empty telephone Number', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'phone': '' }

        await service.isPhoneValidTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
            });
    });
});