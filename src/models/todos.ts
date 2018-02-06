import bookshelf from '../db';
import Tags from './tags';
import * as bookshelfjs from 'bookshelf';
// import * as _ from 'lodash';

const TABLE_NAME: string = 'todos';

class Todo extends bookshelf.Model<Todo> {
  get tableName(): string {
    return TABLE_NAME;
  }

  // public parse(response: any): _.Dictionary<{}> {
  //   console.log('parse of Todo called.');
  //   let newKey:string;
  //   const returnVal =  _.mapKeys(response, (value, key) => {
  //     newKey = _.camelCase(String(key));
  //     return newKey;
  //   });
  //   console.log(returnVal);
  //   return returnVal;
  // }

  get hasTimestamps(): boolean {
    return true;
  }

  public tags(): bookshelfjs.Collection<Tags> {
    return this.belongsToMany(Tags);
  }
}

export default Todo;
