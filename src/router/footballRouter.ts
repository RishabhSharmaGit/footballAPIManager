import { Request, Response, Router } from 'express';
import { Team } from '../core/football';
import { TeamManager } from '../managers/teamManager';
import { HTTP_STATUS, TEAMS_PATH_PARAM, TEAM_NAME_PATH_PARAM } from '../static/apiConstants';
import ApiUtil from '../utils/apiUtil';
import ErrorUtil from '../utils/errorUtil';


/**
 * Router class for handling all team routes
 */
export class FootballRouter {

	public router: Router

	private teamManager: TeamManager

	/**
	 * Initialize the FootballRouter
	 */
	constructor() {
		this.router = Router();
		this.teamManager = new TeamManager();
		this.init();
	}
	
	/**
	 * Take each handler, and attach to one of the Express.Router's endpoints.
	 */
	init(): void {

		// Fetch all teams info
		this.router.get(TEAMS_PATH_PARAM, this.getAllTeams.bind(this));

		// Fetch team's info by teamname
		this.router.get(`${TEAMS_PATH_PARAM}/:${TEAM_NAME_PATH_PARAM}`, this.getOneTeam.bind(this));

		// Add/Update team
		this.router.post(TEAMS_PATH_PARAM, this.mergeTeam.bind(this));
	}

	public getAllTeams(req: Request, res: Response): void {
		const func: Function = () => {
			res.status(HTTP_STATUS.OK)
				.json(this.teamManager.getAllTeams());
		};
		ErrorUtil.httpErrorHandler(func, res);
	}

	public getOneTeam(req: Request, res: Response): void {
		const queryTeamName: string = req.params[TEAM_NAME_PATH_PARAM];
		
		const func: Function = () => {
			res.status(HTTP_STATUS.OK)
				.json(this.teamManager.getOneTeam(queryTeamName));
		};
		ErrorUtil.httpErrorHandler(func, res);
	}

	public mergeTeam(req: Request, res: Response): void {
		const body = req.body;
		const func: Function = () => {
			const team: Team = ApiUtil.validateTeamPayload(body);
			res.status(HTTP_STATUS.OK)
				.json(this.teamManager.mergeTeam(team));
		};
		ErrorUtil.httpErrorHandler(func, res);
	}
}
