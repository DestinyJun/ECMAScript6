/**
 * 扩展运算符
 */
{
    let a = [
        {name: '文君1'},
        {name: '文君2'},
        {name: '文君3'},
    ];
    function pushs(array,...value) {
        array.push(...value);
        // console.log(value);
        return array;
    }
    // console.log();
  pushs(a,{name:"文君4"},{name:"文君5"})
}

/**
 * 替代函数的apply方法
 */
{
  // 基础案例
  {
    function f5(x,y,z) {
      console.log(x,y,z);
    }
    let args5 = [0,1,2];
    // f5.apply(null,args5);

    function f6(x,y,z) {
      console.log(x,y,z);
    }
    let args6 = [0,1,2];
    // f5(...args6);
  }
// 实际案例一，简化求出最大值
  {
    // console.log(Math.max.apply(null,[2,18,8])); // es5写法
    // console.log(Math.max(...[2,18,8])); // es6写法,更佳简洁
  }
// 实际案例二，将一个数组添加到另外一个数组的尾部
  {
    // 将arr2添加到arr1的尾部
    var arr1 = [0,1,2];
    var arr2 = [3,4,5];
    Array.prototype.push.apply(arr1,arr2); // es5写法
    // console.log(arr1);

    // 将arr4添加到arr3的尾部
    var arr3 = [0,1,2];
    var arr4 = [3,4,5];
    arr3.push(...arr4);
    // console.log(arr3);
  }
// 实际案例三，把指定时间转为时间戳
  {
    // console.log(new (Date.bind.apply(Date,[null,2020,2,3]))); // es5的写法
    // console.log(new Date(...[2020,2,3])); // es5的写法
  }
}

/**
 * 扩展运算符的应用
 */
{
  // 应用一：复制数组，数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。也即是浅复制
  {
    const a1 = [1,2];
    const a2 = a1.concat(); // es5通过concat函数实现数组深度复制
    const a3 = [1,2];
    const a4 = [...a3]; // ES6通过扩展运算符实现数组的深复制
    // console.log(a4);
  }

  // 应用二：合并数组
  {
    const a1 = [0,1];
    const a2 = [2,3];
    const a3 = [4,5];
    const a4 = a1.concat(a2,a3);// es4合并数组
    // console.log(a4);
    const a5 = [...a1,...a2,...a3]; // es6合并数组。两者都是浅拷贝的范畴
    // console.log(a5);
  }

  // 应用三：与解构赋值结合
  {
    // 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
    const [first,...rest] = [1,2,3,4,5];
    // console.log(first);
    // console.log(rest);
  }

  // 应用四：字符串
  {
    // 扩展运算符还可以将字符串转为真正的数组,并且够正确识别四个字节的 Unicode 字符
    // 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
    const a = [...'hello'];
    // console.log(a);
  }

  // 应用五：实现了 Iterator 接口的对象（不太清晰）

  // 应用六：Map 和 Set 结构，Generator 函数
  {
    let map = new Map([[1,'one'],[2,'two'],[3,'three']]);
    // console.log([...map.keys()]);
    const go = function * () {
      yield 1;
      yield 2;
      yield 3;
    };
    // console.log([...go()]);
  }

}

