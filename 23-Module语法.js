/**
 * 严格模式：
 * （1）ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
 * （2）严格模式主要有以下限制：
 *      --变量必须声明后再使用
 *      --函数的参数不能有同名属性，否则报错
 *      --不能使用with语句
 *      --不能对只读属性赋值，否则报错
 *      --不能使用前缀 0 表示八进制数，否则报错
 *      --不能删除不可删除的属性，否则报错
 *      --不能删除变量delete prop，会报错，只能删除属性delete global[prop]
 *      --eval不会在它的外层作用域引入变量
 *      --eval和arguments不能被重新赋值
 *      --arguments不会自动反映函数参数的变化
 *      --不能使用arguments.callee
 *      --不能使用arguments.caller
 *      --禁止this指向全局对象
 *      --不能使用fn.caller和fn.arguments获取函数调用的堆栈
 *      --增加了保留字（比如protected、static和interface）
 * （3）其中，尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。
 */

/**
 * export 命令：
 * （1）模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
 * （2）一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，
 * 就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。
 * （3）通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。重命名后，v1可以用不同的名字输出两次。
 * （4）需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系，不要直接导出模块内的变量，
 * 必须形成接口{}（对象的形式导出），且export位置必须咋js的顶层，任何{}包裹都会报错，同样的，function和class的输出，也必须遵守这样的写法。
 * （5）export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
 * （6）export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。
 * 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
 */
{
  // export导出模块内接口的三种写法
  {
    // 写法一
    // export var m = 1;

    // 写法二
    // var m2 = 1;
    // export {m2}

    // 写法三
    //   var n = 1;
    // export {n as m3};
  }
  // export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
  {
    // export var foo = 'bar';
    // setTimeout(() => foo = 'baz', 500);
    // console.log(firstName);
  }
}

/**
 *import 命令：
 * （1）使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
 * （2）如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
 * （3）import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
 * （4）如果引入的是一个对象，改写属性是允许的。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。
 * （5）import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，
 * 不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。
 * （6）import命令具有提升效果，会提升到整个模块的头部，首先执行，这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。
 * （7）由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
 * （9）目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，
 * 但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。
 */
// import {firstName as lastName, person} from "./Module/profile";
{
  // 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
  {
    // console.log(lastName);
    /**
     * 上面代码的import命令，用于加载profile.js文件，并从中输入变量。import命令接受一对大括号，里面指定要从其他模块导入的变量名。
     * 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
     */
  }

  // import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
  {
    // lastName = {} // TypeError: Assignment to constant variable.
  }

  // 如果引入的是一个对象，改写属性是允许的。
  // 不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。
  {
    // person.age = 19;
    // console.log(person);
    // console.log(jQuery.ajax());
  }

  // 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
  {
    // 报错
    // import { 'f' + 'oo' } from 'my_module';

    // 报错
    let module = 'my_module';
    // import { foo } from module;

    // 报错
    /* if (x === 1) {
     import { foo } from 'module1';
     } else {
     import { foo } from 'module2';
     }*/
    /**
     * 上面三种写法都会报错，因为它们用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。
     */
  }
}

/**
 * 模块的整体加载：
 * （1）除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
 * 指定的这个对象需要从命名，不能直接使用*来进行使用
 * （2）模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。
 */
// import * as me from "./Module/profile";
{
  // 模块整体加载所在的那个对象（上例是me），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的:
  {
    // 下面两行都是不允许的
    // me.firstName = 'hello'; // 实际上却是可以改的，神奇
    // console.log(me);
  }
}

/**
 * export default 命令：
 * （1）使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，
 * 用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。为了给用户提供方便，
 * 让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。其他模块
 * 加载该模块时，import命令可以为该匿名函数指定任意名字。
 * （2）export default命令用在非匿名函数前，也是可以的。不过此时的函数名在模块外部是无效的。
 * 加载的时候，视同匿名函数加载。
 * （3）主要作用是做到默认导出，不用知道模块内实时什么
 * （4）使用export default时，对应的import语句不需要使用大括号；
 * （5）不使用export default时，对应的import语句需要使用大括号
 * （6）export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，
 * 因此export default命令只能使用一次，所以，import命令后面才不用加大括号，因为只可
 * 能唯一对应export default命令。本质上，export default就是输出一个叫做default的变量
 * 或方法，然后系统允许你为它取任意名字。
 * （7）正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
 * 因为它本身就是一个变量
 * （8）因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值
 * 写在export default之后。
 */
// import wenjun from './Module/login'; // 这里注意路径问题，相对路径一定要有./，否则找不到
{
  // 加载默认输出模块时，import命令可以为其指定任意名字。
  {
    // login();
    // 上面代码的import命令，可以用任意名称指向login.js输出的方法，这时就不需要
    // 知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。
    // 这种情况适合一个文件只有一个输出的值的时候
  }

  // export default命令用在非匿名函数前，也是可以的。
  {
    // wenjun();
  }

  // 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
  {
    // 使用模块的文件
   /* import _, { each, forEach } from 'lodash';*/
    // 对应的模块文件写法
    /*export default function (obj) {
      // ···
    }
    export function each(obj, iterator, context) {
      // ···
    }
    export { each as forEach };*/
  }
}

