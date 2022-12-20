import { dataSource } from '../../database/AppDatasource';
import { Customer } from './../model/Customer';
import { BaseResourceService } from './BaseResourceService';

export class CustomerService extends BaseResourceService<Customer> {
  constructor() {
    super(dataSource.getRepository(Customer));
    this.repository = dataSource.getRepository(Customer);
  }
}
