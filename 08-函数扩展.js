// 不适用场合
{
    a = 234;
    const fn = v => v;
    // console.log(fn(a));
}
// 尾调用优化
{

}
// 蹦床函数实现尾递归优化
{
    // 蹦床函数（trampoline）可以将递归执行转为循环执行。
    function trampoline(f) {
        while (f && f instanceof Function) {
            f = f();
        }
        return f;
    }

    // 将原来的递归函数，改写为每一步返回另一个函数。
    function sum(x, y) {
        if (y > 0) {
            return sum.bind(null, x + 1, y - 1);
        } else {
            return x;
        }
    }
}

// try catch
{
    try {
        try {
            throw new Error("oops");
        }
        finally {
            console.log("finally");
        }
    }
    catch (ex) {
        console.error("outer", ex.message);
    }
}
