/**
 * 属性的简洁表示法
 * ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
 */
{
  // 属性简洁表示的基本案例
  {
    let a = {
      name:'文君',
      showName: function () {
        console.log(this.name);
      }
    };
    // a.showName();
    const foo = 'bar';
    let b = {foo:foo};
    // console.log(b);
  /*  function cc(x,y) {
      return {x,y}
    }*/
    // console.log(f(1,2));
  }

  // 方法简洁表示的基本案例
  {
    let a = {
      method() {
        console.log( 'hello');
      }
    };
    let b = {
      method: function () {
        console.log( 'hello');
      }
    };
    // a和b的表示方式是等价的
    // a.method();
    // b.method();
  }

  // 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
  {
    // 暂时搞不懂
    const cart = {
      _wheel: 4,
      get wheels() {
        console.log(this._wheel);
      },
      set wheels(value) {
        if (value < this._wheel) {
          throw new Error('数值太小了')
        }
        this._wheel = value
      }
    };
  }

  // 简洁写法在打印对象时也很有用
  {
    let user = {
      name: 'test'
    };
    let foo = {
      bar: 'baz'
    };
    // console.log(user, foo);
  // {name: "test"} {bar: "baz"}
  //   console.log({user, foo});
  // {user: {name: "test"}, foo: {bar: "baz"}}
  }

  // 简写的对象方法不能用作构造函数，会报错。
  {
    function f() {
      this.name = '123';
      this.showName = function () {
        console.log(this.name);
      }
    }
    // new f().showName();
  }
}

/**
 * 属性名表达式
 * 字面量方式定义对象也即是使用{}定义对象
 */
{
  // JavaScript 定义对象的属性的两种方法。
  {
    let obj = {};
    obj.foo = true; // 第一种：.语法定义
    obj['a' + 'bc'] = 123; // 第二种,[]语法定义
    // console.log(obj);
  }

  // 字面量方式定义对象
  {
    let propKey = 'foo';
    let a = {
      [propKey]: true,
      ['a' + 'bc']: 123,
    };
    // console.log(a);
  }
}

/**
 * 方法的 name 属性
 * 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
 */
{
  // 基本案例
  {
    const person = {
      sayName() {
        console.log('hello!');
      },
    };
    // console.log(person.sayName.name);
  }

  // Function构造函数创造的函数，name属性返回anonymous。
  // 有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；
  {
    // console.log((new Function()).name);
    let doSomething = function() {
     console.log('doSomething');
    };
    // console.log(doSomething.bind().name);
  }
}

/**
 * 属性的可枚举性和遍历
 * 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。
 * Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
 */
{
  // 属性的可枚举基本案例
  {
    /**
     * 描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
     * 如如果为false，就会不被遍历到
     * for...in循环：只遍历对象自身的和继承的可枚举的属性。
     * Object.keys()：返回对象自身的所有可枚举的属性的键名。
     * JSON.stringify()：只串行化对象自身的可枚举的属性。
     * Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
     * 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。
     * @type {{name: number}}
     */
    let a = {name: 123,age: 18};
    // console.log(Object.getOwnPropertyDescriptor(a,'name'));
    // console.log(Object.keys(a));
  }
}

/**
 * 属性的遍历
 * for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
 * Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
 * Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
 * Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
 * Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
 * 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则：
 * -首先遍历所有数值键，按照数值升序排列。
 * -其次遍历所有字符串键，按照加入时间升序排列。
 * -最后遍历所有 Symbol 键，按照加入时间升序排列。
 */

/**
 * super 关键字
 * this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
 * 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
 * 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。function字段以及箭头函数都会被认为是函数而不是对象的方法
 */
{
  // 基本案例
  {
    const proto = {
      foo: 'hello'
    };
    const obj = {
      foo: 'world',
      find() {
        return super.foo;
      },
      show() {
        return this.foo;
      }
    };
    Object.setPrototypeOf(obj, proto);
    // console.log(obj.find()); // "hello"
    // console.log(obj.show()); // "world"
  }
}

/**
 * 对象的解构赋值
 */
