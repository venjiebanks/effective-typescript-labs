// Item 1: Understand the Relationship Between TypeScript and JavaScript

function greet(who: string) {
    console.log('Hello', who);
  }

//

let city = 'new york city';
console.log(city.toUpperCase());

//

const states = [
  {name: 'Alabama', capital: 'Montgomery'},
  {name: 'Alaska',  capital: 'Juneau'},
  {name: 'Arizona', capital: 'Phoenix'},

];
for (const state of states) {
  console.log(state.capital);
}

//

const x = 2 + '3';
const y = '2' + 3;

//

const a = null + 7;
const b = [] + 12;  
alert('Hello', 'TypeScript');

//

const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());