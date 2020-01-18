/***
 *  变量的解构赋值的应用
 *  其分为两种：
 *  一种是数组形式的结构赋值
 *  另外一种是对象的解构赋值，对象形式的赋值有点特殊，其就是let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };简写
 * **/

// 交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

// 取出从函数中返回多个值,函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
// （1）取出返回一个数组参数的形式
function example0() {
  return [1, 2, 3];
}
let [4a, b, c] = example0();
// （2）取出返回一个对象参数的形式
function example1() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example1();

// 方便函数参数的定义,解构赋值可以方便地将一组参数与变量名对应起来。
// （1）参数是一组有次序的值
function f0([x, y, z]) {  }
f0([1, 2, 3]);
// （2）参数是一组无次序的值
function f1({x, y, z}) {  }
f1({z: 3, y: 2, x: 1});

// 提取 JSON 数据,解构赋值对提取 JSON 对象中的数据，尤其有用。
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);

// 函数参数的默认值,指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

// 遍历 Map 结构,任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// 如果只想获取键名，或者只想获取键值，可以写成下面这样。
// （1）获取键名
for (let [key] of map) {
  // ...
}
// （2）获取键值
for (let [,value] of map) {
  // ...
}

// 输入模块的指定方法，加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map");
