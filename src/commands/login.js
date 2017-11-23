const {spawn} = require('child_process');
// const {addUser} = require('../storage');

const login = {
  handle
};

function handle() {
  const cmd = spawn('npm', ['login']);

  process.stdin.pipe(cmd.stdin);

  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);

  cmd.on('close', code => {
    console.log('closed', code);
  });
}

module.exports = login;
