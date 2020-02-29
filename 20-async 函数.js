/**
 * ES2017 标准引入了 async 函数，使得异步操作变得更加方便。async 函数是什么？一句话，
 * 它就是 Generator 函数的语法糖。本质就是把异步变同步
 * （1）async 函数是什么？一句话，它就是 Generator 函数的语法糖。async函数就是将 Generator
 * 函数的星号（*）替换成async，将yield替换成await，仅此而已。
 * （2）async函数对 Generator 函数的改进，体现在以下四点：
 * ----A:内置执行器：Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。
 * 也就是说，async函数的执行，与普通函数一模一样，只要一行。
 * ----B:更好的语义：async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，
 * await表示紧跟在后面的表达式需要等待结果。
 * ----C:更广的适用性：co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的
 * await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即
 * resolved 的 Promise 对象）。
 * ----D:返回值是 Promise：async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator
 * 对象方便多了。你可以用then方法指定下一步的操作。进一步说，async函数完全可以看作多个异步操作，包装
 * 成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
 */
{
  // async 函数是什么？一句话，它就是 Generator 函数的语法糖。
  {
   /* const fileName = 'README.md';
    const co = require('co');
    const fs = require('fs');
    const readFile = function (fileName) {
      return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
          if (error) return reject(error);
          resolve(data);
        });
      });
    };*/
    /*const gen = function* () {
      const f1 = yield readFile(fileName);
      const f2 = yield readFile(fileName);
      console.log(f1.toString());
      console.log(f2.toString());
    };*/
    // co(gen);
    // 上面代码的函数gen可以写成async函数，就是下面这样。一比较就会发现，async函数
    // 就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
    {
      /*const asyncReadFile = async function() {
        const f1 = await readFile(fileName);
        const f2 = await readFile(fileName);
        // console.log(f1.toString());
        // console.log(f2.toString());
        return [f1.toString(),f2.toString()];
      };
      // Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，
      // 与普通函数一模一样，只要一行。
      asyncReadFile()
        .then(function (resole) {
          console.log(resole);
        })
        .catch(err=> console.log(err));*/
      // 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要
      // 调用next方法，或者用co模块，才能真正执行，得到最后结果。
    }
  }
}

/**
 * 基本用法：
 * （1）async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会
 * 先返回，等到异步操作完成，再接着执行函数体内后面的语句。
 * （2）async 函数有多种使用形式
 */
{
  // 基础案例
  {
    /*async function getStockPriceByName(name) {
      const symbol = await getStockSymbol(name);
      const stockPrice = await getStockPrice(symbol);
      return stockPrice;
    }
    getStockPriceByName('goog').then(function (result) {
      console.log(result);
    });*/
    // 上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。
    // 调用该函数时，会立即返回一个Promise对象。

    // 下面是另一个例子，指定多少毫秒后输出一个值
    {
     /* function timeout(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
        // return value
      }*/
      // asyncPrint('hello world', 50);
      // 上面代码指定 50 毫秒以后，输出hello world

      // 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。
      {
       /* async function timeout1(ms) {
          await new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }
        async function asyncPrint1(value, ms) {
          await timeout1(ms);
          console.log(value);
        }
        asyncPrint1('hello world', 50);*/
      }
    }
  }

  // async 函数有多种使用形式
  {
    // 函数声明
    // async function foo0() {}

    // 函数表达式
    // const foo1 = async function () {};

    // 对象的方法
    // let obj = {
    //   async foo3() {}
    // };
    // obj.foo3().then();

    // Class 的方法
    /*class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }
      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }*/

   /* const storage = new Storage();
    storage.getAvatar('jake').then();*/

    // 箭头函数
    // const foo = async () => {};
  }
}

