import { CustomerController } from './../controllers/CustomerController';
import { Router } from 'express';
import { customerPost, customerPut, idParamsSchema } from '../schemas/customerSchema';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';

const customerRouter = Router();
const controller = new CustomerController();

customerRouter.get('/', controller.list);
customerRouter.get('/:id', requestValidation(idParamsSchema), controller.getById);
customerRouter.post('/', requestValidation(customerPost), controller.create);
customerRouter.put('/:id', requestValidation(idParamsSchema), requestValidation(customerPut), controller.update);
customerRouter.delete('/:id', requestValidation(idParamsSchema), controller.delete);

export default customerRouter;
