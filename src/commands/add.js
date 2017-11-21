const readline = require('readline');
const {addUser} = require('../storage');

function add(name) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter token: ', token => {
      rl.close();
      resolve(token);
    });
  })
  .then(token => {
    addUser(name, {token});
  });
}

module.exports = {
  add
};
