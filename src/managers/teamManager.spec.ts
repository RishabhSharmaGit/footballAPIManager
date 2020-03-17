import config from '../config';
import { Team } from '../core/football';
import ConverterUtil from '../utils/converterUtil';
import TeamManager from './teamManager';

describe("teams in premier football league", () => {

    const teamManager = new TeamManager(config.teamsTestDataPath);
    const origTeams = ConverterUtil.readJSONFromFile(config.teamsTestDataPath) as Team[];
    
    test('to get all teams', () => {
        expect(teamManager.getAllTeams()).toEqual(origTeams);
    })

    test('to get one team using name', () => {
        const team = origTeams.find(team => team.name == 'Arsenal');
        expect(teamManager.getOneTeam('Arsenal')).toEqual(team);
    })

    test('to update one team\'s image and verify if it\'s updated', () => {
        const teamWithNewData: Team = {"name": "Bournemouth", "img": "imageTest1"};
        const updatedTeam = teamManager.mergeTeam(teamWithNewData).find(team => team.name == teamWithNewData.name);
        expect(updatedTeam?.img).toBe(teamWithNewData.img);
    })

    test('to add one new team and verify if it is present', () => {
        const newTeam: Team = {"name": "newTeam", "img": "imageTest2"};
        const updatedTeam = teamManager.mergeTeam(newTeam).find(team => team.name == newTeam.name);
        expect(updatedTeam).toEqual(newTeam);
    })
    
    /** Clean up tasks */
    afterAll(() => {
        // Writing original data back to test json data file.
        ConverterUtil.writeJSONToFile(config.teamsTestDataPath, origTeams);
    })
})

