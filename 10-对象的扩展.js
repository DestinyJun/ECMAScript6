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
 */
