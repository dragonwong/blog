---
layout: post
title: FEer in Native Development
tags: -webkit-overflow-scrolling
---

挖个坑，探索下在 Native Development 中的前端开发。持续更新。

## 快速在 Mac 上用 webView 浏览前端页面

当前端页面需要在 Native App 的 webView 中进行测试时，未避免真机测试的繁琐，我们可以在模拟器中进行。

### 1. 新建项目

运行 xcode，选择菜单 File -> New -> Project

<img src="http://pic.yupoo.com/dragonwong/EXz9IeWU/medish.jpg" alt="fastWebViewTest-1-1">

选择 Single View Application

<img src="http://pic.yupoo.com/dragonwong/EXz9Iv7d/medish.jpg" alt="fastWebViewTest-1-2">

起一个名字
 
<img src="http://pic.yupoo.com/dragonwong/EXz9IdxJ/medish.jpg" alt="fastWebViewTest-1-3">
 
然后选择一个目录创建，项目就生成了。

### 2. 配置

在导航栏选择文件 `info.plist` 并添加配置，右上点击第三个按钮可以进入编辑模式。

<img src="http://pic.yupoo.com/dragonwong/EXz9Lg3M/medish.jpg" alt="fastWebViewTest-2-1">

添加配置的作用是：该应用允许任意请求加载。代码如下:

<pre class="xml"><code>&lt;key&gt;NSAppTransportSecurity&lt;/key&gt;
&lt;dict&gt;
    &lt;!--Include to allow all connections (DANGER)--&gt;
    &lt;key&gt;NSAllowsArbitraryLoads&lt;/key&gt;
    &lt;true/&gt;
&lt;/dict&gt;</code></pre>

如果不配置该项，一会生成的 webView 是无法访问任何页面的。

### 3. 添加 webView

在导航栏选择文件 `Main.storyboard`，右边隔壁选择 `View Controller`，右上点击第一个按钮可以进入视图模式。最右侧点击吸管状按钮进入属性修改面板，可以修改下尺寸。

<img src="http://pic.yupoo.com/dragonwong/EXz9L5Ce/medish.jpg" alt="fastWebViewTest-3-1">

右下角搜索 `Web View`，拖进中间视图区域，调整下大小，webView 就添加完毕啦！

<img src="http://pic.yupoo.com/dragonwong/EXz9KVer/medish.jpg" alt="fastWebViewTest-3-2">

### 4. 构建运行

点击左上角播放按钮，项目就可以通过模拟器运行了。左上角还可以选择模拟器设备类型。

<img src="http://pic.yupoo.com/dragonwong/EXz9MqZE/medish.jpg" alt="fastWebViewTest-4-1">

模拟器启动以后会自动打开我们的 app，我们看到的应该是一片白色。现在打开 Safari 的开发者工具，控制台指定下页面 url，就可以看到页面了。

<img src="http://pic.yupoo.com/dragonwong/EXz9MH9O/medish.jpg" alt="fastWebViewTest-4-2">

### 总结

之所以这么做是因为昨天追一个问题（[-webkit-overflow-scrolling touch throw exception in iOS webView](http://dragonwong.github.io/blog/2015/09/17/webkit-overflow-scrolling.html)），需要在 xcode 里面看日志。不然的话直接起模拟器开 Safari 多方便。不过 hybrid 方案的话，还是得要 app 里的 webView。

不过 qmb2 已经可以一键在模拟器和真机里面安装各种包了。通过 xcode 这种方式的有什么好处呢。。额，可以看到日志！（然而并没有什么卵用。。


