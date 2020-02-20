// 一、浏览器加载ES模块
/**
 * 传统方法：
 * （1）HTML 网页中，浏览器通过<script>标签加载 JavaScript 脚本。由于浏览器脚本的默认语言是 JavaScript，
 * 因此type="application/javascript"可以省略。默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎
 * 遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。
 * 如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任
 * 何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。
 */
{
  // 所以浏览器允许脚本异步加载，下面就是两种异步加载的语法
  {
  // <script src="path/to/myModule.js" defer></script>
  // <script src="path/to/myModule.js" async></script>
    // 上面代码中，<script>标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外
    // 部脚本，但不会等它下载和执行，而是直接执行后面的命令。defer与async的区别是：defer要等到整个页面在内存
    // 中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断
    // 渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如
    // 果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
  }
}

/**
 * 加载规则：
 * （1）浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
 * （2）ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
 */
{
  // 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
  {
  // <script type="module" src="./foo.js"></script>
    // 上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。
    // 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，
    // 再执行模块脚本，等同于打开了<script>标签的defer属性。如果网页有多个<script type="module">，它
    // 们会按照在页面出现的顺序依次执行。
   // <script type="module" src="./foo.js"></script>
   //  等同于
    // <script type="module" src="./foo.js" defer></script>
  }

  // <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。
  {
    // <script type="module" src="./foo.js" async></script>
    // 一旦使用了async属性，<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。
  }

  // ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
  {
    // <script type="module">
    //    import $ from './login.js';
    //
    //   // other code
    // </script>
    /**
     * 对于外部的模块脚本（上例是login.js），有几点需要注意。
     *（1）代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
     *（2）模块脚本自动采用严格模式，不管有没有声明use strict。
     *（3）模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
     *（4）模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
     *（5）同一个模块如果加载多次，将只执行一次。
     */
  }
}

/**
 * ES6 模块与 CommonJS 模块的差异：
 * （1）讨论 Node.js 加载 ES6 模块之前，必须了解 ES6 模块与 CommonJS 模块完全不同。它们有两个重大差异。
 *    ----第一个差异：CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块是运行
 *    时加载，ES6 模块是编译时输出接口。
 *    ----第二个差异：因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才
 *    会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
 * （2）ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
 * （3）ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
 * （4）由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
 * （5）export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
 */
// import {counter,incCounter} from "./Module/lib";
// import './Module/x'
// import './Module/y'
/**
 *import语句会执行所加载的模块，因此可以有这种写法：import './Module/y'，这
 *种写法仅仅执行lodash模块，但是不输入任何值。如果多次重复执行同一句import语句，
 * 那么只会执行一次，而不会执行多次
 */
{
  // 第一个差异的解释
  {
     // CommonJS 模块输出的是值的拷贝(算是深拷贝），也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下
    // 面这个模块文件lib.js的例子。
    {
      // **********************CommonJS***********************
      // var mod = require('./CommonJS/lib');
      // console.log(mod.counter);  // 3
      // mod.incCounter();
      // console.log(mod.counter);
      // 上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter
      // 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
      // ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，
      // 就会生成一个只读引用（换句话说，当前文件拿到的是模块内变量的引用地址）。等到脚本真正执行时，再根
      // 据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，
      // 原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定
      // 其所在的模块。

      // **********************EsModule******************
      // console.log(counter);
      // incCounter();
      // console.log(counter);
      // 上面代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
    }
  }
}

/**
 * Node.js 加载：
 * （1）Node.js 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6
 * 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的
 * 加载方案。从 v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。
 * （2）Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import
 * 或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，
 * 默认启用严格模式，不必在每个模块文件顶部指定"use strict"。如果不希望将后缀名改成.mjs，
 * 可以在项目的package.json文件中，指定type字段为module。一旦设置了以后，该目录里面的 JS
 * 脚本，就被解释用 ES6 模块。(注意，一旦在node种使用EsModule，那么引入文件的后缀名绝对
 * 不能省略，一定要有*.js或者*.mjs结尾，亲测：修改后缀名的方式无效，指定type字段为module
 * 这个有效）
 * （3）一旦在项目的package.json文件中，指定type字段为module。如果这时还要使用 CommonJS
 * 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，
 * 则.js脚本会被解释成 CommonJS 模块。
 * （4）总结为一句话：.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件
 * 的加载取决于package.json里面type字段的设置。注意，ES6 模块与 CommonJS 模块尽量不要混用。
 * require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里
 * 面也不能使用require命令，必须使用import。
 */
import {count} from "./Module/abc.js";
{
 // 基本案例
  {
    console.log(count);
  }
}

