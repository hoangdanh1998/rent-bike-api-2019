import { Router } from 'express';
import * as branchController from './branch.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.post('/', branchController.createBranch);
routers.get('/', branchController.getAllBranchNoCache);
routers.get('/bikes', branchController.countBikesAllBranch);
routers.get('/:id', branchController.getBranchById);
routers.get('/:id/bikes', branchController.getBikesInBranch);
routers.patch('/:id', branchController.updateBranch);
routers.delete('/:id', branchController.deleteBranch);
export default routers;
