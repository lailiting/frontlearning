## JS解析URL

```js
let url = "http://www.domain.com/?user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

// 实现一个函数： parseParam
// 输入解析后的结果为:

// {
//   user: 'jack',
//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//   city: '北京', // 中文需解码
//   enabled: true, // 未指定值得 key 约定为 false
// }

   function parseParam(url) {
            const paramsArr = url.slice(url.indexOf("?") + 1).split("&");
            const res = {};
            paramsArr.forEach((item) => {
                let [key, value] = item.split("=");

                if (value) {
                    value = decodeURIComponent(value);
                    value = `${parseInt(value)}` == value ? parseInt(value) : value
                    if (res.hasOwnProperty(key)) {
                        res[key] = [res[key], value];
                    } else {
                        res[key] = value;
                    }
                } else {
                    res[key] = false
                }
                // 判断key是否单次出现
            });
            return res;
        }
```

## format时间

```js
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
```

## 正则表达式匹配

## Promise



## 虚拟列表



## 发布订阅

```js
class PubSub {
    // 
    constructor() {
        this.event = {

        }
    }
    // 订阅
    subscribe(key, fn) {
        if (!this.event[key]) {
            this.event[key] = []
        }
        this.event[key].push(fn)
    }
    // 发布
    pubsub(key, ...arg) {
        if (!this.event[key] || this.event[key].length === 0) {
            return false
        }

        this.event[key].forEach(fn => {
            fn(...arg)
        });
    }

    // 取消某个订阅
    unSubscribe(key, fn) {
        console.log(fn)
        if (this.event[key]) {
            let index = this.event[key].findIndex(e => e == fn);
            this.event[key].forEach(e => {
                console.log(e == fn)
            })
            if (index !== -1) {
                this.event[key].splice(index, 1)
            }
        } else {
            return false
        }
        if (this.event[key].length === 0) {
            delete this.event[key]
        }
    }

    // 取消所有订阅cc
    unSubscribeAll(key) {
        if (this.event[key]) {
            delete this.event[key]
        }
    }

}

let county = new PubSub()
county.subscribe("新厂", (c) => {
    console.log("第一个", c)
})
county.subscribe("新厂", (c) => {
    console.log("第二个", c)
})
county.subscribe("新厂", (c) => {
    console.log("第三个", c)
})
county.subscribe("旧厂", (c) => {
    console.log("盈利第一个", c)
})
county.subscribe("旧厂", (c) => {
    console.log("盈利第二个", c)
})
let fn3 = (c) => {
    console.log("盈利第三个", c)
}
county.subscribe("旧厂", fn3)
county.unSubscribe("旧厂", fn3)
county.pubsub("新厂", "1000万")
county.pubsub("旧厂", "500万")
```



## 观察者模式



## 防抖节流

```js

let dounbe = function(fn,dalay){
	let time = null
	return function(){
		if(time){
			clearTimeout(time)
		}
		time = setTimeout(() => {
			fn.apply(this, argument)
			time = null
		},dalay)
	}
}
```

```js
let dounbe = function(fn,dalay){
	let time
	return function(){
		if(time){
			return
		}
		time = setTimeout(() => {
			fn.apply(this, argument)
			time=null
		},dalay)
	}
}
```

## setTimeout setInterval

## 懒加载

## bind apply call

## 说一说JavaScript有几种方法判断变量的类型？

typeof instanceof  constructor object.prototype.toString.call()

## 浅拷贝和深拷贝

递归调用实现深拷贝

```js
// 检测数据类型的功能函数
const checkedType = (target) => Object.prototype.toString.call(target).replace(/\[object (\w+)\]/, "$1").toLowerCase();
// 实现深拷贝（Object/Array）
const clone = (target) => {
    let result;
    let type = checkedType(target);
    if(type === 'object') result = {};
    else if(type === 'array') result = [];
    else  return target;
    for (let key in target) {
        if(checkedType(target[key]) === 'object' || checkedType(target[key]) === 'array') {
            result[key] = clone(target[key]);
        } else {
            result[key] = target[key]; 
        }
    }
    return result;
}
```

## cumpted和waterer实现

## 块元素行内块元素

## BFC

## HTML5语义化

## CSS

## React基础知识

## 位运算符

浏览器兼容问题

## 视口高度

```js
// clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}
// 对应的dom元素的宽高有以下几个常用的：
document.getElementById("div").offsetHeight; // 元素的实际高度
document.getElementById("div").offsetWidth;  // 元素的实际宽度
document.getElementById("div").offsetLeft;  // 元素的实际距离左边界的距离
document.getElementById("div").offsetTop // 元素的实际距离上边界的距离


```



