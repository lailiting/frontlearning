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

## typeof intanceof

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

## 闭包，使用场景

闭包就算让开发者可以从内部函数访问外部函数的作用域

settimeout

回调

函数防抖和节流

封装对象的私有属性

## 性能优化

## $nextick

## 数组转树形结构

## 扁平化数组

## 数组方法

## 事件循环机制

点击事件的执行顺序

JS分为执行栈和任务队列，而任务分为宏任务和微任务，事件循环就是先把同步的任务推的执行栈中先执行完，等执行栈清空之后，去检索微任务中是否有任务，如果有则一次性把微任务执行完，如果执行微任务中途有其他微任务加进来，也会一并执行，微任务执行完之后，去查看宏任务是否到了时间或者说是否触发，如果是则执行这个宏任务，这个宏任务执行完之后要查看是否有微任务，如果有一次性执行完，然后继续看宏任务，不断循环，这个机制就叫做事件循环机制。

微任务

- promise.then
- MutationObserver
- async awiat

宏任务

- settimeout
- setInterval
- setImmedate
- MessageChannel
- postMessage