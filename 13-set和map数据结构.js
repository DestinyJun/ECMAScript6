/**
 * set的基本用法：
 * （1）ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 * （2）Set本身是一个构造函数，用来生成 Set 数据结构。
 * （3）向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个
 * 值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主
 * 要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
 * （4）对于set而言，两个对象总是不相等的。
 */
{
  // 基本用法，可以自动去重
  {
    const s = new Set();
    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
    for (let i of s) {
      // console.log(i);// 2 3 5 4
    }
  }

  // Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
  {
    const set = new Set([1, 2, 3, 4, 4]);
    // console.log([...set]);
  }

  // 可以使用set作为一种去除数组重复成员的方法。
  {
    // [...new Set(array)]
  }

  // 也可以用于，去除字符串里面的重复字符。
  {
    // console.log([...new Set('ababbc')].join(''));
  }

  // Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
  {
    let set = new Set();
    let a = NaN;
    let b = NaN;
    set.add(a);
    set.add(b);
    // console.log(set); // Set {NaN}
  }

  // 对于set而言，两个对象总是不相等的
  {
    let set = new Set();

    set.add({});
    set.size;// 1

    set.add({});
    set.size;// 2
    // 上面代码表示，由于两个空对象不相等，所以它们被视为两个值。
  }
}

/**
 * Set 实例的属性和方法：
 * （1）Set 结构的实例有以下属性：Set.prototype.constructor：构造函数，默认就是Set函数；
 * Set.prototype.size：返回Set实例的成员总数
 * （2）Set实例的操作方法：
 * Set.prototype.add(value)：添加某个值，返回 Set 结构本身；
 * Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
 * Set.prototype.clear()：清除所有成员，没有返回值。
 * （3）Array.from方法可以将 Set 结构转为数组。
 * （4）Set实例的遍历操作方法：
 * Set.prototype.keys()：返回键名的遍历器；
 * Set.prototype.values()：返回键值的遍历器；
 * Set.prototype.entries()：返回键值对的遍历器；
 * Set.prototype.forEach()：使用回调函数遍历每个成员
 * 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set
 * 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
 * （5）keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。
 * 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
 * （6）Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。这意味着，可以省略
 * values方法，直接用for...of循环遍历 Set。
 * （7）Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
 * （8）扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
 * （9）扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
 * （10）数组的map和filter方法也可以间接用于 Set
 * （11）使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）
 * （12）如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
 * 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
 */
{
  // Array.from方法可以将 Set 结构转为数组。
  {
    const items = new Set([1, 2, 3, 4, 5]);
    // console.log( Array.from(items));
  }

  // 去除数组重复成员的另一种方法
  {
    function dedupe(array) {
      return Array.from(new Set(array));
    }
    dedupe([1, 1, 2, 3]) // [1, 2, 3]
  }

  // 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
  {
    const items = new Set(['red','green','blue']);
    // console.log([...items.keys()]);
    // console.log([...items.values()]);
    // console.log([...items.entries()]);
    // 上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
  }

  // Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。这意味着，
  // 可以省略values方法，直接用for...of循环遍历 Set。
  {
    // Set.prototype[Symbol.iterator] === Set.prototype.values
    let set = new Set(['red', 'green', 'blue']);
    for (let x of set) {
      // console.log(x);
    }
  }

  // Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
  {
    let set = new Set([1, 4, 9]);
    // set.forEach((value, key) => console.log(key + ' : ' + value))
    // 上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，
    // 依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键
    // 值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。另外，forEach
    // 方法还可以有第二个参数，表示绑定处理函数内部的this对象。
  }

  // 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。
  {
    let set = new Set(['red', 'green', 'blue']);
    // console.log([...set]);
  }

  // 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
  {
    let arr = [3, 5, 2, 2, 5, 5];
    let unique = [...new Set(arr)];
    // console.log(unique);
  }

  // 数组的map和filter方法也可以间接用于 Set了
  {
    let set = new Set([1, 2, 3]);
    set = new Set([...set].map(x => x * 2));
    // console.log([...set]);
    {
      let set = new Set([1, 2, 3, 4, 5]);
      set = new Set([...set].filter(x => (x % 2) === 0));
      // console.log([...set]);
    }
  }

  // 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）
  {
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    // console.log([...new Set([...a,...b])]); // 并集
    // console.log([...new Set([...a].filter(x => b.has(x)))]); // 交集
    // console.log([...new Set([...a].filter(x => !b.has(x)))]); // 差集
  }

  // 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
  // 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
  {
    // 方法一
    {
      let set = new Set([1, 2, 3]);
      set = new Set([...set].map(val => val * 2));
    }
    // 方法二
    {
      let set = new Set([1, 2, 3]);
      set = new Set(Array.from(set, val => val * 2));
      // set的值是2, 4, 6
    }
  }
}

