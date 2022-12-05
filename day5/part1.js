const readFile = require('../lib/read-file');

const stacks = require('./input1');
const input = readFile('./input2');

const regex = /move (\d+) from (\d+) to (\d+)/;

const moves = input.map((row) => {
    const matches = regex.exec(row);
    return {
        count: Number(matches[1]),
        from: Number(matches[2]) - 1,
        to: Number(matches[3]) - 1
    }
});

moves.forEach((move) => {
    for (let i = 0; i < move.count; i++) {
        stacks[move.to].push(stacks[move.from].pop())
    }
});

stacks.forEach((stack) => {
    console.log(stack.pop());
});
