# React Hooks

Hooks索引

基本Hooks

[useState]()

useEffect

useContext

其他Hooks

useReducer

## 概念叙述

为什么要用Hooks？

我们知道函数式组件是没有生命周期也没有state的，用Hooks来模拟class组件的生命周期和state可以更方便的管理函数式组件。

### useState

相当于state

用法

```
let [state,useState] = useState([])
//state相当于class组件的state
//useState相当于class组件的setState()
//
```



### useEffect

在class组件中，有些生命周期是不必要，且不安全的，没有使用正确，很容易出现bug, 并且在componentDidMounted()生命周期使用的变量要在组件注销前清除，而Hooks使用useEffect，

```
useEffect(()=>{},[])
```

useEffect有两个形参，第一个形参为挂载完调用的函数，第二个形参为监听的内容，如果为空数组，useEffect只执行一次。

### useReducer

useState的替代物，更加便捷

惰性初始化

## ToodList实战