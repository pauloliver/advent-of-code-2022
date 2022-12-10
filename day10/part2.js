const readFile = require('../lib/read-file');
const { splitEvery } = require('ramda');

const input = readFile('./input');

let register = 1;

const NOOP = 'noop';

const calls = [];

for (const row of input) {
    let [instruction, num] = row.split(' ');
    if (instruction === NOOP) {
        calls.push(NOOP);
    } else {
        num = Number(num);
        calls.push(NOOP);
        calls.push(num);
    }
}

const pixelRows = [];
let currentRow;

const callRows = splitEvery(40, calls);

const isOverlap = (sprite, pixel) => {
    return ((pixel >= (sprite - 1)) && (pixel <= sprite + 1));
};

callRows.forEach((callRow) => {
    currentRow = [];

    for (let i = 0; i < callRow.length; i++) {
        const call = callRow[i]
        if (isOverlap(register, i)) {
            currentRow.push('#')
        } else {
            currentRow.push('.');
        }
        if (call !== NOOP) {
            register = register + call;
        }
    }
    pixelRows.push(currentRow);
});

pixelRows.forEach((r) => {
    console.log(r.join(''));
})