/**
 * 语法：async函数的语法规则总体上比较简单，难点是错误处理机制
 * （1）返回 Promise 对象：async函数返回一个 Promise 对象，async函数内部return语句返回的值，会成为then方法
 * 回调函数的参数
 * （2）async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函
 * 数接收到。
 * （3）Promise 对象的状态变化：async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，
 * 才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then
 * 方法指定的回调函数。
 * （4）await 命令：正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，
 * 就直接返回对应的值。
 * （5）另一种情况是，await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于（转换为）
 * Promise 对象
 * （6）await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
 * （7）任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
 * （8）有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch
 * 结构里面，这样不管这个异步操作是否成功，第二个await都会执行。另一种方法是await后面的 Promise 对象再跟一个
 * catch方法，处理前面可能出现的错误。
 */
{
  // async函数返回一个 Promise 对象，async函数内部return语句返回的值，会成为then方法回调函数的参数
  {
   /* async function f() {
      return 'hello world';
    }
    f().then(v => console.log(v))*/
  }

  // async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接
  // 收到。
  {
   /* async function f() {
      throw new Error('出错了');
    }
    f().then(
      v => console.log(v),
      e => console.log(e)
    )*/
  }

  // async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇
  // 到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
  {
   /* const fetch = require('node-fetch');
    async function getTitle(url) {
      let response = await fetch(url);
      let html = await response.text();
      return html.match(/<title>([\s\S]+)<\/title>/i)[1];
    }
    getTitle('https://tc39.github.io/ecma262/').then(console.log)*/
    // 上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行
    // then方法里面的console.log。
  }

  // 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
  {
    /*async function f() {
      // 等同于
      // return 123;
      return await 123;
    }
    f().then(v => console.log(v))*/
    // 面代码中，await命令的参数是数值123，这时等同于return 123。
  }

  // 另一种情况是，await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。
  {
    /*class Sleep {
      constructor(timeout) {
        this.timeout = timeout;
      }
      then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(
          () => resolve(Date.now() - startTime),
          this.timeout
        );
      }
    }
    (async () => {
      // await会将new Sleep这个thenable对象转为 Promise 对象，然后并立即执行thenable对象的t里面的hen方法。
      const sleepTime = await new Sleep(1000);
      console.log(sleepTime);
    })();*/
    // 上面代码中，await命令后面是一个Sleep对象的实例。这个实例不是 Promise 对象，但是因为定义了then方法，
    // await会将其视为Promise处理。

    // 这个例子还演示了如何实现休眠效果。JavaScript 一直没有休眠的语法，但是借助await命令就可以让程序停顿指
    // 定的时间。下面给出了一个简化的sleep实现。
    {
      /*function sleep(interval) {
        return new Promise(resolve => {
          setTimeout(resolve, interval);
        })
      }
      // 用法
      async function one2FiveInAsync() {
        for(let i = 1; i <= 5; i++) {
          console.log(i);
          await sleep(1000);
        }
      }
      one2FiveInAsync();*/
    }
  }

  // await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
  {
    /*async function f() {
      await Promise.reject('出错了');
    }
    f()
      .then(v => console.log(v))
      .catch(e => console.log(e))  */  // 出错了
    // 注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。
    // 这里如果在await前面加上return，效果是一样的。
  }

  // 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
  {
    /*async function f() {
      await Promise.reject('出错了');
      await Promise.resolve('hello world'); // 不会执行
    }*/
    // 上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。
  }

  // 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构
  // 里面，这样不管这个异步操作是否成功，第二个await都会执行。
  {
    /*async function f() {
      try {
        await Promise.reject('出错了');
      } catch(e) {
      }
      return await Promise.resolve('hello world');
    }
    f()
      .then(v => console.log(v))*/
  }

  // 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
  {
    /*async function f() {
      await Promise.reject('出错了')
        .catch(e => console.log(e));
      return await Promise.resolve('hello world');
    }
    f()
      .then(v => console.log(v))*/
  }
}

