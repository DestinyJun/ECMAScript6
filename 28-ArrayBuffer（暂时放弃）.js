/**
 * （1）ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。这些对象早就存在，
 * 属于独立的规格（2011 年 2 月发布），ES6 将它们纳入了 ECMAScript 规格，并且增加了新的方法。它们都是以数
 * 组的语法处理二进制数据，所以统称为二进制数组。
 * （2）这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足
 * JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本
 * 格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以
 * 像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。
 * （3）二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增
 * 强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信。
 */

/**
 * 二进制数组由三类对象组成：
 * （1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，
 * 可以用数组的方法操作内存。
 * （2）TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）
 * 数组视图, Float32Array（32 位浮点数）数组视图等等。
 * （3）DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16
 * （16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。
 * （4）简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来
 * 读写复杂类型的二进制数据。
 * （5）注意，二进制数组并不是真正的数组，而是类似数组的对象。很多浏览器操作的 API，用到了二进制数组操作二进制数据
 * 下面是其中的几个：
 * ----A：Canvas
 * ----B：Fetch API
 * ----C：File API
 * ----D：WebSockets
 * ----E：XMLHttpRequest
 */

/**
 * ArrayBuffer 对象：
 * （1）ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，
 * 视图的作用是以指定格式解读二进制数据。
 * （2）ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。
 * （3）ArrayBuffer.prototype.byteLength：ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度
 * （4）ArrayBuffer.prototype.slice()：ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新
 * 的ArrayBuffer对象。
 * （5）ArrayBuffer.isView()：ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视
 * 图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。
 */
{
  // ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。
  {
    // const buf = new ArrayBuffer(32); // 1b=1byte=8bit
    // 上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。可以看到，ArrayBuffer构造函数的参数是所需要的内
    // 存大小（单位字节）。

    // 为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。
    // const dadaView = new DataView(buf);
    // console.log(dadaView.getUint8(0));
    // 上面代码对一段 32 字节的内存，建立DataView视图，然后以不带符号的 8 位整数格式，从头读取 8 位二进制数据，结果
    // 得到 0，因为原始内存的ArrayBuffer对象，默认所有位都是 0。

    // 另一种TypedArray视图，与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。
    // const x1 = new Int32Array(buf);
    // const x2 = new Uint8Array(buf);
    // 上面代码对同一段内存，分别建立两种视图：32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array
    // 构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

    // TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层
    // 的ArrayBuffer实例，并同时完成对这段内存的赋值。
    // const typedArray = new Uint8Array([0,1,2]);
    // console.log(typedArray.length);
    // typedArray[0] = 5;
    // console.log(typedArray);
    // 上面代码使用TypedArray视图的Uint8Array构造函数，新建一个不带符号的 8 位整数视图。可以看到，Uint8Array直接使用
    // 普通数组作为参数，对底层内存的赋值同时完成。
  }

  // ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度
  {
    // const buffer = new ArrayBuffer(32);
    // console.log(buffer.byteLength);
    // 如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。
    // 检查代码
    {
      /*if (buffer.byteLength === n) {
        // 成功
      } else {
        // 失败
      }*/
    }
  }

  // ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。
  {
    // const buffer = new ArrayBuffer(8);
    // const newBuffer = buffer.slice(0, 3);
    // 上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的
    // ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个
    // ArrayBuffer对象拷贝过去。

    // slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示
    // 拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

    // 除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，
    // 然后通过视图读写。
  }

  // ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个
  // 方法大致相当于判断参数，是否为TypedArray实例或DataView实例。
  {
    /*const buffer = new ArrayBuffer(8);
    console.log(ArrayBuffer.isView(buffer));
    const v = new Int32Array(buffer);
    console.log(ArrayBuffer.isView(v));*/
  }
}

