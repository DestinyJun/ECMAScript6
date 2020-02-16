/**
 * JavaScript 语言中，生成实例对象的传统方法是通过构造函数。
 *  （1）ES6 的类，完全可以看作构造函数的另一种写法。
 */
{
  // 构造函数（函数里面有属性就是构造函数）
  {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  /**
   * Class方式定义类（就是一个语法糖）
   * （1）可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法。
   * （2）Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
   * 另外，方法之间不需要逗号分隔，加了会报错。
   * （3）ES6 的类，完全可以看作构造函数的另一种写法。
   * （4）类的数据类型就是函数，类本身就指向构造函数。
   */
  {
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }
  }

  // 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。\
  {
    class Point {
      constructor() {}
      toString() {}
      toValue() {}
    }
    // 等同于
    Point.prototype = {
      constructor() {},
      toString() {},
      toValue() {},
    };
  }

  // 在类的实例上面调用方法，其实就是调用原型上的方法。
  {
    class B {}
    let b = new B();
    // console.log(b.constructor === B.prototype.constructor);     // true
  }

  // 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
  {
    class Point {
      constructor(){
        // ...
      }
    }
    Object.assign(Point.prototype, {
      toString(){},
      toValue(){}
    });
  }

  // prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
  {
    class Point {
      constructor(){
        // ...
      }
    }
    // console.log(Point.prototype.constructor === Point);     // true
  }

  // 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）,
  {
    class Point {
      constructor(x, y) {}
      toString() {}
    }
    Object.keys(Point.prototype);// []
    Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
  }

  // 如果采用ES5的写法定义类，其原型对象上的方法就是可枚举的
  {
    var Point = function (x, y) {};
    Point.prototype.toString = function() {};
    Object.keys(Point.prototype); // ["toString"]
    Object.getOwnPropertyNames(Point.prototype);// ["constructor","toString"]
  }
}

/**
 * constructor 方法：
 * （1）constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，
 * 如果没有显式定义，一个空的constructor方法会被默认添加。
 * （2）constructor方法默认返回实例对象（即this），当然完全可以自己指定返回另外一个对象。
 * （3）类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
 */
{
  // 基本案例
  {
    class Point1 {
    }
    // 等同于
    class Point2 {
      constructor() {}
    }
  }
}

/**
 * 类的实例：
 * （1）生成类的实例的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。
 * （2）与 ES5 一样，类的所有实例共享一个原型对象。
 */

/**
 * 取值函数（getter）和存值函数（setter）
 * （1）ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
 * （2）存值函数和取值函数是设置在属性的 Descriptor 对象上的。
 */
{
  // 基础案例
  {
    class MyClass {
      constructor() {}
      get prop() {
        return prop;
      }
      set prop(value) {
        return value
      }
    }
    let inst = new MyClass();
  }
}

/**
 * 属性表达式：类的属性名，可以采用表达式。
 */
{
  // 基础案例
  {
    let methodName = 'getArea';
    class Square {
      constructor(length) {}
      [methodName]() {
        console.log('123');
      }
    }
    let a = new Square(3);
    // a[methodName]();
  }
}

/**
 * Class 表达式：
 * （1）与函数一样，类也可以使用表达式的形式定义。
 */
{
  // 基本案例
  {
    // 下面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
    const MyClass = class Me {
      getClassName() {
        return Me.name;
      }
    };

    // 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
    const MyClass1 = class { /* ... */ };
  }

  // 采用 Class 表达式，可以写出立即执行的 Class。
  {
    let person = new class {
      constructor(name) {
        this.name = name;
      }

      sayName() {
        console.log(this.name);
      }
    }('张三');
    // person.sayName(); // "张三"
  }
}

/**
 * 严格模式：
 * 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
 * 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
 */

/**
 * 不存在提升：
 * （1）类不存在变量提升（hoist），这一点与 ES5 完全不同。（因为需要实现类的继承）
 */

/**
 * name 属性：
 * （1）本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
 * （2）name属性总是返回紧跟在class关键字后面的类名。
 */
{
  class Point {}
  Point.name // "Point"
}

