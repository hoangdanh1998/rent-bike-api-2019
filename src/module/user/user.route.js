import validate from 'express-validation';
import { Router } from 'express';
import * as userController from './user.controller';
import userValidate from './user.validation';
import { authLocal, authJwt } from '../../service/passport';
import { isAdmin } from '../../service/role';

const routers = new Router();

routers.get('/', userController.getAllUser);
routers.get('/:id', userController.getUserById);
routers.post('/login', validate(userValidate.login), authLocal, userController.login);
routers.post('/register', validate(userValidate.createUser), userController.createUser);
routers.patch('/:id', authJwt, userController.editUser);
routers.delete('/:id', authJwt, isAdmin, userController.deleteUser);
export default routers;
