import { Router } from 'express';
import * as userController from './user.controller';

const routers = new Router();

routers.post('/login', userController.login);
export default routers;
