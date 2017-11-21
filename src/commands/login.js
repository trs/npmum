const {spawn} = require('child_process');
// const {addUser} = require('../storage');

function login() {
  const cmd = spawn('npm', ['login']);

  process.stdin.pipe(cmd.stdin);

  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);

  cmd.on('close', code => {
    console.log('closed', code);
  });
}

module.exports = {
  login
};
