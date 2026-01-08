/**
 * Unit tests for ClientModel
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ClientModel, createModel } from '../client-model';
import Dexie from 'dexie';

interface TestDoc {
  name: string;
  email: string;
  age?: number;
  createdAt?: number;
  updatedAt?: number;
}

describe('ClientModel', () => {
  let model: ClientModel<TestDoc>;

  beforeEach(async () => {
    // Clear all IndexedDB databases before each test
    const databases = await Dexie.getDatabaseNames();
    for (const dbName of databases) {
      await Dexie.delete(dbName);
    }
    
    model = createModel<TestDoc>('test_collection', {
      name: { type: String, index: true },
      email: { type: String, unique: true, index: true },
      age: { type: Number }
    });
  });

  afterEach(async () => {
    await model.clear();
    
    // Delete databases
    const databases = await Dexie.getDatabaseNames();
    for (const dbName of databases) {
      await Dexie.delete(dbName);
    }
  });

  describe('create', () => {
    it('should create a document', async () => {
      const doc = await model.create({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      });

      expect(doc).toBeDefined();
      expect(doc.id).toBeDefined();
      expect(doc.name).toBe('John Doe');
      expect(doc.email).toBe('john@example.com');
      expect(doc.age).toBe(30);
      expect(doc.createdAt).toBeDefined();
      expect(doc.updatedAt).toBeDefined();
    });

    it('should auto-generate timestamps', async () => {
      const before = Date.now();
      const doc = await model.create({
        name: 'Jane Doe',
        email: 'jane@example.com'
      });
      const after = Date.now();

      expect(doc.createdAt).toBeGreaterThanOrEqual(before);
      expect(doc.createdAt).toBeLessThanOrEqual(after);
      expect(doc.updatedAt).toEqual(doc.createdAt);
    });
  });

  describe('find', () => {
    beforeEach(async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      await model.create({ name: 'Bob', email: 'bob@example.com', age: 30 });
      await model.create({ name: 'Charlie', email: 'charlie@example.com', age: 25 });
    });

    it('should find all documents when no query provided', async () => {
      const docs = await model.find();
      expect(docs).toHaveLength(3);
    });

    it('should filter documents by query', async () => {
      const docs = await model.find({ age: 25 });
      expect(docs).toHaveLength(2);
      expect(docs.every(d => d.age === 25)).toBe(true);
    });

    it('should apply limit option', async () => {
      const docs = await model.find({}, { limit: 2 });
      expect(docs).toHaveLength(2);
    });

    it('should apply skip option', async () => {
      const docs = await model.find({}, { skip: 1 });
      expect(docs).toHaveLength(2);
    });

    it('should apply sort option', async () => {
      const docs = await model.find({}, { sort: { name: -1 } });
      expect(docs[0].name).toBe('Charlie');
    });
  });

  describe('findOne', () => {
    it('should return null when document not found', async () => {
      const doc = await model.findOne({ name: 'NonExistent' });
      expect(doc).toBeNull();
    });

    it('should find one document', async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com' });
      
      const doc = await model.findOne({ name: 'Alice' });
      expect(doc).toBeDefined();
      expect(doc?.name).toBe('Alice');
    });

    it('should return first match when multiple documents match', async () => {
      await model.create({ name: 'Alice', email: 'alice1@example.com', age: 25 });
      await model.create({ name: 'Bob', email: 'bob@example.com', age: 25 });
      
      const doc = await model.findOne({ age: 25 });
      expect(doc).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should return null when document not found', async () => {
      const doc = await model.findById(99999);
      expect(doc).toBeNull();
    });

    it('should find document by ID', async () => {
      const created = await model.create({ name: 'Alice', email: 'alice@example.com' });
      
      const doc = await model.findById(created.id);
      expect(doc).toBeDefined();
      expect(doc?.id).toBe(created.id);
      expect(doc?.name).toBe('Alice');
    });
  });

  describe('updateMany', () => {
    beforeEach(async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      await model.create({ name: 'Bob', email: 'bob@example.com', age: 25 });
      await model.create({ name: 'Charlie', email: 'charlie@example.com', age: 30 });
    });

    it('should update multiple documents', async () => {
      const count = await model.updateMany({ age: 25 }, { age: 26 });
      expect(count).toBe(2);

      const docs = await model.find({ age: 26 });
      expect(docs).toHaveLength(2);
    });

    it('should update updatedAt timestamp', async () => {
      const before = Date.now();
      await model.updateMany({ age: 25 }, { age: 26 });
      const after = Date.now();

      const docs = await model.find({ age: 26 });
      docs.forEach(doc => {
        expect(doc.updatedAt).toBeGreaterThanOrEqual(before);
        expect(doc.updatedAt).toBeLessThanOrEqual(after);
      });
    });
  });

  describe('updateOne', () => {
    it('should return false when document not found', async () => {
      const result = await model.updateOne({ name: 'NonExistent' }, { age: 99 });
      expect(result).toBe(false);
    });

    it('should update one document', async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      
      const result = await model.updateOne({ name: 'Alice' }, { age: 26 });
      expect(result).toBe(true);

      const doc = await model.findOne({ name: 'Alice' });
      expect(doc?.age).toBe(26);
    });
  });

  describe('findByIdAndUpdate', () => {
    it('should return null when document not found', async () => {
      const doc = await model.findByIdAndUpdate(99999, { age: 99 });
      expect(doc).toBeNull();
    });

    it('should update document by ID and return updated doc', async () => {
      const created = await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      
      const updated = await model.findByIdAndUpdate(created.id, { age: 26 });
      expect(updated).toBeDefined();
      expect(updated?.age).toBe(26);
    });
  });

  describe('deleteMany', () => {
    beforeEach(async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      await model.create({ name: 'Bob', email: 'bob@example.com', age: 25 });
      await model.create({ name: 'Charlie', email: 'charlie@example.com', age: 30 });
    });

    it('should delete multiple documents', async () => {
      const count = await model.deleteMany({ age: 25 });
      expect(count).toBe(2);

      const remaining = await model.find();
      expect(remaining).toHaveLength(1);
    });
  });

  describe('deleteOne', () => {
    it('should return false when document not found', async () => {
      const result = await model.deleteOne({ name: 'NonExistent' });
      expect(result).toBe(false);
    });

    it('should delete one document', async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com' });
      
      const result = await model.deleteOne({ name: 'Alice' });
      expect(result).toBe(true);

      const doc = await model.findOne({ name: 'Alice' });
      expect(doc).toBeNull();
    });
  });

  describe('findByIdAndDelete', () => {
    it('should return null when document not found', async () => {
      const doc = await model.findByIdAndDelete(99999);
      expect(doc).toBeNull();
    });

    it('should delete document by ID and return deleted doc', async () => {
      const created = await model.create({ name: 'Alice', email: 'alice@example.com' });
      
      const deleted = await model.findByIdAndDelete(created.id);
      expect(deleted).toBeDefined();
      expect(deleted?.name).toBe('Alice');

      const doc = await model.findById(created.id);
      expect(doc).toBeNull();
    });
  });

  describe('count', () => {
    beforeEach(async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com', age: 25 });
      await model.create({ name: 'Bob', email: 'bob@example.com', age: 25 });
      await model.create({ name: 'Charlie', email: 'charlie@example.com', age: 30 });
    });

    it('should count all documents', async () => {
      const count = await model.count();
      expect(count).toBe(3);
    });

    it('should count filtered documents', async () => {
      const count = await model.count({ age: 25 });
      expect(count).toBe(2);
    });
  });

  describe('clear', () => {
    it('should clear all documents', async () => {
      await model.create({ name: 'Alice', email: 'alice@example.com' });
      await model.create({ name: 'Bob', email: 'bob@example.com' });

      await model.clear();

      const docs = await model.find();
      expect(docs).toHaveLength(0);
    });
  });
});
