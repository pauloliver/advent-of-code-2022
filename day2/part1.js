const readFile = require('../lib/read-file');

const ROCK_OPP = 'A';
const ROCK_SELF = 'X';
const PAPER_OPP = 'B';
const PAPER_SELF = 'Y';
const SCI_OPP = 'C';
const SCI_SELF = 'Z';

const WIN = 'WIN';
const LOSS = 'LOSS';
const TIE = 'TIE'; 

const SCORES = {
    [WIN]: 6,
    [TIE]: 3,
    [LOSS]: 0,
    [ROCK_SELF]: 1,
    [PAPER_SELF]: 2,
    [SCI_SELF]: 3
}

const input = readFile('./input');


const getResult = (opponent, self) => {
    // this could probably just be a 2d array ¯\_(ツ)_/¯
    switch (opponent) {
        case ROCK_OPP:
            switch (self) {
                case ROCK_SELF:
                    return TIE;
                case PAPER_SELF:
                    return WIN;
                case SCI_SELF:
                    return LOSS;
                default: 
                    throw new Error(`no self ${self} found`);
            }
        case PAPER_OPP:
            switch (self) {
                case ROCK_SELF:
                    return LOSS;
                case PAPER_SELF:
                    return TIE;
                case SCI_SELF:
                    return WIN;
                default: 
                    throw new Error(`no self ${self} found`);
            }
        case SCI_OPP:
            switch (self) {
                case ROCK_SELF:
                    return WIN;
                case PAPER_SELF:
                    return LOSS;
                case SCI_SELF:
                    return TIE;
                default: 
                    throw new Error(`no self ${self} found`);
            }
        default:
            throw new Error(`no opp ${opponent} found`);
    }
};

const getScore = (opponent, self) => {
    const result = getResult(opponent, self);
    return SCORES[result] + SCORES[self];
};

const scores = input.map((row) => {
    const [opponent, self] = row.split(' ');
    return getScore(opponent, self);
});

const total = scores.reduce((acc, val) => {
    return acc + val;
}, 0);

console.log(total);



