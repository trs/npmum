const program = require('commander');

const {version} = require('../package.json');

const {ls} = require('./commands/ls');
const {use} = require('./commands/use');
const {add} = require('./commands/add');

function setup(argv) {
  program.version(version);

  program.command('add <name>')
    .description('Add token with alias')
    .action(add);

  program.command('ls')
    .description('List token aliases')
    .action(ls);

  program.command('use <alias>')
    .description('Use token by alias')
    .action(use);

  program.parse(argv);
}

module.exports = setup;
