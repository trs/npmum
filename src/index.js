const program = require('commander');
const updateNotifier = require('update-notifier');

const {name, version} = require('../package.json');

const ls = require('./commands/ls');
const rm = require('./commands/rm');
const use = require('./commands/use');
const add = require('./commands/add');

updateNotifier({pkg: {name, version}, updateCheckInterval: 1000 * 60 * 60 * 6})
  .notify({isGlobal: true});

function setup(argv) {
  program.version(version);

  program.command('add <name>')
    .description('Add a user alias to an npm token')
    .option('-t, --token <token>', 'Set token via command')
    .action(add.handle);

  program.command('ls')
    .description('List user tokens and the current user')
    .action(ls.handle);

  program.command('rm')
    .description('Remove user token by name')
    .action(rm.handle);

  program.command('use <name>')
    .description('Use user token by name')
    .option('-p, --path <path>', 'Specify path to a directory to write the .npmrc')
    .option('--local', 'Write to .npmrc in the current directory')
    .action(use.handle);

  program.on('--help', () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ npmum add my_user_name');
    console.log('    $ npmum add my_user_name --token 12345');
    console.log('');
    console.log('    $ npmum ls');
    console.log('');
    console.log('    $ npmum use my_user_name');
    console.log('    $ npmum use my_user_name -p ~/my/cool/project/');
    console.log('    $ npmum use my_user_name --local');
    console.log('');
    console.log('    $ npmum rm my_user_name');
    console.log('');
  });

  program.parse(argv);

  if (!process.argv.slice(2).length) program.outputHelp();
}

module.exports = setup;
