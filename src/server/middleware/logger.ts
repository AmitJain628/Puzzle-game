import bunyan, { LoggerOptions } from 'bunyan';
import log from 'express-bunyan-logger';
import express from 'express';

export interface ICustomBunyan extends bunyan {
  getRequestLogger: express.RequestHandler;
  getBasicLogger(name: string): void;
}

const config = {
  name: 'puzzle',
  streams: [
    {
      level: 'info',
      path: 'logs/puzzle-game-ui-dev-out-app.log'
    },
    {
      level: 'error',
      path: 'logs/puzzle-game-ui-dev-error-app.log'
    }
  ]
};
const logger = bunyan.createLogger(config as LoggerOptions) as ICustomBunyan;

logger.getBasicLogger = (name = 'init') => {
  return bunyan.createLogger({ name });
};

logger.getRequestLogger = log({
  excludes: ['user-agent', 'res-headers', 'res', 'req', 'body'],
  obfuscate: ['body.password', 'body.confirmPassword']
});

export default logger;
