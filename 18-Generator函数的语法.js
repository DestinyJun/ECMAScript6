/**
 *基本概念：
 * （1）Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
 * 本章详细介绍 Generator 函数的语法和 API，它的异步编程应用请看《Generator 函数的
 * 异步应用》一章。
 * （2）Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是
 * 一个状态机，封装了多个内部状态。
 * （3）执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，
 * 还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每
 * 一个状态。
 * （4）形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与
 * 函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在
 * 英语里的意思就是“产出”）。
 * （5）Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
 * 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个
 * 指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。
 * （6）调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，
 * 内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或retu
 * rn语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next
 * 方法可以恢复执行。
 * （7）总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
 * 以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属
 * 性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是
 * 否遍历结束。
 */
{
  // 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函
  // 数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield
  // 在英语里的意思就是“产出”）。
  {
    /*function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }
    var hw = helloWorldGenerator();*/
    // console.log([...hw]);
    // console.log(hw.next());
    // 上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式
    // （hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

    //然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
    // 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而
    // 是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

    // 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调
    // 用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield
    // 表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停
    // 执行的标记，而next方法可以恢复执行。

    // hw.next();
    // { value: 'hello', done: false }

    // hw.next();
    // { value: 'world', done: false }

    // hw.next();
    // { value: 'ending', done: true }

    // hw.next();
    // { value: undefined, done: true }

    // 上面代码一共调用了四次next方法。
    // 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，
    // 它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

    // 第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。
    // next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还
    // 没有结束。

    // 第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有
    // return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面
    // 的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示
    // 遍历已经结束。

    // 第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，
    // done属性为true。以后再调用next方法，返回的都是这个值。

    // 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，
    // 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示
    // 当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍
    // 历结束。
  }

  // ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
  {
   /* function * foo(x, y) { ··· }
    function *foo(x, y) { ··· }
    function* foo(x, y) { ··· }
    function*foo(x, y) { ··· }*/
    // 由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function
    // 关键字后面。本书也采用这种写法。
  }
}

/**
 * yield 表达式：
 * （1）由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实
 * 提供了一种可以暂停执行的函数。yield表达式就是暂停标志
 * （2）遍历器对象的next方法的运行逻辑如下：
 * ----A：遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的
 * 对象的value属性值。
 * ----B：下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
 * ----C：如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句
 * 后面的表达式的值，作为返回的对象的value属性值
 * ----D：如果该函数没有return语句，则返回的对象的value属性值为undefined
 * （3）需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
 * 因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
 * （4）yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个
 * 表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具
 * 备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多
 * 个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，
 * 因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的
 * 来历（英语中，generator 这个词是“生成器”的意思）。
 * （5）Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数，只有调用next方法时，
 * Generator函数才会执行。
 * （6）另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
 * （7）yield表达式如果用在另一个表达式之中，必须放在圆括号里面
 * （8）yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
 */
{
  // 基础案例
  {
    /*function* gen() {
      yield  123 + 456;
    }*/
    // 上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。
  }

  // Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数
  {
   /* function* f() {
      console.log('执行了！')
    }
    var generator = f();
    setTimeout(function () {
      generator.next()
    }, 2000);*/
    // 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，
    // 函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。
  }

  // yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。下面一个报错的案例
  {
    // 上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了
    // yield表达式（这个函数里面还使用了yield*表达式，详细介绍见后文）。一种修改方法是
    // 改用for循环。
    var arr = [1, [[2, 3], 4], [5, 6]];
    /*var flat = function* (a) {
      a.forEach(function (item) {
        if (typeof item !== 'number') {
          yield* flat(item);
        } else {
          yield item;
        }
      });
    };*/
    // 正确的方式
   /* for (var f of flat(arr)){
      console.log(f);
    }*/
  }

  // yield表达式如果用在另一个表达式之中，必须放在圆括号里面
  {
    function* demo() {
      // console.log('Hello' + yield); // SyntaxError,错误写法
      // console.log('Hello' + yield 123); // SyntaxError，错误写法
      console.log('Hello' + (yield 456)); // OK
      console.log('Hello' + (yield 123)); // OK
    }
    let a = demo();
    // console.log(a.next());
    // console.log(a.next());
  }

  // yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
  {
    /*function* demo() {
      foo(yield 'a', yield 'b'); // OK
      let input = yield; // OK
    }*/
  }
}

