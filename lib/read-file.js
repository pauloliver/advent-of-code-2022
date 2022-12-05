const fs = require('fs');

const getInput = (fName) => {
    const buf = fs.readFileSync(fName);
    const arr = buf.toString().split('\n');

    return arr;
};

module.exports = getInput;