/**
 * WeakSet：
 * （1）WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
 *首先，WeakSet 的成员只能是对象，而不能是其他类型的值。其次，WeakSet 中的对象都是弱引用，
 * 即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，
 * 那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。这是
 * 因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。
 * 结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet
 * 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，
 * 以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。由于
 * 上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少
 * 个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运
 * 行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。这些特点同样适用于本章后面要介绍的 WeakMap 结构。
 * （2）作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable
 * 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。
 * （3）WeakSet 结构有以下三个方法：
 * WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
 * WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
 * WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
 * （4）WeakSet 没有size属性，没有办法遍历它的成员。
 * （5）WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，
 * 成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
 */
{
  // WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
  {
    const a = {};
    const b = {};
    // const ws = new WeakSet(a);
    // console.log(ws.has([[1,2]]));
    // console.log(ws);
  }
}

/**
 * Map：
 * （1）JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
 * 这给它的使用带来了很大的限制。为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对
 * 的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构
 * 提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你
 * 需要“键值对”的数据结构，Map 比 Object 更合适。
 * （2）上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的
 * 成员是一个个表示键值对的数组。
 * （3）不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》
 * 一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
 * （4）map结构中，如果对同一个键多次赋值，后面的值将覆盖前面的值。
 * （5）如果读取一个未知的键，则返回undefined。
 * （6）只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
 * （7）Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）
 * 的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
 * （8）如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
 * 比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。
 * 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
 */
{
  // 基础案例
  {
    const m = new Map();
    const o = {p: 'Hello World'};

    m.set(o, 'content');
    m.get(o); // "content"

    m.has(o); // true
    m.delete(o); // true
    m.has(o); // false
  }

  // Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
  {
    const map = new Map([
      ['name', '张三'],
      ['title', 'Author']
    ]);
    // console.log(map.get('title'));
  }

  // 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map
  // 构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。
  {
    const set = new Set([
      ['foo', 1],
      ['bar', 2]
    ]);
    const m1 = new Map(set);

    const m2 = new Map([['baz', 3]]);
    const m3 = new Map(m2);
  }

  // map结构中，如果对同一个键多次赋值，后面的值将覆盖前面的值。
  {
    const map = new Map();
    map
      .set(1, 'aaa')
      .set(1, 'bbb');
    map.get(1) // "bbb"
  }

  // 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
  {
    const map = new Map();
    map.set(['a'], 555);
    map.get(['a']);// undefined
    // 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get
    // 方法无法读取该键，返回undefined。同理，同样的值的两个实例，在 Map 结构中被视为两个键。
    {
      const map = new Map();
      const k1 = ['a'];
      const k2 = ['a'];
      map
        .set(k1, 111)
        .set(k2, 222);
      map.get(k1); // 111
      map.get(k2); // 222
      // 上面代码中，变量k1和k2的值是一样的，但是它们在 Map 结构中被视为两个键。由上可知，Map 的键实际上
      // 是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，
      // 我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
    }
  }

  // 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
  // 比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。
  // 虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
  {
    let map = new Map();

    map.set(-0, 123);
    map.get(+0) // 123

    map.set(true, 1);
    map.set('true', 2);
    map.get(true) // 1

    map.set(undefined, 3);
    map.set(null, 4);
    map.get(undefined) // 3

    map.set(NaN, 123);
    map.get(NaN) // 123
  }
}