/**
 * 与 Iterator 接口的关系：
 * （1）一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的
 * 一个遍历器对象。由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator
 * 属性，从而使得该对象具有 Iterator 接口。
 * （2）Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
 */
{
  // 基础案例
  {
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    // console.log( [...myIterable]);    // [1, 2, 3]
    // 上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可
    // 以被...运算符遍历了。
  }

  // Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
  {
    function* gen(){
      // some code
    }
    var g = gen();
    // console.log(g[Symbol.iterator]() === g);
    // 上面代码中，gen是一个 Generator 函数，调用它会生成一个遍历器对象g。它的Symbol.iterator属性，
    // 也是一个遍历器对象生成函数，执行后返回它自己。
  }
}

/**
 * next 方法的参数：
 * （1）yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一
 * 个yield表达式的返回值。
 * （2）注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效
 * 的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，
 * 第一个next方法用来启动遍历器对象，所以不用带有参数。
 * （3）如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
 * （4）利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法
 * 使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
 */
{
  // yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个
  // yield表达式的返回值。
  {
  /*  function* f() {
      for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
      }
    }
    var g = f();*/
   /* console.log(g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());*/
    // console.log(g.next(true));
    // console.log(g.next(true));
    // 上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，
    // 变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因
    // 此i会等于-1，下一轮循环就会从-1开始递增。这个功能有很重要的语法意义。Generator 函数从暂停状态到恢
    // 复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之
    // 后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的
    // 值，从而调整函数行为。再看一个例子:
    {
      function* foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
      }
      var a = foo(5);
      // console.log(a.next()); // Object{value:6, done:false}
      // console.log(a.next());// Object{value:NaN, done:false}
      // console.log(a.next()); // Object{value:NaN, done:true}
      // console.log(a.next()); // Object{value:undefined, done:true}

      var b = foo(5);
      // console.log(b.next()); // { value:6, done:false }
      // console.log(b.next(12));// { value:8, done:false } 该参数12就会被当作上一个yield表达式的返回值。
      // console.log(b.next(13)); // 5+13+24（既然会自己存储值）

      // 上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以
      // 后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，
      // 返回对象的value属性等于5 + NaN + undefined，即NaN。如果向next方法提供参数，返回结果就完全不一样了。
      // 上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，
      // 因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x
      // 等于5，y等于24，所以return语句的值等于42。注意，由于next方法的参数表示上一个yield表达式的返回值，
      // 所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第
      // 二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
    }
  }

  // 再看一个通过next方法的参数，向 Generator 函数内部输入值的例子
  {
    /*function* dataConsumer() {
      console.log('Started');
      console.log(`1. ${yield}`);
      console.log(`2. ${yield}`);
      return 'result';
    }
    let genObj = dataConsumer();*/
    // console.log(genObj.next());
    // console.log(genObj.next('a'));
    // console.log(genObj.next('b'));
    // 上面代码是一个很直观的例子，每次通过next方法向 Generator 函数输入值，然后打印出来。
  }

  // 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
  {
    /*function wrapper(generatorFunction) {
      return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next(); // 默认调用了第一次
        return generatorObject;
      };
    }
    const wrapped = wrapper(function* () {
      console.log(`First input: ${yield}`);
      return 'DONE';
    });*/
    // console.log( );
    // wrapped().next('hello!')
    // 上面代码中，Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。
  }
}

