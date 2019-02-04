import * as fs from 'fs';
import * as path from 'path';
import { HTTPResponses } from '../http/HTTPResponses';

export class FileSystemService {

    private filePath: string;

    constructor() { 
        this.dataFilePath = path.join(__dirname, '../../data/telephone-numbers.json');
    }

    public set dataFilePath(path: string) {
        this.filePath = path;
    }

    public get dataFilePath(): string {
        return this.filePath;
    }

    public isTelephoneNumberAlreadyRegistered(phone: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                fs.readFile(
                    this.dataFilePath,
                    'utf8',
                    (err: any, data: any) => {

                        const filteredArray: [] = JSON.parse(data)
                            .filter((obj: any) => {
                                return obj.phone === phone['phone'];
                            });

                        filteredArray.length > 0
                            ? reject(HTTPResponses.ALREADY_REGISTERED)
                            : resolve();
                    });
            } catch(err) {
                reject(HTTPResponses.SOMETHING_WENT_WRONG);
            }
        });
    }

    public registerTelephoneNumber(phone: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const file = fs.readFileSync(this.dataFilePath);

                const data: any[] = file
                    ? JSON.parse(file.toString())
                    : reject(HTTPResponses.PHONE_REGISTRATION);

                data.push(phone);

                data
                    ? fs.writeFileSync(this.dataFilePath, JSON.stringify(data))
                    : reject(HTTPResponses.PHONE_REGISTRATION);

                resolve();
            } catch (err) {
                reject(HTTPResponses.PHONE_REGISTRATION);
            }
        });
    }
}