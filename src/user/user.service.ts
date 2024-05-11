import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';
import { UserRepository } from './user.repository';

@injectable()
export class UserService {
  constructor(@inject(Symbols.UserRepository) private readonly userRepository: UserRepository) {}

  createUser(id: Number, name: String): Boolean {
    return this.userRepository.save(id, name);
  }

  getUser(id: Number): String {
    return this.userRepository.get(id);
  }

  updateUser(id: Number, name: String): Boolean {
    return this.userRepository.update(id, name);
  }

  deleteUser(id: Number): Boolean {
    return this.userRepository.delete(id);
  }
}
