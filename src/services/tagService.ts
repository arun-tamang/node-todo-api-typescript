import * as Boom from 'boom';
import * as Bluebird from 'bluebird';
import { Collection } from 'bookshelf';
import Tags from '../models/tags';

export function getByTagName(name: string): Bluebird<Tags> {
  return new Tags()
    .query('where', 'name', '=', name)
    .fetch()
    .then((tag: Tags) => {
      if (!tag) {
        throw Boom.notFound('tag: ' + name + ' not found');
      }
      return tag;
    });
}

export async function getMultipleByTagName(tagArray: string[]): Promise<number[]> {
  const idArray: number[] = [];
  for (const tagItem of tagArray) {
    await getByTagName(tagItem)
      .then((data: Tags) => {
        idArray.push(data.attributes.id);
        return data.attributes.id;
      });
  }
  return idArray;
}

export function getAllTags(): Bluebird<Collection<Tags>> {
  return new Tags().fetchAll();
}
