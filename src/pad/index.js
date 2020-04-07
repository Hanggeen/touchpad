import './src/style/style.less';
import Server from './src/mobules/server'
import Scroller from './src/mobules/scroller'
import Gesture from './src/mobules/gesture'
import Toucher from './src/mobules/toucher'
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
  

  const gesture = new Gesture(document.getElementById('bar'));
  gesture.listen((msg) => {
    server.send({
      type: 'track',
      track: {
        action: 'click',
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

  // toucher.listenClick((msg) => {
  //   server.send({
  //     type: 'track',
  //     track: {
  //       action: 'click',
  //       data: msg
  //     }
  //   })
  // })

  server.messageHandler((msg) => {
    // 
  })

})().catch(err => {
  console.log(err);
});

