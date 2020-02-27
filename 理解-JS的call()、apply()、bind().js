// call()、apply()、bind() 都是用来重定义 this 这个对象的
{
  var name = '小王';
  var age =17;
  var obj = {
    name: '小张',
    objAge: this.age,
    myFun: function () {
      console.log(this.name+'年龄：'+this.age)
    }
  };
  var db = {
    name: '妈蛋',
    age: 99
  };

  var fav = '盲僧';
  function shows() {
    console.log(this.fav);
  }

  obj.myFun.call(db);　　　　// 德玛年龄 99
  obj.myFun.apply(db);　　　 // 德玛年龄 99
  obj.myFun.bind(db)();　　　// 德玛年龄 99
// 以上出了 bind 方法后面多了个 () 外 ，结果返回都一致！
// 由此得出结论，bind 返回的是一个新的函数，你必须调用它才会被执行。
}

// 对比call 、bind 、 apply 传参情况下
{
  var obj = {
    name: '小张',
    objAge: this.age,
    myFun: function (fm,t) {
      console.log(this.name+'年龄：'+this.age,'来自'+fm+'去往'+t)
    }
  };
  var db = {
    name: '妈蛋',
    age: 99
  };
  obj.myFun.call(db,'成都','上海');　　　　 // 德玛年龄：99 来自成都去往上海
  obj.myFun.apply(db,['成都','上海']);      // 德玛年龄：99 来自 成都去往上海
  obj.myFun.bind(db,'成都','上海')();       // 德玛年龄：99 来自 成都去往上海
  obj.myFun.bind(db,['成都','上海'])();　　 // 德玛年龄：99 来自 成都, 上海去往 undefined
  /**
   * 从上面四个结果不难看出:
   * call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
   * （1）call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )
   * （2）apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。
   * （3）bind 除了返回是函数以外，它 的参数和 call 一样,所以他会创建一个函数
   */
}

