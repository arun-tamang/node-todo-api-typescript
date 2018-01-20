import * as Boom from 'boom';
import Todo from '../models/todos';
import Tags from '../models/tags';
import TodoTagLinker from '../models/tags_todos';
import * as Bluebird from 'bluebird';
import * as tagService from './tagService';
import * as linkerService from './todoTagLinkerService';
import { SearchQuery, TodoToPost } from '../types/todo';
import { QueryBuilder } from 'knex';
import { Collection } from 'bookshelf';

export function getTodo(id: number, pageNo: number): Bluebird<Todo> {
  return new Todo().query('where', 'user_id', '=', String(id))
    .orderBy('updated_at', 'DESC')
    .fetchPage({
      pageSize: 5, // Defaults to 10 if not specified
      page: pageNo || 1, // Defaults to 1 if not specified
      withRelated: ['tags']
    })
    .then((todo: {}) => {
      if (!todo) {
        throw Boom.notFound('Todo not found');
      }

      return todo;
    });
}

export function getTodosFromTags(tagArray: string[]): Promise<number[]> {
  // get tag ids from tag names and then get todo_ids having these tag_ids by using linker table
  return tagService
    .getMultipleByTagName(tagArray)
    .then((tagIdArray: number[]) => {
      return linkerService.getMultipleTodoIds(tagIdArray);
    });
}

export async function searchTodo(userId: number, queries: SearchQuery): Promise<Collection<Todo>> {
  const keyArray: string[] = queries.keywords.split(' ');
  const tagArray: string[] = queries.tags || [];
  const todoIds: number[] = await getTodosFromTags(tagArray);
  const searchByKeys = (qb: QueryBuilder): QueryBuilder => {
    for (const keyItem of keyArray) {
      qb = qb.orWhere('name', 'LIKE', '%' + keyItem + '%');
    }
    return qb;
  };
  const searchByTodoIds = (qb: QueryBuilder): QueryBuilder => {
    for (const idItem of todoIds) {
      qb = qb.orWhere('id', '=', idItem);
    }
    return qb;
  };

  return new Todo()
    .query(async (qb: QueryBuilder) => {
      qb = searchByTodoIds(qb);
      qb = searchByKeys(qb);
      qb = qb.andWhere('user_id', '=', userId);
    })
    .orderBy('updated_at', 'DESC')
    .fetchPage({
      pageSize: 5, // Defaults to 10 if not specified
      page: 1, // Defaults to 1 if not specified
      withRelated: ['tags']
    })
    .then((todo: Collection<Todo>) => {
      if (!todo) {
        console.log('query doesn\'t match');
        // todo = { message: 'no todo matches your query' };
      }
      return todo;
    });
}

export function createTodo(id: number, todo: TodoToPost): Bluebird<Todo> {
  // this actually adds new todo row and doesn't update any row in table.
  const tagIds: number[] = todo.tagIds;  // tagIds is array
  return new Todo()
    .save({ name: todo.name, user_id: id })
    .then((newTodo: Todo) => {
      newTodo.refresh();
      newTodo.tags().attach(tagIds);  // camelCase because of json data user sends.
      return newTodo;
    });
}

export function editTodo(todoId: number, newTitle: string): Bluebird<Todo> {
  // edit a single todo
  return new Todo({ id: todoId })
    .save({ name: newTitle })
    .then((editedTodo: Todo) => {
      editedTodo.refresh();
      return editedTodo;
    });
}

export async function deleteTodo(todoId: number): Promise<string> {
  // get array of tags of todo from linkerTable
  const tags: Collection<TodoTagLinker> = await linkerService.getTags(todoId);
  for (let i = 0; i < (tags.length); i++) {
    linkerService.removeLink(todoId);
  }
  return new Todo({ id: todoId }).destroy().then(() => {
    return ('todoId deleted: ' + todoId);
  });
}
