import './env';
import './db';
import * as cors from 'cors';
import * as path from 'path';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as express from 'express';
import routes from './routes';
import logger from './utils/logger';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import json from './middlewares/json';
import * as errorHandler from './middlewares/errorHandler';

const app: express.Express = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test'
    ? process.env.TEST_APP_PORT
    : process.env.APP_PORT) || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// Everything in the public folder is served as static content
app.use(express.static(path.join(__dirname, '/../public')));

// API Routes
app.use('/api', routes);

// Error Handling Middlewares
app.use(errorHandler.genericErrorHandler);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log(
    'info',
    `Server started at http://${app.get('host')}:${app.get('port')}`
  );
});

export default app;
