import fs from 'fs';
import JSONReadError from '../errors/JSONReadError';
import JSONWriteError from '../errors/JSONWriteError';

class ConverterUtil {
    
    public static readJSONFromFile(path: string, debugLog = true): Object {
        try {
            const jsonString = fs.readFileSync(path, 'utf8');
            return JSON.parse(jsonString);
        }
        catch (err) {
            if(debugLog) console.error(err);
            throw new JSONReadError(`Error occured while reading json from file: ${err}`);
        }
    }

    public static writeJSONToFile(path: string, data: any, debugLog = true): void {
        try {
            const jsonString = JSON.stringify(data, null, 4);
            fs.writeFileSync(path, jsonString);
        }
        catch (err) {
            if(debugLog) console.error(err);
            throw new JSONWriteError(`Error occured while writing json to a file: ${err}`);
        }
        return;
    }

}

export default ConverterUtil;