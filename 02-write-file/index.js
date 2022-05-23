const process = require('node:process');

const readline = require('readline');



// process.stdin.resume();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Input something:');

rl.on('SIGINT', () => {
  console.log('You\'ve ended input');
  rl.close();
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('You\'ve ended input');
    rl.close();
  }
  
});

