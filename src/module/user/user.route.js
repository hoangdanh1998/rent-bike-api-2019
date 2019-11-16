import HTTPStatus from 'http-status';
import { Router } from 'express';
import * as userController from './user.controller';

const routers = new Router();

// test
routers.get('/', (req, res) => res.status(HTTPStatus.OK).json('HJHJHJHJ'));

routers.post('/login', userController.login);
export default routers;
