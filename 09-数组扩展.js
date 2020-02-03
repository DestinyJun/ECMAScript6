// 扩展运算符
{
    let a = [
        {name: '文君1'},
        {name: '文君2'},
        {name: '文君3'},
    ];
    function pushs(array,...value) {
        array.push(...value);
        return array;
    }
    console.log(pushs(a,{name:"文君4"},{name:"文君5"}));
}