/**
 * for...of 循环：
 * （1）for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
 * （2）除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
 * 这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
 */
{
  // for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
  {
    function* foo() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      return 6;
    }
    for (let v of foo()) {
      // console.log(v);
    }
    // 上面代码使用for...of循环，依次显示 5 个yield表达式的值。这里需要注意，一旦next方法的返回对象
    // 的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，
    // 不包括在for...of循环之中。
  }

  // 下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子
  {
    /*function* fibonacci() {
      let [prev, curr] = [0, 1];
      for (;;) { // for(;;)表示省略了循环条件,也就是无条件的循环语句。意思就是死循环
        yield curr;
        [prev, curr] = [curr, prev + curr];
      }
    }*/
    /*for (let n of fibonacci()) {
      if (n > 1000) break;
      console.log(n);
    }*/
    // 从上面代码可见，使用for...of语句时不需要使用next方法。
  }

  // 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法
  // 使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
  {
   /* function* objectEntries(obj) {
      let propKeys = Reflect.ownKeys(obj);
      for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
      }
    }
    let jane = { first: 'Jane', last: 'Doe' };
    for (let [key, value] of objectEntries(jane)) {
      console.log(`${key}: ${value}`);
    }*/
    // 上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。这时，我们通过 Generator 函数
    // objectEntries为它加上遍历器接口，就可以用for...of遍历了。加上遍历器接口的另一种写法是，将 Generator
    // 函数加到对象的Symbol.iterator属性上面。
    {
     /* function* objectEntries() {
        let propKeys = Object.keys(this);
        for (let propKey of propKeys) {
          yield [propKey, this[propKey]];
        }
      }
      let jane = { first: 'Jane', last: 'Doe' };
      jane[Symbol.iterator] = objectEntries;
      for (let [key, value] of jane) {
        console.log(`${key}: ${value}`);
      }*/
    }
  }

  // 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意
  // 味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
  {
    /*function* numbers () {
      yield 1;
      yield 2;
      return 3;
    }
    // 扩展运算符
    [...numbers()] // [1, 2]
    // Array.from 方法
    Array.from(numbers()) // [1, 2]
    // 解构赋值
    let [x, y] = numbers();
    x // 1
    y // 2
    // for...of 循环
    for (let n of numbers()) {
      console.log(n)
    }*/
  }
}

/**
 * Generator.prototype.throw()：
 * （1）Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator
 * 函数体内捕获。
 * （2）throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
 * （3）如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch
 * 代码块捕获。
 * （4）如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。
 * （5）throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
 * （6）throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
 * （7）throw命令与g.throw方法是无关的，两者互不影响
 * （8）这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码
 * 块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在
 * 只在 Generator 函数内部写一次catch语句就可以了。
 * （9）Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函
 * 数体外的catch捕获。
 * (10)一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将
 * 返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结
 * 束了。
 */
{
  // Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator
  // 函数体内捕获。
  {
    /*var g = function* () {
      try {
        yield;
      } catch (e) {
        console.log('内部捕获', e);
      }
    };
    var i = g();
    i.next();
    try {
      i.throw('a');
      i.throw('b');
    } catch (e) {
      console.log('外部捕获', e);
    }*/
    // 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。
    // i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，
    // 所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
  }

  // throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
  {
    /*var g = function* () {
      try {
        yield;
      } catch (e) {
        console.log(e);
      }
    };
    var i = g();
    i.next();
    i.throw(new Error('出错了！'));*/
    // 注意，不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw
    // 方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获。
    {
    /*  var g = function* () {
        while (true) {
          try {
            yield;
          } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
          }
        }
      };
      var i = g();
      i.next();
      try {
        throw new Error('a');
        throw new Error('b');
      } catch (e) {
        console.log('外部捕获', e);
      }*/
      // 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try
      // 代码块里面剩余的语句了。
    }
  }

  // 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码
  // 块捕获。
  {
   /* var g = function* () {
      while (true) {
        yield;
        console.log('内部捕获', e);
      }
    };
    var i = g();
    i.next();
    try {
      i.throw('a');
      i.throw('b');
    } catch (e) {
      console.log('外部捕获', e);
    }*/
    // 上面代码中，Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获。
  }

  // 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。
  {
   /* var gen = function* gen1(){
      yield console.log('hello');
      yield console.log('world');
    };
    var g = gen();
    g.next();*/
    // g.throw();
    // 上面代码中，g.throw抛出错误以后，没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。
  }

  // throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
  {
   /* function* gen() {
      try {
        yield 1;
      } catch (e) {
        console.log('内部捕获');
      }
    }
    var g = gen();
    g.throw(1);*/
    // 上面代码中，g.throw(1)执行时，next方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是
    // 直接在外部抛出，导致程序出错。这种行为其实很好理解，因为第一次执行next方法，等同于启动执行
    // Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在
    // 函数外部。
  }

  // throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
  {
   /* var gen = function* gen(){
      try {
        yield console.log('a');
      } catch (e) {
        console.log(e);
      }
      yield console.log('b');
      yield console.log('c');
    }
    var g = gen();
    console.log(g.next()); // a
    g.throw('我出错了') // b*/
    // 上面代码中，g.throw方法被捕获以后，自动执行了一次next方法，所以会打印b。另外，也可以看到，
    // 只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响
    // 下一次遍历。
  }

  // throw命令与g.throw方法是无关的，两者互不影响
  {
   /* var gen = function* gen(){
      yield console.log('hello');
      yield console.log('world');
    }
    var g = gen();
    g.next();
    try {
      throw new Error();
    } catch (e) {
      g.next();
    }*/
    // 上面代码中，throw命令抛出的错误不会影响到遍历器的状态，所以两次执行next方法，都进行了正确
    // 的操作。
  }

  // Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可
  // 以被函数体外的catch捕获。
  {
   /* function* foo() {
      var x = yield 3;
      var y = x.toUpperCase();
      yield y;
    }
    var it = foo();
    it.next(); // { value:3, done:false }
    try {
      it.next(42);
    } catch (err) {
      console.log(err);
    }*/
    // 上面代码中，第二个next方法向函数体内传入一个参数 42，数值是没有toUpperCase方法的，所以会抛出一个
    // TypeError 错误，被函数体外的catch捕获
  }

  // 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方
  // 法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator
  // 已经运行结束了。
  {
   /* function* g() {
      yield 1;
      console.log('throwing an exception');
      throw new Error('generator broke!');
      yield 2;
      yield 3;
    }
    function log(generator) {
      var v;
      console.log('starting generator');
      try {
        v = generator.next();
        console.log('第一次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      try {
        v = generator.next();
        console.log('第二次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      try {
        v = generator.next();
        console.log('第三次运行next方法', v);
      } catch (err) {
        console.log('捕捉错误', v);
      }
      console.log('caller done');
    }
    log(g());*/
    // 上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，
    // Generator 函数就已经结束了，不再执行下去了。
  }
}

