import { Team } from "../core/football";

/**
 * Caching class for all Premier League Football data
 */
class FootballCache {
    
    private teams: Team[] = [];
    
    public loadTeams(teams: Team[]) {
        this.teams = teams;
    }

    public getTeams(): Team[] {
        return this.teams;
    }

    public addTeam(team: Team) {
        this.teams.push(team);
    }
}

export default new FootballCache();
