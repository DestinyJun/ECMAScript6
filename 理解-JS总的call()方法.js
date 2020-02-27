/**
 * Function.prototype.call()：方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
 * （1）使用 call 方法调用父构造函数实现继承
 * （2）使用 call 方法调用函数并且重定义函数中this的指向
 * （3）使用 call 方法调用函数并且不指定第一个参数（argument）
 */
{
  // 使用 call 方法调用父构造函数实现继承
  {
    function Product(name, price) {
      this.name = name;
      this.price = price;
    }
    function Food(name, price) {
      Product.call(this, name, price);
      this.category = 'food';
    }
    // console.log(new Food('cheese', 5).name);
  }

  // 使用 call 方法调用函数并且重定义函数中this的指向
  {
    function greet() {
      var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
      console.log(reply);
    }
    var obj = {
      animal: 'cats', sleepDuration: '12 and 16 hours'
    };
    // greet.call(obj);
  }

  // 使用 call 方法调用函数并且不指定第一个参数（argument）
  {
    var sData = 'Wisen';
    function display() {
      console.log('sData value is %s ', this.sData);
    }
    display.call();  // sData value is Wisen
    // 在下面的例子中，我们调用了 display 方法，但并没有传递它的第一个参数。如果没有传递第一个参数，
    // this 的值将会被绑定为全局对象。
  }
}

