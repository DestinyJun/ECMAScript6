/**
 * Proxy：
 * （1）Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），
 * 即对编程语言进行编程。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这
 * 层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来
 * “代理”某些操作，可以译为“代理器”。
 * （2）ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例
 * （3）要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作。如果handler没有设置任何拦
 * 截，那就等同于直接通向原对象（默认就是原对象的操作方式）。
 * （4）个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
 * （5）同一个拦截器函数，可以设置拦截多个操作,对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，
 * 按照原先的方式产生结果。
 * （6）Proxy 支持的拦截操作一览，一共 13 种：
 * ---- get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']；
 * ---- set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值；
 * ---- has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值；
 * ---- deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值；
 * ---- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，
 * 返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性；
 * ---- getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象；
 * ---- defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值；
 * ---- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值；
 * ---- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
 * ---- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值；
 * ---- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截；
 * ---- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)；
 * ---- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)
 */
{
  // ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例
  {
    // var proxy = new Proxy(target, handler);
    // roxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个
    // Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

    // 一个拦截读取属性行为的例子
    {
      var proxy = new Proxy({}, {
        get: function(target, propKey) {
          return 35;
        }
      });
      // console.log( proxy.time);
      // console.log(proxy.name);
      // console.log(proxy.title);
      // 上面代码中，作为构造函数，Proxy接受两个参数。第一个参数是所要代理的目标对象（上例是一个空对象），
      // 即如果没有Proxy的介入，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的
      // 操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个get方法，
      // 用来拦截对目标对象属性的访问请求。get方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于
      // 拦截函数总是返回35，所以访问任何属性都得到35。要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）
      // 进行操作，而不是针对目标对象（上例是空对象）进行操作。如果handler没有设置任何拦截，那就等同于直接通
      // 向原对象。
    }
  }

  // 如果没有设置任何拦截，那就等同于直接通向原对象
  {
    var target = {};
    var handler = {};
    var proxy = new Proxy(target, handler);
    proxy.a = 'b';
    // console.log(target.a);
    // 上面代码中，handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target。
  }

  // 个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
  {
    var object = { proxy: new Proxy(target, handler) };// 似乎没啥用
  }

  // Proxy 实例也可以作为其他对象的原型对象
  {
    var proxy = new Proxy({}, {
      get: function(target, propKey) {
        return 35;
      }
    });
    let obj = Object.create(proxy);
    // console.log( obj.time);
    // 上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链继承的关系，
    // 会在proxy对象上读取该属性，导致被拦截。
  }

  // 同一个拦截器函数，可以设置拦截多个操作
  {
    var handler = {
      get: function(target, name) {
        if (name === 'prototype') {
          return Object.prototype;
        }
        return 'Hello, ' + name;
      }, // 取值操作

      apply: function(target, thisBinding, args) {
        return args[0];
      }, // 调用操作

      construct: function(target, args) {
        return {value: args[1]};
      } // 初始化操作
    };

    var fproxy = new Proxy(function(x, y) {
      return x + y;
    }, handler);
    // console.log(fproxy(1, 2));
    // console.log( new fproxy(1, 2));
    // fproxy.prototype === Object.prototype // true
    // fproxy.foo === "Hello, foo" // true
  }
}

/**
 * Proxy 实例的方法详解：
 * （1）get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身
 * （严格地说，是操作行为所针对的对象），其中最后一个参数可选，如果一个属性不可配置（configurable）且
 * 不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
 */
{
  // get：拦截读取操作，其中get方法的两个参数分别是目标对象和所要访问的属性
  {
    var person = {
      name: "张三"
    };
    var proxy = new Proxy(person, {
      get: function(target, propKey) {
        if (propKey in target) {
          return target[propKey];
        } else {
          throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
        }
      }
    });
    // console.log(proxy.name);// "张三";
    // console.log(proxy.age)// "张三";
    // 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

    // get方法可以继承
    {
      let proto = new Proxy({}, {
        get(target, propertyKey, receiver) {
          // console.log('GET ' + propertyKey);
          return target[propertyKey];
        }
      });
      // let obj = Object.create(proto);
      // console.log(obj.foo);
      // 上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。
    }

    // 使用get拦截，实现数组读取负数的索引
    {
      function createArray(...elements) {
        let handler = {
          get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
              propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
          }
        };

        let target = [];
        target.push(...elements);
        return new Proxy(target, handler);
      }

      let arr = createArray('a', 'b', 'c');
      // console.log( arr[-1]);
      // 上面代码中，数组的位置参数是-1，就会输出数组的倒数第一个成员。
    }

    // 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作
    {
      var pipe = (
        function () {
        return function (value) {
          var funcStack = [];
          var oproxy = new Proxy({} , {
            get : function (pipeObject, fnName) {
              if (fnName === 'get') {
                return funcStack.reduce(function (val, fn) {
                  return fn(val);
                },value);
              }
              funcStack.push(window[fnName]);
              return oproxy;
            }
          });
          return oproxy;
        }
      }()
      );
      var double = n => n * 2;
      var pow    = n => n * n;
      var reverseInt = n => n.toString().split("").reverse().join("") | 0;
      // pipe(3).double.pow.reverseInt.get; // 63
      // 上面代码设置 Proxy 以后，达到了将函数名链式使用的效果。
    }

    // 利用get拦截，实现一个生成各种 DOM 节点的通用函数dom
    {
     /* const dom = new Proxy({}, {
        get(target, property) {
          return function(attrs = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
              el.setAttribute(prop, attrs[prop]);
            }
            for (let child of children) {
              if (typeof child === 'string') {
                child = document.createTextNode(child);
              }
              el.appendChild(child);
            }
            return el;
          }
        }
      });
      const el = dom.div({},
        'Hello, my name is ',
        dom.a({href: '//example.com'}, 'Mark'),
        '. I like:',
        dom.ul({},
          dom.li({}, 'The web'),
          dom.li({}, 'Food'),
          dom.li({}, '…actually that\'s it')
        )
      );*/
      // console.log(el);
    }

    // get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例
    {
      const proxy = new Proxy({}, {
        get: function(target, key, receiver) {
          return receiver;
        }
      });
      // console.log(proxy.getReceiver === proxy); // true
      // 上面代码中，proxy对象的getReceiver属性是由proxy对象提供的，所以receiver指向proxy对象
    }

    // receiver代表proxy 实例本身（严格地说，是操作行为所针对的对象）
    {
      const proxy = new Proxy({}, {
        get: function(target, key, receiver) {
          return receiver;
        }
      });
      const d = Object.create(proxy);
      // console.log(d.a === d); // 这里我操作的是d，所以get拦截后返回的也是d
      // 上面代码中，d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。这时，
      // receiver就指向d，代表原始的读操作所在的那个对象。

      //如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，
      // 否则通过 Proxy 对象访问该属性会报错。
      {
        const target = Object.defineProperties({}, {
          foo: {
            value: 123,
            writable: false,
            configurable: false
          },
        });

        const handler = {
          get(target, propKey) {
            return 'abc';
          }
        };

        const proxy = new Proxy(target, handler);
        // proxy.foo // 这里报错
      }
    }
  }
}
