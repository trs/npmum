const fs = require('fs');
const storage = require('../storage');
const errors = require('../errors');

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

function handle(name) {
  const user = storage.getUser(name);
  const npmrcPath = `${require('os').homedir()}/.npmrc`;

  return Promise.resolve()
  .then(() => {
    if (!user) throw new errors.UserNotFound();
    if (!user.token) throw new errors.InvalidUserToken();

    return use._readNpmrc(npmrcPath);
  })
  .then(text => {
    const regexp = /(_authToken=)(.*)/i;
    const updatedText = text.replace(regexp, `$1${user.token}`);
    return use._writeNpmrc(npmrcPath, updatedText);
  })
  .then(() => {
    console.log(`Now using ${name}.`);
    return true;
  })
  .catch(errors.handle);
}

module.exports = use;
