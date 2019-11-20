import validate from 'express-validation';
import HTTPStatus from 'http-status';
import { Router } from 'express';
import * as userController from './user.controller';
import userValidate from './user.validation';
import { authLocal, authJwt } from '../../service/passport';
import { isAdmin } from '../../service/role';

const routers = new Router();

routers.get('/', authJwt, isAdmin, userController.getAllUser);
routers.post('/login', validate(userValidate.login), authLocal, userController.login);
export default routers;
