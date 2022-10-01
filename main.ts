const readline = require('readline');

import { game } from "./src/tictactoe";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Please input a cell number: '
});

game.renderInitialBoard();
setTimeout(() => {
    game.computerMove()
}, 1000);
setTimeout(() => {
    rl.prompt();
}, 2000);

rl.on('line', (line: string) => {
    if (line.toLowerCase() === "exit") {
        process.exit(0);
    }

    game.command(line.trim());

    setTimeout(() => {
        rl.prompt();
    }, 2000)


}).on('close', () => {
    console.log('Bye!');
    process.exit(0);
});