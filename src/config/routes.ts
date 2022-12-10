import { Router } from 'express';
import userRouter from '../modules/routes/routes.user';

const routes = Router();

routes.use('/users', userRouter);

export default routes;
