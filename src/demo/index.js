import './style/style.css';
import point from './modules/pointer';
import puzzle from './modules/puzzle';
import timer from './modules/timer';

const touchpad = new Touchpad({
  host: `${window.location.hostname}:3000`,
  trackType: 'gesture'
});

let gestureOpen = false;
touchpad.listen(['tap','swipeleft','swiperight','swipeup','swipedown','switch'], function(msg){
  if (msg.track && msg.track.action === 'switch') {
    if (msg.track.data === 'gesture') {
      point.show();
      gestureOpen = true;
    } else {
      gestureOpen = false;
    }
    return;
  }

  if (!gestureOpen) {
    return;
  }

  if (['swipeleft','swiperight','swipeup','swipedown'].indexOf(msg.track.action) !== -1) {
    point.set(msg.track.action.slice(5));
    return;
  }



})

window.point = point;

let gameStatus = 'ready'; // ready,playing,stop

let startBtn = document.getElementById('start');



startBtn.onclick = function(){
  if (gameStatus === 'ready') {
    gameStatus = 'playing';
    timer.reset();
    timer.start();
    puzzle.start();
  } else if (gameStatus === 'stop') {
    gameStatus = 'playing';
    timer.start();
    puzzle.recover();
  }
}
document.getElementById('stop').onclick = function(){
  if (gameStatus === 'playing') {
    gameStatus = 'stop';
    timer.stop();
    puzzle.stop();
  }
}
document.getElementById('restart').onclick = function(){
  if (gameStatus === 'playing') {
    gameStatus = 'ready';
    timer.reset();
    puzzle.reset();  
  }
  if (gameStatus === 'stop') {
    gameStatus = 'ready';
    puzzle.recover();
    timer.reset();
    puzzle.reset();  
  }
}

puzzle.success(() => {
  gameStatus = 'ready';
  timer.stop();
  puzzle.stop();
  let a = document.getElementById('time').innerHTML;
  document.getElementById('time').innerHTML = '完成啦！耗时' + a;
})