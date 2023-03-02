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



## Promise

```js
   // promise的基本用法
    // new promise
    // 三个状态
    // resolve reject
    // then
    // catch
    // all  所有都为成功时返回按照顺序排列的结果数组，有一个失败就失败
    // any  当有一个成功就会返回成功 不管谁在前还是后
    // race  谁快返回谁
    // 链式调用
  
  // 手写promise类 简单版本
    class Mypromise{
        static PENDING="pending";
        static FULFILLED="fulfilled";
        static REJECTED="rejected";
        constructor(func){
            this.promisestate = Mypromise.PENDING
            this.promiseresult = null
            func(this.resolve.bind(this), this.reject.bind(this))
        }
        resolve(result){
            if(this.promisestate === Mypromise.PENDING){
                this.promisestate = Mypromise.FULFILLED
                this.promiseresult = result
            }
        }
        reject(result){
            if(this.promisestate === Mypromise.PENDING){
                this.promisestate = Mypromise.REJECTED
                this.promiseresult = result
            }
        }
        then(onFulfilled, onRejected){
            const promise2 = new Mypromise((resolve, reject) => {
                if(this.promisestate = Mypromise.FULFILLED){
                    onFulfilled(this.promiseresult)
                }
                if(this.promisestate = Mypromise.REJECTED){
                    onRejected(this.promiseresult)
                }
            })
            return Mypromise
        }
    }
```

promise.all

```js
    function myPromiseall(promiseList) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promiseList)) {
                reject(new Error("输入的不是数组"))
            }
            let res = []
            let count = 0
            for (let i = 0; i < promiseList.length; i++) {
                Promise.resolve(promiseList[i]).then(value => {
                    count++
                    res[i] = value
                    if (count === promiseList.length) {
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
```

promise.any

```js
   // 手写promise.any
    function myPromiseany(promiseList){
        return new Promise((resolve,reject) => {
            if(!Array.isArray(promiseList)){
                reject(new Error(""))
            }
            let count = 0
            let errorlist = []
            for(let i = 0; i < promiseList.length; i++){
                Promise.resolve(promiseList[i]).then(value => {
                    resolve(value)
                },err => {
                    count++
                    errorlist[i] = err
                    if(count === promiseList.length){
                        reject(errorlist)
                    }
                })
            }
        })
    }
```



## 虚拟列表

```js
<template>
    <div class="list-container" ref="main" @scroll="scrollEvent">
        <div class="list-all" :style="{height : listAllHeight + 'px'}"></div>
        <div class="list-visiable" :style="{transform : getTransform}">
            <div class="list-item"  :style="{ lineHeight: itemSize + 'px' }" v-for="item in visiableData" :key="item.id">{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"MyListRander",
    props:{
        // 所有列表数据
        listData:{
            type:Array,
            default:() =>[]
        },
        // 元素高度
        itemSize:{
            type:Number,
            default:200
        },
    },
    data(){
        return {
            // 可视区高度
            visiableHeight:0,
            start:0,
            end:0,
            startOffset:0
        }
    },
    computed:{
        // 列表总高度
        
        listAllHeight(){
            return this.listData.length * this.itemSize
        },
         // 可视区数量
         visiableCount(){
            return Math.ceil(this.visiableHeight/this.itemSize)
         },
         // 可视区数据
         visiableData(){
            console.log(this.listData.slice(this.start, Math.min(this.end, this.listData.length)))
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
         },
        // 偏移位置
        getTransform(){
            return `translate3d(0,${this.startOffset}px,0)`;
        }
    },
    mounted(){
        this.visiableHeight = this.$el.clientHeight
        this.start = 0
        this.end = this.visiableCount + this.start
    },
    methods:{
        scrollEvent(){
            let scrollTop = this.$refs.main.scrollTop
            this.start = Math.floor(scrollTop/this.itemSize)
            this.end = this.start + this.visiableCount
            this.startOffset = scrollTop - (scrollTop % this.itemSize)
        }
    }

}
</script>

<style>
.list-container{
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}
.list-all{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}
.list-visiable{
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}
</style>
```



## 发布订阅

