# Node

## koa-websocket计时通信

```javascript
//node
const Koa = require('koa')
const Router = require('koa-router')
const websockify = require('koa-websocket')

const app = websockify(new Koa())
const router = new Router()

app.ws.use((ctx, next) => {
  return next(ctx)
})

router.get('/', async ctx => {
  ctx.body = '欢迎'
})

router.all('/websocket/:id', async ctx => {
  let t = setInterval(function() {
    let n = Math.random()
    if(n > 0.3) {
      let msg = JSON.stringify({ 'id': ctx.params.id, 'n': n })
      ctx.websocket.send(msg)
    }
  }, 1000)
  ctx.websocket.on('message', msg => {
    console.log('前端发过来的数据：', msg)
  })
  ctx.websocket.on('close', () => {
    console.log('前端关闭了websocket')
  })
})

app
.ws
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa is listening in 3000')
})
```

```js
  handleStart(id) {
    // 判断浏览器是否支持websocket
    var CreateWebSocket = (function () {
      return function (urlValue) {
        if (window.WebSocket) return new WebSocket(urlValue);
        if (window.MozWebSocket) return new MozWebSocket(urlValue);
        return false;
      }
    })()
    // 创建一个websocket
    var webSocket = CreateWebSocket("ws://127.0.0.1:3000/websocket/" + id);
    // 监听连接开启
    webSocket.onopen = function (evt) {
        // 主动向后台发送数据
          webSocket.send("前端向后端发送第一条数据")
    }
    // 监听websocket通讯
    webSocket.onmessage = function (evt) {
        // 这是服务端返回的数据
        let res = JSON.parse(evt.data)
        if(res.n > 0.99) {
          // 前端主动关闭连接
          webSocket.close()
        }
    }
    // 监听连接关闭
    webSocket.onclose = function (evt) {
        console.log("Connection closed.")
    }
  }
```

首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：

```http
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```

该请求和普通的HTTP请求有几点不同：

- GET请求的地址不是类似/path/，而是以ws://开头的地址；
- 请求头Upgrade: websocket和Connection: Upgrade表示这个连接将要被转换为WebSocket连接；
- Sec-WebSocket-Key是用于标识这个连接，并非用于加密数据；
- Sec-WebSocket-Version指定了WebSocket的协议版本。

随后，服务器如果接受该请求，就会返回如下响应：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string复制代码
```

该响应代码101表示本次连接的HTTP协议即将被更改，更改后的协议就是Upgrade: websocket指定的WebSocket协议。

## v8垃圾回收机制

**V8的内存分代和回收算法**

**什么是内存泄漏**

由于疏忽或者错误程序没有释放不再使用的内存情况

如果内存泄漏的位置比较关键，随着处理的允许导致越来越多无用的内存可能会引起服务器响应速度变慢

严重情况下导致内存达到进程或者V8内存上限可能会引起应用程序崩溃

**如何避免内存泄漏**

尽可能少的创建全局变量(因为只有在退出全局作用域时，才会回收全局变量)

手动清除定时器

手动清除事件监听

少用闭包

清除DOM引用