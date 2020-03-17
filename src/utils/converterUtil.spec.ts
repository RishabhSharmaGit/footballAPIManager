import fs from 'fs';
import { Team } from '../core/football';
import ConverterUtil from './converterUtil';

describe("Converter Utility functions", () => {
  
    test('to read json from file', () => {
        const teams: Team[] = [{"name":"Chelsea","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/635.jpg"},{"name":"Liverpool","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/646.jpg"}];
        expect(ConverterUtil.readJSONFromFile('./data/test.json') as Team[]).toEqual(teams);
    })

    test('to write json to a new file', () => {
        const teams: Team[] = [{"name":"ChelseaTest","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test1.jpg"},{"name":"LiverpoolTest","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test2.jpg"}];
        const func: Function = () => {
            ConverterUtil.writeJSONToFile('./data/writeTest.json', teams)
        };
        expect(func).not.toThrowError();
    })

    test('to override json to an existing file', () => {
        const teams: Team[] = [{"name":"ChelseaOverride","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test3.jpg"},{"name":"LiverpoolOverride","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test4.jpg"}];
        const func: Function = () => {
            ConverterUtil.writeJSONToFile('./data/writeTest.json', teams)
        };
        expect(func).not.toThrowError();
    })

    test('to override json to an existing file', () => {
        const teams: Team[] = [{"name":"ChelseaOverride","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test3.jpg"},{"name":"LiverpoolOverride","img":"https://s3-eu-west-1.amazonaws.com/inconbucket/images/entities/original/Test4.jpg"}];
        const func: Function = () => {
            ConverterUtil.writeJSONToFile('', teams, false)
        };
        expect(func).toThrowError();
    })

    /** Clean up tasks */
    afterAll(() => {
        // Delete test file, created while testing write operation
        fs.unlinkSync('./data/writeTest.json');
    })
})
