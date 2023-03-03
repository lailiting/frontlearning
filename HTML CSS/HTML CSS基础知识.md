# HTML CSS基础知识

## 语义化

## 文档流

文档流就是HTML解析文档的默认规则，默认的文档流就是块元素独占一行，行内块元素和行内元素一行排列，不够换行，行高由最高的行内元素决定，元素尽量往左上角靠拢在这些引力下，元素从左到右从上到下依次排列，就形成了普通的文档流。

## 元素类别

块元素

行内块元素

行内元素

## BFC

BFC叫块级格式化上下文，其实就是BFC是一个独立的空间，BFC里面的子元素不会影响外部环境，BFC进行高度计算的时候也会计算浮动元素的高度。

触发BFC的几种方式

- overflow:hidden
- display:inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex
- 根元素
- 浮动元素

BFC可以用来解决float脱离文档流而造成的高度塌陷问题，可以在float元素的父元素添加伪元素，设置overflow:hidden；BFC可以解决外边距折叠问题，外边距折叠问题就是父元素和子元素同时设置了margin-top，最终将选最大的那个margin-top进行显示。也可以解决包含内部浮动问题。

## 盒模型

1. W3C 标准盒模型：

*属性width,height只包含内容content，不包含border和padding。*

可以理解为标准盒设置了border跟padding会撑开盒子

2. IE 盒模型：

属性width,height包含border和padding，指的是content+padding+border

IE盒模型不会撑开盒子

## margin塌陷

兄弟节点的margin-bottom的margin-top合并(中间如果有空的div会忽略)

父子节点的margin-top合并

## 两栏布局

七种方法

- float
- flex
- bfc
- position absolute
- float +calc

```css

        /* 第一种通过float */
        .container{
            height: 100vh;
            overflow: hidden;
        }
        .left{
            float: left;
            width: 240px;
            background-color: aqua;
            height: 100%;
        }
        .right{
            margin-left: 240px;
            background-color: red;
            height: 100%;
        }
        /* 第二种BFC */
        .container{
            height: 100vh;
            overflow: hidden;
        }
        .left{
            float: left;
            width: 240px;
            background-color: aqua;
            height: 100%;
        }
        .right{
            overflow: auto;
            background-color: red;
            height: 100%;
        }
        /* 第三种 flex */
        .container{
            display: flex;
            height: 100vh;
        }
        .left{
            width: 240px;
            background-color: aqua;
            height: 100%;
        }
        .right{
            flex: 1;
            background-color: red;
            height: 100%;
        }
        /* 第四种 position */
        .container {
            position: relative;
            height: 100vh;
        }

        .left {
            position: absolute;
            width: 240px;
            background-color: aqua;
            height: 100%;
        }

        .right {
            margin-left: 240px;
            background-color: red;
            height: 100%;
        }
        /* 第五种 position */
        .container {
            position: relative;
            height: 100vh;
        }

        .left {
            width: 240px;
            background-color: aqua;
            height: 100%;
        }

        .right {
            position: absolute;
            left: 240px;
            top: 0;
            bottom: 0;
            right: 0;
            background-color: red;
            height: 100%;
        }
        /* 第六种 */
        .container {
            height: 100vh;
            overflow: hidden;
        }

        .left {
            float: left;
            width: 240px;
            background-color: aqua;
            height: 100%;
        }

        .right {
            float: left;
            width: calc(100% - 240px);
            background-color: red;
            height: 100%;
        }
          <div class="container">
        <div class="left"></div>
        <div class="right"></div>
    </div>
```



## 三栏布局

三栏布局就是网页上有三栏，要最先加载中间的HTML，所以中间的放在最前面

圣杯布局跟双飞翼布局其实就是利用margin赋值，首先来说一下margin负值，margin-left,margin-top为负值会将盒子本身向左边拖拽或者向上面拖拽，margin-right,margin-bottom就是盒子本身不变，右边或者下方的盒子左移或者上移

圣杯布局

```css
        .main {
            padding-left: 200px;
            padding-right: 100px;
        }

        .box {
            float: left;
            height: 300px;
        }

        .center {
            width: 100%;
            background-color: aqua;

        }

        .left {
            background-color: red;
            width: 200px;
            margin-left: -100%;
            position: relative;
            left: -200px;
        }

        .right {
            background-color: yellow;
            width: 100px;
            margin-left: -100px;
            position: relative;
            right: -100px;
        }

  <div class="main">
        <div class="center box"></div>
        <div class="left box"></div>
        <div class="right box"></div>
    </div>
```

