---
layout: post
title: 华为荣耀6 webview 输入框问题
tags: webview
excerpt: 荣耀6真是一款神奇的机型，在它的 webview 中，输入框和键盘之间总会有些说不清的纠葛。
---

`华为荣耀6` `Android 4.4.2`

荣耀6真是一款神奇的机型，在它的 webview 中，输入框和键盘之间总会有些说不清的纠葛。

今天说说 **webview** **中键盘呼起状态下页面不渲染** 的问题。

该 bug 具体表现是：键盘弹起状态下输入内容不能实时显示，js 控制页面变化也无反应，输入框收起后才会渲染弹起期间的变化。感觉就像页面被暂时锁死了。

## 场景一

内部容器 `overflow: auto;` 允许滚动，当激活 `input` 呼起键盘导致内部容器发生滚动时，即会触发**页面锁死** **bug**。

### 代码

#### html

<pre class="html"><code>&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;input type="text"&gt;
        &lt;p&gt;占位&lt;/p&gt;
        &lt;input type="text"&gt;
        &lt;p&gt;占位&lt;/p&gt;
        &lt;input type="text"&gt;
    &lt;/div&gt;
&lt;/body&gt;</code></pre>

#### css

<pre class="css"><code>body {
    height: 100%;
}
.container {
    height: 100%;
    overflow: auto;
}
p {
    margin: 200px 0;
}</code></pre>

### 场景重现

我开心地点开第一个 `input`，输入框弹起，正常输入。我又开心地点开第二个 `input`，输入框弹起，尼玛，把第二个 `input` 遮住了（这也是个 bug，随处是 bug 啊），于是我手动把第二个 input 滚动到屏幕最高处再输入，duang，那个八阿哥来了。

### 解决方式

去掉 `overflow: hidden;`，不用内容容器滚动。。。

## 场景二（场景一拓展）

在场景一的情况下，出现没有面积的定位元素（`fixed` 或 `absolute` 定位），元素内 `input` 输入时触发此八阿哥。

### 代码

#### html

<pre class="html"><code>&lt;div class="container"&gt;
    &lt;input type="text"&gt;
    &lt;p&gt;占位&lt;/p&gt;
    &lt;input type="text"&gt;
    &lt;p&gt;占位&lt;/p&gt;
    &lt;input type="text"&gt;
&lt;/div&gt;
&lt;!-- 添加的 dom --&gt;
&lt;div class="outer"&gt;
    &lt;div class="inner"&gt;
        &lt;input type="text"&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

#### css

<pre class="css"><code>body {
    height: 100%;
}
.container {
    height: 100%;
    overflow: auto;
}
p {
    margin: 200px 0;
}
/* 添加的样式 */
.outer {
    position: fixed; /* 或者 absolute */
    bottom: 0;
    width: 100%;
    z-index: 1;
}
.inner {
    position: absolute;
    bottom: 0;
    width: 100%;
}</code></pre>

### 场景重现

不行的还是不行（场景一），该行的也不行了（场景二）

### 解决方式

给 `.outer` 定高（不要问我怎么知道的，你先告诉我这八阿哥怎么来的）。

## 一个简单有力的总结

给跪。
