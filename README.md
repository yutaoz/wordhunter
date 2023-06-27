# Wordhunter
A program to beat your friends in wordhunt!

## Setup
Use `npm install` to set up and `node solver.js` to run

## Usage
Enter the grid from left to right top to bottom in one string like `ABCDEFGHIJKLMNOP` all caps \
It will take a bit to process, and when the canvas pops up to guide each words path, focus on the command window and press enter to move on to the next word
![image](https://github.com/yutaoz/wordhunter/assets/47333239/ea28b27c-4733-47bf-a91b-75b2dca8240c) \

## Plans
- Optimize: currently takes ~20 seconds to begin showing words due to finding millions of paths, maybe it will be faster to iterate through wordlist and seeing if each word is possible, sorted longest to shortest
- Faster grid: entering the grid eats up time, maybe use image to text recognition on a screenshared window
- Window focus: having to focus the command prompt and press enter can cause issues, can add a key listener to pathguide to move on
- Duplicate words slow down gameplay, remove duplicates

## Extra
- Arg passed to python pathfinder is in the form of an array ["WORD|1-2-3-4", "APPLE|1-4-7-14-8"]
- Maybe possible to simulate moves on ios device like with a teensy or something
