const columnify = require('columnify');
const {getUsers} = require('../storage');

function ls() {
  const users = getUsers();
  const names = Object.keys(users);

  if (!names.length) {
    console.log('No users added yet!');
    return;
  }

  const nameData = names.map(name => {
    const user = users[name];
    const token = user.token;
    const tokenLastEight = token.substr(token.length - 8);
    const censoredToken = `...${tokenLastEight}`;

    return {
      name,
      token: censoredToken
    };
  });
  const nameColumnData = columnify(nameData);
  console.log(nameColumnData);
}

module.exports = {
  ls
};
