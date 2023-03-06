## ES6

## 块级作用域

全局作用域会照常内部属性覆盖外部属性，for循环的var i 会全局泄漏

## 解构赋值

- 数组解构 let [a,b,c] = [1,2,3]
- 对象解构 let {a,b,c} = {a:1, b:2,c:3}
- 字符串解构 let [a,b,c] = "hel"
- 函数参数解构 function ({x = 0, y = 0} = {}) 当不传参数的时候为{}

## class

- 相当于原型链
- 有私有属性私有方法 不会被外部访问
- 有静态属性跟静态方法 不会被实例继承  static比普通方法层级更高 
- 用Extends跟super进行继承 super之后才能定义自己的属性或者方法
- 实例属性可以放在constructor外面

```js
    // class相当于构造函数 里面定义的方法相当于放在了prototype上 new的过程跟原型链继承一样
    class father {
        name="爸爸"
        age=20
        #wife="妈妈"
        static sayname(){
            console.log("刘明")
        }
        getname(){
            console.log(this.name)
        }
    }
    father.sayname()
    const son = new father()
    console.log(son.sayname)

    class a extends father {
        constructor(){
            super()
            this.sign=[1,2,3]
        }
        sing(){
            console.log("跳舞")
        }
    }
   let b = new a()
   b.sign[0] = 2332
   console.log(b)
```

## 尾调用优化

## 箭头函数

没有自身this，this是外出作用域的this,定义之后就不会再改变了，没有prototype属性，没有arguments

## proxy和refelct

```js
   let obj2 = new Proxy(obj, {
        get(target, key){
            console.log(`读了${target}为${key}`)
            return target[key]
        },
        set(target, key, newval){
            console.log(`改了${target}为${newval}`)
            target[key] = newval
        }
    })
```



## promise

```js
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
    let myPromise1 = new Mypromise((resolve, reject) => {
        resolve(3)
    })
```

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



## generator

```js
    function myG(list){
        let index = 0
        let len = list.length
        return {
            next:function(){
                let done = index >= len ? true:false
                let value = !done ? list[index++] : undefined
                return {
                    done,
                    value
                }
            }
        }
    }
    let c = myG([1,2,3])
    console.log(c.next())
    console.log(c.next())
    console.log(c.next())
    console.log(c.next())
```



## async

