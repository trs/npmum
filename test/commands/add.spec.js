const sinon = require('sinon');
const mockStdin = require('mock-stdin');

const add = require('../../src/commands/add');
const storage = require('../../src/storage');

describe('add', () => {
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

  test('prompts for a token', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    setTimeout(() => {
      stdin.send('123\n').end();
    }, 100);

    return add.handle('test')
    .then(success => {
      expect(success).toBe(true);
      expect(storage.addUser.firstCall.args[0]).toBe('test');
      expect(storage.addUser.firstCall.args[1]).toEqual({token: '123', registry: storage.DEFAULT_REGISTRY});
    });
  });

  test('allows token param', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    return add.handle('test', {token: '123'})
    .then(success => {
      expect(success).toBe(true);
      expect(storage.addUser.firstCall.args[0]).toBe('test');
      expect(storage.addUser.firstCall.args[1]).toEqual({token: '123', registry: storage.DEFAULT_REGISTRY});
    });
  });

  test('trims token', () => {
    sandbox.stub(storage, 'getUser').returns(undefined);
    sandbox.stub(storage, 'addUser').returns(true);

    return add.handle('test', {token: ' 123  '})
    .then(success => {
      expect(success).toBe(true);
      expect(storage.addUser.firstCall.args[0]).toBe('test');
      expect(storage.addUser.firstCall.args[1]).toEqual({token: '123', registry: storage.DEFAULT_REGISTRY});
    });
  });

  test('fails if user exists', () => {
    sandbox.stub(storage, 'getUser').returns({});
    sandbox.spy(storage, 'addUser');

    return add.handle('test')
    .then(success => {
      expect(success).toBe(false);
      expect(storage.addUser.called).toBe(false);
    });
  });
});
