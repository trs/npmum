const {prompt} = require('../prompt');
const storage = require('../storage');
const errors = require('../errors');

const add = {
  handle
};

function handle(name, options = {}) {
  return Promise.resolve(options.token)
  .then(token => {
    const user = storage.getUser(name);
    if (user) throw new Error('User already exists.');
    if (token) return token;
    return prompt('Token:');
  })
  .then(token => storage.addUser(name, {token: token.trim()}))
  .catch(errors.handle);
}

module.exports = add;
