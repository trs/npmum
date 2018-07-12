const fs = require('fs');
const nodePath = require('path');
const storage = require('../storage');
const errors = require('../errors');

const NPMRC = '.npmrc';

const use = {
  handle,

  _readNpmrc,
  _writeNpmrc
};

function _readNpmrc(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  })
  .then(text => text.toString());
}

function _writeNpmrc(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function _resolveNpmrcPath(options) {
  let path = `${require('os').homedir()}/${NPMRC}`;
  if (options.local) path = process.cwd();
  if (options.path) path = options.path;

  if (nodePath.basename(path) === NPMRC) return path;

  return nodePath.join(path, nodePath.delimiter, NPMRC);
}

function handle(name, options = {}) {
  const user = storage.getUser(name);
  const npmrcPath = _resolveNpmrcPath(options);

  return Promise.resolve()
  .then(() => {
    if (!user) throw new errors.UserNotFound();
    if (!user.token) throw new errors.InvalidUserToken();

    if (!fs.existsSync(npmrcPath)) return '';
    return use._readNpmrc(npmrcPath);
  })
  .then(text => {
    const regexp = /(_authToken=)(.*)/i;
    if (regexp.test(text)) {
      const updateText = text.replace(regexp, `$1${user.token}`);
      return updateText;
    }

    const setNewText = `//registry.npmjs.org/:_authToken=${user.token}`;
    return setNewText;
  })
  .then(text => use._writeNpmrc(npmrcPath, text))
  .then(() => {
    storage.setCurrentUser(name);
    console.log(`Set npm login user: "${name}".`);
    return true;
  })
  .catch(errors.handle);
}

module.exports = use;
