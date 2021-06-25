# Node Color

Simple color managing package for NodeJS
Includes features such as
- Hexcode to color array conversions
- Color mixing with variable alpha values

## Install

Installing with npm
`npm i --save @enigmaoffline/color`

## Usage

```js
const Color = require('@enigmaoffline/color');


// basic functions
console.log(Color.valuesToHex(12, 34, 56, false));
// => '0c2238'

console.log(Color.arrToHex([12, 34, 56]));          
// => '#0c2238'

console.log(Color.hexToArr('#0c2238'));            
// => [ 12, 34, 56 ]


// color mixing
console.log(Color.mixByArray([12, 34, 56], [56, 34, 12]));
// => [ 34, 34, 34 ]

console.log(Color.mixByHex('#0c2238', '38220C'));
// => [ 34, 34, 34 ]

console.log(Color.mixByValue(25, 25, 25, 125, 125, 125));
// => [ 75, 75, 75 ]

console.log(Color.mixByValue(25, 25, 25, 125, 125, 125, 0.75));
// => [ 50, 50, 50 ]

```
