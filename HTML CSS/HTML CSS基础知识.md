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