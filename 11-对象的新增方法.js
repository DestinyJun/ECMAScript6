/**
 * Object.is()
 * ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，
 * 前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，
 * 只要两个值是一样的，它们就应该相等。
 * ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。
 * 它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
 */
  {
  // 基本案例
  {
    // console.log(Object.is('foo', 'foo'));// true
    // console.log(Object.is({}, {})); // false
    // console.log(Object.is(+0, -0)); // false
    // console.log(Object.is(NaN, NaN)); // true
  }

  // ES5 可以通过下面的代码，部署Object.is。
  {
    Object.defineProperty(Object, 'is', {
      value: function(x, y) {
        if (x === y) {
          // 针对+0 不等于 -0的情况
          return x !== 0 || 1 / x === 1 / y;
        }
        // 针对NaN的情况
        return x !== x && y !== y;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
    let a = {
      name: '123',
      showName(name) {
        console.log(name);
      }
    };
    // a.showName('456')
  }
}

/**
 * Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
 * （1）Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
 * （2）如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
 * （3）如果只有一个参数，Object.assign会直接返回该参数。
 * （4）如果该参数不是对象，则会先转成对象，然后返回。
 * （5）由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
 * （6）方法实行的是浅拷贝，而不是深拷贝
 * （7）要复制的值是一个取值函数，那么将求值后再复制。
 */
{
  // 如果该参数不是对象，则会先转成对象，然后返回。
  {
    let a = Object.assign(2);
    // console.log(a);
  }
}

/**
 * Object.assign方法的应用
 */
{
  // 为对象添加属性
  {
    class Point {
      constructor(x, y) {
        Object.assign(this, {x:x, y:y});
      }
    }
    let a = new Point('name','文君');
    // console.log(a);
  }

  // 为对象添加方法，三种写法等价
  {
    class SomeClass {}
    // 第一种写法
    Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {},
      anotherMethod() {}
    });
    // 第二种写法
    SomeClass.prototype.someMethod1 = function (arg1, arg2) {
    };
    SomeClass.prototype.anotherMethod2 = function () {
    };
  }

  // 克隆对象
  {
    function clone(origin) {
      return Object.assign({}, origin);
    }
  }

  // 要保持继承链克隆对象，可以采用下面的代码
  {
    function clone1(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    }
  }

  // 合并多个对象
  {
    const merge = (target, ...sources) => (Object.assign(target, ...sources));
    let a = merge({},{a:1,b:2},{c:3,b:4});
    // console.log(a);
  }

  // 为属性指定默认值
  {
    const DEFAULTS = {
      logLevel: 0,
      outputFormat: 'html'
    };

    /**
     * @param options
     * 注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，
     * 不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。
     */
    function processContent(options) {
      options = Object.assign({}, DEFAULTS, options);
      // console.log(options);
    }
  }
}

/**
 * Object.getOwnPropertyDescriptors()方法
 * ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。
 * ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。
 * 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
 */
{
  // 基本案例
  {
    const obj = {
      foo: 123,
      get bar() { return 'abc' }
    };
    Object.getOwnPropertyDescriptors(obj)
  }

  // 该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
  {
    const source = {
      set foo(value) {
        console.log(value);
      }
    };

    const target1 = {};
    Object.assign(target1, source);
    Object.getOwnPropertyDescriptor(target1, 'foo');
    /**
     * 上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，
     * 结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
     */
    const source2 = {
      set foo(value) {
        console.log(value);
      }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source2));
    // Object.getOwnPropertyDescriptor(target2, 'foo')
    // console.log(target2);
    const clone = Object.create(Object.getPrototypeOf(source2),
    Object.getOwnPropertyDescriptors(source2));
    // console.log(source2);
  }

  // 继承对象的多种写法
  {
    let prot = {
      name: '文君'
    };
    // 浏览器版本
    {
      const obj1 = {
        __proto__: prot,
        foo: 123,
      };
      // console.log(obj1.__proto__);
    }

    // nodejs环境
    {
      // 第一种写法
      const obj2 = Object.create(prot);
      obj2.foo = 123;
      // console.log(obj2.__proto__);

      // 第二种写法
      {
        const obj3 = Object.assign(
          Object.create(prot),
          {
            foo: 123,
          }
        );
      }

      // 第三种写法
      {
        const obj = Object.create(
          prot,
          Object.getOwnPropertyDescriptors({
            foo: 123,
          })
        );
      }
    }
  }

  // 实现 Mixin（混入）模式。（不懂）
  {

  }
}

/**
 * JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。
 * （1）__proto__属性
 * （2）Object.setPrototypeOf()
 * （3）Object.getPrototypeOf()
 */
{
  /**
   * __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。
   * 实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下
   * 该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，
   * 说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，
   * 才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，
   * 而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的操作代替:
   * （1）Object.setPrototypeOf()（写操作）
   * （2）Object.getPrototypeOf()（读操作）
   * （3）Object.create()（生成操作）
   */

  /**
   * Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，
   * 返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
   * （1）由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
   */
  {
    let a = {
      name: '文君'
    };
    Object.setPrototypeOf(a,{age: 18});
    // console.log(a.__proto__.age);
  }

  /**
   * Object.getPrototypeOf()方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
   */
  {
    let proto = {};
    let a = {
      name: 'wwenjun'
    };
    Object.setPrototypeOf(a,proto);
    proto.age = 18;
    // console.log(Object.getPrototypeOf(a));
  }
}

/**
 * Object.keys()，Object.values()，Object.entries()
 */
{
  /**
   * Object.keys()
   * ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
   */
  {
    var obj = { foo: 'bar', baz: 42 };
    Object.keys(obj)
  }

  /**
   * Object.values
   * Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
   * 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
   * Object.values只返回对象自身的可遍历属性。
   * Object.values会过滤属性名为 Symbol 值的属性。
   * 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
   * 于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
   */

  /**
   * Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
   * （1）除了返回值不一样，该方法的行为与Object.values基本一致。
   * （2）如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
   * （3）Object.entries的基本用途是遍历对象的属性。
   * （4）Object.entries方法的另一个用处是，将对象转为真正的Map结构。
   */
  {
    // 基本使用
    {
      const obj = { foo: 'bar', baz: 42 };
      Object.entries(obj);
      // [ ["foo", "bar"], ["baz", 42] ]
    }

    // Object.entries方法的另一个用处是，将对象转为真正的Map结构。
    {
      const obj = { foo: 'bar', baz: 42 };
      const map = new Map(Object.entries(obj)); // Map { foo: "bar", baz: 42 }
    }
  }

  /**
   * Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
   * （1）该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
   * （2）该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
   */
  {
    // 基本案例
    {
      Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
      ])
    // { foo: "bar", baz: 42 }
    }

    // 将 Map 结构转为对象。
    {
      const map = new Map().set('foo', true).set('bar', false);
      // Object.fromEntries(map)// { foo: true, bar: false }
    }

    // 配合URLSearchParams对象，将查询字符串转为对象。
    {
      // console.log(Object.fromEntries(new URLSearchParams('foo=bar&baz=qux')));
    }
  }
}

