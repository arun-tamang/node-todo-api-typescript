import bookshelf from '../db';

const TABLE_NAME: string = 'rfs_tokens';

// Model for tags tableName
class RfsToken extends bookshelf.Model<RfsToken> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return true;
  }
}

export default RfsToken;
