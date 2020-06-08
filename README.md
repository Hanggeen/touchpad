# touchpad.js

### 想法

本项目初衷，是解决公共屏幕操作接入问题。

相信很多公司都有一些向客户展示的数据平台，通常这些数据平台都不是个人电脑，而是专用的展示大屏。

很多时候，这种大屏幕并不是触屏的，对应的鼠标键盘等输入设备，也不会在方便操控的地方。

在介绍展示内容时，如果需要针对性地选择、切换数据操作，似乎缺少一些优雅便捷的方式。

### Touchpad.js

```Touchpad.js```是我尝试解决这个问题的方案。

我想，如果手里的手机，可以直接操控那高高在上的屏幕，该多好。

于是我搭建了一个十分简单的websocket服务器，它负责接受各种指令，并向对应连接发送；

同时也写了一个移动端的交互页面，通过手机访问，你可以将它视为遥控器，你的每个操作会发送到websocket服务器；

当然，也有一个专门接收操作的监听器，只需要在需要响应的页面，引入该js即可。

目前```Touchpad.js```默认提供鼠标和滚轮操作，如监听手势，需要另外写业务绑定。

### 效果

一图胜千言

![鼠标](http://cdn.niamoi.com/gif/touchpad/mouse.gif)

![滚动](http://cdn.niamoi.com/gif/touchpad/scroll.gif)

![手势](http://cdn.niamoi.com/gif/touchpad/gesture.gif)

### 开始

#### 安装

clone部署本项目 [https://github.com/Hanggeen/touchpad](https://github.com/Hanggeen/touchpad)

```
npm install
```

#### 服务端开启

```
node server/index.js
```

根据提示打开demo地址，

如果一切正常，你打开的页面的右下角会出现一个二维码。

通过接入同一局域网的手机扫码，即可控制改页面操作，包括移动鼠标、点击、滚动等操作。

(注：模拟鼠标暂时无法与原生表单组件交互)

如果需要切换手势模式，可以绑定下面事件监听

```js
touchpad.listen(['tap','swipeleft','swiperight','swipeup','swipedown','switch'], function(msg){
    // todo
    console.log(msg);
}
```

##### 注意

项目目前为demo状态，不能用于生产环境。不定期修复Bug和升级，欢迎提出建议。
