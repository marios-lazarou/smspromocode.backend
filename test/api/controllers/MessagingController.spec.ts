const supertest = require('supertest');
import * as chai from 'chai';
import { HTTPResponseCodes } from '../../../src/http/HTTPResponseCodes';
import { HTTPResponseMessages } from '../../../src/http/HTTPResponseMessages';
import { FileUtils } from '../../utils/file-utils';

const server = supertest.agent('http://localhost:4000');
const endpoint = '/api/sms-promocode/';
const should = chai.should();

let fileName: string;
let phone: any;

/*
 * To run these tests, the server must be up and running
 */
describe('End-2-end test of server', () => {
    it('Valid Case - Already registered number', (done) => {
        fileName = 'already-registered-number.json';
        FileUtils.prepareFile(fileName);
        this.phone = {
            'phone': '+35799139135'
        }
        server
            .post(`${endpoint}`)
            .send(phone)
            .expect(200)
            .end(async (error: Error, response) => {
                const data = JSON.parse(response.text);
                should.equal(data.success, false);
                should.equal(data.status, HTTPResponseCodes.ERROR);
                should.equal(data.message, HTTPResponseMessages.ALREADY_REGISTERED_PHONE_NUMBER);
                should.equal(error, undefined)
            });
        done();
    });

    it('Valid Case - Invalid Number', (done) => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        const phone = {
            'phone': '+357991afd39135'
        }
        server
            .post(`${endpoint}`)
            .send(phone)
            .expect(200)
            .end(async (error: Error, response) => {
                const data = JSON.parse(response.text);
                should.equal(data.success, false);
                should.equal(data.status, HTTPResponseCodes.ERROR);
                should.equal(data.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
                should.equal(error, undefined)
            });
        done();
    });

    it('Valid case - Not an existing number', (done) => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        const phone = {
            'phone': '+35799000000' // non-existing number
        }
        server
            .post(`${endpoint}`)
            .send(phone)
            .expect(200)
            .end(async (error: Error, response) => {
                const data = JSON.parse(response.text);
                should.equal(data.success, false);
                should.equal(data.status, HTTPResponseCodes.ERROR);
                should.equal(data.message, HTTPResponseMessages.NON_EXISTING_PHONE_NUMBER);
                should.equal(error, undefined)
            });
        done();
    });

    it('Invalid case - False api endpoint', (done) => {
        const phone = {
            'phone': '+35799139135'
        }
        server
            .post('api/controllers/falsendpoint')
            .send(phone)
            .expect(400)
            .end(async (error: Error, response) => {
                should.equal(response, undefined);
                should.equal(error.message, 'read ECONNRESET');
            });
        done();
    });

    it('Invalid case - False data passed - null', (done) => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        const phone = null;
        server
            .post(`${endpoint}`)
            .send(phone)
            .expect(200)
            .end(async (error: Error, response) => {
                const data = JSON.parse(response.text);
                should.equal(data.success, false);
                should.equal(data.status, HTTPResponseCodes.ERROR);
                should.equal(data.message, HTTPResponseMessages.INVALID_PHONE_NUMBER);
                should.equal(error, undefined)
            });
        done();
    });

    it('Invalid case - False data passed', (done) => {
        fileName = 'telephone-numbers.json';
        FileUtils.prepareFile(fileName);
        const phone = {
            'invalid': 'aasdasdasddas'
        };
        server
            .post(`${endpoint}`)
            .send(phone)
            .expect(200)
            .end(async (error: Error, response) => {
                should.equal(response, undefined);
                should.equal(error.message, 'read ECONNRESET');
            });
        done();
    });
})