/**
 * Map实例的属性及操作方法：
 * （1）size属性返回 Map 结构的成员总数。
 * （2）Map.prototype.set(key, value)：set方法设置键名key对应的键值为value，然后返回整个
 * Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是当前的Map
 * 对象，因此可以采用链式写法。
 * （3）Map.prototype.get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。
 * （4）Map.prototype.has(key)：has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
 * （5）Map.prototype.delete(key)：delete方法删除某个键，返回true。如果删除失败，返回false。
 * （6）Map.prototype.clear()：clear方法清除所有成员，没有返回值。
 * （7）Map 结构原生提供三个遍历器生成函数和一个遍历方法：
 * Map.prototype.keys()：返回键名的遍历器（也叫遍历发生器）；
 * Map.prototype.values()：返回键值的遍历器；
 * Map.prototype.entries()：返回所有成员的遍历器；
 * Map.prototype.forEach()：遍历 Map 的所有成员；
 * 需要特别注意的是，Map 的遍历顺序就是插入顺序。
 * （8）Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
 * （9）Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
 * （10）结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
 * （11)Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。forEach方法还可以接受
 * 第二个参数，用来绑定this。
 */
{
  // size属性返回 Map 结构的成员总数。
  {
    const map = new Map();
    map.set('foo', true);
    map.set('bar', false);
    // console.log(map.size);
  }

  // set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，
  // 则键值会被更新，否则就新生成该键。
  {
    const m = new Map();
    m.set('edition', 6);        // 键是字符串
    m.set(262, 'standard');    // 键是数值
    m.set(undefined, 'nah');   // 键是 undefined
    // console.log(m);
  }

  // set方法返回的是当前的Map对象，因此可以采用链式写法。
  {
    let map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');
    // console.log(map);
  }

  // Map.prototype.get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。
  {
    const m = new Map();
    const hello = function() {console.log('hello');};
    m.set(hello, 'Hello ES6!'); // 键是函数
    // console.log(m.get(hello));
  }

  // has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
  {
    const m = new Map();
    m.set('edition', 6);
    m.set(262, 'standard');
    m.set(undefined, 'nah');
    // console.log(m.has('edition'));
    // console.log(m.has('years'));
  }

  // delete方法删除某个键，返回true。如果删除失败，返回false。
  {
    const m = new Map();
    m.set(undefined, 'nah');
    m.has(undefined); //  // true
    m.delete(undefined);
    // console.log(m.has(undefined));
  }

  // clear方法清除所有成员，没有返回值。
  {
    let map = new Map();
    map.set('foo', true);
    map.set('bar', false);
    // console.log(map.size);
    map.clear();
    // console.log(map.size);
  }

  // map的遍历
  {
    const map = new Map([
      ['F', 'no'],
      ['T',  'yes'],
    ]);
    // console.log([...map.keys()]);
    // console.log([...map.values()]);
    // console.log([...map.entries()]);
    map.forEach((value,key) => {
      // console.log(value+'-'+key);
    });
   /* for (let item of map) {
      console.log(item);
    }*/
    /*for (let [key, value] of map.entries()) {
      console.log(key, value);
    }*/
   /* for (let item of map.entries()) {
      console.log(item[0], item[1]);
    }*/
  }

  // Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
  {
    const map = new Map([
      ['F', 'no'],
      ['T',  'yes'],
    ]);
    // console.log(map[Symbol.iterator] === map.entries);
  }

  // Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）
  {
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
    // console.log([...map.keys()]);
    // console.log([...map.values()]);
    // console.log([...map.entries()]);
    // console.log([...map]);
  }

  // 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
  {
    const map0 = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');
    const map1 = new Map(
      [...map0].filter(([k, v]) => k < 3)
    );
    // console.log([...map1.keys()]);
    const map2 = new Map(
      [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
    // console.log([...map2.values()]);
  }

  // forEach方法还可以接受第二个参数，用来绑定this。
  {
    const map = new Map()
      .set(1, 'a')
      .set(2, 'b')
      .set(3, 'c');
    const reporter = {
      report: function(key, value) {
        // console.log("Key: %s, Value: %s", key, value);
      }
    };
    map.forEach(function(value, key, map) {
      this.report(key, value);
    }, reporter);
    // 上面代码中，forEach方法的回调函数的this，就指向reporter对象。
  }
}

/**
 * 与其他数据结构的互相转换：
 * （1）Map 转为数组：前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）
 * （2）数组 转为 Map：将数组传入 Map 构造函数，就可以转为 Map
 * （3）Map 转为对象：如果所有 Map 的键都是字符串，它可以无损地转为对象
 * （4）对象转为 Map：对象转为 Map 可以通过Object.entries()。
 * （5）Map 转为 JSON：Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可
 * 以选择转为对象 JSON。
 * （6）另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON
 * （7）JSON 转为 Map：JSON 转为 Map，正常情况下，所有键名都是字符串
 */
{
  // Map 转为数组最方便的方法，就是使用扩展运算符（...）
  {
    const myMap = new Map()
      .set(true, 7)
      .set({foo: 3}, ['abc']);
    // console.log([...myMap]);
  }

  // 将数组传入 Map 构造函数，就可以转为 Map
  {
    let map = new Map([
      [true, 7],
      [{foo: 3}, ['abc']]
    ]);
    // console.log([...map]);
  }

  // 如果所有 Map 的键都是字符串，它可以无损地转为对象
  // 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
  {
    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }
    const myMap = new Map()
      .set('yes', true)
      .set('no', false);
    /*for (let [key,value] of myMap) {
      console.log(key+'-'+value);
    }*/
    let a = strMapToObj(myMap);
    // console.log(a.yes);
  }

  // 对象转为 Map 可以通过Object.entries()。
  {
    let obj = {"a":1, "b":2};
    let map = new Map(Object.entries(obj));
    // 也可以自己实现一个转换函数
    {
      function objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
          strMap.set(k, obj[k]);
        }
        return strMap;
      }
      objToStrMap({yes: true, no: false})
    }
  }

  // Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
  {
    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }
    function strMapToJson(strMap) {
      return JSON.stringify(strMapToObj(strMap));
    }

    let myMap = new Map().set('yes', true).set('no', false);
    let a = strMapToJson(myMap);
    // console.log(a);
  }

  // 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON
  {
    function mapToArrayJson(map) {
      return JSON.stringify([...map]);
    }
    let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
    mapToArrayJson(myMap)
  }

  // JSON 转为 Map，正常情况下，所有键名都是字符串。
  {
    function jsonToStrMap(jsonStr) {
      return objToStrMap(JSON.parse(jsonStr));
    }
    jsonToStrMap('{"yes": true, "no": false}');
    function objToStrMap(obj) {
      let strMap = new Map();
      for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
      }
      return strMap;
    }
  }

  // 但是，有一种特殊情况，整个 JSON 就是一个数组（json数组），且每个数组成员本身，又是一个有两个成员的数组。这时，
  // 它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
  {
    function jsonToMap(jsonStr) {
      return new Map(JSON.parse(jsonStr));
    }
    jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
  }
}

