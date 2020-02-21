import {bar} from './b';
console.log('a.mjs');
console.log(bar);
// export let foo = 'foo';

function foo() { return 'foo' }
export {foo};

// 让我们一行行来看，ES6 循环加载是怎么处理的。首先，执行a.mjs以后，引擎发现它
// 加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，
// 已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，
// 继续往下执行。执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，
// 因此报错。解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以
// 通过将foo写成函数来解决。这是因为函数具有提升作用，在执行import {bar} from './b'
// 时， 函数foo就已经有定义了，所以b.mjs加载的时候不会报错。这也意味着，如果把函
// 数foo改写成函数表达式，也会报错。因为函数表达式，就不具有提升作用，执行就会报错。
