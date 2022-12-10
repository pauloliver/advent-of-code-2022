const readFile = require('../lib/read-file');

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

let totalSignalStrength = 0;

const check = new Set();
for (i = 0; i < 6; i++) {
    check.add(20 + ((i) * 40));
}

for (let i = 0; i < calls.length; i++) {
    const call = calls[i];
    if (check.has(i+1)) {
        totalSignalStrength = totalSignalStrength + ((i + 1) * register);
    }
    if (call !== NOOP) {
        register = register + call;
    }
}
console.log(totalSignalStrength);
