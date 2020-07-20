import { Router } from 'express';

import PostsController from '../controllers/PostsController';

const routes = Router();

const controller = new PostsController();

routes.get('/', controller.index);
routes.post('/', controller.create);
routes.get('/:id', controller.retrieve);
routes.delete('/:id', controller.delete);

export default routes;
