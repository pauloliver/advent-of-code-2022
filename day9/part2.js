const readFile = require('../lib/read-file');

const file = readFile('./input');

const input = file.map((row) => {
    const split = row.split(' ');
    return {
        direction: split[0],
        num: Number(split[1])
    };
});

const L = 'L';
const R = 'R';
const D = 'D';
const U = 'U';

const NUM_KNOTS = 10;
const rope = [];

for (let i = 0; i < NUM_KNOTS; i++) {
    rope.push({
        x: 0,
        y: 0
    });
}


/**
 *  RULES:
 * 
 *  If the head is ever two steps directly up, down, left, or right from the tail, 
 *  the tail must also move one step in that direction so it remains close enough:
 * 
 *  Otherwise, if the head and tail aren't touching and aren't in the same row or \
 *  column, the tail always moves one step diagonally to keep up:
 * 
 */


const doTailMovement = () => {
    for (let i = 0; i < NUM_KNOTS - 1; i++) {
        const head = rope[i];
        const tail = rope[i+1]

        const distX = head.x - tail.x;
        const distY = head.y - tail.y;

        if (head.x === tail.x && head.y === tail.y) {
            // same location
            return;
        } else if (head.x === tail.x) {
            // tail is above or below

            if (Math.abs(distY) <=1) {
                return;
            } else {
                tail.y = tail.y + (distY > 0 ? 1 : -1);
            }
        } else if (head.y === tail.y) {
            // tail is left or right

            if (Math.abs(distX) <=1) {
                return;
            } else {
                tail.x = tail.x + (distX > 0 ? 1 : -1);
            }
        } else {
            // tail is diagonal
            if (Math.abs(distX) === 1 && Math.abs(distY) === 1) {
                // head and tail are touching
                return;
            } else if ((Math.abs(distX) > 1) || (Math.abs(distY) > 1)) {
                tail.x = tail.x + (distX > 0 ? 1 : -1);
                tail.y = tail.y + (distY > 0 ? 1 : -1);
            } else {
                throw new Error(':(');
            }

        }
    }
};

const tailVisited = new Set();
const tail = rope[NUM_KNOTS-1];
tailVisited.add('0,0');

const moveUp = (num) => {
    for (let i = 0; i < num; i++) {
        rope[0].y++;

        doTailMovement();
        tailVisited.add(`${tail.x},${tail.y}`);
    }
};

const moveDown = (num) => {
    for (let i = 0; i < num; i++) {
        rope[0].y--;

        doTailMovement();
        tailVisited.add(`${tail.x},${tail.y}`);
    }
};

const moveLeft = (num) => {
    for (let i = 0; i < num; i++) {
        rope[0].x--;

        doTailMovement();
        tailVisited.add(`${tail.x},${tail.y}`);
    }
};

const moveRight = (num) => {
    for (let i = 0; i < num; i++) {
        rope[0].x++;

        doTailMovement();
        tailVisited.add(`${tail.x},${tail.y}`);
    }
};

for (let {direction, num} of input) {

    switch (direction) {
        case L:
            moveLeft(num);
            break;
        case R:
            moveRight(num);
            break;
        case U:
            moveUp(num);
            break;
        case D:
            moveDown(num);
            break;
        default:
            throw new Error(`no direction ${direction}`);
    }
}

console.log(tailVisited.size);
