/**
 * nodejs模块加载机制：
 * （1）模块引用：require('xxx')
 * （2）模块定义：exports.xxx；module.exports = {}
 * （3）模块标识：块标识其实就是传递给require()方法的参数，它必须是符合小驼峰命名的字符串，
 或者以.、..开头的相对路径，或者绝对路径。它可以没有文件名后缀.js
 */

/**
 * Nodejs模块分类：
 * （1）Node.js的模块分为两类，一类为核心模块（node提供），一类为文件模块（用户编写）。核
 * 心模块在Node.js源代码编译的时候编译进了二进制执行文件，在nodejs启动过程中，部分核心模块
 * 直接加载进了内存中，所以这部分模块引入时可以省略文件定位和编译执行两个步骤，所以加载的速
 * 度最快。另一类文件模块是动态加载的，加载速度比核心模块慢。但是Node.js对核心模块和文件模块
 * 都进行了缓存，于是在第二次require时，是不会有重复开销的。其中原生模块都被定义在lib这个目
 * 录下面，文件模块则不定性。
 * （2）核心模块又分为两部分，C/C++编写的和Javascript编写的，前者在源码的src目录下，后者则在
 * lib目录下。（lib/*.js）（其中lib/internal部分不提供给文件模块）
 */

/**
 * 模块引入三步走：
 * （1）路径分析：核心模块：如http、fs、path等，速度仅次于缓存。路径形式的文件：以.或者..开始的
 * 相对路径，以/开始的绝对路径。
 * （2）自定义模块：不属于核心模块也不属于路径形式的标识符。它是一种特殊的文件模块，可能是一个
 * 文件或者包的形式。这类模块的查找是最费时的，也是所有方式中最慢的一种。在定位时，会给出一个
 * 可能路径的数组
 */

/**
 * 模块引入与常用内置对象：
 * （1）module：nodejs认为一个js文件就是一个模块，每个模块都有一个全局对象module，同时module对象中
 * 有一个对象exports。这个对象被加载一次之后会被缓存，里面提供了模块的父子模块关联信息，即父模块被
 * 那些模块引用，子模块引用了那些模块。
 * （2）exports：exports是module.exports对象的别名，提供便捷的属性和方法设置。
 * （3）require： require可以加载文件模块（.js、.code、.json）和nodejs核心模块，最终获取到的是module.exports对象。
 * 第一次加载的时候执行代码，第二次从缓存中获取module.exports对象，如果没有发现指定模块就报错not find module
 */
{
  // nodejs认为一个js文件就是一个模块，每个模块都有一个全局对象module，同时module对象中有一个对象
  // exports。这个对象被加载一次之后会别缓存，里面提供了模块的父子模块关联信息，即父模块被那些模块
  // 引用，子模块引用了那些模块。
  {
    /*Module {
      id: '.',
      exports: {},
      parent: null,
      filename: 'E:\\workspace\\myRequre.js',
      loaded: false,
      children: [],
      paths: [ 'E:\\workspace\\ node_modules', 'E:\\workspace\\node_modules', 'E:\\node_modules' ]
  }*/
  }

  //  exports是module.exports对象的别名，提供便捷的属性和方法设置。
  {
    // 模块中的module.exports对象就增加了add方法。
    exports.add = function(v1,v2){
      return v1 + v2
    }
  }

  // 下面require引入对象案例
  {
    const a = require('./CommonJS/lib');
    console.log(a.counter);
  }
}
