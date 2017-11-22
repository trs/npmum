const program = require('commander');

const {version} = require('../package.json');

const {ls} = require('./commands/ls');
const {rm} = require('./commands/rm');
const {use} = require('./commands/use');
const {add} = require('./commands/add');
// const {login} = require('./commands/login');

function setup(argv) {
  program.version(version);

  // program.command('login')
  //   .description('Add user via npm login')
  //   .action(login);

  program.command('add <name>')
    .description('Add token with name')
    .option('-t, --token <token>', 'Set token via command')
    .action(add);

  program.command('ls')
    .description('List token names')
    .action(ls);

  program.command('rm')
    .description('Remove token by name')
    .action(rm);

  program.command('use <name>')
    .description('Use token by name')
    .action(use);

  program.parse(argv);
}

module.exports = setup;
