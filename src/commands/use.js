const {getUser} = require('../storage');
const fs = require('fs');

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

function use(name) {
  const user = getUser(name);
  if (!user) {
    console.log('User does not exist.');
    return;
  }

  const npmrcPath = `${require('os').homedir()}/.npmrc`;

  return _readNpmrc(npmrcPath)
  .then(text => {
    const regexp = /(_authToken=)(.*)/i;
    const updatedText = text.replace(regexp, `$1${user.token}`);
    return _writeNpmrc(npmrcPath, updatedText);
  });
}

module.exports = {
  use,
  _readNpmrc,
  _writeNpmrc
};
