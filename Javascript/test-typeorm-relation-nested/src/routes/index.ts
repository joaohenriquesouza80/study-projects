import { Router } from 'express';

import postsRoutes from './posts.routes';
import usersRoutes from './users.routes';
import userProfilesRoutes from './user_profiles.routes';

const routes = Router();

routes.use('/posts', postsRoutes);
routes.use('/users', usersRoutes);
routes.use('/user_profiles', userProfilesRoutes);

export default routes;
