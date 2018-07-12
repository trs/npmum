const storage = require('../src/storage');

describe('storage', () => {
  afterAll(done => {
    require('fs').unlink(storage._path, done);
  });

  describe('addUser', () => {
    test('adds new user', () => {
      const success = storage.addUser('test', {data: 1});
      expect(success).toBe(true);
    });

    test('overrides existing user', () => {
      const success = storage.addUser('test', {data: 2});
      expect(success).toBe(true);
    });
  });

  describe('getUser', () => {
    test('returns existing user', () => {
      const user = storage.getUser('test');
      expect(user).toEqual({data: 2});
    });

    test('returns undefined if user does not exist', () => {
      const user = storage.getUser('bad');
      expect(user).toBe(undefined);
    });
  });

  describe('removeUser', () => {
    test('removes an existing user', () => {
      const success = storage.removeUser('test');
      expect(success).toBe(true);
    });

    test('checks for non existant user', () => {
      const success = storage.removeUser('bad');
      expect(success).toBe(false);
    });
  });
});
