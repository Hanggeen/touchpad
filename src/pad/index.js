import './src/style/style.less';
import Server from './src/mobules/server'
import Scroller from './src/mobules/scroller'
import Gesture from './src/mobules/gesture'
import Toucher from './src/mobules/toucher'
import controls from './src/mobules/controls'
import { getQuery } from './src/common/tools'

(async function() {
  let url = getQuery('ws');
  let code = getQuery('co');
  let wsurl;
  if (document.location.protocol === 'https:') {
    wsurl = `wss://${url}/poster`
  } else {
    wsurl = `ws://${url}/poster`
  }
  console.log(wsurl);
  const server = new Server(wsurl, code);
  let res = await server.init(wsurl, code);
  if (!res) {
    console.log(`[${code}]初始化失败`);
    return;
  }

  const scroller = new Scroller(document.getElementById('bar'));
  scroller.listen((msg) => {
    server.send({
      type: 'track',
      track: {
        action: 'scroll',
        data: msg
      }
    })
  })
  

  const gesture = new Gesture(document.getElementById('gesturepad'));
  gesture.listen((msg) => {
    console.log(msg)
    server.send({
      type: 'track',
      track: {
        action: msg.type
      }
    })
  })
  

  const toucher = new Toucher(document.getElementById('pad'));
  toucher.listen((msg) => {
    server.send({
      type: 'track',
      track: {
        action: 'touch',
        data: msg
      }
    })
  })

  toucher.listenClick((msg) => {
    server.send({
      type: 'track',
      track: {
        action: 'click',
        data: msg
      }
    })
  })

  server.messageHandler((msg) => {
    // 
  })

  controls.listen((select) => {
    if (select == 'gesture') {
      gesture.show();
      toucher.hide();
    }
    if (select == 'mouse') {
      gesture.hide();
      toucher.show();
    }

    server.send({
      type: 'track',
      msg: {
        action: 'switch',
        data: select
      }
    })
  })


})().catch(err => {
  console.log(err);
});

