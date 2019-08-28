

## 这是个什么的项目？

使用 Node.js + Koa2 + MySQL + Vue.js 实战开发一套完整个人博客+小程序项目网站。


## 项目部分截图

### 后台管理
- 文章创建
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/articleCreate.png?raw=true)
- 图书列表
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/bookList.png?raw=true)
### 前端界面
- 网站首页
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/blog.png?raw=true)
- 音乐
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/music.png?raw=true)
- 音乐播放
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/musicPlay.png?raw=true)
### 小程序
- 小程序test
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/mini-test.png?raw=true)
- 小程序
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/mini-wx.png?raw=true)
### 数据库
![](https://github.com/awesomeccc/bolg/blob/master/static/screenShots/mysql.png?raw=true)

## 解决了什么问题？
- 服务端：使用 Node.js 的 Koa2 框架二次开发 Restful API。
- 前端：Vue.js 打造了前端网站和后台管理系统。


## 项目包含什么功能？

[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

- Koa2服务端
    - 管理员与权限控制
    - 文章
    - 文章分类
    - 评论文章
    - 微信小程序后台
- 前端博客网站 Vue.js
- 后台管理系统 Vue.js

## 项目的亮点
- Koa 与 Koa 二次开发API
- 多 koa-router 拆分路由
- require-directory 自动路由加载
- 异步编程 - async/await
- 异步异常链与全局异常处理
- Sequelize ORM 管理 MySQL
- JWT 权限控制中间件
- 参数验证器 Validator 
- nodemon 修改文件自动重启
- 前后端分离
- 使用 Vue.js 搭建前端网站和后台管理系统
- 完整的微信小程序(测试)和后台管理
- Jsonp音乐数据获取

## 如何使用和学习？

### 数据库
启动项目前一定要在创建好 `ccbolg` 数据库。(bolg拼错了,需要的话自行修改)
在config里面配置好appId 和 appSecret
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 wxapp 数据库
$ CREATE DATABASE IF NOT EXISTS ccbolg DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 克隆项目
首先使克隆项目，然后进入项目根目录使用命令安装包，最后命令启动项目，代码会根据模型自动创建数据库表的。

根目录都是 Node.js + Koa2 API开发源代码，根目录下的 web 文件夹下都是前端网站项目源代码，根目录下的 admin 文件夹下都是后台管理系统的源代码,mini-test是小程序的测试接口, mini-wx 小程序源码目录


```
# 克隆项目代码
$ git clone https://github.com/awesomeccc/bolg.git

# 进入koa项目根目录

$ cd nodejs-koa-blog

# 安装包
$ npm install

# 运行服务
$ npm run dev

# 打开浏览器输入回车：http://localhost:3000

// 前端项目使用
1. 在根目录下进入web项目：cd web，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8080/ 即可以访问。

// 后台管理系统使用
1. 在根目录下进入admin项目：cd admin，
2. 安装包，执行: npm install 命令，
3. 启动服务: npm run dev; 浏览器打开：http://localhost:8083/ 即可以访问。

// 微信小程序使用
1. 在根目录下进入mini-wx项目：cd mini-wx，
2. 安装包，执行: npm install 命令，
3. 启动服务:在微信开发者工具下即可以访问。
```


### 接口说明（重要）
项目的所有接口文档都这里，可以逐个文档看。
- [管理员接口文档说明](./doc/admin.md)
- [文章接口文档说明](./doc/article.md)
- [分类接口文档说明](./doc/category.md)
- [评论接口文档说明](./doc/comments.md)
- 小程序(待完善)
- 音乐(待完善))


## 项目参考学习资料
- [《纯正商业级应用－Node.js Koa2开发微信小程序服务端》](https://s.imooc.com/SHHXs2R), by 慕课网：7七月老师

- [梁凤波的开源项目](https://github.com/liangfengbo/nodejs-koa-blog)