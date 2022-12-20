import { Router } from 'express';
import userRouter from '../../modules/routes/routes.user';
import signinRouter from '../../modules/routes/routes.signin';
import isAuthenticated from './middlewares/isAuthenticated';
import customerRouter from '../../modules/routes/routes.customer';

const routes = Router();

routes.use('/users', isAuthenticated, userRouter);
routes.use('/signIn', signinRouter);
routes.use('/customers', customerRouter);

export default routes;