/**
 * 错误处理：
 * （1）如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
 */
{
  // 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
  {
  /*  async function f() {
      await new Promise(function (resolve, reject) {
        throw new Error('出错了');
      });
    }
    f()
      .then(v => console.log(v))
      .catch(e => console.log(e))*/// Error：出错了
    // 上面代码中，async函数f执行后，await后面的 Promise 对象会抛出一个错误对象，导致catch方法
    // 的回调函数被调用，它的参数就是抛出的错误对象。具体的执行机制，可以参考后文的“async 函
    // 数的实现原理”，防止出错的方法，也是将其放在try...catch代码块之中。
    {
      /*async function f() {
        try {
          await new Promise(function (resolve, reject) {
            throw new Error('出错了');
          });
        } catch(e) {
        }
        return await('hello world');
      }
      f()
        .then(value => console.log(value))
        .catch(err=> console.log(err))*/
    }

    // 如果有多个await命令，可以统一放在try...catch结构中。
    {
     /* async function main() {
        try {
          const val1 = await firstStep();
          const val2 = await secondStep(val1);
          const val3 = await thirdStep(val1, val2);
          console.log('Final: ', val3);
        }
        catch (err) {
          console.error(err);
        }
      }*/
    }

    // 下面的例子使用try...catch结构，实现多次重复尝试
    {
      /*const superagent = require('superagent');
      const NUM_RETRIES = 3;
      async function test() {
        let i;
        for (i = 0; i < NUM_RETRIES; ++i) {
          try {
            await superagent.get('http://google.com/this-throws-an-error');
            break;
          } catch(err) {}
        }
        console.log(i); // 3
      }
      test();*/
      // 上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。
    }
  }
}

/**
 * 使用注意点：
 * （1）第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放
 * 在try...catch代码块中。
 * （2）第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
 * （3）第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错
 * （4）第四点，async 函数可以保留运行堆栈
 */
{
  // 前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在
  // try...catch代码块中
  {
   /* async function myFunction() {
      try {
        await somethingThatReturnsAPromise();
      } catch (err) {
        console.log(err);
      }
    }
    // 另一种写法
    async function myFunction1() {
      await somethingThatReturnsAPromise()
        .catch(function (err) {
          console.log(err);
        });
    }*/
  }

  // 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
  {
    /*let foo = await getFoo();
    let bar = await getBar();
    // 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较
    // 耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
    {
      // 写法一
      let [foo, bar] = await Promise.all([getFoo(), getBar()]);
      // 写法二
      let fooPromise = getFoo();
      let barPromise = getBar();
      let foo = await fooPromise;
      let bar = await barPromise;
      // 上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。
    }*/
  }

  // 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错
  {
    /*async function dbFuc(db) {
      let docs = [{}, {}, {}];
      // 报错
      docs.forEach(function (doc) {
        await db.post(doc);
      });
      // 上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。
      {
        /!*function dbFuc(db) { //这里不需要 async
          let docs = [{}, {}, {}];
          // 可能得到错误结果
          docs.forEach(async function (doc) {
            await db.post(doc);
          });
        }*!/
        // 上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。
        // 正确的写法是采用for循环。
        {
          /!*async function dbFuc(db) {
            let docs = [{}, {}, {}];
            for (let doc of docs) {
              await db.post(doc);
            }
          }*!/
        }
      }
    }*/
  }

  // 如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。
  {
   /* async function dbFuc1(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));

      let results = await Promise.all(promises);
      console.log(results);
    }
    // 或者使用下面的写法
    async function dbFuc2(db) {
      let docs = [{}, {}, {}];
      let promises = docs.map((doc) => db.post(doc));
      let results = [];
      for (let promise of promises) {
        results.push(await promise); // 先执行await promise，再把结果推进results，这个写法容易晕
      }
      console.log(results);
    }*/
  }

  // 第四点，async 函数可以保留运行堆栈
  {
  /*  const a = () => {
      b().then(() => c());
    };*/
    // 上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。
    // 等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。如果b()或c()报错，错
    // 误堆栈将不包括a()。现在将这个例子改成async函数：
    {
     /* const a = async () => {
        await b();
        c();
      };*/
      // 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。
    }
  }
}

