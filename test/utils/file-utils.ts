import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
    
    private static dataFilePath = path.join(__dirname, '../../testData/');

    public static prepareFile(fileName: string): void {
        fs.writeFile(
            this.dataFilePath.concat(fileName),
            '[]', () => {}
        );
    }
}