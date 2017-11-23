const storage = require('../storage');

const rm = {
  handle
};

function handle(name) {
  const success = storage.removeUser(name);
  if (!success) console.log('User does not exist.');
  return success;
}

module.exports = rm;
