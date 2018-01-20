import * as knexJs from 'knex';
import * as knexConfig from './knexfile';
import * as bookshelfJs from 'bookshelf';

const knex: knexJs = knexJs(knexConfig);
const bookshelf: bookshelfJs = bookshelfJs(knex);

bookshelf.plugin(['virtuals', 'pagination', 'visibility', 'bookshelf-camelcase']);

export default bookshelf;
