const program = require('commander');

const {version} = require('../package.json');

const {ls} = require('./commands/ls');
const {use} = require('./commands/use');
const {login} = require('./commands/login');

function setup(argv) {
  program.version(version);

  program.command('login <username>')
    .description('Add user')
    .action(login);

  program.command('ls')
    .description('List users')
    .action(ls);

  program.command('use <username>')
    .description('Use user')
    .action(use);

  program.parse(argv);
}

module.exports = setup;
