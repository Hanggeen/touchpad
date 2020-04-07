import './style/style.css';
import point from './pointer';
import puzzle from './puzzle';
import timer from './timer';
window.onload = function () {
  new Touchbar({
    host: `${window.location.hostname}:3000`
  });
}


window.puzzle = puzzle;

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