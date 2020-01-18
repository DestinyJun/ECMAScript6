{
 /* let a = {name: '文君',age: 28, sex: '男'};
  for (let item of a) {
  }*/
}
// JSON不是一个可迭代对象

{
  let [a,b,c,d] = ['1','2','3','4'];
  tag([a,b,c,d]);
  function tag(...values) {
    // console.log(values[0]);
    /*for (let i = 0;i<values.length;i++)
     console.log(values[i]);
   }*/
  }
}

{
  function Person1(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person1.prototype.showName = function () {
    console.log(`我的名字是${this.name}`);
  };
  Person1.prototype.sex = '男';
  const person = new Person1('文君','18');
  // console.log(person.constructor.prototype);
}

{
  class Person {
    constructor(name,age) {
      this.name = name;
      this.age = age;
      this.show = function () {
        console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
      }
    }
  }
  Person1.prototype.sex = '女';
  Person.prototype.showName = function () {
    console.log(`我的名字是${this.name}`);
  };
  const person = new Person('徐晶','28');
  // console.log(person.constructor.prototype);
  // person.show();
}

{
  const a = {
    name: '文君',
    showName: function () {
      console.log(this.name);
    }
  };
  // a.showName()
}

{
  class Person {
    constructor(name,age) {
      this.name = name;
      this.age = age;
      this.show = function () {
        console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
      }
    }
  }
  Person.prototype.sex = '女'; // 构造函数的原型属性
  const person = new Person('徐晶','28');
  person.__proto__.sex = '男';
  // console.log(person.__proto__.sex);
  // console.log(Person.prototype);
}

{
  class Person {
    constructor(name,age) {
      this.name = name;
      this.age = age;
      this.show = function () {
        console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
      }
    }
  }
  Person.prototype.sex = '女'; // 构造函数的原型对象的成员属性
  const person = new Person('徐晶','28');
}

// 原型继承
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };
  function Student(school) {
    this.school = school;
    this.showSchool = function () {
      console.log(this.school);
    }
  }
  // 原型链继承的实现
  // 其原理是：子类的原型为父类的一个实例对象
  Student.prototype = new Person('文君','18');
  const student1 = new Student('第五中学');
  // student1.showName();
}

// 构造函数继承
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };
  function Student(name,age,school) {
    Person.call(this,name,age);
    this.school = school;
    this.showSchool = function () {
      console.log(this.school);
    }
  }
  const student1 = new Student('文君','18','第五中学');
  // student1.show();
}

// 组合继承
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };
  function Student(name,age,school) {
    Person.call(this,name,age);
    this.school = school;
    this.showSchool = function () {
      console.log(this.school);
    }
  }
  Student.prototype = new Person();//核心
  Student.prototype.constructor = Student;//核心，组合继承是需要修复构造函数指向的
  const student1 = new Student('文君','18','第五中学');
  // student1.showName();
}
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };
  function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
  }
  const student = createObj(new Person('文君','18'));
  // student.showName();
}

// 寄生式继承
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };
  function createObj (o) {
    var clone = Object.create(o);
    // 给新对象添加一个成员方法
    clone.sayName = function () {
      console.log('hi');
    };
    return clone;
  }
  const student = createObj(new Person('文君','18'));
  // student.showName();
}

// 寄生组合式继承
{
  function Person(name,age) {
    this.name = name;
    this.age = age;
    this.show = function () {
      console.log(`我的名字是：${this.name}，我的年龄是：${this.age}`);
    }
  }
  Person.prototype.showName = function () {
    console.log(`我的名字是：${this.name}`);
  };

  // 原型是继承
  function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
  }

  function prototype(child, parent) {
    var prototype = createObj(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
  }

  function Student() {}
  prototype(Student, Person);
  const student = new Student();
  student.showName();
}
