import AccountService from '../services/AccountService';
import BaseResourceController from './BaseResourceController';

export class AccountController extends BaseResourceController {
  service: AccountService;
  public setService(): void {
    this.service = new AccountService();
  }
}
