import { CustomerService } from './../services/CustomerService';
import BaseResourceController from './BaseResourceController';

export class CustomerController extends BaseResourceController {
  service: CustomerService;
  public setService(): void {
    this.service = new CustomerService();
  }
}
