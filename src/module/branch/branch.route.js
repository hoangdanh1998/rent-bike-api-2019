import { Router } from 'express';
import * as branchController from './branch.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.post('/', authJwt, isAdmin, branchController.createBranch);
routers.get('/', branchController.getAllBranchNoCache);
routers.get('/:id', branchController.getBranchById);
routers.patch('/:id', branchController.updateBranch);
routers.delete('/:id', authJwt, isAdmin, branchController.deleteBranch);
export default routers;
