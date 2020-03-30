import './src/style/style.less';
import Scroller from './src/mobules/scroller'
import Toucher from './src/mobules/toucher'

console.log('hahah');


setTimeout(() => {
  import(/* webpackChunkName: "hammerjs" */ 'hammerjs').then(Hammer => {
    console.log('完成加载');
    console.log(Hammer);
  })
}, 10000);

(async function() {

  let wsurl;
  if (document.location.protocol === 'https:') {
    wsurl = `wss://${url}/poster`
  } else {
    wsurl = `ws://${url}/poster`
  }
  const poster = new Poster(wsurl, code);
  let res = await poster.register(wsurl, code);
  if (!res) {
    return;
  }
  
  const scroller = new Scroller(document.getElementById('bar'));
  scroller.listen((msg) => {
    poster.send({
      type: 'track',
      track: {
        action: 'srcoll',
        data: msg
      }
    })
  })
  
  const toucher = new Toucher(document.getElementById('pad'));
  toucher.listen((msg) => {
    console.log('haha');
    console.log(msg);
  })


})();

