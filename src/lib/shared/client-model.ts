/**
 * ClientModel - Mongoose-style model emulator for frontend
 * Allows frontend code to operate without backend using IndexedDB
 */

import Dexie, { Table } from 'dexie';

export interface ModelSchema {
  [key: string]: any;
}

export interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: string | Record<string, 1 | -1>;
}

class ClientDatabase extends Dexie {
  collections: Map<string, Table<any, any>> = new Map();

  constructor() {
    super('PewpiClientDatabase');
    this.version(1).stores({});
  }

  addCollection(name: string, schema: string) {
    const version = this.verno + 1;
    this.version(version).stores({
      [name]: schema
    });
  }
}

export class ClientModel<T extends ModelSchema> {
  private db: ClientDatabase;
  private collectionName: string;
  private schema: Record<string, any>;

  constructor(name: string, schema: Record<string, any>, db?: ClientDatabase) {
    this.collectionName = name;
    this.schema = schema;
    this.db = db || clientDb;

    // Add collection to database if it doesn't exist
    if (!this.db.tables.some(t => t.name === name)) {
      const indexSchema = this.generateIndexSchema(schema);
      this.db.addCollection(name, indexSchema);
    }
  }

  /**
   * Generate Dexie index schema from model schema
   */
  private generateIndexSchema(schema: Record<string, any>): string {
    const indexes: string[] = ['++id'];
    
    for (const [key, value] of Object.entries(schema)) {
      if (value.index || value.unique) {
        indexes.push(value.unique ? `&${key}` : key);
      }
    }
    
    return indexes.join(',');
  }

  /**
   * Get table reference
   */
  private getTable(): Table<T, any> {
    return this.db.table(this.collectionName);
  }

  /**
   * Create a new document
   */
  async create(doc: Partial<T>): Promise<T & { id: number }> {
    const table = this.getTable();
    const timestamp = Date.now();
    
    const document = {
      ...doc,
      createdAt: doc.createdAt || timestamp,
      updatedAt: timestamp
    } as T;

    const id = await table.add(document);
    return { ...document, id } as T & { id: number };
  }

  /**
   * Find documents matching criteria
   */
  async find(query: Partial<T> = {}, options: QueryOptions = {}): Promise<(T & { id: number })[]> {
    const table = this.getTable();
    let collection = table.toCollection();

    // Apply filters
    if (Object.keys(query).length > 0) {
      collection = collection.filter(doc => {
        return Object.entries(query).every(([key, value]) => {
          return doc[key] === value;
        });
      });
    }

    // Apply sort
    if (options.sort) {
      const sortKey = typeof options.sort === 'string' 
        ? options.sort 
        : Object.keys(options.sort)[0];
      const sortOrder = typeof options.sort === 'string'
        ? 1
        : Object.values(options.sort)[0];
      
      collection = sortOrder === -1 
        ? collection.reverse()
        : collection;
    }

    // Apply skip
    if (options.skip) {
      collection = collection.offset(options.skip);
    }

    // Apply limit
    if (options.limit) {
      collection = collection.limit(options.limit);
    }

    return await collection.toArray();
  }

  /**
   * Find one document
   */
  async findOne(query: Partial<T> = {}): Promise<(T & { id: number }) | null> {
    const results = await this.find(query, { limit: 1 });
    return results[0] || null;
  }

  /**
   * Find by ID
   */
  async findById(id: number): Promise<(T & { id: number }) | null> {
    const table = this.getTable();
    const doc = await table.get(id);
    return doc ? { ...doc, id } : null;
  }

  /**
   * Update documents
   */
  async updateMany(query: Partial<T>, update: Partial<T>): Promise<number> {
    const docs = await this.find(query);
    const table = this.getTable();
    
    const updateData = {
      ...update,
      updatedAt: Date.now()
    };

    const promises = docs.map(doc => 
      table.update(doc.id, updateData)
    );

    await Promise.all(promises);
    return docs.length;
  }

  /**
   * Update one document
   */
  async updateOne(query: Partial<T>, update: Partial<T>): Promise<boolean> {
    const doc = await this.findOne(query);
    if (!doc) return false;

    const table = this.getTable();
    const updateData = {
      ...update,
      updatedAt: Date.now()
    };

    await table.update(doc.id, updateData);
    return true;
  }

  /**
   * Update by ID
   */
  async findByIdAndUpdate(id: number, update: Partial<T>): Promise<(T & { id: number }) | null> {
    const table = this.getTable();
    const updateData = {
      ...update,
      updatedAt: Date.now()
    };

    await table.update(id, updateData);
    return await this.findById(id);
  }

  /**
   * Delete documents
   */
  async deleteMany(query: Partial<T>): Promise<number> {
    const docs = await this.find(query);
    const table = this.getTable();
    
    const promises = docs.map(doc => table.delete(doc.id));
    await Promise.all(promises);
    
    return docs.length;
  }

  /**
   * Delete one document
   */
  async deleteOne(query: Partial<T>): Promise<boolean> {
    const doc = await this.findOne(query);
    if (!doc) return false;

    const table = this.getTable();
    await table.delete(doc.id);
    return true;
  }

  /**
   * Delete by ID
   */
  async findByIdAndDelete(id: number): Promise<(T & { id: number }) | null> {
    const doc = await this.findById(id);
    if (!doc) return null;

    const table = this.getTable();
    await table.delete(id);
    return doc;
  }

  /**
   * Count documents
   */
  async count(query: Partial<T> = {}): Promise<number> {
    const docs = await this.find(query);
    return docs.length;
  }

  /**
   * Clear all documents
   */
  async clear(): Promise<void> {
    const table = this.getTable();
    await table.clear();
  }
}

// Singleton database instance
export const clientDb = new ClientDatabase();

/**
 * Create a new model
 */
export function createModel<T extends ModelSchema>(
  name: string,
  schema: Record<string, any>
): ClientModel<T> {
  return new ClientModel<T>(name, schema, clientDb);
}

export default { ClientModel, createModel, clientDb };
