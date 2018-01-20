import * as Boom from 'boom';
import { Collection } from 'bookshelf';
import TodoTagLinker from '../models/tags_todos';
import * as Bluebird from 'bluebird';

export function getUserTodoId(tagId: number): Bluebird<Collection<TodoTagLinker>> {
  return new TodoTagLinker()
    .query('where', 'tag_id', '=', String(tagId))
    .fetchAll()
    .then((linker: Collection<TodoTagLinker>) => {
      if (!linker) {
        throw new Error('tag_id: ' + tagId + ' not found.');
      }
      return linker;
    });
}

export function getTags(todoId: number): Bluebird<Collection<TodoTagLinker>> {
  return new TodoTagLinker()
    .query('where', 'todo_id', '=', String(todoId))
    .fetchAll()
    .then((linker: Collection<TodoTagLinker>) => {
      if (!linker) {
        throw new Error('todo_id: ' + todoId + ' not found.');
      }
      return linker;
    });
}

export async function getMultipleTodoIds(tagIdArray: number[]): Promise<number[]> {
  const todoIds: number[] = [];
  let matchedModels: any;
  let newId: number;
  for (const tagId of tagIdArray) {
    matchedModels = await getUserTodoId(tagId)
      .then((data: any) => {
        return data.models;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    if (matchedModels) {
      for (const matchedModel of matchedModels) {
        newId = matchedModel.attributes.todoId;
        if (todoIds.indexOf(newId) === -1) {
          todoIds.push(newId);
        }
      }
    }
  }
  return todoIds;
}

export function removeLink(todoId: number): Bluebird<TodoTagLinker> {
  return new TodoTagLinker()
    .query('where', 'todo_id', '=', String(todoId))
    .destroy()
    .then((linker: TodoTagLinker) => {
      return linker;
    });
}

export function removeLinkByTags(tagId: number): Bluebird<TodoTagLinker> {
  return new TodoTagLinker()
    .query('where', 'tag_id', '=', String(tagId))
    .destroy()
    .then((linker: TodoTagLinker) => {
      return linker;
    });
}
