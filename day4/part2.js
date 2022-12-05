const readFile = require('../lib/read-file');

const input = readFile('./input');

const getNums = (x) => {
    const [start, end] = x.split('-');
    return [Number.parseInt(start, 10), Number.parseInt(end, 10)];
};

const isBetween = (num, start, end) => {
    return num >=start && num <= end;
};

const hasOverlap = (a,b) => {
    const [aStart, aEnd] = getNums(a);
    const [bStart, bEnd] = getNums(b);
    return (
        isBetween(aStart, bStart, bEnd) ||
        isBetween(aEnd, bStart, bEnd) ||
        isBetween(bStart, aStart, aEnd) ||
        isBetween(bEnd, aStart, aEnd)
    );
}


const numContained = input.map((row) => {
    const [a,b] = row.split(',');
    return hasOverlap(a,b)
}).reduce((acc, val) => {
    return val ? ++acc : acc;
}, 0);

console.log(numContained);
