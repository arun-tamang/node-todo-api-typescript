import bookshelf from '../db';
import Todo from './todos';
import { Collection } from 'bookshelf';

const TABLE_NAME: string = 'tags';

// Model for tags tableName
class Tags extends bookshelf.Model<Tags> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return false;
  }

  public todos(): Collection<Todo> {
    return this.belongsToMany(Todo);
  }

}

export default Tags;
