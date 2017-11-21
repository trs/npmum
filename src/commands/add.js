const {prompt} = require('../prompt');
const {getUser, addUser} = require('../storage');

function add(name, options) {
  const user = getUser(name);
  if (user) {
    console.log('User already exists.');
    return;
  }

  return Promise.resolve(options.token)
  .then(token => {
    if (token) return token;
    return prompt('Token:');
  })
  .then(token => addUser(name, {token}));
}

module.exports = {
  add
};