/**
 * export 与 import 的复合写法：
 * （1)如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
 */
{
  // 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
  {
   /* export { foo, bar } from 'my_module';
    // 可以简单理解为
    import { foo, bar } from 'my_module';
    export { foo, bar };*/
    /**
     * 上面代码中，export和import语句可以结合在一起，写成一行。但需要注意的是，
     * 写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了
     * 这两个接口，导致当前模块不能直接使用foo和bar。
     */
  }

  // 模块的接口改名和整体输出，也可以采用这种写法。
  {
   /* // 接口改名
    export { foo as myFoo } from 'my_module';
    // 整体输出
    export * from 'my_module';*/
  }

  // 默认接口的写法如下
  {
    // export { default } from 'foo';
  }

  // 具名接口改为默认接口的写法如下。
  {
    /*export { es6 as default } from './someModule';
    // 等同于
    import { es6 } from './someModule';
    export default es6;*/
  }

  // 同样地，默认接口也可以改名为具名接口。
  {
    // export { default as es6 } from './someModule';
  }
}

/**
 * 模块的继承：
 * （1）模块之间也可以继承。
 * （2）如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。
 */

/**
 * 跨模块常量：
 * （1）本书介绍const命令的时候说过，const声明的常量只在当前代码块有效。如果想设置跨模块的
 * 常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。
 */
// import {db} from './constants'
{
  // 个值要被多个模块共享，可以采用下面的写法
  {
    /*// constants.js 模块
    export const A = 1;
    export const B = 3;
    export const C = 4;

    // test1.js 模块
  import * as constants from './constants';
    console.log(constants.A); // 1
    console.log(constants.B); // 3

    // test2.js 模块
  import {A, B} from './constants';
    console.log(A); // 1
    console.log(B); // 3
    */
  }

  // 如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。
  // 然后，将这些文件输出的常量，合并在index.js里面。使用的时候，直接加载index.js就可以了。
  {
    // console.log(db.url);
  }
}

/**
 * import()：
 * （1）import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行
 * （2）ES2020提案 引入import()函数，支持动态加载模块。
 * （3）import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
 * 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，
 * import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同。
 * import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
 */
{
  // 基础案例
  {
    // 报错
    /*if (x === 2) {
    import MyModual from './myModual';
    }*/
    /**
     * 上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，
     * 所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行
     * 时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之
     * 中（比如，在if代码块之中，或在函数之中）。这样的设计，固然有利于编译
     * 器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能
     * 实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因
     * 为require是运行时加载模块，import命令无法取代require的动态加载功能。
     */
  }

  // require的动态加载功能。所以require无需在最顶层
  {
    // const path = './' + fileName;
    // const myModual = require(path);
    // 上面的语句就是动态加载，require到底加载哪一个模块，只有运行时才知道。import命令做不到这一点。
  }

  // ES2020提案 引入import()函数，支持动态加载模块。
  {
    // import(specifier);
    // 上面代码中，import函数的参数specifier，指定所要加载的模块的位置。import命令能够接受什么参数，
    // import()函数就能接受什么参数，两者区别主要是后者为动态加载。
  }
}

/**
 * import()的使用场合：
 * （1）按需加载。
 * （2）条件加载
 * （3）动态的模块路径
 */
{
  // 按需加载。
  {
    /*button.addEventListener('click', event => {
      import('./dialogBox.js')
        .then(dialogBox => {
          dialogBox.open();
        })
        .catch(error => {
          /!* Error handling *!/
        })
    });*/
    // import()可以在需要的时候，再加载某个模块。上面代码中，import()方法放在click事件的监听函数之中，
    // 只有用户点击了按钮，才会加载这个模块。
  }

  // 条件加载
  {
   /* if (condition) {
      import('moduleA').then(...);
    } else {
      import('moduleB').then(...);
    }*/
   // import()可以放在if代码块，根据不同的情况，加载不同的模块。
    // 上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。
  }

  // 动态的模块路径
  {
    /*import(f())
      .then(...);*/
    // import()允许模块路径动态生成。
    // 上面代码中，根据函数f的返回结果，加载不同的模块。
  }
}

/**
 * import()的注意点：
 * （1）import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，
 * 可以使用对象解构赋值的语法，获取输出接口。
 */
{
  // import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。因此，
  //  * 可以使用对象解构赋值的语法，获取输出接口。
  {
   /* import('./myModule.js')
      .then(({export1, export2}) => {
        // ...·
      });*/
   // 上面代码中，export1和export2都是myModule.js的输出接口，可以解构获得。
  }

  // 如果模块有default输出接口，可以用参数直接获得。（所谓具名就是有具体的名字？）
  {
    // import('./myModule.js')
    //   .then(myModule => {
    //     console.log(myModule.default);
    //   });
  }

  // 如果想同时加载多个模块，可以采用下面的写法。
  {
    /*Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ])
      .then(([module1, module2, module3]) => {
      ···
      });*/
  }

  // import()也可以用在 async 函数之中。
  {
   /* async function main() {
      const myModule = await import('./myModule.js');
      const {export1, export2} = await import('./myModule.js');
      const [module1, module2, module3] =
        await Promise.all([
          import('./module1.js'),
          import('./module2.js'),
          import('./module3.js'),
        ]);
    }
    main();*/
  }
}

