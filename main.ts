const readline = require('readline');

import { game } from "./src/tictactoe";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Please input a cell number: '
});

game.render();

rl.prompt();

rl.on('line', (line: string) => {
    if (line.toLowerCase() === "exit") {
        process.exit(0);
    }

    // game.renderBoard();

    game.command(line.trim());

    // TODO: Find a better way to wait

    setTimeout(() => {
        rl.prompt();
    }, 2000)


}).on('close', () => {
    console.log('Bye!');
    process.exit(0);
});