/**
 * Generator.prototype.return()：
 * （1）Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
 * （2）如果return方法调用时，不提供参数，则返回值的value属性为undefined
 * （3）如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally
 * 代码块，执行完以后，整个函数才会结束。
 */
{
  // Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。
  {
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }
    var g = gen();
    g.next()        // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    g.next()        // { value: undefined, done: true }
    // 上面代码中，遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。并且，Generator
    // 函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true。
  }

  // 如果return方法调用时，不提供参数，则返回值的value属性为undefined
  {
   /* function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }
    var g = gen();
    g.next()        // { value: 1, done: false }
    g.return() // { value: undefined, done: true }*/
  }

  // 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，
  // 执行完以后，整个函数才会结束。
  {
    /*function* numbers () {
      yield 1;
      try {
        yield 2;
        yield 3;
      } finally {
        yield 4;
        yield 5;
      }
      yield 6;
    }
    var g = numbers();
    console.log(g.next());
    console.log(g.next());
    console.log(g.return(7));// { value: 4, done: false });
    console.log(g.next());
    console.log(g.next());*/
    // 上面代码中，调用return()方法后，就开始执行finally代码块，不执行try里面剩下的代码了，
    // 然后等到finally代码块执行完，再返回return()方法指定的返回值。
  }
}

/**
 * next()、throw()、return() 的共同点：
 * （1）next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是
 * 让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
 * （2）next()是将yield表达式替换成一个值
 * （3）throw()是将yield表达式替换成一个throw语句。
 * （4）return()是将yield表达式替换成一个return语句
 */
{
  // next()是将yield表达式替换成一个值。
  {
   /* const g = function* (x, y) {
      let result = yield x + y;
      return result;
    };
    const gen = g(1, 2);
    console.log(gen.next());
    console.log(gen.next(1));*/
    // 上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相
    // 当于替换成undefined。
  }

  // throw()是将yield表达式替换成一个throw语句。
  {
   /* const g = function* (x, y) {
      let result = yield x + y;
      return result;
    };
    const gen = g(1, 2);
    gen.throw(new Error('出错了'));*/
  }

  // return()是将yield表达式替换成一个return语句
}

