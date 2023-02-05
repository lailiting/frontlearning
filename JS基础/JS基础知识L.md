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

function parseParam(url: string) {
  const paramsArr = url.slice(url.indexOf("?") + 1).split("&");
  const map = new Map();
  return reverseToRes(paramsArr, map);
}
function reverseToRes(strArr: string[], map: any) {
  const res = {};
  strArr.forEach((item) => {
    const [key, value] = item.split("=");
    // 判断key是否单次出现
    if (map.get(key) !== undefined) {
      res[key] = [map.get(key), reverse(value)];
    } else {
      res[key] = reverse(value);
    }
    map.set(key, value);
  });
  return res;
}
function reverse(value: string) {
  return (`${parseInt(value)}` === value ? parseInt(value) : value) ?? false;
}
parseParam(url);
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

## 观察者模式

## 防抖节流