## 性能优化



## $nextick

## 数组转树形结构

## 扁平化数组

```js
function fallten(arr) {
        let result = []
        for (let item of arr) {
            if (Array.isArray(item)) {
                result = result.concat(fallten(item))
            } else {
                result.push(item)
            }
        }
        return result
    }

    // reduce
    function rflatten(arr){
        return arr.reduce((pre,cur) => {
            return pre.concat(Array.isArray(cur) ? rflatten(cur) : cur)
        },[])
    }

    // flat
    function fflatten(arr){
        return arr.flat(Infinity)
    }

    // tostring
    function sflatten(arr){
        return arr.toString().split(",").map(i => Number(i))
    }

    // 正则表达式
    function zflatten(arr){
        let str = JSON.stringify(arr)
        str = str.replace(/(\[|\])/g,"")
        str = "[" + str + "]"
        return JSON.parse(str)

    }

    // 拓展运算符不理解
    function tflatten(arr) {
        while (arr.some(i => {
                return Array.isArray(i)
            })) {
            console.log(arr,...arr)
            arr = [].concat(...arr);
        }
        return arr;
    }
```



## 数组方法

- **`at()`** 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

- **`concat()`** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

- **`entries()`** 方法返回一个新的**数组迭代器**对象，该对象包含数组中每个索引的键/值对。

- **`every()`** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

- **`some()`** 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

- **`fill()`** 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。fill(value, start, end)

- **`filter()`** 方法创建给定数组一部分的[浅拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Shallow_copy)，其包含通过所提供函数实现的测试的所有元素。

- **`find()`** 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

- **`findIndex()`**方法返回数组中满足提供的测试函数的第一个元素索引。若没有找到对应元素则返回 -1。

- **`findLast()`** 方法返回数组中满足提供的测试函数条件的最后一个元素的值。如果没有找到对应元素，则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

- **`findLastIndex()`** 方法返回数组中满足提供的测试函数条件的最后一个元素的索引。若没有找到对应元素，则返回 -1。

- **`flat()`** 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

