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
 * constructor 方法
 */