/**
 * yield* 表达式：
 * （1）如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，
 * 自己手动完成遍历。
 * （2）ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一
 * 个 Generator 函数。
 * （3）从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后
 * 面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
 * （4）yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，
 * 部署一个for...of循环。
 * （5）yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，
 * 完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator
 * 的形式获取return语句的值。
 * （6）如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员
 * （7）实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历
 * （8）如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返
 * 回数据。
 * （9）yield*命令可以很方便地取出嵌套数组的所有成员
 */
{
  // 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，
  // 自己手动完成遍历
  {
    /*function* foo() {
      yield 'a';
      yield 'b';
    }
    function* bar() {
      yield 'x';
      // 手动遍历 foo()
      for (let i of foo()) {
        console.log(i);
      }
      yield 'y';
    }
    for (let v of bar()){
      console.log(v);
    }*/
    // 上面代码中，foo和bar都是 Generator 函数，在bar里面调用foo，就需要手动遍历foo。
    // 如果有多个 Generator 函数嵌套，写起来就非常麻烦。
  }

  // ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个
  // Generator 函数。
  {
   /* function* foo() {
      yield 'a';
      yield 'b';
    }
    function* bar() {
      yield 'x';
      yield* foo();
      yield 'y';
    }
    // 等同于
    function* bar() {
      yield 'x';
      yield 'a';
      yield 'b';
      yield 'y';
    }
    // 等同于
    function* bar() {
      yield 'x';
      for (let v of foo()) {
        yield v;
      }
      yield 'y';
    }*/
  }

  // 再来看一个对比的例子
  {
    /*function* inner() {
      yield 'hello!';
    }
    function* outer1() {
      yield 'open';
      yield inner();
      yield 'close';
    }
    var gen = outer1();
    // console.log(gen.next().value);
    // console.log(gen.next().value);
    // console.log(gen.next().value);
    function* outer2() {
      yield 'open';
      yield* inner();
      yield 'close';
    }
    var gen2 = outer2();
    console.log(gen2.next().value);
    console.log(gen2.next().value);*/
    // 上面例子中，outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，
    // outer2返回该遍历器对象的内部值。
  }

  // 从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，
  // 表明它返回的是一个遍历器对象。这被称为yield*表达式。
  {
   /* let delegatedIterator = (function* () {
      yield 'Hello!';
      yield 'Bye!';
    }());
    let delegatingIterator = (function* () {
      yield 'Greetings!';
      yield* delegatedIterator;
      yield 'Ok, bye.';
    }());
    for(let value of delegatingIterator) {
      console.log(value);
    }*/
    // 上面代码中，delegatingIterator是代理者，delegatedIterator是被代理者。由于yield* delegatedIterator
    // 语句得到的值，是一个遍历器，所以要用星号表示。运行结果就是使用一个遍历器，遍历了多个
    // Generator 函数，有递归的效果。
  }

  // yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一
  // 个for...of循环。
  {
   /* function* concat(iter1, iter2) {
      yield* iter1;
      yield* iter2;
    }
    // 等同于

    function* concat(iter1, iter2) {
      for (var value of iter1) {
        yield value;
      }
      for (var value of iter2) {
        yield value;
      }
    }*/
    // 上面代码说明，yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，
    // 完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator的形式获取
    // return语句的值。
  }

  // 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员
  {
    /*function* gen(){
      yield* ["a", "b", "c"];
    }
    console.log(gen().next());*/
    // 上面代码中，yield命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组
    // 的遍历器对象。
  }

  // 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历
  {
    /*let read = (function* () {
      yield 'hello';
      yield* 'hello';
    })();

    read.next().value // "hello"
    read.next().value // "h"*/
    // 上面代码中，yield表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，
    // 所以被yield*遍历。
  }

  // 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回
  // 数据。
  {
   /* function* foo() {
      yield 2;
      yield 3;
      return "foo";
    }
    function* bar() {
      yield 1;
      var v = yield* foo();
      console.log("v: " + v);
      yield 4;
    }
    var it = bar();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());*/
    // 上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，
    // 向函数bar提供了返回值。
  }

  // 再看一个例子
  {
   /* function* genFuncWithReturn() {
      yield 'a';
      yield 'b';
      return 'The result';
    }
    function* logReturned(genObj) {
      let result = yield* genObj;
      console.log(result);
    }
    console.log([...logReturned(genFuncWithReturn())]);*/
    //上面代码中，存在两次遍历。第一次是扩展运算符遍历函数logReturned返回的遍历器对象，
    // 第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象。这两次遍历的效果是
    // 叠加的，最终表现为扩展运算符遍历函数genFuncWithReturn返回的遍历器对象。所以，最
    // 后的数据表达式得到的值等于[ 'a', 'b' ]。但是，函数genFuncWithReturn的return语句
    // 的返回值The result，会返回给函数logReturned内部的result变量，因此会有终端输出。
  }

  // yield*命令可以很方便地取出嵌套数组的所有成员
  {
    /*function* iterTree(tree) {
      if (Array.isArray(tree)) {
        for(let i=0; i < tree.length; i++) {
          yield* iterTree(tree[i]);
        }
      } else {
        yield tree;
      }
    }
    const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
    for(let x of iterTree(tree)) {
      console.log(x);
    }
    // 由于扩展运算符...默认调用 Iterator 接口，所以上面这个函数也可以用于嵌套数组的平铺。
    console.log([...iterTree(tree)]);// ["a", "b", "c", "d", "e"]*/
  }
}

