# react反向代理

有两种方案

如果是自己配置的开发环境

先npm init/ yarn init -y

初始化

然后安装webpack

### webpack-cli 是webpack的命令行工具，可以在命令行中使用webpack

```js
yarn add -D webpack webpack-cli
```

#### 安装 webpack-dev-server

```js
yarn add -D webpack-dev-server
```

#### 在wepack.config.js 文件下，创建devServer对象

```js
module.exports={
    entry: "./src/index.js",
    mode: "development",
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        proxy : {
          "/api":{
            target : "后端url",
            changeOrigin : true,
            pathRewrite : {
              "^/api" : ""
            }
          }
        },
        hot: true, // 开启HMR
        historyApiFallback: true, // 解决前端路由刷新404问题
      },
}
```

#### 在package.json 新增调试命令

```js
 "scripts": {
    "start": "webpack serve",
    "build": "webpack"
  },
```

#### 打开终端，执行npm start

如果是用的react自带的开发环境

首先先npm i http-proxy-middleware --dev

然后在src目录下新建setupProxy.js

写上如下代码

```js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            "/api", {
                target: "后端url",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        )
    )
}
```

一切就绪后，就可以启动我们的项目了，这里使用的是 react-scripts 启动项目，所以还需要配置下 package.json scripts 属性

```javascript
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```



跟什么的一样就不用改了