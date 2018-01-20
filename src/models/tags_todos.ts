import bookshelf from '../db';

const TABLE_NAME: string = 'tags_todos';

/**
 * Todo model.
 */
class TodoTagLinker extends bookshelf.Model<TodoTagLinker> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return false;
  }
}

export default TodoTagLinker;
