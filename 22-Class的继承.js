/**
 * 继承：
 * （1）Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
 * （2）super关键字,在class类中表示父类的构造函数，用来新建父类的this对象。
 * （3）子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，
 * 得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
 * （4）ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，
 * 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。如果子类没有定义constructor方法，
 * 这个方法会被默认添加，也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
 * （5）在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
 * （6）通过继承类生成的实例，同时属于两个类的实例
 * （7）父类的静态方法，也会被子类继承。
 */
{
  // 基础案例
  {
    class Point {
      constructor() {

      }
    }

    class ColorPoint extends Point {
      constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }

      toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
      }
    }
  }

  // 父类的静态方法，也会被子类继承。
  {
    class A {
      static hello() {
        console.log('hello world');
      }
    }

    class B extends A {
    }

    // B.hello()  // hello world
  }
}

/**
 * Object.getPrototypeOf方法可以用来从子类上获取父类,可以使用这个方法判断，一个类是否继承了另一个类。
 */

/**
 * super 关键字：
 * （1）super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
 * （2）第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
 * 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
 * （3）第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
 * （4）ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
 * （5）由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
 * （6）如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
 * （7）在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
 * （8）注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
 * （9）最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
 */
{
  // super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
  {
    class A {
    }

    class B extends A {
      constructor() {
        super();
      }
    }

    // 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。
    // 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
  }

  // super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
  {
    class A {
      p() {
        return 2;
      }
    }

    class B extends A {
      constructor() {
        super();
        console.log(super.p()); // 2
      }
    }

    // let b = new B();
    // 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。
  }

  // 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
  {
    class A {
      constructor() {
        this.p = 2;
      }
    }

    class B extends A {
      get m() {
        return super.p;
      }
    }

    let b = new B();
    b.m // undefined
  }

  // 如果属性定义在父类的原型对象上，super就可以取到
  {
    class A {
    }

    A.prototype.x = 2;

    class B extends A {
      constructor() {
        super();
        console.log(super.x) // 2
      }
    }

    // let b = new B();
  }

  // ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
  {
    class A {
      constructor() {
        this.x = 1;
      }

      print() {
        console.log(this.x);
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }

      m() {
        super.print();
      }
    }

    let b = new B();
    // b.m(); // 2
    /**
     * 上面代码中，super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，
     * 而不是1。也就是说，实际上执行的是super.print.call(this)。
     */
  }

  // 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
  {
    class A {
      constructor() {
        this.x = 1;
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
      }
    }

    // let b = new B();
    // 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
  }

  // 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
  {
    class Parent {
      static myMethod(msg) {
        console.log('static', msg);
      }

      myMethod(msg) {
        console.log('instance', msg);
      }
    }

    class Child extends Parent {
      static myMethod(msg) {
        super.myMethod(msg);
      }

      myMethod(msg) {
        super.myMethod(msg);
      }
    }

    // Child.myMethod(1); // static 1
    // var child = new Child();
    // child.myMethod(2); // instance 2
    // 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
  }

  // 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
  {
    class A {
      constructor() {
        this.x = 1;
      }

      static print() {
        console.log(this.x);
      }
    }

    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }

      static m() {
        super.print();
      }
    }

    B.x = 3;
    // B.m() // 3
    // 上面代码中，静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例。
  }

  // 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
  {
    class A {
    }

    class B extends A {
      constructor() {
        super();
        // console.log(super); // 报错
      }
    }

    // 上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。
    // 这时，如果能清晰地表明super的数据类型，就不会报错。
    {
      class A {
      }

      class B extends A {
        constructor() {
          super();
          console.log(super.valueOf() instanceof B); // true
        }
      }

      // let b = new B();
      // 上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。
    }
  }

  // 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。（*没啥用）
  {
    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };

    // obj.toString(); // MyObject: [object Object]
  }
}

/**
 * 类的 prototype 属性和__proto__属性：
 * （1）大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
 * （2）Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
 * （3）子类的__proto__属性，表示构造函数的继承，总是指向父类
 * （4）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
 */
{
  // 基本案例
  {
    class A {
    }

    class B extends A {
    }

    // 子类的__proto__属性，表示构造函数的继承，总是指向父类
    // console.log(B.__proto__ === A);   // true
    // 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
    // console.log(B.prototype.__proto__ === A.prototype );    // true
    // 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。

    // 这样的结果是因为，类的继承是按照下面的模式实现的。
    {
      class A {
      }

      class B {
      }

      // B 的实例继承 A 的实例
      Object.setPrototypeOf(B.prototype, A.prototype);
      // B 继承 A 的静态属性
      Object.setPrototypeOf(B, A);
      const b = new B();
      // 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，
      // 子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
    }
  }
}

/**
 * 实例的 __proto__ 属性
 * （1）子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。
 */

/**
 * 原生构造函数的继承：原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些：
 * （1）Boolean()
 * （2）Number()
 * （3）String()
 * （4）Array()
 * （5）Date()
 * （6）Function()
 * （7）RegExp()
 * （8）Error()
 * （9）Object()
 * 这些原生构造函数在ES5中是无法继承的
 */

/**
 * ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，
 * 使得父类的所有行为都可以继承。下面是一个继承Array的例子。
 * （1）extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。
 * （2）继承Object的子类，有一个行为差异。
 */
{
  // extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。
  {
    class VersionedArray extends Array {
      constructor() {
        super();
        this.history = [[]];
      }
      commit() {
        this.history.push(this.slice());
      }
      revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
      }
    }
    var x = new VersionedArray();
    x.push(1);
    x.push(2);
    x.commit();
    // x.push(3);
    // x // [1, 2, 3]
    // x.history // [[], [1, 2]]

    // x.revert();
    // x // [1, 2]
  }

  // 继承Object的子类，有一个行为差异。
  {
    class NewObj extends Object{
      constructor(){
        super(...arguments);
      }
    }
    var o = new NewObj({attr: true});
    // o.attr === true  // false 按道理应该是true
    // 上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，
    // 一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。
  }
}

/**
 * Mixin 模式的实现：
 * （1）Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
 */
{
  // Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
  {
    const a = {
      a: 'a'
    };
    const b = {
      b: 'b'
    };
    const c = {...a, ...b}; // {a: 'a', b: 'b'}
    // 上面代码中，c对象是a对象和b对象的合成，具有两者的接口。也即是可以使用两个对象都据有的属性和方法
  }

  // 另外一个案例
  {
    function mix(...mixins) {
      class Mix {
        constructor() {
          for (let mixin of mixins) {
            copyProperties(this, new mixin()); // 拷贝实例属性
          }
        }
      }

      for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
      }

      return Mix;
    }

    function copyProperties(target, source) {
      for (let key of Reflect.ownKeys(source)) {
        if ( key !== 'constructor'
          && key !== 'prototype'
          && key !== 'name'
        ) {
          let desc = Object.getOwnPropertyDescriptor(source, key);
          Object.defineProperty(target, key, desc);
        }
      }
    }
    // 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
  }
}
