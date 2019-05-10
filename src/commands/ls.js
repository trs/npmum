const columnify = require('columnify');
const storage = require('../storage');

const ls = {
  handle,

  _mapUserTokens
};

function _mapUserTokens(users, currentUser) {
  return Object.keys(users).map(name => {
    const user = users[name];
    const registry = user.registry || storage.DEFAULT_REGISTRY;
    const token = user.token;
    const censoredToken = token.length > 8 ? `...${token.substr(token.length - 8)}` : token;

    return {
      name,
      token: censoredToken,
      registry,
      current: name === currentUser ? '\u2713' : ''
    };
  });
}

function handle() {
  const users = storage.getUsers();
  const currentUser = storage.getCurrentUser();

  if (!Object.keys(users).length) {
    console.log('No user tokens added.');
    console.log('Use `npmum add <name>` to add some.');
    return false;
  }

  const nameData = ls._mapUserTokens(users, currentUser);
  const columns = columnify(nameData, {
    config: {
      current: {
        align: 'center'
      }
    }
  });
  console.log(columns);
  return true;
}

module.exports = ls;
