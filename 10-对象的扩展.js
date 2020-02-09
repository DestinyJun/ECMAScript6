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
 * 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、
 * 但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
 * （1）由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
 * （2）解构赋值必须是最后一个参数，否则会报错。
 * （3）扩展运算符的解构赋值，不能复制继承自原型对象的属性
 */
{
  // 基本案例
  {
    let a = { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    // console.log(a);
  }
  // 案例2
  {
    const o = Object.create({ x: 1, y: 2 });
    // o.z = 3;
    // console.log(o);
  }
}

/**
 * 对象的扩展运算符
 * 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
 * 注意条例：
 * （1）如果扩展运算符后面是一个空对象，则没有任何效果。
 * （2）如果扩展运算符后面不是对象，则会自动将其转为对象。
 */
{
  // 基本案例
  {
    let z = { a: 3, b: 4 };
    let n = { ...z };
    // console.log(n);
  }

  // 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
  {
    let foo = { ...['a', 'b', 'c'] };
    // console.log(foo);
  }

  // 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
  {
    let a = {...'hello'};
    // console.log(a);
  }

  // 对象的扩展运算符等同于使用Object.assign()方法。如果原来的目标对象的属性有跟源对象的属性一致，那么目标对象的属性的值会被源属性的值覆盖
  {
    let a = {x:1,y:2,c:3};
    let aClone1 = { ...a };
    // console.log(aClone1);
    let b = {x:1000};
    b = Object.assign({},a);
    // console.log(b);
  }

  // 如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的三种写法。
  {
    let obj = {a:1,b:2,c:3};
    obj. __proto__ = {d:4};
    // 写法一
    const clone1 = {
      __proto__: Object.getPrototypeOf(obj),
      ...obj
    };
    // console.log(clone1.__proto__.d);

    // 写法二
    const clone2 = Object.assign(
      Object.create(Object.getPrototypeOf(obj)),
      obj
    );
    // console.log(clone2.__proto__.d);

    // 写法三
    const clone3 = Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );
    // console.log(clone3);
    let clone4 = Object.getOwnPropertyDescriptors(obj);
    // console.log(clone4.a);
  }

  // 扩展运算符可以用于合并两个对象。
  {
    let a = {a:1,b:2};
    let b = {c:3,d:4};
    let c = {...a,...b};
    // console.log(c);
    let d = Object.assign({},a,b);
    // console.log(d);
  }

  // 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
  {
    let a = {x:100,y:200};
    let b = {c:3,d:4};
    let c = {...a,...b};
    // 第一种覆盖方式
    let aWithOverrides1 = { ...a, x: 1, y: 2 };
    // console.log(aWithOverrides);

    // 第二种覆盖方式
    let aWithOverrides2 = { ...a, ...{ x: 1, y: 2 } };
    // console.log(aWithOverrides2);

    // 第三种覆盖方式
    let aWithOverrides3 = Object.assign({}, a, { x: 1, y: 2 });
    // console.log(aWithOverrides3);
  }

  // 如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。
  {
    let a = {x:100,y:200};
    let b = {c:3,d:4};
    let c = {...a,...b};
    // 一下三种写法等价
    let aWithDefaults1 = { x: 1, y: 2, ...a };
    let aWithDefaults2 = Object.assign({}, { x: 1, y: 2 }, a);
    let aWithDefaults3 = Object.assign({ x: 1, y: 2 }, a);
    // console.log(aWithDefaults1);
  }

  // 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
  {
    let x = 3;
    const obj = {
      ...(x > 1 ? {a: 1} : {}),
      b: 2,
    };
    console.log(obj);
  }
}

/**
 * 链判断运算符
 * 链判断运算符有三种用法：
 * （1）obj?.prop 对象属性
 * （2）obj?.[expr] 同上
 * （3）func?.(...args) 函数或对象方法的调用
 */
{
  // 基本案例
  {
    let message = {
      body: {
        user:{
          firstName: '文君'
        }
      }
    };
    // const firstName = message?.body?.user?.firstName || 'default';
    // console.log(firstName);
  }
}

/**
 * Null 判断运算符
 * 读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。
 */
{
  // 基本案例
  {
    let response = {
      settings:{
        headerText:null,
      }
    };
    // const headerText = response.settings.headerText ?? 'Hello, world!';
    // console.log(headerText);
  }
}
