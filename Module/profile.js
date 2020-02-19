/**
 * 这里的profile.js文件就是一个模块，保存用了用户的三个信息，然后通过export对外部输出这三个变量的用户信息
 * @type {string}
 */

// 第一种写法，比较繁琐
// export var firstName = '文君';
// export var lastName = '徐君';
// export var year = 1958;

// 第二种写法,应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。
// export命令除了输出变量，还可以输出函数或类（class）。
var firstName = '文君';
var person = {
  name: '小菊',
  age: 18
};
// var lastName = '徐君';
// var year = 1958;

// 定义了一个简单的乘积三函数
/*function multiply(x, y) {
  return x * y;
}*/

// 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。重命名后，v1可以用不同的名字输出两次。
/*
function v1(m,n) {
  return m + n;
}
*/

// 实时变化的值
/*var foo = 'bar';
setTimeout(() => foo = 'baz', 500);*/
export {firstName,person}


