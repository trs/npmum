const readline = require('readline');
const {Writable} = require('stream');

function prompt(text, {muted = false} = {}) {
  const mutableStream = new Writable({
    write: function (chunk, encoding, callback) {
      if (!this.muted) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    }
  });

  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: mutableStream,
      terminal: true
    });
    rl.question(`${text} `, value => {
      if (mutableStream.muted) {
        process.stdout.write('\n');
      }
      rl.close();
      resolve(value);
    });
    mutableStream.muted = muted;
  });
}

module.exports = {
  prompt
};
