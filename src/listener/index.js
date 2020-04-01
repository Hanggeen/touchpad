import Pointer from './src/components/pointer/';
import Scroller from './src/modules/scroller';

import Boarder from './src/components/board/';

import Server from './src/modules/server';

const pointer = new Pointer();
const scroller = new Scroller();
const board = new Boarder('twaeawe');
pointer.show();

board.toast('asd');



let url = '172.18.130.68:3000';
let wsurl;
if (document.location.protocol === 'https:') {
  wsurl = `wss://${url}/listener`
} else {
  wsurl = `ws://${url}/listener`
}

const server = new Server(wsurl);
server.init(wsurl).then(res => {
  if (res) {
    board.initQrcode(`http://172.18.130.68:7086/pad.html?ws=${url}&co=${res.data}`);
  }
})

let n = 0;
setInterval(() => {
  console.log(`触发了${n}次`);
  n = 0;
}, 1000);

server.messageHandler(msg => {
  n++;
  if(msg.type === 'track') {
    if (msg.track.action === "scroll") {
      scroll.set(msg.track.data.y);
    }
    if (msg.track.action === "touch") {
      pointer.set(msg.track.data.x, msg.track.data.y);
    }
    if (msg.track.action === "click") {
      pointer.click();
    }
  }
})