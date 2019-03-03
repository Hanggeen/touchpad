# trackpad
### 简介
这是一个可以将手机当成网页遥控器的一个插件。

移动设备扫码接入，可以控制另一网页端的行为，就像一个笔记本电脑的触摸板一样

您可以在接入后进行模拟鼠标的移动、点击，以及滑动滚轮的操作

另外还添加了手势模式，支持上下左右滑动手势
### 用法
#### 引入
``` html
<script src="....trackpad.min.js"></script>
```
#### 注册
``` javascript
var trackpad = new TrackPad({
  wsurl: '127.0.0.1:3000', // WebSocket服务地址，可替换
  pageurl: 'http://127.0.0.1:7086/trackpad.html' //触摸板页面地址，可替换
})
trackpad.on('click',function(e){
  console.log(e)
})
trackpad.on('swipe',function(e){
  console.log(e)
})
trackpad.on('change', function(e) {
  console.log(e)
})
```
#### 服务端开启
``` javascript
node server/index.js
```
### 在线Demo
点击[Demo](https://niamoi.com/trackpad/)
##### 注意
目前在不定期修复Bug和升级，欢迎提出建议
