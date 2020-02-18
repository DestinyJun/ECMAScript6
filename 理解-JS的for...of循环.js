/**
 * for ... of 主要用来遍历数组、Set、Map等数据结构，不能用来遍历字面量{}定义的对象
 */
{
  let a = ['a','b','c'];
  for (let value of a) {
    console.log(value);
  }
}