- **`flatMap()`** 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 连着深度值为 1 的 [flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

- **`forEach()`** 方法对数组的每个元素执行一次给定的函数。forEach((element, index, array) => { /* … */ })

- **`Array.from()`** 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

- **`include（）`** 方法确定数组是否 在其条目中包含一定的值，返回或酌情返回。`true``false`

- **`indexOf（）`** 方法返回第一个索引，其中 给定元素可以在数组中找到，如果不存在，则为 -1。indexOf(searchElement, fromIndex)

- **`Array.isArray（）`** 静态方法确定传递的值是否为 [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)。

- **`join（）`** 方法创建并 通过连接数组中的所有元素返回新字符串 （或[类似数组的对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）， 用逗号或指定的分隔符字符串分隔。如果阵列有 只有一个项目，那么该项目将在不使用分隔符的情况下返回。

- **`keys（）`** 方法返回一个新的**数组 包含**数组中每个索引的键的迭代器对象。

- **`lastIndexOf（）`** 方法返回最后一个索引，其中 给定的元素可以在数组中找到，如果不存在，则为 -1。该数组是 向后搜索，从 开始。`fromIndex`

- **`map（）`** 方法**创建 填充**了调用所提供函数的结果的新数组 调用数组中的每个元素。

- **`pop（）`** 方法从数组中删除**最后一个**元素并返回该元素。此方法更改 数组。

- **`push（）`** 方法将一个或多个元素添加到 一个数组并返回数组的新长度。

- **`reduce（）`** 方法按顺序对数组的每个元素执行用户提供的“reducer”回调函数，传入前一个元素计算的返回值。 跨数组的所有元素运行化简器的最终结果是单个值。

  第一次运行回调时，没有“上一次计算的返回值”。 如果提供，可以使用初始值代替它。 否则，索引 0 处的数组元素用作初始值，迭代从下一个元素（索引 1 而不是索引 0）开始。

  也许最容易理解的情况是返回数组中所有元素的总和：`reduce()`

- **`reverse（）`** 方法就*[地](https://en.wikipedia.org/wiki/In-place_algorithm)*反转数组并返回对同一数组的引用，第一个数组元素现在成为最后一个数组元素，最后一个数组元素成为第一个数组元素。换句话说，数组中的元素顺序将转向与前面所述的相反的方向。

- **`shift（）`** 方法从数组中删除**第一个**元素并返回已删除的元素。此方法更改长度 的数组。

- **`slice（）`** 方法返回一部分的[浅拷贝](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) 将数组转换为从中选择的新数组对象 到 （不包括） 其中 和 表示 该数组中项的索引。不会修改原始数组。`start``end``end``start``end`

- **`sort（）`** 方法就*[地](https://en.wikipedia.org/wiki/In-place_algorithm)*对数组的元素进行排序，并返回对同一数组的引用，现在已排序

- **`splice（）`** 方法通过以下方式更改数组的内容 删除或替换现有元素和/或[添加新元素。splice(start, deleteCount, item1, item2, itemN)

- **`toString（）`** 方法返回一个字符串，表示 指定的数组及其元素。

- **`unshift（）`** 方法将一个或多个元素添加到 数组的开头，并返回数组的新长度。

- **`values（）`** 方法返回一个新的数组迭代器对象，该对象*[迭代](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)数组*中每个项的值。



## 事件循环机制

点击事件的执行顺序

JS分为执行栈和任务队列，而任务分为宏任务和微任务，事件循环就是先检查宏任务是否为空，如果不为空先把空任务的同步任务执行完如何去检索微任务中是否有任务，因为script代码块属于宏任务，所以先执行第一个script代码块的同步任务，执行完检查到有微任务则一次性把微任务执行完，如果执行微任务中途有其他微任务加进来，也会一并执行，微任务执行完之后，去查看宏任务是否到了时间或者说是否触发，如果是则执行这个宏任务，这个宏任务执行完之后要查看是否有微任务，如果有一次性执行完，然后继续看宏任务，不断循环，这个机制就叫做事件循环机制。

微任务

- promise.then.catch.finally
- MutationObserver
- async awiat
- process.nextTick(Node环境)

宏任务

- settimeout
- setInterval
- setImmedate
- MessageChannel
- postMessage
- script

## 保持前后端实时通信的方法

**ajax短轮询**

使用ajax进行短轮询，也就是通过定时器实现，浏览器定时的向服务器发送http请求，服务器收到请求后立即响应，比较浪费性能

**ajax comet长轮询**

comet是指当服务器收到客户端请求时，不会立即响应，而是将请求挂起，然后服务器判断数据是否更新，如果更新则响应，如果一直没数据比超出时间限制则关闭连接，挂起也导致资源浪费

**SSE**

是HTML5新增的，它允许服务器推送数据到客户端，当有数据更新时，服务器推送到客户端

**WebSocket协议**

webSocket是独立的，创建在TCP上的协议，实现服务器和客户端的全双工通信。首先客户端要通过http与服务端建立起连接，然后客户端和服务器就可以相互发送数据。

## 调试

打印输出:

- console.log 普通打印
- console.warn 打印警告
- console.error 打印错误
- console.time console.timeEnd 用于计算代码段的执行时间
- console.dir 查看DOM节点的相关事件和属性
- console.table 将数组或者类数组的对象打印成表格

在浏览器的开发者工具中选择sources面板里面设置断点，刷新进行调试

或者在vscode里面设置断点将终端设置成javascript debug模式，运行调试，vscode还可以设置条件断点

DOM断点，在浏览器开发者工具里面的elements选择卡选择要断点的元素，可以选择break on 里面的子树修改，属性修改和节点移除三种断点。

## cookie sessionStorage localStorage

(存储位置，写入方式，生命周期，请求时是否携带，数据共享，应用场景，存储大小)

共同点:他们都是浏览器的本地存储，并且都遵循同源策略，不过sessionStorage必须是同一个页面。

不同点：cookie是服务端写入的，而sessionStorage跟localStorage是由前端写入的，cookie的生命周期是后端定义的，而localstorage是写入后会一直存在浏览器中，除非手动清除，而sessionStrorage是会话存储，如果这个标签页关闭的话就会清除，cookie的存储为4KB比较小而另外两个有大概5M，cookie会在向后端发请求的时候自动携带cookie，另外两个不会，cookie适合用来存储sessionID和token,localstroage适合存储不易变动的数据，sessionStorage可以保持刷新前的一些数据。

## 预编译

## 作用域

在es5里面只有全局作用域和函数作用域

在es6里面引入了块级作用域

## 闭包

一般形式就是定义一个函数A，里面返回一个函数B，并且B访问了A的变量，A函数执行后这个变量闭包不会销毁，而且只有B函数可以访问到。

应用场景

单例模式

模拟私有属性

柯里化函数

settimeout

回调

函数防抖和节流

封装对象的私有属性

会找出内存泄漏，严重的情况下可能会照成内存溢出。