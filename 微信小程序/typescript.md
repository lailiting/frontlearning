# typescript

## 基础类型

number

string

undefined

null

## any类型和联合类型

any类型有很对类型

联合类型

```
interface a{

​	b : string | number

}
```



## 接口

interfece

可继承

## 枚举(Enum)

枚举类型下标与值相互绑定

常量值

数字，只要设置第一个下面的会递增

字符串：标识

## 泛型

//可以看成占位符，可以动态的根据使用更改传入的值类型，和返回的值类型

```
function fun<T>(arg: T):T{

}
let res = fun("str")

function fun<T, U>(arg: [T,U]):[U,T]{
	return [arg[1], arg[0]]
}
let res = fun("str")
```


泛型的属性也可以继承,用来做约束条件

```
interface ilength{
	length : number
}
function fun<T extend ilength>(arg: T):T{
	console.log(arg.length)
}
//只有有length属性的才能正确使用
//比如string, array, 带length属性的对象


```

## 类型别名与断言

```
type PlusType = (x: number, y: number) => number
const fun :PlusType = (x: number, y: number):number{

}
```

当有联合类型的时候，不确定数据的类型，但是想访问某种类型特殊的属性或者方法，就可以使用断言

```
function getLength(input: string | number):number{
	const str = input as String
	if(str.length){
	return str.length
	}else{
	 const number = input as number
	 return number
	}
}
```

