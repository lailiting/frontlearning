## Vue基础知识点

## 生命周期历程

**beforeCreate**

在组件实例初始化完成之后立即调用。会在实例初始化完成、props 解析之后、`data()` 和 `computed` 等选项处理之前立即调用。

注意，组合式 API 中的 `setup()` 钩子会在所有选项式 API 钩子之前调用，`beforeCreate()` 也不例外。

**created**

在组件实例处理完所有与状态相关的选项后调用，此时响应式数据，计算属性，方法，侦听器都已设置完成，但此时还未挂载DOM，所以不能访问this.$el

**beforeMount**

在组件被挂载之前调用，此时组件已经完成了它的响应式状态设置，但还没有创建DOM节点

**mounted**

在组件被挂载之后调用，组件在以下情况下被视为已挂载：

- 所有同步子组件都已经被挂载。(不包含异步组件或 `<Suspense>` 树内的组件)
- 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

**beforeUpdate**

在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。

**updated**

在组件因为一个响应式状态而更新DOM树之后调用，这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 作为替代。

**beforeUnmount**

在一个组件实例被卸载之前调用

**unmounted**

在一个组件实例被卸载之后调用，一个组件在以下情况下被视为已卸载：

- 其所有子组件都已经被卸载。
- 所有相关的响应式作用 (渲染作用以及 `setup()` 时创建的计算属性和侦听器) 都已经停止。

可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。也可以用来记录组件销毁时的组件状态，比如记录视频的播放位置。

***keep-alive相关的生命周期***

**activated**

若组件实例是 [``](https://cn.vuejs.org/api/built-in-components.html#keepalive) 缓存树的一部分，当组件被插入到 DOM 中时调用。可以通过判断id与上次记录的是否一致来确定是否要重新发送请求

**deactivated**

若组件实例是 [``](https://cn.vuejs.org/api/built-in-components.html#keepalive) 缓存树的一部分，当组件从 DOM 中被移除时调用。



## 异步请求是放在Created生命周期还是Mounted生命周期

一般情况下是在create生命周期，但是如果需要先渲染子组件数据再渲染父组件数据的话则放再mounted生命周期，因为父子组件的渲染过程是先进行父组件的beforeCreate,created,beforeMount然后渲染子组件的beforeCreate,created,beforeMount，Mouned最后再是父组件的Mounted，如果需要先渲染子组件数据的话，把异步函数放在Created里面会增加子组件的loading时间，但是在一般情况下，放在created里面可以更快的获取到服务端的数据，然后因为这个时候data已经挂载到了vue实例里面了，如果有重复调用统一的函数的情况的话，也可以直接调用，增加代码复用性，另外还能有助于统一性。**ssr(服务器渲染)**不支持beforecreate和mounted

## keep-alive缓存有哪些作用

keep-alive包裹一个组件，会缓存不活动的组件实例，主要用于保留组件状态或避免重复渲染。

比如有一个数据列表，点击某一个列表项可以看到数据详情，然后重复点击查看数据详情如果没有keep-alive的话，数据详情组件就要跟着重复渲染，但是有了keep-alive进行缓存的话，就可以从缓存中快速渲染。

keep-alive是一个抽象的组件，不会被渲染到真实的DOM中

使用方式：

1. 常用的两个属性include/exclude，允许组件有条件的进行缓存。
2. 两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。
3. keep-alive的中还运用了LRU(Least Recently Used)算法。如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

原理：Vue 的缓存机制并不是直接存储 DOM 结构，而是将 DOM 节点抽象成了一个个 VNode节点，所以，keep- alive的缓存也是基于VNode节点的而不是直接存储DOM结构。

其实就是将需要缓存的VNode节点保存在this.cache中／在render时,如果VNode的name符合在缓存条件（可以用include以及exclude控制），则会从this.cache中取出之前缓存的VNode实例进行渲染。

## proxy

```js
  let obj = {
        a :23,
        b:{
            ss:2
        },
        c:[2,3,4]
    }
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
    obj2.b.ss = 7
    obj2.c.push(5)
    console.log(obj)
```

## Object.defineProperty

vue响应式原理采用的是数据劫持和发布订阅模式实现数据响应式，使用Object.definePropety的setter跟getter来劫持数据，将数据变动时发布消息给订阅者，订阅者收到消息时做相应处理，获取数据时使用Object.definePropety的getter，当数据改变时触发setter，在setter中做更新DOM的操作，如果数据量很大，一次性递归开销很大，不能监听到对象的新增属性跟删除属性，不能监听数组的一些方法跟通过数组下标改变值。(可以通过vm,$set改变)

解释:会在一个对象上定义一个新属性或者修改一个现有属性，并返回该对象

```
Object.defineProperty(obj, prop, descriptor)
```

- obj 要修改的对象
- prop要定义或修改的属性
- descrioptor要定义或修改的属性描述符。

描述符

- configurable 是否允许描述符改变
- enumerable 是否允许出现在对象的可枚举属性中
- value 该属性的值
- writable 是否允许value值改变
- get 获取属性值
- set 更改属性值

手写

```js
  function Observer(obj) {
        //如果传入的不是一个对象，return
        if (typeof obj !== "object" || obj === null) {
            return
        }
        // for (key in obj) {
        Object.keys(obj).forEach((key) => {
            defineProperty(obj, key, obj[key])
        })
        // }

    }
    // 把data上面的数据绑定到vm中，并用Obejct.defineProperty重写get set
    function defineProperty(obj, key, val) {
        //如果某对象的属性也是一个对象，递归进入该对象，进行监听
        if (typeof val === 'object') {
            Observer(val)
        }
        Object.defineProperty(obj, key, {
            get() {
                console.log(`访问了${key}属性`)
                return val
            },
            set(newVal) {
                console.log(`${key}属性被修改为${newVal}了`)
                data[key] = newVal
                document.querySelector('#app').textContent= newVal
            }
        })
    }

```

## 批量异步跟新DOM

Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 数据变化监听 被多次触发，只会被推入到队列中一次。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

## $nextick

vue更新DOM是异步的，但是我们要处理一些操作要获取更新后的DOM，比如我们给列表赋值数据之后要 获取到列表项的高度，这个时候就可以用$nextick

## 动态路由

## VueReact对比

## computed跟watch区别

## v-if跟v-show

v-show其实是对元素进行了隐藏，无论显示不显示都会渲染，时候频繁改变显示与否的场景，减少重排重绘

v-if如果不显示就不会渲染，不需要频繁切换条件的场景

## Vuex

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

（2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## 双向数据绑定

input textarea:  v-bind:value v-on : input

通过v-bind绑定属性，然后通过v-on: input改变属性值

## 自己写过哪些组件

## 单页面的理解

初始时加载所有内容，会有缓存，通过路由加载

## 单向数据流

所有的prop都使得父子prop之间形成了一个单向下行的绑定，子组件不能返过来改变父组件的属性，不然数据流流向会变得难以理解，当子组件要改变父组件属性时，通过$emit改变，其实就是让父组件自己改变自己，当props改变时，子组件的prop都会刷新成最新值

## 父组件可以监听到子组件的生命周期吗？

可以用hook或者$emit监听

## computed 和 watch 的区别和运用的场景？

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

## vue-router

## router实现

## diff算法

虚拟 DOM 的实现原理主要包括以下 3 部分：

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。