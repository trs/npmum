const ConfigStore = require('configstore');
const {name: packageName} = require('../package.json');
const conf = new ConfigStore(packageName);

function setUsers(users) {
  return conf.set('users', users);
}

function getUsers() {
  return conf.get('users') || {};
}

function getUser(name) {
  return conf.get(`users.${name}`);
}

function addUser(name, data = {}) {
  const users = getUsers();
  if (users[name]) return false;

  users[name] = data;
  setUsers(users);
}

function removeUser(name) {
  const users = getUsers();
  if (!users[name]) return false;

  delete users[name];
  return setUsers(users);
}

module.exports = {
  getUsers,
  getUser,
  setUsers,
  addUser,
  removeUser
};
