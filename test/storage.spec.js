const {expect} = require('chai');

const storage = require('../src/storage');

describe('storage', function () {
  after(done => {
    require('fs').unlink(storage._path, done);
  });

  describe('addUser', function () {
    it('adds new user', () => {
      const success = storage.addUser('test', {data: 1});
      expect(success).to.equal(true);
    });

    it('overrides existing user', () => {
      const success = storage.addUser('test', {data: 2});
      expect(success).to.equal(true);
    });
  });

  describe('getUser', function () {
    it('returns existing user', () => {
      const user = storage.getUser('test');
      expect(user).to.eql({data: 2});
    });

    it('returns undefined if user does not exist', () => {
      const user = storage.getUser('bad');
      expect(user).to.equal(undefined);
    });
  });

  describe('removeUser', function () {
    it('removes an existing user', () => {
      const success = storage.removeUser('test');
      expect(success).to.equal(true);
    });

    it('checks for non existant user', () => {
      const success = storage.removeUser('bad');
      expect(success).to.equal(false);
    });
  });
});
