/**
 * ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
 * （1）Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。
 * （2）凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
 * （3）由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
 * （4）Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
 * （5）如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
 * （6）Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
 * （7）Symbol 值可以显式转为字符串。
 * （8）Symbol 值也可以转为布尔值，但是不能转为数值。
 */
{
  // 基本案例
  {
    let s = Symbol();
    let b = Symbol();
    // console.log(s===b);
  }

  // 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
  {
    let a = {
      name: 'wenjun',
      toString() {
        return 'abc'
      }
    };
    // console.log(Symbol(a));
  }

  // Symbol 值可以显式转为字符串。
  {
    let sym = Symbol('My symbol');
    // console.log(String(sym));  // 'Symbol(My symbol)'
    // console.log( sym.toString()); // 'Symbol(My symbol)'

  }

  // Symbol 值也可以转为布尔值，但是不能转为数值。
  {
    let sym = Symbol();
    // console.log(Boolean(sym) );  // true
    // console.log(!sym); // false
  }
}

/**
 * Symbol.prototype.description：直接返回 Symbol 的描述。
 */
{
  const sym = Symbol('foo');
  // console.log(sym.description);  // 没实现
}

/**
 * 作为属性名的 Symbol
 * 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
 * 这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
 * （1）Symbol 值作为对象属性名时，不能用点运算符，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，
 * 导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
 * （2）Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的
 * （3）Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
 */
{
  // 以下代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。
  {
    let s = Symbol();
    let obj = {
      [s]: function (arg) {
        console.log(arg);
      }
    };
    // obj[s](123);
  }

  // Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
  // 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。
  {
    const COLOR_RED    = Symbol();
    const COLOR_GREEN  = Symbol();
    function getComplement(color) {
      switch (color) {
        case COLOR_RED:
          return COLOR_GREEN;
        case COLOR_GREEN:
          return COLOR_RED;
        default:
          throw new Error('Undefined color');
      }
    }
  }
}

/**
 * 实例：消除魔术字符串
 * 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
 */
{
  // 魔术字符串
  {
    function getArea(shape, options) {
      let area = 0;

      switch (shape) {
        case 'Triangle': // 魔术字符串
          area = .5 * options.width * options.height;
          break;
        /* ... more code ... */
      }

      return area;
    }
    getArea('Triangle', { width: 100, height: 100 }); // Triangle就是魔术字符串，耦合性很高
  }

  // 消除魔术字符串，常用的消除魔术字符串的方法，就是把它写成一个变量。
  {
    const shapeType = {
      triangle: 'Triangle'
    };

    function getArea(shape, options) {
      let area = 0;
      switch (shape) {
        case shapeType.triangle:
          area = .5 * options.width * options.height;
          break;
      }
      return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });
  }
}

/**
 * 属性名的遍历
 * （1）Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
 * 但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。
 * （2）该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
 * （3）由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
 */
{
  // 基础案例
  {
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');
    obj[a] = 'Hello';
    obj[b] = 'World';
    const objectSymbols = Object.getOwnPropertySymbols(obj);
    // console.log(objectSymbols);
  }
}

/**
 * Symbol.for()，Symbol.keyFor()
 * （1）有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
 * 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
 * （2）注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
 * （3）Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
 * （4）Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
 */
{
  // 有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。
  {
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');
    // console.log(s1===s2);
  }

  // Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
  {
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1); // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2); // undefined
  }

  // 注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
  {
    /**
     * 下面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。
     * 所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值。
     * @returns {symbol}
     */
    function foo() {
      return Symbol.for('bar');
    }

    const x = foo();
    const y = Symbol.for('bar');
    // console.log(x === y); // true
  }

}

/**
 * 实例：模块的 Singleton 模式
 * （1）Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
 * （2）对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？很容易想到，可以把实例放到顶层对象global。
 */

/**
 * 内置的 Symbol 值：除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
 * （1）对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
 * （2）对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
 * （3）对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
 */
{
  // 衍生对象
  {
    class MyArray extends Array {}
    let a = new MyArray(1,2,3);
    for (let i = 0;i<a.length;i++) {
      // console.log(a[i]);
    }
  }

  /**
   * 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。而不是使用默认继承的构造函数来创建对象实例
   * Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，
   * 有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。
   */
  {
    class MyArray extends Array {
      static get [Symbol.species]() { return Array; }
    }

    const a = new MyArray();
    const b = a.map(x => x);
    // console.log( b instanceof MyArray);// false
    // console.log(b instanceof Array); // true
  }
}

/**
 * Symbol.match:对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
 */
{
  /*String.prototype.match(regexp);
  // 等同于
  regexp[Symbol.match](this);

  class MyMatcher {
    [Symbol.match](string) {
      return 'hello world'.indexOf(string);
    }
  }

  'e'.match(new MyMatcher()) // 1*/
}

