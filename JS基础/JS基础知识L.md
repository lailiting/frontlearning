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