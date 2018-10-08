// Write a program that, using this file as input, produces an output
// file containing a list of pairs of artists which appear TOGETHER
// in at least fifty different lists.For example, in the above sample,
// Radiohead and Morrissey appear together twice, but every other
// pair appears only once.Your solution should be a csv, with each row
// being a pair.For example:

// Solution Steps
// 1. Read csv file, create k/v hash where artistname: [listNumbers]
// 1a. Value should be a set so there are no duplicates
// 2. Cull pairs where values.length < 50
// 3. Iterate through remaining sets to find pairs

// Run on Node.js

const artistLists = process.argv[2] || "./Artist_lists_small.txt";
const outputFile = process.argv[3] || "./results.txt";
const readline = require("readline");
const fs = require("fs");
const stream = require("stream");

const inStream = fs.createReadStream(artistLists);
const outStream = new stream();
let readLine = readline.createInterface(inStream, outStream);

const artistHash = {};
const artistPairsArr = [];
let listNum = 0;

readLine.on("line", line => {
  parseLine(line, listNum);
  listNum++;
});

readLine.on("close", () => {
  cullValues(artistHash);
  artistPairs(artistHash);
  fs.writeFileSync(outputFile, artistPairsArr.join("\n"), "utf-8");
});

// helper function to parse line
const parseLine = (line, listNum) => {
  let lineArr = line.split(",");

  for (let i = 0; i < lineArr.length; i++) {
    let artist = lineArr[i];

    if (artistHash[artist]) {
      if (!artistHash[artist].includes(listNum)) {
        artistHash[artist].push(listNum);
      }
    } else {
      artistHash[artist] = [listNum];
    }
  }
};

// helper function to cull values with length < 50
const cullValues = hash => {
  for (artist in hash) {
    if (hash[artist].length < 50) {
      delete hash[artist];
    }
  }
};

// helper function to find artist pairs
const artistPairs = hash => {
  for (artist in hash) {
    for (otherArtist in hash) {
      let pair = [artist, otherArtist];
      if (
        !artistPairsArr.includes(pair) &&
        !artistPairsArr.includes(pair.reverse()) &&
        artist !== otherArtist
      ) {
        let sameListsNum = hash[artist].filter(list =>
          hash[otherArtist].includes(list)
        ).length;

        if (sameListsNum >= 50) {
          artistPairsArr.push(pair);
        }
      }
    }
  }

  for (let i = 0; i < artistPairsArr.length; i++) {
    artistPairsArr[i] = `${artistPairsArr[i].join(", ")}`;
  }
};
