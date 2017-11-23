const {expect} = require('chai');
const sinon = require('sinon');
const mockStdin = require('mock-stdin');

const add = require('../../src/commands/add');
const storage = require('../../src/storage');

describe('add', function () {
  let sandbox;
  let stdin;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    stdin = mockStdin.stdin();
  });
  afterEach(() => {
    stdin.restore();
    sandbox.restore();
  });

  it('prompts for a token', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    setTimeout(() => {
      stdin.send('123\n').end();
    }, 100);

    return add.handle('test')
    .then(success => {
      expect(success).to.equal(true);
      expect(storage.addUser.firstCall.args[0]).to.equal('test');
      expect(storage.addUser.firstCall.args[1]).to.eql({token: '123'});
    });
  });

  it('allows token param', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    return add.handle('test', {token: '123'})
    .then(success => {
      expect(success).to.equal(true);
      expect(storage.addUser.firstCall.args[0]).to.equal('test');
      expect(storage.addUser.firstCall.args[1]).to.eql({token: '123'});
    });
  });

  it('trims token', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    return add.handle('test', {token: ' 123  '})
    .then(success => {
      expect(success).to.equal(true);
      expect(storage.addUser.firstCall.args[0]).to.equal('test');
      expect(storage.addUser.firstCall.args[1]).to.eql({token: '123'});
    });
  });

  it('fails if user exists', () => {
    sandbox.stub(storage, 'getUser').returns({});
    sandbox.spy(storage, 'addUser');

    return add.handle('test')
    .then(success => {
      expect(success).to.equal(false);
      expect(storage.addUser.called).to.equal(false);
    });
  });
});
