const fs = require('fs');
const { splitWhenever, equals, sum} = require('ramda');
const getInput = () => {
  const buf = fs.readFileSync('./input');
  const arr = buf.toString().split('\n');

  return arr;
};

const input = getInput();
const splitInput = splitWhenever(equals(''), input);

let totals = splitInput.map((elf) => {
    return sum(elf);
});

totals = totals.sort((a, b) => b - a);

const TAKE_TOP = 3;

const topTotal = sum(totals.slice(0, TAKE_TOP));
console.log(topTotal);