/**
 * TypedArray 视图：（看到了字节序）
 * （1）ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。
 * ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以
 * 是不同的数据类型。
 * （2）目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数：
 * ----- Int8Array：8 位有符号整数，长度 1 个字节。
 * ----- Uint8Array：8 位无符号整数，长度 1 个字节。
 * ----- Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
 * ----- Int16Array：16 位有符号整数，长度 2 个字节。
 * ----- Uint16Array：16 位无符号整数，长度 2 个字节。
 * ----- Int32Array：32 位有符号整数，长度 4 个字节。
 * ----- Uint32Array：32 位无符号整数，长度 4 个字节。
 * ----- Float32Array：32 位浮点数，长度 4 个字节。
 * ----- Float64Array：64 位浮点数，长度 8 个字节。
 * （3）这 9 个构造函数生成的数组，统称为TypedArray视图。它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个
 * 元素，所有数组的方法，在它们上面都能使用。普通数组与 TypedArray 数组的差异主要在以下方面：
 * ----- TypedArray 数组的所有成员，都是同一种类型。
 * ----- TypedArray 数组的成员是连续的，不会有空位。
 * ----- TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)
 *返回一个 TypedArray 数组，里面 10 个成员都是 0。
 * ----- TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。
 * （4）如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供 9 种固定的解读格式。
 * （5）TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数
 * （6）TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数。
 * （7）构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。
 * （8）TypedArray 数组也可以转换回普通数组
 * （9）普通数组的操作方法和属性，对 TypedArray 数组完全适用。注意，TypedArray 数组没有concat方法
 * （10）TypedArray 数组与普通数组一样，部署了 Iterator 接口，所以可以被遍历
 */
{
  // TypedArray 数组提供 9 种构造函数，用来生成相应类型的数组实例。构造函数有多种用法。TypedArray(buffer, byteOffset=0, length?)
  // 同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。
  {
    // 创建一个8字节的ArrayBuffer
    // const b = new ArrayBuffer(8);

    // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
    // const v1 = new Int32Array(b);

    // 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
    // const v2 = new Uint8Array(b, 2);

    // 创建一个指向b的Int16视图，开始于字节2，长度为2
    // const v3 = new Int16Array(b, 2, 2);

    // 上面代码在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。视图的构造函数可以接受三个参数：
    // ----- * 第一个参数（必需）：视图对应的底层ArrayBuffer对象。
    // ----- * 第二个参数（可选）：视图开始的字节序号，默认从 0 开始。
    // ----- * 第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。

    // 因此，v1、v2和v3是重叠的：v1[0]是一个 32 位整数，指向字节 0 ～字节 3；
    // v2[0]是一个 8 位无符号整数，指向字节 2；v3[0]是一个 16 位整数，指向字节 2 ～字节 3。只要任何一个视图对内存有所修改，
    // 就会在另外两个视图上反应出来。

    // 注意，byteOffset必须与所要建立的数据类型一致，否则会报错。
    {
      // const buffer = new ArrayBuffer(8);
      // const i16 = new Int16Array(buffer, 1);
      // 上面代码中，新生成一个 8 个字节的ArrayBuffer对象，然后在这个对象的第一个字节，建立带符号的 16 位整数视图，结果报错。
      // 因为，带符号的 16 位整数需要两个字节，所以byteOffset参数必须能够被 2 整除。
    }

  }

  // TypedArray(length)：视图还可以不通过ArrayBuffer对象，直接分配内存而生成
  {
    /*const f64a = new Float64Array(8);
    f64a[0] = 10;
    f64a[1] = 20;
    f64a[2] = f64a[0] + f64a[1];*/
    // 上面代码生成一个 8 个成员的Float64Array数组（共 64 字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。
    // 可以看到，视图数组的赋值操作与普通数组的操作毫无两样。
  }

  // TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数
  {
    // const typedArray = new Int8Array(new Uint8Array(4));
    // 上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。
    // 注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内
    // 存之上建立视图。
    {
      // const x = new Int8Array([1, 1]);
      // console.log(x[0]);
      // console.log(x[1]);
      // console.log(x[2]);
      // const y = new Int8Array(x);
      // x[0] = 5;
      // console.log(x[0]);
      // console.log(y[0]);
      // 上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。

      // 如果想基于同一段内存，构造不同的视图，可以采用下面的写法
      // const x = new Int8Array([1, 1]);
      // const y = new Int8Array(x.buffer);
      /*x[0] // 1
      y[0] // 1

      x[0] = 2;
      y[0] // 2*/
    }
  }

  // TypedArray构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。
  {
    // const typedArray = new Uint8Array([1, 2, 3, 4]);
    // 注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。
    // 上面代码从一个普通的数组，生成一个 8 位无符号整数的TypedArray实例。
  }

  // TypedArray 数组也可以转换回普通数组
  {
    // const typedArray = new Uint8Array([1, 2, 3, 4]);
    // const normalArray1 = [...typedArray];
    // or
    // const normalArray2 = Array.from(typedArray);
    // or
    // const normalArray3 = Array.prototype.slice.call(typedArray);
  }

  // 普通数组的操作方法和属性，对 TypedArray 数组完全适用。但是要注意，TypedArray 数组没有concat方法
  // 如果想要合并多个 TypedArray 数组，可以用下面这个函数。
  {
   /* function concatenate(resultConstructor, ...arrays) {
      let totalLength = 0;
      for (let arr of arrays) {
        totalLength += arr.length;
      }
      let result = new resultConstructor(totalLength);
      let offset = 0;
      for (let arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
      }
      return result;
    }*/
    // concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))
    // let a = Uint8Array.of(1, 2);
    // console.log([...a]);
  }

  // TypedArray 数组与普通数组一样，部署了 Iterator 接口，所以可以被遍历
  {
    // let ui8 = new Uint8Array(2);
    // console.log([...ui8]);
  }

}
