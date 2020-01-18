// 字符串的遍历器接口

/**
 * ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
 * **/
{
  for (let codePoint of 'foo') {
    // console.log(codePoint)
  }
}

/**
 * ES6新增了模板字符,，可以直接在字符串中输出变量
 * 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，
 * 也可以用来定义多行字符串，或者在字符串中嵌入变量。
 * 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
 * let x = 1;
 * 注意：如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
 * **/
{
  let a = '123456';
  let str = ` There are <b>${a}</b> items
   in your basket,are on sale!`;
  // console.log(str);
  let x = 1;
  let y = 2;

  // `${x} + ${y} = ${x + y}`
  // "1 + 2 = 3"

    // `${x} + ${y * 2} = ${x + y * 2}`
  // "1 + 4 = 5"

  // let obj = {x: 1, y: 2};
  // `${obj.x + obj.y}`
  // "3"

  // 模板字符串之中还能调用函数。
  function fn() {
    return "Hello World";
  }
  // `foo ${fn()} bar`

  // 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
  let b = {name: '123'}
  // console.log(`foo ${b} bar`);

  // 模板字符串甚至还能嵌套。
  const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

  // 如果需要引用模板字符串本身，在需要时执行，可以写成函数。模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。
}

/**
 * 模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。
 * “标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
 * 如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
 */
{
  // alert`123`
// 等同于
//   alert(123)

  let a = 5;
  let b = 10;

  tag1`Hello ${ a + b } world ${ a * b }`;
// 等同于
  tag2(['Hello ',' world ', ''], 15, 50);

  function tag1(stringArr, value1, value2){
    // ...
  }

// 等同于

  function tag2(stringArr, ...values){
    // ...
  }

}

/**
 * “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
 */
{
  let sender = '<script>alert("abc")</script>'; // 恶意代码
  let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
  function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
      let arg = String(arguments[i]);

      // Escape special characters in the substitution.
      s += arg.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Don't escape special characters in the template.
      s += templateData[i];
    }
    return s;
  }
  // console.log(message);
}
//
{
  console.log(String.raw`Hi\n${2+3}!`);
}
