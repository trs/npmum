const {expect} = require('chai');
const sinon = require('sinon');

const rm = require('../../src/commands/rm');
const storage = require('../../src/storage');

describe('rm', function () {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('removes existing user', () => {
    sandbox.stub(storage, 'getUsers').returns({
      test: {}
    });
    sandbox.stub(storage, 'setUsers').returns();

    const success = rm.handle('test');
    expect(success).to.equal(true);
  });

  it('does not remove non-existant user', () => {
    sandbox.stub(storage, 'getUsers').returns({});
    sandbox.spy(storage, 'setUsers');

    const success = rm.handle('test');
    expect(success).to.equal(false);
    expect(storage.setUsers.called).to.equal(false);
  });
});