利用定位和margin-left赋值跟使用padding让main内容宽度变小，对于main里面的盒子来说，父亲的宽度就是原来的宽度减去padding跟border的宽度。不过因为使用了绝对定位，那么当屏幕宽度小于left*2+right的时候就会造成塌陷问题。

双飞翼布局

```css
       .box{
            float: left;
            height: 300px;
        }
        .center{
            width: 100%;
            background-color: aqua;
        }
        .center-content{
            margin: 0 100px 0 200px;
        }
        .left{
            width: 200px;
            background-color: red;
            margin-left: -100%;
        }
        .right{
            width: 100px;
            background-color: yellow;
            margin-left: -100px;
        }
  <div class="main">
        <div class="center box">
            <div class="center-content">98798789798899789789</div>
        </div>
        <div class="left box"></div>
        <div class="right box"></div>
    </div>
```

双飞翼布局就不会，不过双飞翼布局多了一个DOM节点。

## 水平居中

行内或者行内块: text-align: center;

块级: margin: 0 auto;

absolute: left: 50%; margin-left: -自己一半宽度。

## 垂直居中

行内元素: line-height: 盒子高度;

absolute: top 50% margin-top: -高度的一半

left: 50%, right: 50%; tranfrom: transition(-50%, -50%)

(tranfrom百分比相对自身)

left,right,top,bottom:0 margin auto

```css
  .box{
            height: 200px;
            border: 1px solid #000;
            position: relative;
        }
        .center{
            position: absolute;
            width: 100px;
            height: 100px;
            background-color: red;
        }
        .one{
           
            left: 50%;
            margin-left: -50px;
            top: 50%;
            margin-top: -50px;
        }
        .two{

            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .three{
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }

<div class="box">
        <div class="center one"></div>
    </div>
    <div class="box">
        <div class="center two"></div>
    </div>
    <div class="box">
        <div class="center three"></div>
    </div>
```

## line-height继承

像素跟数直接继承，百分比计算出具体的px之后继承。

## 动画

## 隐藏的方式

## 移动端适配

## flex细节

display:flex缺点不兼容ie，优点减少重绘重排，简单，方便

- flex-direction
- flex-wrap
- justify-content
- algin-items
- flex
- flex-basis 默认0
- flex-shink 默认1
- flex-grow 

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 **`flex-basis`** 指定了 flex 元素在主轴方向上的初始大小 带单位

CSS 属性 **`flex-grow`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 设置 flex 项 [主尺寸](https://www.w3.org/TR/css-flexbox/#main-size) 的 flex 增长系数。

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`flex-shrink`** 属性指定了 flex 元素的收缩规则。

## position

可以通过left,right,top,bottom来控制元素宽度

- static 普通定位元素
- relative 会占用空间，相对自己的占用位置进行移动
- absolute 相对于在最近的非static元素进行移动，不会占用空间
- fiexd 固定在相对视口的位置
- sticky 必须指定top, left, right, bottom其中一个，一开始是相对定位，然后当屏幕开始滚动的时候，判断是否到达元素指定的位置然后固定在那个位置

sticky运用

```css
  .nav {
            background-color: aliceblue;
            width: 100%;
            position: -webkit-sticky;
            position: sticky;
            top: 0px;
        }
```

## BFC

块级格式化上下文，就是BFC内部的元素不会影响到外部元素

解决的问题

float元素跟普通元素的折叠问题，实现两栏布局

float盒子父级元素塌陷问题

上下margin塌陷问题

- overflow: 非visiable
- display flex grid inline-bloack
- postion fixed absolute
- 

## HTML5语义化

## CSS

## 隐藏元素

将元素设置的display：none，可以将元素在页面中彻底消失。
此元素原本所占据的位置，会被其他元素占据，也就是说它会导致浏览器的重排的重绘
消失后，自身绑定的事件不会触发，也不会有过渡效果

将元素设置的display：none，可以将元素在页面中彻底消失。
此元素原本所占据的位置，会被其他元素占据，也就是说它会导致浏览器的重排的重绘
消失后，自身绑定的事件不会触发，也不会有过渡效果

opacity属性表示元素的透明度，将元素的透明度设置为0之后，在用户的严重，元素也是可以达到隐藏效果的 该方法不常用，不会引发重排，一般情况下也会引发重绘

## 响应式布局

主要利用rem vw vh display:flex;  媒体查询做响应式布局

## 浏览器兼容

## 动画

## 重排重绘细节

## SASS

## CSS实现一个三角形

border画的其实就是一个三角形，transparent设置透明，假设边长为200,高也就是border-bottom设置的像素是边长的2的根号3倍也就是173.2

```css
   .box{
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-top: 100px solid transparent;
            border-bottom: 173.2px solid red;
        }
```

