import { Router } from 'express';
import * as bikeController from './bike.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.get('/', bikeController.getAllBike);
// routers.get('/:id', bikeController.getBikeById);
routers.post('/', bikeController.createBike);
export default routers;
