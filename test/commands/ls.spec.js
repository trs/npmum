const sinon = require('sinon');

const ls = require('../../src/commands/ls');
const storage = require('../../src/storage');

describe('ls', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(storage, 'getCurrentUser').returns(null);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('_mapUserTokens', () => {
    test('truncates user tokens', () => {
      const users = {
        test: {token: '123'},
        other: {token: '1234567890', registry: 'registry.test.url'}
      };
      const mappedUsers = ls._mapUserTokens(users);
      expect(mappedUsers).toEqual([{
        name: 'test',
        token: '123',
        registry: storage.DEFAULT_REGISTRY,
        current: ''
      }, {
        name: 'other',
        token: '...34567890',
        registry: 'registry.test.url',
        current: ''
      }]);
    });
  });

  test('does not loop through empty array', () => {
    sandbox.stub(storage, 'getUsers').returns({});

    const success = ls.handle();
    expect(success).toBe(false);
  });

  test('writes column list of tokens', () => {
    sandbox.stub(storage, 'getUsers').returns({
      test: {token: '123'},
      other: {token: '1234567890'}
    });

    const success = ls.handle();
    expect(success).toBe(true);
  });
});
