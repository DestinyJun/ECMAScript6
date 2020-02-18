/**
 * for ... in 主要用来遍历对象，每个指针迭代的是对象的属性（也即是key)，由于数组是一种特殊的对象
 * 因此他也能循环，只是拿到的是数组值下标
 */
{
  let a = {name:'a',age: 18};
  for (let value in a) {
    console.log(value);
  }
}

