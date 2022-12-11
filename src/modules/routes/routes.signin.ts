import { Router } from 'express';
import UserController from '../controllers/UserController';
const signinRouter = Router();
import { userSignin } from '../../shared/http/schemas/userSchema';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';

const userController = new UserController();

signinRouter.post('/', requestValidation(userSignin), userController.signin);

export default signinRouter;
