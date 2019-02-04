import * as chai from 'chai';
import { FileSystemService } from './../../src/services/FileSystemService';
import { FileUtils } from './../utils/file-utils';
import { HTTPResponseCodes } from '../../src/http/HTTPResponseCodes';
import { HTTPResponseMessages } from '../../src/http/HTTPResponseMessages';

const should = chai.should();

let service: FileSystemService;
let fileName: string;
let phone: any;

/*
 * FileSystemService.ts - isTelephoneNumberAlreadyRegistered(phone: any) testing
 */
describe('Test File System Service - isTelephoneNumberAlreadyRegistered(phone: any)', () => {
    before(() => {
        service = new FileSystemService();
    });

    it('Telephone Numbers file', async () => {
        fileName = 'telephone-numbers.json';
        phone = { 'phone': '+35799139135' }
        FileUtils.prepareFile(fileName);

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Already registered number file', async () => {
        fileName = 'already-registered-number.json';
        phone = { 'phone': '+35799139135' }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Corrupted file', async () => {
        fileName = 'corrupted.json';
        phone = { 'phone': '+35799139135' }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Empty file', async () => {
        fileName = 'empty.json';
        phone = { 'phone': '+35799139135' }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Invalid Format file', async () => {
        fileName = 'invalid-format.json';
        phone = { 'phone': '+35799139135' }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Invalid phone format object passed', async () => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        phone = { 'invalid': '+35799139135' }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    it('Null value passed', async () => {
        fileName = 'already-registered-number.json';
        phone = { null: 1 }

        await service.isTelephoneNumberAlreadyRegistered(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
            });
    });

    // /*
    //  * FileSystemService.ts - registerTelephoneNumber(phone: any) testing
    //  */
    describe('Test File System Service - registerTelephoneNumber(phone: any)', () => {
        before(() => {
            service = new FileSystemService();
        });

        it('Telephone Numbers file', async () => {
            fileName = 'telephone-numbers.json';
            FileUtils.prepareFile(fileName);
            phone = { 'phone': '+35799139135' }

            await service.registerTelephoneNumber(phone)
                .then((res) => {
                    should.equal(res, undefined);
                }, (err) => {
                    should.equal(err.success, false);
                    should.equal(err.status, HTTPResponseCodes.ERROR);
                    should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
                });
        });
    });

    it('Already registered number file', async () => {
        fileName = 'already-registered-number.json';
        phone = { 'phone': '+35799139135' }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });

    it('Corrupted file', async () => {
        fileName = 'corrupted.json';
        phone = { 'phone': '+35799139135' }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });

    it('Empty file', async () => {
        fileName = 'empty.json';
        phone = { 'phone': '+35799139135' }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });

    it('Invalid Format file', async () => {
        fileName = 'invalid-format.json';
        phone = { 'phone': '+35799139135' }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });

    it('Invalid phone format object passed', async () => {
        fileName = 'telephone-numbers.json';
        phone = { 'invalid': '+35799139135' }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });

    it('Null value passed', async () => {
        fileName = 'already-registered-number.json';
        phone = { null: 1 }

        await service.registerTelephoneNumber(phone)
            .then((res) => {
                should.equal(res, undefined);
            }, (err) => {
                should.equal(err.success, false);
                should.equal(err.status, HTTPResponseCodes.ERROR);
                should.equal(err.message, HTTPResponseMessages.PHONE_REGISTRATION_ERROR_MSG);
            });
    });
});