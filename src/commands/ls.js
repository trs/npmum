const {getUsers} = require('../storage');

function ls() {
  const users = getUsers();
  const usernames = Object.keys(users);

  if (!usernames.length) {
    process.stdout.write('Empty :)\n');
    return;
  }

  process.stdout.write('List:\n');
  usernames.forEach(username => {
    process.stdout.write(`${username}\n`);
  });
}

module.exports = {
  ls
};