/**
 * async 函数的实现原理：
 * （1）async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
 */
{
  // async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
  {
    /*async function fn(args) {
      // ...
    }
    // 等同于
    function fn(args) {
      return spawn(function* () {
        // ...
      });
    }*/
    // 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。
    // 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。
    {
      /*function spawn(genF) {
        return new Promise(function(resolve, reject) {
          const gen = genF();
          function step(nextF) {
            let next;
            try {
              next = nextF();
            } catch(e) {
              return reject(e);
            }
            if(next.done) {
              return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v) {
              step(function() { return gen.next(v); });
            }, function(e) {
              step(function() { return gen.throw(e); });
            });
          }
          step(function() { return gen.next(undefined); });
        });
      }*/
    }
  }
}

/**
 * 与其他异步处理方法的比较：
 * （1）
 */
{
  // 我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。假定某个 DOM 元素上面，
  // 部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，
  // 返回上一个成功执行的动画的返回值。

  // 首先是 Promise 的写法
  {
    /*function chainAnimationsPromise(elem, animations) {
      // 变量ret用来保存上一个动画的返回值
      let ret = null;
      // 新建一个空的Promise
      let p = Promise.resolve();
      // 使用then方法，添加所有动画
      for(let anim of animations) {
        p = p.then(function(val) {
          ret = val;
          return anim(elem);
        });
      }
      // 返回一个部署了错误捕捉机制的Promise
      return p
        .catch(function(e) {
          /!* 忽略错误，继续执行 *!/
        })
        .then(function() {
        return ret;
      });
    }*/
    // 虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（then、catch等等），
    // 操作本身的语义反而不容易看出来。
  }

  // 接着是 Generator 函数的写法
  {
   /* function chainAnimationsGenerator(elem, animations) {
      return spawn(function*() {
        let ret = null;
        try {
          for(let anim of animations) {
            ret = yield anim(elem);
          }
        } catch(e) {
          /!* 忽略错误，继续执行 *!/
        }
        return ret;
      });
    }*/
    // 上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在spawn
    // 函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就
    // 是自动执行器，它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个 Promise。
  }

  // 最后是 async 函数的写法
  {
   /* async function chainAnimationsAsync(elem, animations) {
      let ret = null;
      try {
        for(let anim of animations) {
          ret = await anim(elem);
        }
      } catch(e) {
        /!* 忽略错误，继续执行 *!/
      }
      return ret;
    }*/
    // 可以看到 Async 函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。它将 Generator 写法中的
    // 自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。如果使用 Generator 写法，自动执行
    // 器需要用户自己提供。
  }
}

/**
 * 实战：按顺序完成异步操作（不太懂）
 */
{
  // 实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后
  // 按照读取的顺序输出结果。
  {
   /* function logInOrder(urls) {
      // 远程读取所有URL
      const textPromises = urls.map(url => {
        return fetch(url)
          .then(
            response => response.text()
          );
      });

      // 按次序输出
      textPromises.reduce((chain, textPromise) => {
        return chain
          .then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());

      // 上面代码使用fetch方法，同时远程读取一组 URL。每个fetch操作都返回一个 Promise 对象，
      // 放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，
      // 将所有 Promise 对象连起来，因此就可以依次输出结果。

      // 这种写法不太直观，可读性比较差。下面是 async 函数实现。
      {
        /!*async function logInOrder(urls) {
          for (const url of urls) {
            const response = await fetch(url);
            console.log(await response.text());
          }
        }*!/
        // 上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去
        // 读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
        {
          /!*async function logInOrder(urls) {
            // 并发读取远程URL
            const textPromises = urls.map(async url => {
              const response = await fetch(url);
              return response.text();
            });
            // 按次序输出
            for (const textPromise of textPromises) {
              console.log(await textPromise);
            }
            // 上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部
            // 是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。
          }*!/
        }
      }
    }*/
  }
}

/**
 * 顶层 await：（以后再说）
 * （1）根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。
 */
{
  // 根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。
  {
    // 报错
    // const data = await fetch('https://api.example.com');
  }
}
