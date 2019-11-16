import express from 'express';
import middleware from './config/middleware';
import routeConfig from './module/index';
// import './config/database';

const app = express();

middleware(app);

routeConfig(app);

app.listen(1998, () => console.log('Server runing at port 1998'));

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit(); });

