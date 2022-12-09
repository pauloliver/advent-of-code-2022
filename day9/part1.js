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

let headX = 0;
let headY = 0;

let tailX = 0;
let tailY = 0;

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
    const distX = headX - tailX;
    const distY = headY - tailY;

    if (headX === tailX && headY === tailY) {
        // same location
        return;
    } else if (headX === tailX) {
        // tail is above or below

        if (Math.abs(distY) <=1) {
            return;
        } else {
            tailY = tailY + (distY > 0 ? 1 : -1);
        }
    } else if (headY === tailY) {
        // tail is left or right

        if (Math.abs(distX) <=1) {
            return;
        } else {
            tailX = tailX + (distX > 0 ? 1 : -1);
        }
    } else {
        // tail is diagonal
        if (Math.abs(distX) === 1 && Math.abs(distY) === 1) {
            // head and tail are touching
            return;
        } else if ((Math.abs(distX) > 1) || (Math.abs(distY) > 1)) {
            tailX = tailX + (distX > 0 ? 1 : -1);
            tailY = tailY + (distY > 0 ? 1 : -1);
        } else {
            throw new Error(':(');
        }

    }
};

const tailVisited = new Set();
tailVisited.add('0,0');

const moveUp = (num) => {
    for (let i = 0; i < num; i++) {
        headY++;

        doTailMovement();
        tailVisited.add(`${tailX},${tailY}`);
    }
};

const moveDown = (num) => {
    for (let i = 0; i < num; i++) {
        headY--;

        doTailMovement();
        tailVisited.add(`${tailX},${tailY}`);
    }
};

const moveLeft = (num) => {
    for (let i = 0; i < num; i++) {
        headX--;

        doTailMovement();
        tailVisited.add(`${tailX},${tailY}`);
    }
};

const moveRight = (num) => {
    for (let i = 0; i < num; i++) {
        headX++;

        doTailMovement();
        tailVisited.add(`${tailX},${tailY}`);
    }
};

for (let {direction, num} of input) {
    console.log(`${direction} ${num}`);
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
