const {getUser} = require('../storage');

function use(username) {
  const user = getUser(username);
  if (!user) {
    process.stderr.write('None\n');
  }

}

module.exports = {
  use
};
