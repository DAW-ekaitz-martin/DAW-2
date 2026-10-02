const myArray = [1,2,3,4,5];
const mySet = new Set([1,2,3,3,4,5]);
const myMap = new Map([
    ['nombre', 'Ana'],
  ['edad', 28],
  [true, 'activo']
])

console.log(myArray instanceof Array);
console.log(myArray instanceof Set);
console.log(mySet instanceof Array);
console.log(mySet instanceof Set);
console.log(myMap instanceof Map);
console.log(myMap instanceof Set);