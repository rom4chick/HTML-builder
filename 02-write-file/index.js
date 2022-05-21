const process = require('node:process');

const readline = require('readline');

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

function handle(signal) {
  console.log(`Received ${signal}`);
}

process.on('SIGINT', handle);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter you name:');

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('You\'ve ended input');
    rl.close();
  }
});

