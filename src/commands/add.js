const {prompt} = require('../prompt');
const storage = require('../storage');
const {handleError, UserAlreadyExists} = require('../errors');

const add = {
  handle
};

async function handle(name, options = {}) {
  try {
    const user = storage.getUser(name);
    if (user) throw new UserAlreadyExists(name);

    if (!options.token) {
      options.token = await prompt('Token:');
    }
    if (!options.registry) {
      options.registry = storage.DEFAULT_REGISTRY;
    }

    storage.addUser(name, {token: options.token.trim(), registry: options.registry});
    console.log(`User added: ${name}`);

    return true;
  } catch (err) {
    return handleError(err);
  }
}

module.exports = add;
