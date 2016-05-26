---
layout: post
title: 微信网页开发经验总结
category: coding
tags: wechat
excerpt: 微信内置 webview 最大的问题在于蛋疼的缓存。
---

目录

- [页面调试](#page)
- [接口调试](#api)
- [其他问题](#others)

---

<h2 id="page">页面调试</h2>

微信内置 webview 最大的问题在于蛋疼的缓存。Android 设备没有提供刷新功能，iOS 设备虽然提供了可是然并卵。html 文件是可以及时更新，但是 css、js 文件必须通过加版本号的方式才能刷新（`app@VERSION.js`）（其实就是改文件名），网上盛传的通过加请求参数的方法（`app.js?v=VERSION`）并不可靠。

### Android

微信在 Android 设备中使用内置 QQ 浏览器（x5 内核）打开 webview，所以可以在设备上安装该浏览器来模拟微信环境。

### iOS

微信在 iOS 设备中使用 Safari 打开 webview，并且，使用 Safari 可以很方便的通过 Mac 进行调试（Safari: develop -> userName -> deviceName ）。

注：手机上的 Safari 需要打开调试功能，默认是开启的（设置 -> Safari -> 高级 -> Web 检查器）。

---

<h2 id="api">接口调试</h2>

*更新时间：2015-07-10*

*官网文档：[微信JS-SDK说明文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)*

请按以下顺序操作：

### 一. 登录微信公众平台

入口：[测试号登录](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

#### 1. 接口配置信息
	
不用填写

#### 2. JS接口安全域名

填写测试页面的域名或 ip

**注意：**一定是一级域名，且不带 `http://`

#### 3. 测试号

扫码关注。该测试号针对当前项目唯一生成（关注了别的项目的测试号并没有用）。只有关注了该测试号的微信账户才能调用相关接口。也就是说，包括开发人员和测试人员在内，所有会浏览调用了微信接口页面的人都需要关注。
	
### 二. 获取信息

#### 1. 获取 `access_token`

[在线工具](http://mp.weixin.qq.com/debug/)

`grant_type` 用默认的；`appid` 和 `secret` 用测试号提供的。

**注意：** `access_token` 有效期为 `7200` 秒（即2小时内接口未被调用，则失效），请适时更新。

#### 2. 获取 `ticket`

[接口](https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi)

参数 `ACCESS_TOKEN` 为上一步获取的 `access_token`。

**注意：** `ticket` 有效期为 `7200` 秒（即2小时内接口未被调用，则失效），请适时更新。

#### 3. 获取 `signature`

[在线工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)

`jsapi_ticket` 为上一步获取的 `ticket`；`noncestr` 为任意字符串；`timestamp` 为任意时间戳；`url` 为当前页面的的 `URL`，但不包含 `hash`（即不包含 `#` 及其后面部分）。

### 三. 本地调用

请保证顺序：先引用，再调用。

    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx4b7bc8e87f3ca52f', // 必填，公众号的唯一标识
            timestamp: 1414587457, // 必填，生成签名的时间戳
            nonceStr: 'wyy', // 必填，生成签名的随机串
            signature: '9b3fa933e7b765e6e90a0635bea184c03f3d15b6',// 必填，签名，见附录1
            jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function() {
            wx.getLocation({
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    alert(latitude)
                }
            });
        })
    </script>
    
### 四. 微信访问

pc 和手机连同一局域网，手机微信访问 pc 服务。

### 参考

官网文档：[微信JS-SDK说明文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)

官方 demo：[微信JS-SDK Demo](http://203.195.235.76/jssdk/)

<h2 id="others">其他问题</h2>

- Android 微信下行内元素必须 `display: block;` 才具能设置 `width` 和 `background-image`