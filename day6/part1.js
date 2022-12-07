const readFile = require('../lib/read-file');

const input = readFile('./input')[4].split('');

const isAllDifferent = (arr) => {
    const set = new Set(arr);
    return set.size === arr.length;
};

const getStart = (data) => {
    const check = data.slice(0,4);

    for (let i = 4; i < data.length; i++) {
        if (isAllDifferent(check)) {
            console.log({check: check.join(), i});
            return i;
        }

        console.log(`old: ${check.join()}`)
        check.shift();
        check.push(data[i]);
        console.log(`new: ${check.join()}`)
        console.log('\n');
    }
};

console.log(getStart(input));
