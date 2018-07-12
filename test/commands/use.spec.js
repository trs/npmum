const sinon = require('sinon');

const use = require('../../src/commands/use');
const storage = require('../../src/storage');

describe('use', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  test('fails if user does not exist', () => {
    sandbox.stub(storage, 'getUser').returns();

    return use.handle('test')
    .then(success => {
      expect(success).toBe(false);
    });
  });

  test('fails if user does not have a token', () => {
    sandbox.stub(storage, 'getUser').returns({});

    return use.handle('test')
    .then(success => {
      expect(success).toBe(false);
    });
  });

  test('updates .npmrc', () => {
    sandbox.stub(storage, 'getUser').returns({token: 'new-cool-token'});

    sandbox.stub(use, '_readNpmrc').resolves('//registry.npmjs.org/:_authToken=super-awesome-fake-token');
    sandbox.stub(use, '_writeNpmrc').resolves();

    return use.handle('test')
    .then(success => {
      expect(success).toBe(true);
      expect(use._writeNpmrc.firstCall.args[1]).toBe('//registry.npmjs.org/:_authToken=new-cool-token');
    });
  });

  describe('._resolveNpmrcPath', () => {
    test('path with .npmrc', () => {
      const path = use._resolveNpmrcPath({path: '/test/.npmrc'});
      expect(path).toBe('/test/.npmrc');
    });

    test('path without .npmrc', () => {
      const path = use._resolveNpmrcPath({path: '/test'});
      expect(path).toBe('/test/.npmrc');
    });

    test('path without .npmrc', () => {
      const path = use._resolveNpmrcPath({path: '/test/'});
      expect(path).toBe('/test/.npmrc');
    });

    test('path without .npmrc', () => {
      const path = use._resolveNpmrcPath({local: true});
      const cwd = process.cwd();
      expect(path).toBe(`${cwd}/.npmrc`);
    });
  });
});
