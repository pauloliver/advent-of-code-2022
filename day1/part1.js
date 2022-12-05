const fs = require('fs');
const { splitWhenever, equals, sum} = require('ramda');
const getInput = () => {
  const buf = fs.readFileSync('./input');
  const arr = buf.toString().split('\n');

  return arr;
};

const input = getInput();
const splitInput = splitWhenever(equals(''), input);

let currentMax = 0;
let maxIdx;
splitInput.forEach((elf, idx) => {
    const total = sum(elf);
    if (total > currentMax) {
        maxIdx = idx;
        currentMax = total;
    }
});

console.log(maxIdx);
console.log(currentMax);
