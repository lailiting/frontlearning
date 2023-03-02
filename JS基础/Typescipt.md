## Typescipt

## interface跟type区别

interface接口 定义对象  可以用extend继承 可以合并声明

type 可以定义对象也可以定义基本类型跟联合类型 通过&合并

## any跟unknow区别

any是任何类型都可以赋值给它 any类型也可以赋值给任何类型

unknow所有类型可以赋值给它 但是只有any跟unknow类型可以赋值给unknow类型

## utility-types

partial: 把所有属性都改成非必选

required: 把所有属性都改成必选

readonly: 把所有属性都改成只读属性

pick: 选择在U之内的属性

exclued: 筛选字段 筛选出 T有U没有的字段

Omit: pick<T, exclude<T,U>>