import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const routes = Router();

const controller = new UsersController();

routes.get('/', controller.index);
routes.post('/', controller.create);
routes.get('/:id', controller.retrieve);
routes.delete('/:id', controller.delete);

export default routes;
