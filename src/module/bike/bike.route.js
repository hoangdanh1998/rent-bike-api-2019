import { Router } from 'express';
import * as bikeController from './bike.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.get('/', bikeController.getAllBike);
routers.get('/:id', bikeController.getBikeById);
routers.post('/', authJwt, isAdmin, bikeController.createBike);
routers.patch('/:id', bikeController.updateBike);
routers.delete('/:id', bikeController.deleteBike);
export default routers;
