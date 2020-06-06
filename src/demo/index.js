import './style/style.css';
import point from './modules/pointer';
import puzzle from './modules/puzzle';
import timer from './modules/timer';

// 实例化touch pad 默认为gesture方式
const touchpad = new Touchpad({
  host: `${window.location.hostname}:3000`,
  trackType: 'gesture'
});

// 接应手势信号并处理
let gestureOpen = false;
touchpad.listen(['tap','swipeleft','swiperight','swipeup','swipedown','switch'], function(msg){
  if (msg.track && msg.track.action === 'switch') {
    if (msg.track.data === 'gesture') {
      point.show();
      gestureOpen = true;
    } else {
      point.hide();
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

  if (msg.track.action === 'tap') {
    let posxy = point.get();
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

// 游戏控制中心
let gameStatus = 'ready'; // ready,playing,stop
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
document.getElementById('start').addEventListener('click', startGame, false);

function stopGame(){
  if (gameStatus === 'playing') {
    gameStatus = 'stop';
    timer.stop();
    puzzle.stop();
  }
}
document.getElementById('stop').addEventListener('click', stopGame, false);

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
document.getElementById('restart').addEventListener('click', restartGame, false);

puzzle.success(() => {
  gameStatus = 'ready';
  timer.finish();
  puzzle.end();
})