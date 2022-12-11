import { Router } from 'express';
import userRouter from '../../modules/routes/routes.user';
import signinRouter from '../../modules/routes/routes.signin';
import isAuthenticated from './middlewares/isAuthenticated';

const routes = Router();

routes.use('/users', isAuthenticated, userRouter);
routes.use('/signIn', signinRouter);

export default routes;
