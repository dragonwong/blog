---
layout: post
title: Why Git Add Submodule Failed?
tags: git
excerpt: 知道真相的我眼泪掉下来
---

今天想把同事的一个项目作为我项目的子模块引进来：

<pre class="bash"><code>git submodule add &lt;repository&gt; &lt;path&gt;</code></pre>

谁知竟提示我：

<pre class="bash"><code>fatal: You are on a branch yet to be born</code></pre>

？？？我在一个还没创建的分支？

![](http://pic.yupoo.com/dragonwong/FrvuuGCo/12cL2e.jpg)

我的项目没问题啊。。

单纯的我后来才发现，提示说的不是我的项目，而是引入的项目。原来同事他那个项目木有 master 分支啊！

![](http://pic.yupoo.com/dragonwong/FbSS0vgZ/Sd5a7.png)

## 为什么没有 master 就不能被引入？

git submodule 很重要的一点，不是基于 branch 的，而是基于 commit 的。也就是说，一个项目在管理它的子模块时，管理的是子模块所指向的提交，而不是分支。

因此，在添加子模块时，也需要有一个 commit 来引用，而添加 submodule 默认是在 master 上找最近一次的 commit，然后并没有 master。。。

```bash
fatal: You are on a branch yet to be born
```

真相大白。

## 那如何在添加子模块时指定一个分支？

<pre class="bash"><code>git submodule add -b &lt;branch&gt; &lt;repository&gt; &lt;path&gt;</code></pre>

## 结语

我还是想知道：你们为毛不要 master 分支。。
