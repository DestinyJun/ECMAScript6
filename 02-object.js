let a = {
  name: '文君'
};
let b = {};
let mySymbol = Symbol();
Object.defineProperty(b, mySymbol, { value: '文君!' });
/********************************************************************/
let a1 = {
  name: '李一',
  age: 18
};
let a2  = ['01','02','03'];
console.log(Object.keys(a2));

class A {
  name: string
}
