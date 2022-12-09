const readFile = require('../lib/read-file');

const file = readFile('./input');

const grid = file.map((row) => {
    return row.split('').map(Number)
});

const isEdge = (x, y) => {
    if (
        x === 0 ||
        y === 0 ||
        x === grid[0].length - 1 ||
        y === grid.length - 1 
    ) {
        return true;
    }

    return false;
};

const getScoreUp = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return 0;
    }

    for (let checkY = y - 1; checkY >= 0; checkY--) {
        const newHeight = grid[checkY][x];
        if (height <= newHeight) {
            return y - checkY;
        }
    }

    return y;
};

const getScoreDown = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkY = y + 1; checkY < grid.length; checkY++) {
        const newHeight = grid[checkY][x];
        if (height <= newHeight) {
            return checkY - y;
        }
    }

    return grid.length - 1 - y;
};

const getScoreLeft = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkX = x - 1; checkX >= 0; checkX--) {
        const newHeight = grid[y][checkX];

        if (height <= newHeight) {
            return x - checkX;
        }
    }

    return x;
};

const getScoreRight = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkX = x + 1; checkX < grid[0].length; checkX++) {
        const newHeight = grid[y][checkX];

        if (height <= newHeight) {
            return checkX - x;
        }
    }

    return grid[0].length - 1 - x;
};

let max = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
        const score = getScoreLeft(x, y, grid) * getScoreRight(x, y, grid) * getScoreUp(x, y, grid) * getScoreDown(x, y, grid)
        if (score > max) {
            max = score;
        }
    }
}

console.log(max);