/**
 * 新增扩展方法：Array.from()
 * Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
 */
{
  // 把类数组对象转为真正的数组
  {
    // 定义一个类数组对象
    let arrayLike = {
      '0':'a',
      '1':'b',
      '2':'c',
      length: 3
    };
    const arr1 = [].slice.call(arrayLike); // ES5的写法
    // console.log(arr1);
    const arr2 = Array.from(arrayLike); // ES6的写法
    // console.log(arr2);
  }

  // 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
  {
    // NodeList对象
    /*let ps = document.querySelectorAll('p');
    Array.from(ps).filter(p=> {
      return p.textContent.length > 100; // 赛选DOM列表
    });*/

    // 函数内部的arguments对象
    function foo() {
      let args = Array.from(arguments); // 把函数的arguments对象转为真正的数组
    }
  }

  // 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
  {
    // 字符串也是一种Iterator 接口的数据结构
    // console.log(Array.from('hello'));

    // Set对象也是一种Iterator 接口的数据结构
    let namesSet = new Set(['a','b']);
    // console.log(Array.from(namesSet));
  }

  // 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
  {
    // console.log(Array.from([0,1,2]));
  }

  // 扩展运算符（...）也可以将某些数据结构转为数组。
  {
    // arguments对象
  /*  function foo() {
      const args = [...arguments];
    }*/

    // NodeList对象
    // [...document.querySelectorAll('div')]

    /**
     * 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
     * Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
     * 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
     */
    {
      // Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象
      // console.log(Array.from({length: 3}));
    }

  }

  // Array.from方法的兼容性：对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
  {
    // 以下代码是兼容性判断
   /* const toArray = (() =>
      Array.from()?Array.from : obj => [].slice.call(obj)
    )();*/
  }

  // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
  {
    let arrayLike = {
      '0': 1,
      '1': 2,
      '2': 3,
      length: 3
    };
    // 下面两个写法等价
    let a = Array.from(arrayLike,x => x * x);
    // console.log(a);
    let b = Array.from(arrayLike).map(x => x * x);
    // console.log(b);

    // 取出一组DOM节点的文本内容
    {
      // let spans = document.querySelectorAll('span.name');
      // map()处理
      // let names1 = Array.prototype.map.call(spans, s => s.textContent); // 函数自调用？
      // Array.from()处理，简化很多
      // let names2 = Array.from(spans, s => s.textContent)
    }

    // 将数组中布尔值为false的成员转为0。
    {
      let c = Array.from([1, , 2, , 3], (n) => n || 0);
      // console.log(c);
    }

    // 返回各种数据的类型。
    {
      function typesOf () {
        return Array.from(arguments, value => typeof value)
      }
      // console.log(typesOf(null, [], NaN));
      // ['object', 'object', 'number']
    }

    // 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

    // Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，
    // 只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。

    // Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。
    {
      Array.from({ length: 2 }, () => 'jack')
      // ['jack', 'jack']
    }

    // Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，
    // 可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
    {
      function countSymbols(string) {
        return Array.from(string).length;
      }
    }
  }

}

/**
 * 新增扩展方法：Array.of()
 * Array.of方法用于将一组值，转换为数组。
 * 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
 */
{
  // 基础案例
  {
    let a = Array.of(1,2,3);
    // console.log(a);
  }

  // Array.of方法可以用下面的代码模拟实现。
  {
    function ArrayOf() {
      return [].slice.call(arguments)
    }
  }

  /*
   * Array()的行为：
   * Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，
   * Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
   */
}

/**
 * 数组实例的 copyWithin()
 * 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
 * 然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
 */
{
  // 基础案例
  {
    let a = [0,1,2,3,4].copyWithin(0,3);
    // console.log(a);
  }
}

/**
 * 数组实例的 find() 和 findIndex()
 * 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，
 * 所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
 * 如果没有符合条件的成员，则返回undefined。
 */
{
  // find()基本案例
  {
    let a = [1, 4, -5, 10].find((n) => n === 0);
    // console.log(a);
  }
  /**
   * findIndex()基本案例
   * find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
   */
  {
    let a = [1, 5, 10, 15].findIndex(function(value, index, arr) {
      return value > 9;
    });
    // console.log(a);
  }

  // 两个方法都可以接受第二个参数，用来绑定回调函数的this对象
  {
    // 下面的代码中，find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
    function f(v){
      return v > this.age;
    }
    let person = {name: 'John', age: 20};
    [10, 12, 26, 15].find(f, person);    // 26
  }
}

/**
 * 数组实例的 fill()
 * fill方法使用给定值，填充一个数组。
 */
{
  // 基础案例
  {
    // fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
    let a = ['a', 'b', 'c'].fill(7);
    // console.log(a);
    let b = new Array(3).fill(6);
    // console.log(b);
  }
}

/**
 * 数组实例的 entries()，keys() 和 values()
 * ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），
 * 可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
 */
{
  // keys()、entries()、values()基本案例
  {
    let arr1 = ['小明','小红','小绿','小蓝'];
    // console.log([...arr1.keys()]);
    // console.log([...arr1.values()]);
    // console.log([...arr1.entries()]);
    for (let index of arr1.values()) {
      // console.log(index);
    }
  }

}

/**
 * 数组实例的 includes()
 * Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
 */
{
  // 基本案例
  {
    // [1, 2, 3].includes(2)     // true
    // [1, 2, 3].includes(4)     // false
    // [1, 2, NaN].includes(NaN) // true
  }
  /**
   * Map 和 Set 数据结构有一个has方法，需要注意与includes区分
   * Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
   * Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
   */
}

/**
 * 数组实例的 flat()，flatMap()
 */
{
  // 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
  {
    // let a = ;
    // console.log([1, 2, [3, 4]].flat());
  }
}

/**
 * 数组的空位
 */
{

}

/**
 * Array.prototype.sort() 的排序稳定性
 * 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。
 * 常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。
 * 不稳定排序的主要缺点是，多重排序时可能会产生问题。假设有一个姓和名的列表，要求按照“姓氏为主要关键字，
 * 名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，
 * 这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。早先的 ECMAScript 没有规定，
 * Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。ES2019 明确规定，
 * Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。
 */
{

}
