const columnify = require('columnify');
const storage = require('../storage');

const ls = {
  handle,

  _mapUserTokens
};

function _mapUserTokens(users) {
  return Object.keys(users).map(name => {
    const user = users[name];
    const token = user.token;
    const censoredToken = token.length > 8 ? `...${token.substr(token.length - 8)}` : token;

    return {
      name,
      token: censoredToken
    };
  });
}

function handle() {
  const users = storage.getUsers();

  if (!Object.keys(users).length) {
    console.log('No users added yet!');
    return false;
  }

  const nameData = ls._mapUserTokens(users);
  const columns = columnify(nameData);
  console.log(columns);
  return true;
}

module.exports = ls;
