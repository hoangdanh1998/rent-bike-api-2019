
import { Router } from 'express';
import * as redisController from './redis-location.controller';

const routers = new Router();

routers.get('/', redisController.getLocation);
routers.ost('/', redisController.setLocation);
