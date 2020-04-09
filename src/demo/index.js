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
  console.log(msg.track.action)
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
    console.log('准备执行set');
    point.set(msg.track.action.slice(5));
    return;
  }

  if (msg.track.action === 'tap') {
    let posxy = point.get();
    console.log(posxy)
    if (String(posxy) === String([0,0])) {
      // 开始按钮
      startGame();
    } else if (String(posxy) === String([1,0])) {
      // 暂停按钮
      stopGame();
    } else if (String(posxy) === String([2,0])) {
      // 恢复按钮
      restartGame();
    } else {
      let x = posxy[1] - 1;
      let y = posxy[0]
      let posindex = y * 3 + x;
      puzzle.pick(posindex);
    }
  }

})

window.point = point;

let gameStatus = 'ready'; // ready,playing,stop

let startBtn = document.getElementById('start');



function startGame(){
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
startBtn.onclick = startGame;

function stopGame(){
  if (gameStatus === 'playing') {
    gameStatus = 'stop';
    timer.stop();
    puzzle.stop();
  }
}
document.getElementById('stop').onclick = stopGame;

function restartGame(){
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
document.getElementById('restart').onclick = restartGame;

puzzle.success(() => {
  gameStatus = 'ready';
  timer.stop();
  puzzle.stop();
  let a = document.getElementById('time').innerHTML;
  document.getElementById('time').innerHTML = '完成啦！耗时' + a;
})