const {expect} = require('chai');
const sinon = require('sinon');

const use = require('../../src/commands/use');
const storage = require('../../src/storage');

describe('use', function () {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('fails if user does not exist', () => {
    sandbox.stub(storage, 'getUser').returns();

    return use.handle('test')
    .then(success => {
      expect(success).to.equal(false);
    });
  });

  it('fails if user does not have a token', () => {
    sandbox.stub(storage, 'getUser').returns({});

    return use.handle('test')
    .then(success => {
      expect(success).to.equal(false);
    });
  });

  it('updates .npmrc', () => {
    sandbox.stub(storage, 'getUser').returns({token: 'new-cool-token'});

    sandbox.stub(use, '_readNpmrc').resolves('//registry.npmjs.org/:_authToken=super-awesome-fake-token');
    sandbox.stub(use, '_writeNpmrc').resolves();

    return use.handle('test')
    .then(success => {
      expect(success).to.equal(true);
      expect(use._writeNpmrc.firstCall.args[1]).to.equal('//registry.npmjs.org/:_authToken=new-cool-token');
    });
  });
});
