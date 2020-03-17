import ConverterUtil from "./utils/converterUtil";

export interface Config {  
    port: number;
    teamsDataPath: string;
    teamsTestDataPath: string;
}

let config = ConverterUtil.readJSONFromFile('./config.json') as Config;
export default config;