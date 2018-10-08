# Arena Coding Challenge

## Problem

Write a program that, using this file as input, produces an output file containing a list of pairs of artists which appear TOGETHER in at least fifty different lists. For example, in the above sample, Radiohead and Morrissey appear together twice, but every other pair appears only once. Your solution should be a csv, with each row being a pair. For example:

## Installation

This solution was implemented in Node.js. To run, follow the installation steps below:

#### macOS via Homebrew

`brew install node`

#### Linux specific distros

Follow the instructions per your installed Linux distro [here](https://nodejs.org/en/download/package-manager/#macos)

## Execution

To run this program, run the following command in your terminal:

`node arena.js`

This will create a resulting csv file named **results.txt**

## Solution

These are the steps I took to solve the problem

1. Create a file reader stream in order to read in the csv one line at a time

2. Parse each line, adding each artist and the list number that they have appeared in to a _artistHash_ object where key-value pairs are: **artistName: [listNums]**

3. After the file has finished being read, cull the key-value pairs in which the artist has appeared less than 50 times in the lists.

4. Compare the remaining artists to each other and check how often the artist appear in the same lists. If they appear together at least 50 times together, add them to a **artistPairsArr** array

5. Write the **artistPairsArr** array to a resultant csv file named **results.txt**

## Optimizations

I decided to cull the key-value pairs in which values.length < 50 since we can reasonably assume that if they have less than 50 appearences, there is no chance that the artist will appear with other artists **_AT LEAST_** 50 times.

This should reduce the number of artist comparisons by _k_ where _k = number of artists_ removed. In a worse case scenario, k = 0 and we would still have to look through each artist _O(n)_.

## Future Implementations

- Implement named command line arguements to allow for key-value pair arguments.

  - `node arena.js --inputFile test.txt --outputFile result.txt`
