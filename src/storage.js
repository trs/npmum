const ConfigStore = require('configstore');
const {name: packageName} = require('../package.json');
const confName = `${packageName}${process.env.NODE_ENV !== 'test' ? '' : '-test'}`;
const conf = new ConfigStore(confName);

const storage = {
  _path: conf.path,

  getUsers,
  getUser,
  setUsers,
  addUser,
  removeUser
};


function setUsers(users) {
  conf.set('users', users);
}

function getUsers() {
  return conf.get('users') || {};
}

function getUser(name) {
  return conf.get(`users.${name}`);
}

function addUser(name, data = {}) {
  const users = storage.getUsers();
  // if (users[name]) return false;

  users[name] = data;
  storage.setUsers(users);
  return true;
}

function removeUser(name) {
  const users = storage.getUsers();
  if (!users[name]) return false;

  delete users[name];
  storage.setUsers(users);
  return true;
}


module.exports = storage;
