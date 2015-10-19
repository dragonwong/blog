---
layout: post
title: 私有域名 github 个人站点教程
tags: blog
excerpt: 五级大根刷新大，中路单挑怕不怕。
---

今天在静轩的怂恿下买下了 [wangdagen.com](http://wangdagen.com/) 这个域名，哈哈我才是王大根，豆瓣那个好坏的抢我名字，害我老被问：

> “天，你就是那个豆瓣头牌段子手啊？真是**人不可貌像**呢！”

尼玛。。行！我知道我丑了！下一个！

一把辛酸泪。不扯了，开始正题。

## 首先，你得有个域名

国内的 [万网/阿里云](http://wanwang.aliyun.com/) 国外的 [godaddy](https://www.godaddy.com/) 都是久经考验的域名服务供应商，但据称国内各种审核备案要麻烦些，具体不清楚。

我在 godaddy 买的域名，因为静轩说网上一搜一大把优惠券。我信以为真，结果，嗯真的一大把优惠券，但尼玛没一个好使。

选好域名后他会问你要不要其他特殊服务（我是说建站服务等），全部不要，我们男人说买鞋就只买鞋。除了邮箱和电话，其他信息随便填。支付宝扫一扫付款，花钱就是这么 easy。

注意，如果填写了失效的优惠券可能导致无法付款。

给完钱域名就是你的了，不过现在当然还不能访问（我知道你已经等不及了）。

## 然后，你要有个博客

大型生活服务类同性交友网站 [github.com](http://github.com) 为我们提供了简单且免费的博客服务。方法如下：

### 1. 建立 `username.github.io` 项目
	
比如我的 github 用户名叫 `wangdagen`，那么我需要建立的项目名就叫 `wangdagen.github.io`。你看这个项目名字这么屌，心里一定在默念什么鬼。没错，这个项目屌就屌在他是可以直接通过 [username.github.io](http://username.github.io) 这个域名访问。

### 2. 添加 `index.html`

项目中新建 `index.html`，里面就写 `Hellow World` 或者 `xxx 我爱你`（程序猿翻来覆去就这几句吧），开心就好。

### 3. 访问验证

访问你的 [username.github.io](http://username.github.io) ，怎样，出现了吧。


好了，现在博客也有了，虽然只有一句很傻逼的 `xxx 我爱你` <img class="emoji" title=":joy:" alt=":joy:" src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f602.png" height="20" width="20">。

## 最后，合体吧

现在让你的域名指向你的博客吧。

### 1. `username.github.io` 项目添加 `CNAME` 文件

项目中添加文件 `CNAME`，其内容只有一行，就是你的域名（不要加 `http`）。

### 2. 域名配置 DNS

#### 1. A 纪录

A 纪录是用来配置**将域名解析到的目标地址的 ip** 的。现在添加两条 A 纪录，来指向 github。

`Host` 填写 `@`，表示全匹配；`Point To` 分别指向 `192.30.252.153` 和 `192.30.252.154`（ github 的 ip）。

其实写一条也行，两条更保险。

#### 2. CNANE 纪录

CNAME 纪录是用来配置**将域名解析到的目标地址的域名** 的。现在添加 `www` 域名。

`Host` 填写 `www`，表示匹配 `www` 子域名；`Point To` 填写 `@`。

这样，假设你是 `xxx.com`，现在访问 `www.xxx.com` 也可以了。如此什么 `love.xxx.com`、`tear.xxx.com` 一堆杀马特子域名自然不在话下。

## 结语

五级大根刷新大，中路单挑怕不怕。

结语我乱写的，我就是想说写完啦 <img class="emoji" title=":joy:" alt=":joy:" src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f602.png" height="20" width="20">。

## 参考

[Setting up a custom domain with GitHub Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/)

