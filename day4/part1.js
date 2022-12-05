const readFile = require('../lib/read-file');

const input = readFile('./input');

const getNums = (x) => {
    const [start, end] = x.split('-');
    return [Number.parseInt(start, 10), Number.parseInt(end, 10)];
};

const isContained = (a,b) => {
    const [aStart, aEnd] = getNums(a);
    const [bStart, bEnd] = getNums(b);
    return (bStart >= aStart && bEnd <= aEnd) || (aStart >= bStart && aEnd <= bEnd);
}


const numContained = input.map((row) => {
    const [a,b] = row.split(',');
    return isContained(a,b)
}).reduce((acc, val) => {
    return val ? ++acc : acc;
}, 0);

console.log(numContained);
