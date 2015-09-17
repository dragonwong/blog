---
layout: post
title: -webkit-overflow-scrolling touch throw exception in iOS webView
tags: -webkit-overflow-scrolling
---

`-webkit-overflow-scrolling: touch;` 是一段 css 的样式代码，如果它出现在 iOS app 的 webView 中，有可能会引发程序报出异常错误。错误日志如下：

<pre><code>2015-09-17 11:19:02.047 test[16480:593023] -[WebActionDisablingCALayerDelegate willBeRemoved]: unrecognized selector sent to instance 0x7fadbab07d00
2015-09-17 11:19:02.047 test[16480:593023] *** WebKit discarded an uncaught exception in the webView:willRemoveScrollingLayer:withContentsLayer:forNode: delegate: &lt;NSInvalidArgumentException&gt; -[WebActionDisablingCALayerDelegate willBeRemoved]: unrecognized selector sent to instance 0x7fadbab07d00</code></pre>

昨天追了一个下午 + 晚上，都没有找到原因，甚至没有能用 demo 复现出来，只能在项目中看到。另外，网传可以通过添加 `-webkit-transform: translateZ(0px);` 样式的方法修复该问题，在我这里也并不凑效。

个人认为应该不仅仅是 `-webkit-overflow-scrolling: touch;` 这一个样式，应该是一个特定的 situation，需要多个条件才会触发。

如果你对此有更多了解，请告诉我！

## 参考

- [WebKit throwing exception on iOS 8 for call to setBeingRemoved](http://stackoverflow.com/questions/26217160/webkit-throwing-exception-on-ios-8-for-call-to-setbeingremoved)
- [UIWebView throwing exception for [WebActionDisablingCALayerDelegate setBeingRemoved:]](http://stackoverflow.com/questions/25894173/uiwebview-throwing-exception-for-webactiondisablingcalayerdelegate-setbeingremo)
