const readFile = require('../lib/read-file');

const input = readFile('./input');


let root ;

const CD = 'cd';
const LS = 'ls';

const ROOT = '/';
const UP = '..'

const DIR = 'dir';



let currentDir = null;

const createDir = (name, parent) => ({
    name,
    directories: {},
    files: [],
    parent
});

const changeDir = (command) => {
    const split = command.split(' ');
    const dirName = split[2];

    if (dirName === ROOT) {
        if (!root) {
            root = createDir(ROOT, null);
        }
        currentDir = root;
    } else if (dirName === UP) {
        currentDir = currentDir.parent;
    } else {
        currentDir = currentDir.directories[dirName];
    }
};

const processLs = (ls = '') => {
    const split = ls.split(' ');
    if (split[0] === DIR) {
        const name = split[1];
        currentDir.directories[name] = createDir(name, currentDir);
    } else {
        const file = {
            size: Number(split[0]),
            name: split[1] 
        }
        currentDir.files.push(file);
    }
};

const processCommand = (command = '') => {
    const split = command.split(' ');
    switch (split[1]) {
        case CD: 
            changeDir(command);
            break;
        case LS: 
            //no op?
    }
};

input.forEach((row = '') => {
    if (row.startsWith('$')) {
        processCommand(row);
    } else {
        processLs(row);
    }
});



const sizes = []

const getTotalFileSize = (files = []) => {
    return files.reduce((total, file) => {
        return total + file.size;
    }, 0);
}

const getChildrenSize = (directories) => {
    return Object.values(directories).reduce((total, directory) => {
        return total + directory.totalSize;
    }, 0);
};

let usedSpace;

// depth first search
// add `totalSize` property to each directory
const traverse = (node) => {
    Object.values(node.directories).forEach((directory) => {
        traverse(directory);
    });

    const fileSize = getTotalFileSize(node.files);
    const childSize = getChildrenSize(node.directories);
    const totalSize = fileSize + childSize;

    node.totalSize = totalSize;

    if (node.name !== ROOT) {
        sizes.push({name: node.name, totalSize});
    } else {
        usedSpace = totalSize;
    }
}

traverse(root);


const DISK_SPACE = 70000000;
const UPDATE_SIZE = 30000000;

const freeSpace = DISK_SPACE - usedSpace;
const requiredSpace = UPDATE_SIZE - freeSpace;

console.log({freeSpace, requiredSpace});


const sortedSize = sizes.sort((a, b) => {
    return a.totalSize - b.totalSize;
})


const smallest = sortedSize.find((size) => {
    return size.totalSize >= requiredSpace
});

console.log(smallest);