/**
 * 作为对象属性的 Generator 函数：
 * （1）如果一个对象的属性是 Generator 函数，可以简写
 */
{
  // 如果一个对象的属性是 Generator 函数，可以简写成下面的形式
  {
    let obj = {
      * myGeneratorMethod() {}
    };
    // 上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个 Generator 函数。
    {
      let obj = {
        myGeneratorMethod: function* () {}
      };
    }
  }
}

/**
 * Generator 函数的this：
 * （1）Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了
 * Generator 函数的prototype对象上的方法。
 * （2）Generator 函数也不能跟new命令一起用，会报错
 */
{
  // Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator
  // 函数的prototype对象上的方法
  {
    // function* g() {}
  /*  g.prototype.hello = function () {
      return 'hi!';
    };
    let obj = g();
    console.log(obj instanceof g);
    console.log(obj.hello());*/
    // 上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。
    // 但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象
    {
     /* function* g() {
        this.a = 11;
      }
      let obj = g();
      console.log(obj.next());
      console.log(obj.a);*/
      // 上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性
    }
  }

  // Generator 函数也不能跟new命令一起用，会报错
  {
    /*function* F() {
      yield this.x = 2;
      yield this.y = 3;
    }
    new F() */// 报错
    // 上面代码中，new命令跟构造函数F一起使用，结果报错，因为F不是构造函数
  }

  // 那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得
  // 正常的this？下面是一个变通方法。首先，生成一个空对象，使用call方法绑定 Generator 函数
  // 内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
  {
    /*function* F() {
      this.a = 1;
      yield this.b = 2;
      yield this.c = 3;
    }
    var obj = {};
    var f = F.call(obj);
    f.next();  // Object {value: 2, done: false}
    f.next();  // Object {value: 3, done: false}
    f.next();  // Object {value: undefined, done: true}
    obj.a // 1
    obj.b // 2
    obj.c // 3*/
    // 上面代码中，首先是F内部的this对象绑定obj对象，然后调用它，返回一个 Iterator 对象。这个对象执行
    // 三次next方法（因为F内部有两个yield表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑
    // 定在obj对象上了，因此obj对象也就成了F的实例。

    // 上面代码中，执行的是遍历器对象f，但是生成的对象实例是obj，有没有办法将这两个对象统一呢？
    // 一个办法就是将obj换成F.prototype，在其原型上绑定属性
    {
     /* function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
      }
      var f = F.call(F.prototype);

      f.next();  // Object {value: 2, done: false}
      f.next();  // Object {value: 3, done: false}
      f.next();  // Object {value: undefined, done: true}

      f.a // 1
      f.b // 2
      f.c // 3*/
     // 再将F改成构造函数，就可以对它执行new命令了。
      {
        /*function* gen() {
          this.a = 1;
          yield this.b = 2;
          yield this.c = 3;
        }

        function F() {
          return gen.call(gen.prototype);
        }

        var f = new F();

        f.next();  // Object {value: 2, done: false}
        f.next();  // Object {value: 3, done: false}
        f.next();  // Object {value: undefined, done: true}

        f.a // 1
        f.b // 2
        f.c // 3*/
      }
    }
  }
}
