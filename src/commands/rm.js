const storage = require('../storage');
const errors = require('../errors');

const rm = {
  handle
};

function handle(name) {
  if (!storage.removeUser(name)) {
    throw new errors.UserNotFound(name);
  }

  console.log(`User removed: ${name}`);
  return true;
}

module.exports = rm;
