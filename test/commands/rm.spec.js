const sinon = require('sinon');

const rm = require('../../src/commands/rm');
const storage = require('../../src/storage');

describe('rm', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  test('removes existing user', () => {
    sandbox.stub(storage, 'getUsers').returns({
      test: {}
    });
    sandbox.stub(storage, 'setUsers').returns();

    const success = rm.handle('test');
    expect(success).toBe(true);
  });

  test('does not remove non-existant user', () => {
    sandbox.stub(storage, 'getUsers').returns({});
    sandbox.spy(storage, 'setUsers');

    const success = rm.handle('test');
    expect(success).toBe(false);
    expect(storage.setUsers.called).toBe(false);
  });
});
