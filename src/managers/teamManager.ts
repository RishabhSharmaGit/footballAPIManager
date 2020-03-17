import footballCache from "../cache/footballCache";
import config from "../config";
import { Team } from "../core/football";
import NotFoundError from '../errors/notFoundError';
import NothingToUpdateError from "../errors/nothingToUpdateError";
import ConverterUtil from "../utils/converterUtil";

/**
 * Manager class for serving & manipulation of all teams related data
 */
export class TeamManager {

	teamsDatapath: string | undefined
	
	constructor(path?: string) {
		
		this.teamsDatapath = path;
		const teams = ConverterUtil.readJSONFromFile(path? path: config.teamsDataPath) as Team[]
		footballCache.loadTeams(teams);
	}

    /**
	 * GET all Teams.
	 */
	public getAllTeams(): Team[] {
		// send all football teams data from cache
		return footballCache.getTeams();
	}

	/**
	 * GET one team record by teamName
	 */
	public getOneTeam(pathTeamName: string): Team {
		let teamFound = this.getTeamByName(pathTeamName);

		if (teamFound) {
			return teamFound;
		}
		else {
			throw new NotFoundError(`No team exists with given name, ${pathTeamName}`);
		}
	}

	/**
	 * Add or Update Team by given Team payload
	 */
	public mergeTeam(payloadTeam: Team): Team[] {
		const found = this.isTeamPresent(payloadTeam.name);
		if (found) {
			// Update parameters of this team
			this.updateTeam(payloadTeam);
		}
		else {
			// Add this team
			this.addTeam(payloadTeam);
		}
		
		// Return all upldated teams
		return this.getAllTeams();
	}

	private isTeamPresent(queryTeamName: string): boolean {
        const teamFound = footballCache.getTeams().find((team: Team) => {
			return team.name === queryTeamName;
        });
        if(teamFound) {
            return true;
        }
        
        return false;
    }

    private getTeamByName(queryTeamName: string): Team | undefined {
        return footballCache.getTeams().find((team: Team) => {
			return team.name === queryTeamName;
        });
    }

    private updateTeam(payloadTeam: Team): void {
		let isUpdated: boolean = false;
        // modify this method, only one team
        const updatedTeams = footballCache.getTeams().map((team: Team) => {
			if(team.name === payloadTeam.name && 
				team.img != payloadTeam.img){
				isUpdated = true;
				return payloadTeam; 	
			} else {
				return team;
			}
		});
		if(isUpdated) {
			// update cache
			footballCache.loadTeams(updatedTeams);
			// update json
			ConverterUtil.writeJSONToFile(this.teamsDatapath? this.teamsDatapath: config.teamsDataPath, updatedTeams);
		}
		else {
			throw new NothingToUpdateError('Exact same team parameters provided.');
		}
    }

    private addTeam(payloadteam: Team): void {
		//update cache
		footballCache.addTeam(payloadteam);
		// update json
		ConverterUtil.writeJSONToFile(this.teamsDatapath? this.teamsDatapath: config.teamsDataPath, footballCache.getTeams());
    }
}
