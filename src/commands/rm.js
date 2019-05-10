const storage = require('../storage');
const {UserNotFound} = require('../errors');

const rm = {
  handle
};

function handle(name) {
  if (!storage.removeUser(name)) {
    throw new UserNotFound(name);
  }

  console.log(`User removed: ${name}`);
  return true;
}

module.exports = rm;
