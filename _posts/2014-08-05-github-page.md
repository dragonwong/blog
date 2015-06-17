---
layout: post
title: github page
---

从上个月31号以来，搭载在 github page 上的博客一直就不肯更新，导致写了新文章也发不出来。看到 github 30号的 blog：<a href="https://github.com/blog/1867-github-pages-now-runs-jekyll-2-2-0" target="_blank">《GitHub Pages now runs Jekyll 2.2.0》</a>，估摸到可能是因为 github page 更新的原因。今天才知道如果出错了会收到邮件通知，一看确实是收到了一封题为《[blog] Page build failure》的邮件，虽然没说具体是什么原因，但是确实是构建错误了。

蛋疼，只能在本地模拟建一个和 github 一样的环境跑下试试，看看报什么错。

### Build Your Github Page On Local

主要遵循官网的教程：<a href="https://help.github.com/articles/using-jekyll-with-pages" target="_blank">《Using Jekyll with Pages》</a>，但是官网默认全世界都是 mac 用户。。。

所以 windows 用户得自己先装 ruby。去 <a href="http://rubyinstaller.org/downloads/" target="_blank">RubyInstaller</a> 下载就行，我下的是1.9.3稳定版（完了先别关掉页面，后面可能还要访问它）。安装时最后会问你要不要添加环境变量什么的，放心全部统统都打钩！不是360！完了跑下 `ruby -v` 看看成功没。

成功的话就可以跑 `gem -v` 看下有gem没（肯定有的）。改下 gem 的配置，原因你懂的：

<pre class="bash"><code>gem sources -a http://ruby.taobao.org/</code></pre>

完了可以查看下源列表

<pre class="bash"><code>gem sources -l</code></pre>

添加成功之后便可以跟着官网教程走啦！

在写 `Gemfile` 时，把源也改下：

<pre><code>source 'http://ruby.taobao.org'
gem 'github-pages'
</code></pre>

期间可能需要安装 Development Kit，刚刚下 ruby 的页面就有下！安装方法参考github官方教程：<a href="https://github.com/oneclick/rubyinstaller/wiki/Development-kit" target="_blank">《Development Kit》</a>

一起都走完了之后，我小心翼翼地敲下 `bundle exec jekyll serve`。。。果然报错了！原因是jekyll中在引参数时引用了变量，如下：

{% raw %}
<pre class="jekyll"><code>{% include header.html body_class="{{ body_class }}" %}</code></pre>
{% endraw %}

原来都是可以的，这次升级时候就报错了。。

解决办法：删掉问题代码。（又没有人告诉我现在为什么不行以前又为什么行( •₃ •)。。）

参考：<a href="http://yanping.me/cn/blog/2012/03/18/github-pages-step-by-step/" target="_blank">《Github Pages极简教程》</a>