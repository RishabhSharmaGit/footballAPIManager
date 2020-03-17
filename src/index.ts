import * as http from 'http';
import App from './app';
import config from './config';



App.set('port', config.port);
const server = http.createServer(App);
server.listen(config.port);

server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') throw error;
	let bind = (typeof config.port === 'string') ? 'Pipe ' + config.port : 'Port ' + config.port;
	switch(error.code) {
	case 'EACCES':
		console.error(`${bind} requires elevated privileges`);
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(`${bind} is already in use`);
		process.exit(1);
		break;
	default:
		throw error;
	}
}

function onListening(): void {
	let address = server.address();
	let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address?.port}`;
	console.log(`Listening on ${bind}`);
}

module.exports = App;