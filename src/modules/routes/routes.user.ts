import { Router } from 'express';
import UserController from '../controllers/UserController';
const userRouter = Router();
import { userPost } from '../../shared/http/schemas/userSchema';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';

const userController = new UserController();

userRouter.get('/', userController.list);
userRouter.post('/', requestValidation(userPost), userController.create);

export default userRouter;
