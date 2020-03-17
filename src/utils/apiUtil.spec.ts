import { Team } from '../core/football';
import ApiUtil from './apiUtil';

describe("API Utility functions", () => {
  
    test('to validate if proper input is provided', () => {
        const team: Team = {"name": "India", "img": "TestImage3"};
        expect(ApiUtil.validateTeamPayload(team as any)).toEqual(team);
    })

    test('to validate if wrong "name" parameter is provided, it will throw an MismatchParametersError', () => {
        const team: any = {"nameHello": "India", "img": "TestImage3"};
        const func: Function = () => {
            ApiUtil.validateTeamPayload(team);
        };
        expect(func).toThrowError('Expected team properties not received.');
    })

    test('to validate if wrong "img" parameter is provided, it will throw an MismatchParametersError', () => {
        const team: any = {"name": "India", "imgHello": "TestImage3"};
        const func: Function = () => {
            ApiUtil.validateTeamPayload(team);
        };
        expect(func).toThrowError('Expected team properties not received.');
    })
})
