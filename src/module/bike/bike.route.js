import { Router } from 'express';
import * as bikeController from './bike.controller';
import { isAdmin } from '../../service/role';
import { authJwt } from '../../service/passport';

const routers = new Router();

routers.get('/admin/', bikeController.getAllBike);
routers.get('/', bikeController.getAllBikeFilter);
routers.get('/:id', bikeController.getBikeById);
routers.post('/', bikeController.createBike);
routers.patch('/:id', bikeController.updateBike);
routers.delete('/:id', bikeController.deleteBike);
export default routers;
