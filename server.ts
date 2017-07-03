import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

import router from './router/v1';
import config from './config/main';

// init express
const app = express();

// init mongoose 
// make a bluebird default Promise
const Promise = require('bluebird');
require('mongoose').Promise = Promise;
mongoose.connect(config.db);

// express middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

// router
router(app);

// init server
let server;
if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port, () => {
        console.log(`server listenning on ${config.port}`);
    });
} else {
    server = app.listen(config.test_port, () => {
        console.log(`server listenning on ${config.test_port}`);
    });
}

// export
export default server;