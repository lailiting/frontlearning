## Git实际开发知识

## 工作区域和流程

![image-20230302100403476](https://typora-1312272916.cos.ap-shanghai.myqcloud.com/llt/202303021004648.png)



workspace工作区就是自己写代码的区域

Index:暂存区 由工作区通过git add提交到暂存区

Repository: 本地仓库，位于自己电脑上， 由暂存区通过git commit 提交到本地仓库

Remote: 远程仓库，先在远程建立一个仓库，本地通过fetch或者clone到本地，本地通过git push到远程，git pull可以从远程仓库拉取分支到本地

## Git基本操作

git add: 从工作区添加到暂存区

git commit: 具有git commit规范 

-  feat: 添加新功能
- fix: 修复bug
- doc : 只改动了文档内容
- style: 改了空格 缩进等不影响代码含义
- build: 依赖或者构造工具改动，webpack, npm
- refactor: 代码重构时使用

git branch: 查看分支

git checkout: 切换分支

git merge: 合并分支

git push: 推送分支

git pull: 拉取分支 相当于git fetch加git merge

git reset head 回退到抹个版本

git revet: 撤销某次操作 git revert <commit-id> 会新commit一个版本 原来的版本还在 比较安全

合并冲突： 删除冲突的地方 然后重新提交

git push origin ‘分支名称' --force可以强制推送

git reflog查看版本名称

git reset --hard '回退的版本号'

git clone '地址' -b '指定分支名称' '改名字'