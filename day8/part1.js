const readFile = require('../lib/read-file');

const file = readFile('./input');

const grid = file.map((row) => {
    return row.split('').map(Number)
});

let numVisible = 0;


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

const isVisibleUp = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkY = y - 1; checkY >= 0; checkY--) {
        const newHeight = grid[checkY][x];
        if (height <= newHeight) {
            return false;
        }
    }

    return true;
};

const isVisibleDown = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkY = y + 1; checkY < grid.length; checkY++) {
        const newHeight = grid[checkY][x];
        if (height <= newHeight) {
            return false;
        }
    }

    return true;
};

const isVisibleLeft = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkX = x - 1; checkX >= 0; checkX--) {
        const newHeight = grid[y][checkX];

        if (height <= newHeight) {
            return false;
        }
    }

    return true;
};

const isVisibleRight = (x, y, grid) => {
    const height = grid[y][x];

    if (isEdge(x, y)) {
        return true;
    }

    for (let checkX = x + 1; checkX < grid[0].length; checkX++) {
        const newHeight = grid[y][checkX];

        if (height <= newHeight) {
            return false;
        }
    }

    return true;
};

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {

        if (isVisibleLeft(x, y, grid) || isVisibleRight(x, y, grid) || isVisibleUp(x, y, grid) || isVisibleDown(x, y, grid)) {
            numVisible++;
        }
    }
}

console.log(numVisible);
