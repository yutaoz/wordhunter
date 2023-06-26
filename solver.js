const fs = require('fs');
const prompt = require('prompt-sync')();
const allFileContents = fs.readFileSync('wordlist.txt', 'utf-8');
const {spawn} = require('child_process');

let mymap = new Map();
allFileContents.split(/\r?\n/).forEach(line => {
    mymap.set(line, line);
});



let count = 0;
const solve = () => {
    let wordGrid = [];
    const input = prompt("enter grid: ");
    let temp = [];
    for (let k = 0; k < 16; k++) {
        
        temp.push(input[k]);
        if (k % 4 == 3) {
            wordGrid.push(temp);
            temp = [];
        }
    }
    console.log(wordGrid);
    let referenceGrid = [[0, 0 ,0 ,0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let directionGrid = [[1, 2 ,3 ,4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    
    
    // let referenceGrid1 = [[0, 0], [0, 0]];
    // let wordGrid1 = [['D', 'L'], ['H', 'I']];
    let wordArray = [];
    

    for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 4; b++) {
            for (let c = 0; c < 4; c++) {
                for (let d = 0; d < 4; d++) {
                    if (a != c || b != d) {
                        let pathList = [];
                        pathList.push(wordGrid[a][b]);
                        let dirPath = [];
                        dirPath.push(directionGrid[a][b]);
                        //console.log("Start: " + wordGrid1[a][b] + " | End: " + wordGrid1[c][d]);
                        dfs(a, b, c, d, referenceGrid, pathList, wordGrid, wordArray, directionGrid, dirPath);
                        

                    }
                    
                }
            }
        }
    }
    //console.log(wordArray);
    let cleanedArray = [...new Set(wordArray)];
    cleanedArray.sort(function(a, b){
        return b.length - a.length;
    });
    spawn('python', ['pathguide.py', JSON.stringify(cleanedArray)], {shell: true, stdio: 'inherit'});
    console.log(count);
}


const dfs = (i, j, endi, endj, referenceGrid, pathList, wordGrid, wordArray, dirGrid, dirPath) => {
    if (i == endi && j == endj) {
        //console.log(pathList);
        count++;
        let word = pathList.join("");
        let path = dirPath.join();
        path = path.replaceAll(',','-');
        if (mymap.get(word) != undefined && word.length >= 3) {
            wordArray.push(word + "|" + path);
        }
       
        return;
    }

    referenceGrid[i][j] = 1;
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < 4 && y >= 0 && y < 4 && referenceGrid[x][y] != 1) {
                //console.log("x: " + x + " | y: " + y);
                pathList.push(wordGrid[x][y]);
                dirPath.push(dirGrid[x][y]);
                let idx = pathList.length - 1;
                dfs(x, y, endi, endj, referenceGrid, pathList, wordGrid, wordArray, dirGrid, dirPath);
                pathList.splice(idx); 
                dirPath.splice(idx);
                //console.log("SPLICED: " + pathList + " and " + idx);
            }
        }
    }

    referenceGrid[i][j] = 0;

    
}

// const dykestras = (wordGrid, i, j, str) => {
//     let referenceGrid = [[1, 0 ,0 ,0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
//     if ((i - 1 >= 0) && (j - 1 >= 0) && (referenceGrid[i - 1][j - 1] != 1)) {
//         referenceGrid[i - 1][j - 1] = 1;
//         str += wordGrid[i - 1][j - 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i - 1, j - 1, str);
        
//     }
//     if ((i - 1 >= 0) && (referenceGrid[i - 1][j] != 1)) {
//         referenceGrid[i - 1][j] = 1;
//         str += wordGrid[i - 1][j];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i - 1, j, str);
//     }
//     if ((i - 1 >= 0) && (j + 1 < 4) && (referenceGrid[i - 1][j + 1] != 1)) {
//         referenceGrid[i - 1][j + 1] = 1;
//         str += wordGrid[i - 1][j + 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i - 1, j + 1, str);
//     }
//     if ((j - 1 >= 0) && (referenceGrid[i][j - 1] != 1)) {
//         referenceGrid[i][j - 1] = 1;
//         str += wordGrid[i][j - 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i, j - 1, str);
//     }
//     if ((j + 1 < 4) && (referenceGrid[i][j + 1] != 1)) {
//         referenceGrid[i][j + 1] = 1;
//         str += wordGrid[i][j + 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i, j + 1, str);
//     }
//     if ((i + 1 < 4) && (j - 1 >= 0) && (referenceGrid[i + 1][j - 1] != 1)) {
//         referenceGrid[i + 1][j - 1] = 1;
//         str += wordGrid[i + 1][j - 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i + 1, j - 1,   str);
//     }
//     if ((i + 1 < 4) && (referenceGrid[i + 1][j] != 1)) {
//         referenceGrid[i + 1][j] = 1;
//         str += wordGrid[i + 1][j];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i + 1, j, str);
//     }
//     if ((i + 1 < 4) && (j + 1 < 4) && (referenceGrid[i + 1][j + 1] != 1)) {
//         referenceGrid[i + 1][j + 1] = 1;
//         str += wordGrid[i + 1][j + 1];
//         console.log("STRING: " + str);
//         dykestras(wordGrid, referenceGrid, i + 1, j + 1, str);
//     }
//     return str;
    
// }

solve();