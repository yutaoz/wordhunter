const fs = require('fs');
const prompt = require('prompt-sync')();
const allFileContents = fs.readFileSync('wordlist.txt', 'utf-8');
const {spawn} = require('child_process');

// list of words
let mymap = new Map();
allFileContents.split(/\r?\n/).forEach(line => {
    mymap.set(line, line);
});


let count = 0;


const solve = () => {
    let wordGrid = [];
    const input = prompt("enter grid - all caps left to right: ");
    let temp = [];
    
    for (let k = 0; k < 16; k++) { // build wordgrid
        temp.push(input[k]);
        if (k % 4 == 3) {
            wordGrid.push(temp);
            temp = [];
        }
    }
    console.log(wordGrid);

    let referenceGrid = [[0, 0 ,0 ,0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let directionGrid = [[1, 2 ,3 ,4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    
    let wordArray = [];
    
    // dfs to find every path from every possible start to every possible finish
    for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 4; b++) {
            for (let c = 0; c < 4; c++) {
                for (let d = 0; d < 4; d++) {
                    if (a != c || b != d) {
                        let pathList = [];
                        pathList.push(wordGrid[a][b]);
                        let dirPath = [];
                        dirPath.push(directionGrid[a][b]);
                        dfs(a, b, c, d, referenceGrid, pathList, wordGrid, wordArray, directionGrid, dirPath);
                    }
                    
                }
            }
        }
    }

    let cleanedArray = [...new Set(wordArray)]; // not very useful right now, change to remove duplicate words - does not work due to differing paths

    cleanedArray.sort(function(a, b){ // same with this, originally used without the paths concatenated to the word
        return b.length - a.length;
    });
    spawn('python', ['pathguide.py', JSON.stringify(cleanedArray)], {shell: true, stdio: 'inherit'}); // spawn path drawing script
    console.log(count); // debug
}


const dfs = (i, j, endi, endj, referenceGrid, pathList, wordGrid, wordArray, dirGrid, dirPath) => {
    if (i == endi && j == endj) {
        count++;
        let word = pathList.join("");
        let path = dirPath.join();
        path = path.replaceAll(',','-');
        if (mymap.get(word) != undefined && word.length >= 3) { // if word is found, add to array
            wordArray.push(word + "|" + path);
        }
       
        return;
    }

    referenceGrid[i][j] = 1;
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < 4 && y >= 0 && y < 4 && referenceGrid[x][y] != 1) {
                pathList.push(wordGrid[x][y]);
                dirPath.push(dirGrid[x][y]);
                let idx = pathList.length - 1;
                dfs(x, y, endi, endj, referenceGrid, pathList, wordGrid, wordArray, dirGrid, dirPath);
                pathList.splice(idx); 
                dirPath.splice(idx);
            }
        }
    }

    referenceGrid[i][j] = 0;

}

solve();