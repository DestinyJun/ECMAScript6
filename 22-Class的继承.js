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
 */
{
  // super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
  {
    class A {}
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
    let b = new B();
    // 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()。
  }

  // 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
}
