import { Router } from 'express';

import UserProfilesController from '../controllers/UserProfilesController';

const routes = Router();

const controller = new UserProfilesController();

routes.get('/', controller.index);
routes.post('/', controller.create);
routes.get('/:id', controller.retrieve);
routes.delete('/:id', controller.delete);

export default routes;
