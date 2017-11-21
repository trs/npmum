const {getUser, removeUser} = require('../storage');

function rm(name) {
  const user = getUser(name);
  if (!user) {
    console.log('User does not exist.');
    return;
  }

  return removeUser(name);
}

module.exports = {
  rm
};
