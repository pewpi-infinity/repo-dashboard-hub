/**
 * Test setup file
 */

import { beforeAll, afterEach, vi } from 'vitest';
import 'fake-indexeddb/auto';

// Mock localStorage with proper implementation
const storage = new Map<string, string>();

const localStorageMock = {
  getItem: (key: string) => storage.get(key) || null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() {
    return storage.size;
  },
  key: (index: number) => Array.from(storage.keys())[index] || null
};

beforeAll(() => {
  global.localStorage = localStorageMock as any;
});

afterEach(() => {
  storage.clear();
});
