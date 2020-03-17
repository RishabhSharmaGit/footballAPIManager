import * as bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import { FootballRouter } from './router/footballRouter';



class App {

	public express: Application;
	
	private footballRouter: FootballRouter;

    constructor() {
		this.express = express();
		this.footballRouter = new FootballRouter();
		this.middleware();
		this.routes();
    }

    // Configuring Express middlewares
    private middleware(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
		// Router handling all Team APIs
		this.express.use('/', this.footballRouter.router);
		
		this.express.get('/', (req: Request, res: Response) => {
			res.send('⚽ REST API based Football Manager ⚽');
		});

		// Handling undefined routes
		this.express.use('*', (req: Request, res: Response) => {
			res.send('Uh-Oh! Make sure url is correct!!!');
		});
    }
}

export default new App().express;