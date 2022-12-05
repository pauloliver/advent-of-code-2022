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

moves.forEach(({count, from, to}) => {
    const idx = stacks[from].length - count;
    const newFromLength = stacks[from].length - count;
    const moved = stacks[from].slice(idx);
    const newFrom = stacks[from].slice(0, newFromLength);
    const newTo = [...stacks[to], ...moved];

    stacks[from] = newFrom;
    stacks[to] = newTo;
});

stacks.forEach((stack) => {
    console.log(stack.pop());
});
