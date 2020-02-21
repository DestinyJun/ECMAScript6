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
 * （1）
 */
