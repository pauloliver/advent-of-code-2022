const readFile = require('../lib/read-file');

const ROCK_OPP = 'A';
const PAPER_OPP = 'B';
const SCI_OPP = 'C';

const ROCK_SELF = 'ROCK_SELF';
const PAPER_SELF = 'PAPER_SELF';
const SCI_SELF = 'SCI_SELF';

const STRAT_LOSE = 'X';
const STRAT_DRAW = 'Y';
const STRAT_WIN = 'Z';

const SCORES = {
    [STRAT_WIN]: 6,
    [STRAT_DRAW]: 3,
    [STRAT_LOSE]: 0,
    [ROCK_SELF]: 1,
    [PAPER_SELF]: 2,
    [SCI_SELF]: 3
}

const input = readFile('./input');


const getMove = (opponent, strat) => {
    // this could probably just be a 2d array ¯\_(ツ)_/¯
    switch (opponent) {
        case ROCK_OPP:
            switch (strat) {
                case STRAT_LOSE:
                    return SCI_SELF;
                case STRAT_DRAW:
                    return ROCK_SELF;
                case STRAT_WIN:
                    return PAPER_SELF;
                default: 
                    throw new Error(`no strat ${strat} found`);
            }
        case PAPER_OPP:
            switch (strat) {
                case STRAT_LOSE:
                    return ROCK_SELF;
                case STRAT_DRAW:
                    return PAPER_SELF;
                case STRAT_WIN:
                    return SCI_SELF;
                default: 
                    throw new Error(`no strat ${strat} found`);
            }
        case SCI_OPP:
            switch (strat) {
                case STRAT_LOSE:
                    return PAPER_SELF;
                case STRAT_DRAW:
                    return SCI_SELF;
                case STRAT_WIN:
                    return ROCK_SELF;
                default: 
                    throw new Error(`no strat ${strat} found`);
            }
        default:
            throw new Error(`no opp ${opponent} found`);
    }
};

const getScore = (move, strat) => {
    console.log({move, strat});
    return SCORES[move] + SCORES[strat];
};

const scores = input.map((row) => {
    const [opponent, strat] = row.split(' ');
    const move = getMove(opponent, strat);
    return getScore(move, strat);
});

const total = scores.reduce((acc, val) => {
    return acc + val;
}, 0);

console.log(total);



