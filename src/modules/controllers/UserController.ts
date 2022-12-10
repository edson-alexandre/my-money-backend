import { UserService } from './../services/UserService';
import { Response } from 'express';
import { Request } from 'express';
export default class UserController {
  async list(req: Request, res: Response): Promise<Response> {
    const userService = new UserService();
    const users = await userService.list();
    return res.json(users);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const user = { ...req.body };
    const userService = new UserService();
    const users = await userService.create(user);
    return res.json(users);
  }
}
