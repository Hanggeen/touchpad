import './src/style/reset.less';
import './src/style/style.less';
import Server from './src/mobules/server'
import Scroller from './src/mobules/scroller'
import Gesture from './src/mobules/gesture'
import Toucher from './src/mobules/toucher'
import controls from './src/mobules/controls'
import tips from './src/mobules/tips'
import { getQuery } from './src/common/tools'
import pointer from '../demo/modules/pointer';

(async function() {
  let url = getQuery('ws');
  let code = getQuery('co');

  if (!code) {
    tips.show('无效的code');
    return;
  }

  if (!code) {
    tips.show('无效的websocket');
    return;
  }

  let wsprotocol = document.location.protocol === 'https:' ? 'wss://' : 'ws://';
  let wsurl = `${wsprotocol}${url}/poster`;

  const server = new Server(wsurl, code);
  let res = await server.init(wsurl, code);
  if (!res) {
    tips.show(`[${code}]初始化失败`);
    return;
  }

  // 触摸板监听
  const toucher = new Toucher(document.getElementById('touch-pad'));
  toucher.listen((msg) => {
    server.send({
      type: 'track',
      track: msg
    })
    if (msg.action === "touch") {
      tips.show('触发滑动');
    } else if (msg.action === "click") {
      tips.show('触发点击');
    }
  })

  // 滚动条监听
  const scroller = new Scroller(document.getElementById('bar'));
  scroller.listen((msg) => {
    server.send({
      type: 'track',
      track: {
        action: 'scroll',
        data: msg
      }
    })
    tips.show('触发滚动');
  })
  
  // 手势监听
  const gesture = new Gesture(document.getElementById('gesture-pad'));
  gesture.listen((msg) => {
    server.send({
      type: 'track',
      track: {
        action: msg.type
      }
    })
    if (msg.type === "swipeleft") {
      tips.show('向左滑动');
    } else if (msg.type === "swiperight") {
      tips.show('向右滑动');
    } else if (msg.type === "swipeup") {
      tips.show('向上滑动');
    } else if (msg.type === "swipedown") {
      tips.show('向下滑动');
    } else if (msg.type === "tap") {
      tips.show('触发点击');
    }
  })
  

  if (res.data.trackType === 'mouse') {
    toucher.show();
    gesture.hide();
  }
  if (res.data.trackType === 'gesture') {
    toucher.hide();
    gesture.show();
  }

  // 切换面板监听
  controls.listen((select) => {
    select === 'gesture' ? gesture.show() : gesture.hide();
    select === 'mouse' ? toucher.show() : toucher.hide();
    server.send({
      type: 'track',
      track: {
        action: 'switch',
        data: select
      }
    })
  })

  // 消息监听
  server.messageHandler((data) => {
    if (data.type === 'msg') {
      tips.show(data.msg);
    }
  })

})().catch(err => {
  console.log(err);
});

