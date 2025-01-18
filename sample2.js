let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

document.getElementById('start').addEventListener('click', () => {
  if (!timerInterval) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
  }
});

document.getElementById('stop').addEventListener('click', () => {
  if (timerInterval) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  elapsedTime = 0;
  timeDisplay.textContent = '00:00.000';
  lapsList.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
  if (timerInterval) {
    const currentTime = Date.now() - startTime + elapsedTime;
    const lapTime = formatTime(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
});
