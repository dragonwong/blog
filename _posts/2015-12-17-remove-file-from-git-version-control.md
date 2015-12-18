---
layout: post
title: 从 Git 历史中删除文件
tags: git
excerpt: 有些情况下我们需要从 Git 历史（版本控制）中删除文件。比如误提交了些东西（隐私信息、无用的编译文件之类）或者你是处女座。
---

有些情况下我们需要从 Git 历史（版本控制）中删除文件。比如误提交了些东西（隐私信息、无用的编译文件之类）或者你是处女座。此时我们需要采取以下方法：

<pre class="bash"><code># 强力删除全提交全分支文件。--all 表示全分支。
git filter-branch --tree-filter 'rm -f xxx' HEAD --all
# 强力提交，覆盖远程。
git push -f</code></pre>

太暴力了。简直杀人无痕。慎用。Git 官方文档称其为核武器选项[^git_doc]，大家感受下。

但是！如果这个项目已经开始多人协作了，那还会有点麻烦。我发现在覆盖远程之后，其他本地执行拉取更新，需要删除的文件还在；如果此时其他本地再提交下，远程又有了（等于你啥也没做）。

肿么办？我也不知道了。Github 的官方建议是：通知下你的同事[^github_doc]。

## 参考

[^git_doc]: [The Nuclear Option: filter-branch](http://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#The-Nuclear-Option:-filter-branch)

[^github_doc]: [Using filter-branch](https://help.github.com/articles/remove-sensitive-data/#using-filter-branch)
