import 'reflect-metadata';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../interfaces';
import { Symbols } from '../symbols';
import { UserService } from './user.service';
import { ControllerDecorator } from '../__common__/controller.decorator';

@ControllerDecorator('/user')
@injectable()
export class UserController implements Controller {
  private router: Router;

  constructor(@inject(Symbols.UserService) private userService: UserService) {
    this.router = Router();
    this.addRouter();
  }

  getRouter(): Router {
    return this.router;
  }

  addRouter() {
    const router = Router();
    router
      .get('/:id', (req, res, next) => {
        const { id } = req.params;
        const name = this.userService.getUser(Number(id));
        const result = {
          success: true,
          data: name,
        };
        res.json(result);
      })
      .post('/', (req, res, next) => {
        const { id, name } = req.body;

        if (this.userService.createUser(id, name)) {
          res.status(201).json({ success: true });
        } else {
          res.status(201).json({ success: false });
        }
      })
      .put('/:id', (req, res, next) => {
        const { id } = req.params;
        const dto = req.body;
        const name = this.userService.updateUser(Number(id), dto.name);

        const result = { success: false };
        if (name !== false) {
          result.success = true;
        }
        res.json(result);
      })
      .delete('/:id', (req, res, next) => {
        const { id } = req.params;
        const name = this.userService.deleteUser(Number(id));

        const result = { success: false };
        if (name !== false) {
          result.success = true;
        }
        res.json(result);
      });

    const path = Reflect.getMetadata('path', UserController);
    this.router.use(path, router);
  }
}
