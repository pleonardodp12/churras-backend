import express from 'express';
import BarbecueController from './controllers/barbecues';
import UserController from './controllers/user';

const routes = express.Router();

const barbecueController = new BarbecueController
const userController = new UserController

routes.get('/dev/barbecues', barbecueController.get)
routes.post('/dev/barbecues', barbecueController.create)
routes.get('/dev/barbecues/:id', barbecueController.index)
routes.post('/dev/barbecues/:id', barbecueController.insertPeople)
routes.put('/dev/barbecues/:id/confirm', barbecueController.confirmPresense)
routes.post('/dev/signup', userController.register)
routes.post('/dev/signin', userController.login)

export default routes;