/**
 * Generator 方法：如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
 */
{
  /**
   * Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。
   * Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
   */
  class Foo {
    constructor(...args) {
      this.args = args;
    }
    * [Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }

  for (let x of new Foo('hello', 'world')) {
    // console.log(x);
  }
}

/**
 * this 的指向：
 * （1）类的方法内部如果含有this，它默认指向类的实例。
 */
{
  // 案例
  {
    /**
     * 下面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，
     * this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
     */
    class Logger {
      printName(name = 'there') {
        this.print(`Hello ${name}`);
      }

      print(text) {
        console.log(text);
      }
    }

    const logger = new Logger();
    const { printName } = logger;
    // printName(); // TypeError: Cannot read property 'print' of undefined

    // 如何解决上面的问题？一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
    {
      class Logger {
        constructor() {
          this.printName = this.printName.bind(this);
        }

        // ...
      }
    }

    // 另一种解决方法是使用箭头函数。
    {
      /**
       * 箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，
       * 它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。
       */
      class Obj {
        constructor() {
          this.getThis = () => this;
        }
      }

      const myObj = new Obj();
      // myObj.getThis() === myObj // true
    }

    // 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。（第一处不太懂）
    {
      function selfish (target) {
        const cache = new WeakMap();
        const handler = {
          get (target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
              return value;
            }
            if (!cache.has(value)) {
              cache.set(value, value.bind(target));
            }
            return cache.get(value);
          }
        };
        const proxy = new Proxy(target, handler);
        return proxy;
      }

      const logger = selfish(new Logger());
    }
  }
}

/**
 *静态方法：
 * （1）类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，
 * 就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
 * （2）如果静态方法包含this关键字，这个this指的是类，而不是实例。
 * （3）静态方法可以与非静态方法重名。
 * （4）父类的静态方法，可以被子类继承。
 * （5）静态方法也是可以从super对象上调用的
 * （6）类的静态方法相对于类的原型对象，是一个特殊的存在，只需要基础类的静态方法不能被类的实例调用，
 * 也不能被类的原型对象调用，只能被类自身调用即可
 * （7）类的普通方法是定义在类的原型上的，不是直接属于类，所以类不能直接调用，但是字面量的定义的对象就可以
 * （8）static关键字时class独有的，字面量方式定义的对象或者构造函数番薯里面都不能使用
 */
{
  // 静态方法不会被类的实例继承
  {
    class Foo {
      static classMethod() {
        return 'hello';
      }
    }
    // console.log(Foo.classMethod());// 'hello'
    // var foo = new Foo();
    // foo.classMethod()
  }

  /**
   * 如果静态方法包含this关键字，这个this指的是类，而不是实例。
   * 静态方法可以与非静态方法重名。
   */
  {
    class Foo {
      static bar() {
        this.baz();
      }
      static baz() {
        console.log('hello');
      }
      baz() {
        console.log('world');
      }
    }
    // Foo.bar() // hello
  }

  // 父类的静态方法，可以被子类继承。
  {
    class Foo {
      static classMethod() {
        console.log('hello');
      }
    }
    class Bar extends Foo {}
    // Bar.classMethod() // 'hello'
  }

  // 静态方法也是可以从super对象上调用的
  {
    class Foo {
      static classMethod() {
        return 'hello';
      }
      showName() {
        console.log('文君');
      }
    }
    class Bar extends Foo {
      static classMethod() {
        console.log(super.classMethod() + ', too');
      }

    }
    // Bar.classMethod();
  }
}

/**
 * 实例属性的新写法：
 * （1）实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
 * （2）定义在类的最顶层上面的属性无需加this
 */
{
  // 基本案例
  {
    class foo {
      // bar = 'hello';
      // baz = 'world';

      constructor() {
        this.bar = 0
        // ...
      }
    }
  }
}

/**
 * 静态属性：
 * （1）静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
 */
{
  // 基础案例
  {
    /**
     * 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，
     * 没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字。
     */
    class Foo {
    }
    Foo.prop = 1;
  }
}

/**
 * new.target 属性：
 *（1）new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
 * 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
 * （2）Class 内部调用new.target，返回当前 Class。
 * （3）需要注意的是，子类继承父类时，new.target会返回子类。
 * （4）注意，在函数外部，使用new.target会报错。
 */
{
  // 基础案例
  {
    // 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
    function Person(name) {
      if (new.target !== undefined) {
        this.name = name;
      } else {
        throw new Error('必须使用 new 命令生成实例');
      }
    }

    // Class 内部调用new.target，返回当前 Class。
    {
      class Rectangle {
        constructor(length, width) {
          console.log(new.target === Rectangle);
          this.length = length;
          this.width = width;
        }
      }
      var obj = new Rectangle(3, 4); // 输出 true
    }

    // 需要注意的是，子类继承父类时，new.target会返回子类。利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
    {
      class Rectangle {
        constructor(length, width) {
          console.log(new.target === Rectangle);
          // ...
        }
      }
      class Square extends Rectangle {
        constructor(length,width) {
          super(length, width);
        }
      }
      var obj = new Square(3,3); // 输出 false
    }
  }
}
