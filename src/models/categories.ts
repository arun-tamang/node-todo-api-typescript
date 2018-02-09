import bookshelf from '../db';
import Todo from './todos';
import Tags from './tags';
import { Collection } from 'bookshelf';

const TABLE_NAME: string = 'categories';

// Model for tags tableName
class Category extends bookshelf.Model<Category> {
  get tableName(): string {
    return TABLE_NAME;
  }

  public todos(): Collection<Todo> {
    return this.hasMany(Todo);
  }

}

export default Category;
