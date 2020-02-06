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
 */
