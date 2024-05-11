import { Container } from 'inversify';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';
import { Symbols } from './symbols';

export const container = new Container();
container.bind<UserController>(Symbols.UserController).to(UserController).inSingletonScope();
container.bind<UserService>(Symbols.UserService).to(UserService).inSingletonScope();
container.bind<UserRepository>(Symbols.UserRepository).to(UserRepository).inSingletonScope();
container.bind<Map<Number, String>>(Symbols.DataSource).toConstantValue(new Map<Number, String>());
