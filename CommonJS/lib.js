// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
// 上面代码中，输出的counter属性实际上是一个取值器函数。
// 现在再执行main.js，就可以正确读取内部变量counter的变动了。