/**
 * WeakMap：WeakMap结构与Map结构类似，也是用于生成键值对的集合
 * （1）WeakMap与Map的区别有两点。首先，WeakMap只接受对象作为键名（null除外），
 * 不接受其他类型的值作为键名。其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
 * （2）WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对
 * 于这个对象的引用,WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，
 * 即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收
 * 机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应
 * 的键值对会自动消失，不用手动删除引用。基本上，如果你要往对象上添加数据，又不想干扰垃圾
 * 回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用
 * WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
 * （3）WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用
 */
{
  // WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
  // 请看下面的例子：
  {
    // const e1 = document.getElementById('foo');
    // const e2 = document.getElementById('bar');
   /* const arr = [
      [e1, 'foo 元素'],
      [e2, 'bar 元素'],
    ];*/
   // 上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
    // 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
    // arr [0] = null;
    // arr [1] = null;
    // 上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。
  }

  // 网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap
  // 记录就会自动被移除。
  {
    const wm = new WeakMap();
    // const element = document.getElementById('example');
    // wm.set(element, 'some information');
    // wm.get(element) // "some information"
    // 上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，
    // 一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。
    // 也就是说，上面的 DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就
    // 会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。
    // 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
  }

  // WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用
  {
    const wm = new WeakMap();
    let key = {};
    let obj = {foo: 1};
    wm.set(key, obj);
    obj = null;
    // console.log( wm.get(key));
    // 上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。
  }
}

/**
 * WeakMap 的语法：
 * WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），
 * 也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
 * 这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
 * 二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。
 */
{
  const wm = new WeakMap();
// size、forEach、clear 方法都不存在
//   wm.size // undefined
//   wm.forEach // undefined
//   wm.clear // undefined
}

/**
 * WeakMap 的示例：（暂时不了解）
 */

/**
 * WeakMap 的用途：
 * （1）WeakMap 应用的典型场合就是 DOM 节点作为键名。
 * （2）WeakMap 的另一个用处是部署私有属性
 */
{
  // WeakMap 的另一个用处是部署私有属性
  const _counter = new WeakMap();
  const _action = new WeakMap();

  class Countdown {
    constructor(counter, action) {
      _counter.set(this, counter);
      _action.set(this, action);
    }
    dec() {
      let counter = _counter.get(this);
      if (counter < 1) return;
      counter--;
      _counter.set(this, counter);
      if (counter === 0) {
        _action.get(this)();
      }
    }
  }
}