发布订阅模式简单来说就是有一个中介，比如我们在可以通过小红书关注博主，当博主发布新的作品时，小红书就会发布消息通知我们。

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
    
          // 只订阅一次
        once(eventName, callback) {
            // 由于需要在回调函数执行后，取消订阅当前事件，所以需要对传入的回调函数做一层包装,然后绑定包装后的函数
            const one = (...args) => {
                // 执行回调函数
                callback(...args)
                // 取消订阅当前事件
                this.off(eventName, one)
            }
            // 考虑：如果当前事件在未执行，被用户取消订阅，能否取消？



            // 由于：我们订阅事件的时候，修改了原回调函数的引用，所以，用户触发 off 的时候不能找到对应的回调函数
            // 所以，我们需要在当前函数与用户传入的回调函数做一个绑定，我们通过自定义属性来实现
            one.initialCallback = callback;
            this.on(eventName, one)
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

观察者模式相当于一个任务大厦，观察者订阅任务大厦的任务，当任务大厦有任务时就通知观察者。

```js
   class Obeserver{
        constructor(name){
            this.name = name
        }
        update(taskname){
            console.log(`${this.name}收到${taskname}`)
        }
    }

    class Publisher{
        constructor(){
            this.list = []
        }
        addObeserver(obeserver){
            this.list.push(obeserver)
        }
        notice(taskname){
            this.list.forEach(obeserver => obeserver.update(taskname))
        }
    }

    const puber = new Publisher()
    const pub1 = new Obeserver("黎明")
    const pub2 = new Obeserver("刘海")
    puber.addObeserver(pub1)
    puber.addObeserver(pub2)
    puber.notice("打铁任务")
```



## 防抖节流

```js

  function dounbuce(fn, dalay) {
        let time = null
        return function () {
            console.log(this)
            if (time) {
                time = null
            }
            time = setTimeout(() => {
                // console.log(this)
                // console.log(arguments)
                fn.apply(this, arguments)
                time = null
            }, dalay)
        }
    }

    function c() {
        console.log(this)
        console.log(arguments)
        console.log("click")
    }

    let da = dounbuce(c, 1000)
    let dom = document.getElementById("button")
    dom.addEventListener("click", function () {
        console.log(this)
        da.call(this, 1)
    })
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

## 懒加载

```js
    if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function (entries) {
                console.log(entries)
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        // lazyImage.srcset = lazyImage.dataset.srcset;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        } else {
            // Possibly fall back to a more compatible method here

            const lazyLoad = function () {
                if (active === false) {
                    active = true;

                    setTimeout(function () {
                        lazyImages.forEach(function (lazyImage) {
                            if ((lazyImage.getBoundingClientRect().top <= window
                                    .innerHeight && lazyImage.getBoundingClientRect()
                                    .bottom >= 0) && getComputedStyle(lazyImage).display !==
                                "none") {
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.srcset = lazyImage.dataset.srcset;
                                lazyImage.classList.remove("lazy");

                                lazyImages = lazyImages.filter(function (image) {
                                    return image !== lazyImage;
                                });

                                if (lazyImages.length === 0) {
                                    document.removeEventListener("scroll", lazyLoad);
                                    window.removeEventListener("resize", lazyLoad);
                                    window.removeEventListener("orientationchange",
                                        lazyLoad);
                                }
                            }
                        });

                        active = false;
                    }, 200);
                }
            };

            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
        }
```



## bind apply call

call

```js
Function.prototype.MyCall = function(context){
    if(typeof this !== "function"){
        throw new TypeError("error")
    }
​
    context = context || window
​
    context.fn = this
​
    const args = [...arguments].slice(1)
​
    const result = context.fn(...args)
​
    delete context.fn
​
    return result
}
```

apply

```js
Function.prototype.MyApply = function(context){
     // this就是谁调用的MyApply，谁就是这里的this
    //  要先判断this是不是function
    if(typeof this !== 'function'){
        throw new TypeError("error")
    }
    // 是否有上下文
    // 如果没有上下文就是window
    context = context || window
   
​
    // apply的特性的参数是数组
    const args = arguments[1] || []
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
```

bind

```js
Function.prototype.Mybind = (context, ...arg1){
    if(typeof this !== "function"){
            throw new TypeError("error")
    }
    const _this = this
    return new function bind(...arg2){
        return _this.call(context,..arg1,...arg2)
    }
}
```



## 浅拷贝和深拷贝

递归调用实现深拷贝

浅拷贝  拓展运算符 object.assgin

```js
// 检测数据类型的功能函数
   function clone(target, map = new Map()) {
            console.log(map)
            if (typeof target === 'object') {
                let cloneTarget = Array.isArray(target) ? [] : {};
                if (map.get(target)) {
                    return map.get(target);
                }
                map.set(target, cloneTarget);
                for (const key in target) {
                    cloneTarget[key] = clone(target[key], map);
                }
                return cloneTarget;
            } else {
                return target;
            }
        };
```

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

## 数组转树形结构

```js
    function changeTotree(list){
        let map = new Map()
        let result = []
        list.forEach(element => {
            let key = element.key
            map.set(key, element)
        });

        list.forEach(item => {
            let parent = map.get(item.parent)
            console.log(parent)
            if(parent){
                if(!parent.children){
                    parent.children=[]
                }
                parent.children.push(item)
            }else{
                result.push(item)
            }
        })
        return result
    }
```

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
- MutationObserver ([`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 接口提供了监视对 DOM 树所做更改的能力。)
- async awiat下面的任务是微任务
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

## 跨域解决的几种方式

jsonp 只能请求Get

cors

nginx

node中间件

postmessage

iframe

websocket

## 判断数据类型的几种方式

首先数据类型分为基本数据类型，占用空间小，直接存储在栈中，有Boolean, number, string, undefined, null, symbol, bigint

symbol跟bigint是es6才有的，symbol创建处理的数据是一定不会重复的，一般通过遍历对象不能取出symbol，要通过Object.getOwnpropertySymbol取

另外一种是引用数据类型Object(对象，数组，函数，正则表达式对象，Map对象,Date对象等),数据比较大，一般就是把变量存在栈中，如何数据存在堆中，他们之间用一个指针相连接。

判断数据类型

- typeof (判断基本数据类型， null是object, 引用数据类型除了function是function之外，其他都是Object)
- instanceof(可以判断number, string, bigint, boolean, 和引用数据类型)，这种方法是通过检查实例对象的原型链是否在构造函数的原型上，但是这个会有一个问题，因为引用数据类型的祖先都是Object，所以引用数据类型 instanceof Object 都是true。
- constructor 构造器 比较准确但是只能判断引用数据类型
- object.prototype.toString方法 返回字符串'[object 类型]'

```js
   function instanceofa(left, right) {
        if (typeof right !== "function" || left === null) {
            return false
        }
        let rightprototype = right.prototype
        let leftproto = left.__proto__
        console.log(left.__proto__)
        while (true) {
            if (!leftproto) {
                return false
            }
            if (leftproto === rightprototype) {
                return true
            }
            leftproto = leftproto.__proto__
        }
    }
```

## Map类型

map.set()

map.get()

map.has()

map.size()

map.entries()

map默认情况不包含任何键，object有原型，自己的键可能会跟原型冲突

map是有顺序的，按插入顺序排序  object目前是有序的，但是排序规则很复杂

map键可以是任意类型 object只能是string或者symbol类型

map可以获取对象长度 object不能

map是可迭代的  object没有迭代协议不能通过for of迭代 但是可以用object.keys values for in

map对键的增删改查有优化

## WeakMap

**`WeakMap`** 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

## typescript

用来规范化JS，可以让项目跟清晰规范

类型

- number
- string
- enum
- array
- tuple
- any
- unknow
- never
- void
- null undefind

(any是所有类型都包括，所有类型都能赋值给any类型，unknow是所有类型都能包括但是只有any跟unknow类型可以赋值给unknow)

type跟interface

type跟interface都可以用来描述对象跟函数

type通过&拓展  interface 通过Extends拓展

type可以声明基本类型联合类型和元组 interface不行

interface可以合并声明

ts 内置类型

利用泛型跟keyof 实现的

- partial 循环对象把它转为非必须

  type partial<T> = {

  ​	[p in keyof t] : t[p]

  }

- require 循环对象把它转为必须

- randonly  

  type randonly<T> = {

  randonly [p in  keyof  T] :T[p]

  }

- pick 选出在给定参数的

  type pick<T,K extends t> = {

  [p in k ] :t[p]

  }

- exclude 选出 T是否是U的子类型的    type Exclude<T,U> = T extends U? never:t

- omit  pick<T, exclude<keyof T, K>>

## 扁平化数组

```js
 let arr =[1,2,[3,4,[5]]]
    let result = []
    function flatten1(arr){
        if(Array.isArray(arr)){
            arr.forEach(item => {
                result.concat(flatten1(item))
            })
        }else{
            result.push(arr)
        }
    }
    // flatten1(arr)
    function flatten2(arr){
        return arr.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flatten2(cur) : cur)
        },[])
    }
    
    function flatten3(arr){
        let str = arr.toString()
        return str.split(",").map(i => Number(i))
    }
    function flatten4(arr){
        let str = JSON.stringify(arr)
        str = str.replace(/(\[|\])/g,"")
        str = "[" + str + "]"
        return JSON.parse(str)
    }
    console.log(arr.flat(Infinity))
```



## 箭头函数

es6语法，是一个匿名函数，它的this默认指向它所处的执行期上下对象里面的this

为什么不能作为构造函数

new 的过程是先创建一个空对象，然后绑定原型链，绑定自己的this 返回这个对象

箭头函数没有自己的this，它指向的是里它最近的块级作用域里面的this,它也没有prototype实现，没办法让它的实例对象用__proto__来指向

## let const

不存在变量提升

暂时性死区  绑定了块级作用域  如果在这个作用域外面let定义了一个变量 里面也定义了let变量 那么里面的作用域不会受到外面的影响，还是不能变量提升

不可以重复声明

const常量不能改变

## 执行上下文

全局执行上下文 window环境 GO

函数执行上下文

- 创建AO对象
- 找形参和变量声明，将变量和形参名作为AO属性名，值为undefined
- 将实参值和形参统一
- 在函数体里面找函数声明，值赋予函数体

## 断点重传

思路大概就是将文件转成Blob对象，利用Blob.prototype.slice将文件进行分片，然后每个文件分片要设定一个一个根据文件内容的hash值，用来给客服端和服务器表示那些文件片已经上传了，那些文件还没上传，上传了的切片就不用上传了，这些切片可以并发请求，将文件切片，切片 hash，以及文件名放入 formData 中，再调用上一步的 `request` 函数返回一个 proimise，最后调用 Promise.all 并发上传所有的切片,秒传就是把hash值传给后端判断，如果这个hash在已上传列表切片中，返回200，上传成功，上传成功就将把这个切片从请求列表中删除，断点续传，暂停上传主要就是利用xmlhttprequest.abort方法取消，续传就是把还在请求列表里面的切片重新上传。

## 性能优化

1. 文件加载方面可以进行文件压缩，图片压缩，
2. 可以用雪碧图 跟节流防抖减少网络请求次数 
3. 还可以继续HTTP缓存 本地缓存 vue的keep-alive减少渲染次数  对DOM查询进行缓存 对DOM操作进行合并也可以减少渲染次数
4. 使用懒加载避免无用加载
5. SSR服务器端渲染 让渲染加快
6. style放在head标签 script放在body底部 避免渲染堵塞

## ssr和csr

服务端渲染是服务端直接到生成的HTML发送给客户端

服务端渲染的优势：减少网络传输，响应快，用户体验好，首屏渲染快，对搜索引擎友好，搜索引擎爬虫可以看到完整的程序源码，有利于SEO

## 内存泄漏

监听事件为清除

闭包

settimeout setinterval

## 输入URL经历了什么

大致是解析IP地址，进行HTTP请求，如果是强制缓存则不在向服务端请求，如果是协商缓存则判断数据是否发生变化，如果没有返回304，从缓存中拿数据，如果发生了变化服务器返回最新数据，数据获取成功后开始渲染页面，同时也会获取图片音频视频，CSS,JS渲染过程就是HTML转成DOM树，CSS转成stylesheet,根据他们两个创建布局树，将布局树分层，为每个图层绘制列表，然后分块，利用光栅化把分块转成位图，最后合成为页面



## 重绘重排是什么

重绘就是样式发生改变，重绘外观

重排就是有元素位置发生改变要对元素重新排列

- color
- background-color
- text-shadow
- visiable

重排

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

强制重排

offsetTop、offsetLeft、offsetWidth、offsetHeight

scrollTop、scrollLeft、scrollWidth、scrollHeight

clientTop、clientLeft、clientWidth、clientHeight

getComputedStyle()

getBoundingClientRect

进行合并 比如设置cssText 或者直接改变class属性

如果循环在页面中添加新的元素的话，可以让元素逃离文档流，设置display:none， 然后一次添加。

## 垃圾回收机制

标记清除(Mark-Sweep)

标记清除是JavaScript引擎中进行垃圾回收中使用到最多的算法，在目前主流的浏览器厂商中几乎都是可以看到标记清除算法，只不过不同浏览器厂商优化不同，而且不同的浏览器上运行的性能也有差异。
 而此算法主要核心分为两部分标记和清除。
 在代码执行阶段，为程序中所有的变量添加上一个二进制字符(二进制运算最快)并初始值置为0(默认全是垃圾)，然后遍历所有的对象，被使用的变量标记置为1，在程序运行结束时回收掉所有标记为零的变量，回收结束之后将现存变量标记统一置为0，等待下一轮回收开启。

新生代就是存放占用内存较少的，存活时间较短的对象，分为使用区跟空闲区，新生代垃圾回收器会对使用区活动对象进行标记，标记完成后把活跃对象复制到空闲区，对活动对象进行活跃排序，然后对使用区进行垃圾回收，将使用区跟空闲区进行身份互换，知道活跃对象清空

老生代就是存放生命周期较长的对象，使用标记清楚发清除

清除定时间，监听DOM，不要过分使用闭包

## 继承手写

```js
    // 原型继承 直接new
    function before(){
        this.a = [34,44]
    }
    before.prototype.b = [3,5,6]
    let sonbefore = new before()
    sonbefore.b = [3,4,5]
    console.log(sonbefore)

    // 构造函数继承
    function fatherType(){
        this.age = "43434"
        this.sayname = () => {
            console.log(this.age)
        }
    }
    fatherType.prototype.saya = () => {
        console.log("443")
    }

    function sonType(){
        fatherType.call(this)
        this.name = "黎明"
    }

    sub1 = new sonType()
    console.log(sub1)

    // 组合继承 父亲用构造函数继承  祖先元原型继承用原型链  缺点是属性会发生重复的，自身属性跟原型链属性重复
    

    // 原型式继承
    function father2type(obj){
        function f(){}
        f.prototype = obj
        return new f()
    }

    let person = {
        name : "理想",
        a:[3,4,5],
        sayname : function(){
            console.log(this.name)
        }
    }
    let sub2 = new father2type(person)
    sub2.a[2] ="232"
    console.log(sub2)
    console.log(person.a)

    // 寄生式继承
    function father3type(){
        let clone = father2type(person)
        clone.say = () => {
            console.log("44")
        }
        return clone
    }

    // 寄生组合式继承
    // 自己的父亲继承用构造函数继承，父亲的父亲通过寄生式继承
    function father4type(sontype, fathertype){
        let prototype = Object.create(fathertype.prototype)
        prototype.constructor = sontype
        sontype.prototype = prototype
    }

    function a(){
        this.arr = [2,3,4]
    }
    a.prototype={b:[4,3,4]}

    function son2(){
        a.call(this)
    }
    father4type(son2, a)
    let ins = new son2()
    console.log(a)
    ins.b =[344]
    console.log(ins)
```

## SEO

HTML5语义化 标题用H1  重点内容em header footer

导航优化

面包屑

加首页链接

重要内容先渲染

可以用服务端渲染

img a连接这些写上alt属性 title

性能优化 懒加载 精灵图这些

## 数组去重

利用array.from加set

利用filter加indexof

利用filter加map

两层for循环加array.prototype.splice

```js
  let arr = [1,1,2,2,8,8,2,3,9,3,4,5,6,7,7,7,9,9]
    console.log(arr.filter((item,i) => arr.indexOf(item) == i))
    console.log(Array.from(new Set(arr)))
    let map = new Map()
    console.log(arr.filter((item) => !map.has(item) && map.set(item,true)))
    console.log(arr)
    for(let i = 0; i < arr.length-1; i++){
        for(let j=i+1; j < arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1)
                j--
            }
        }
    }
    console.log(arr)
```

