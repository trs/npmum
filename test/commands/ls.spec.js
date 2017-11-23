const {expect} = require('chai');
const sinon = require('sinon');

const ls = require('../../src/commands/ls');
const storage = require('../../src/storage');

describe('ls', function () {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    sandbox.stub(storage, 'getCurrentUser').returns(null);
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('_mapUserTokens', function () {
    it('truncates user tokens', () => {
      const users = {
        test: {token: '123'},
        other: {token: '1234567890'}
      };
      const mappedUsers = ls._mapUserTokens(users);
      expect(mappedUsers).to.eql([{
        name: 'test',
        token: '123',
        current: ''
      }, {
        name: 'other',
        token: '...34567890',
        current: ''
      }]);
    });
  });

  it('does not loop through empty array', () => {
    sandbox.stub(storage, 'getUsers').returns({});

    const success = ls.handle();
    expect(success).to.equal(false);
  });

  it('writes column list of tokens', () => {
    sandbox.stub(storage, 'getUsers').returns({
      test: {token: '123'},
      other: {token: '1234567890'}
    });

    const success = ls.handle();
    expect(success).to.equal(true);
  });
});
