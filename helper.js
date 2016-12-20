const spawn = require('child_process').spawn;
const path = require('path');
const args = process.argv.slice(2);
const yargs = require('yargs');
const argv = yargs.argv;

console.log(argv);