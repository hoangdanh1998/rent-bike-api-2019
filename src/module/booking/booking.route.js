import { Router } from 'express';
import * as bookingController from './booking.controller';

const routers = new Router();

routers.get('/', bookingController.getAllBooking);
routers.get('/times', bookingController.getMostBooking);
routers.get('/:id', bookingController.getBookingById);
routers.get('/user/:userId', bookingController.getBookingsByUserId);
routers.post('/', bookingController.createBooking);
routers.patch('/:id', bookingController.updateBooking);
routers.delete('/:id', bookingController.deleteBooking);
routers.patch('/:id/:status', bookingController.changeStatusBooking);
export default routers;

