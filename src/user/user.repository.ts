import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Symbols } from '../symbols';

@injectable()
export class UserRepository {
  private dataSource: Map<Number, String>; // will be replaced by a real data source in the future

  constructor(@inject(Symbols.DataSource) dataSource: Map<Number, String>) {
    this.dataSource = dataSource;
  }

  save(id: Number, name: String): Boolean {
    if (this.dataSource.has(id)) {
      return false;
    }
    this.dataSource.set(id, name);
    return true;
  }

  get(id: Number): String {
    const name = this.dataSource.get(id);
    if (name === undefined) {
      throw new Error('User not found. id: ' + id.toString());
    }
    return name;
  }

  update(id: Number, name: String): Boolean {
    if (this.dataSource.has(id)) {
      this.dataSource.set(id, name);
      return true;
    } else {
      return false;
    }
  }

  delete(id: Number): Boolean {
    if (!this.dataSource.has(id)) {
      return false;
    }
    this.dataSource.delete(id);
    return true;
  }
}
