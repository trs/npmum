const fs = require('fs');
const nodePath = require('path');
const storage = require('../storage');
const {handleError, UserNotFound, InvalidUserToken} = require('../errors');

const NPMRC = '.npmrc';

const use = {
  handle,

  _readNpmrc,
  _writeNpmrc,
  _resolveNpmrcPath,
  _getNpmrcText
};

function _readNpmrc(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  })
  .then(text => text.toString());
}

function _writeNpmrc(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function _existsNpmrc(path) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists, err) => {
      if (err) reject(err);
      else resolve(exists);
    });
  });
}

function _resolveNpmrcPath(options) {
  let path = `${require('os').homedir()}/${NPMRC}`;
  if (options.local) path = process.cwd();
  if (options.path) path = options.path;

  if (nodePath.basename(path) === NPMRC) return path;

  return nodePath.join(path, nodePath.sep, NPMRC);
}

async function _getNpmrcText(path) {
  const exists = await _existsNpmrc(path);
  if (exists) {
    return await use._readNpmrc(path);
  }
  return null;
}

function _replaceNpmrcText(text, {token, registry} = {}) {
  registry = registry || storage.DEFAULT_REGISTRY;

  const regexp = /\/\/(.+)\/:_authToken=(.*)/i;
  if (!text || !regexp.test(text)) {
    const setNewText = `//${registry}/:_authToken=${token}`;
    return setNewText;
  }

  const updateText = text.replace(regexp, `//${registry}/:_authToken=${token}`);
  return updateText;
}

async function handle(name, options = {}) {
  try {
    const user = storage.getUser(name);
    const npmrcPath = _resolveNpmrcPath(options);

    if (!user) throw new UserNotFound(user);
    if (!user.token) throw new InvalidUserToken();

    const currentText = await _getNpmrcText(npmrcPath);
    const newText = _replaceNpmrcText(currentText, user);

    await use._writeNpmrc(npmrcPath, newText);
    storage.setCurrentUser(name);

    console.log(`Using npm user token: "${name}"`);
    return true;
  } catch (err) {
    return handleError(err);
  }
}

module.exports = use;
