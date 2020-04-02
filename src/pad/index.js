import './src/style/style.less';
import Server from './src/mobules/server'
import Scroller from './src/mobules/scroller'
import Toucher from './src/mobules/toucher'
import Gesture from './src/mobules/gesture'
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
  console.log(scroller);
  scroller.listen((msg) => {
    console.log('asddd');
    server.send({
      type: 'track',
      track: {
        action: 'srcoll',
        data: msg
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
    console.log(3);
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

  if (res.gesture) {
    const gesture = new Gesture(document.getElementById('bar'));
    await gesture.init();
    gesture.listen((msg) => {
      server.send({
        type: 'track',
        track: {
          action: 'gesture',
          data: msg
        }
      })
    })
  }

})().catch(err => {
  console.log(err);
});
