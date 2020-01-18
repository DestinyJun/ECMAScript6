// 作用域
{
  var x = 1;

  function f(x, y = x) {
    console.log(y);
  }

  // f(2) // 2
}

// 应用
{
 // 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
  function throwIfMissing() {
    throw new Error('Missing parameter');
  }

  function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
  }

  // foo(1)
}

// rest参数也即是...参数
{
  // ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
  // rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

  // 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
  // 函数的length属性，不包括 rest 参数。
  function f1(...values) {
    console.log(values);
  }
  // f1(1,'哈哈',{name: '文君'});
  // arguments变量的写法
  function sortNumbers() {
    console.log(arguments);
    return Array.prototype.slice.call(arguments).sort();
  }
  // console.log(sortNumbers(1,2));
  function push(array, ...items) {
    items.forEach(function(item) {
      array.push(item);
    });
    // console.log(array);
  }

  var a = [];
  push(a, 1, 2, 3)
}

// name属性
{
  // console.log((new Function).name);
}

// 箭头函数
{
  var f = () => 5;
// 等同于
  var f = function () { return 5 };

  var sum = (num1, num2) => num1 + num2;
// 等同于
  var sum = function(num1, num2) {
    return num1 + num2;
  };
  // 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
  var sum = (num1, num2) => { return num1 + num2; }

  // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
  // let getTempItem = id => { id: id, name: "Temp" }; // 报错
  let getTempItem = id => ({ id: id, name: "Temp" }); // 不报错

  // 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
  let fn = () => void doesNotReturn();

  // 箭头函数可以与变量解构结合使用。
  const full = ({ first, last }) => first + ' ' + last;
  // 等同于
  function full(person) {
    return person.first + ' ' + person.last;
  }

  // 箭头函数的使用注意点
}
