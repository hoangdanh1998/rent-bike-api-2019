import { Router } from 'express';
import * as branchController from './branch.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.post('/', branchController.createBranch);
export default routers;
