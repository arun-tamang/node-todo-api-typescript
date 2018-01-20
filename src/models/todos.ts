import bookshelf from '../db';
import Tags from './tags';
import * as bookshelfjs from 'bookshelf';

const TABLE_NAME: string = 'todos';

class Todo extends bookshelf.Model<Todo> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  public tags(): bookshelfjs.Collection<Tags> {
    return this.belongsToMany(Tags);
  }
}

export default Todo;
