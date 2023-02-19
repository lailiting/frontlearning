



# webpack整理

## 核心概念

入口entry

指示webpack应该用哪个模块来构建内部依赖图的开始

出口output

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件(path,filename)

loader

webpack只能理解javascript和JSON，loader可以让webpack处理其他类型的文件，并将它们转换为有效 [模块](https://www.webpackjs.com/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

插件plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

模式mode

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

浏览器兼容性

Webpack 支持所有符合 [ES5 标准](https://kangax.github.io/compat-table/es5/) 的浏览器

环境

Webpack 5 运行于 Node.js v10.13.0+ 的版本。

## 常见的loader

## 常见的plugin

## 模块热替换