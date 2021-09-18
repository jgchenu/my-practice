const TAU = Math.PI * 2;
const balls = [];
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000",
];

let lastTime;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const devicePixelRatio = window.devicePixelRatio;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = WINDOW_WIDTH * devicePixelRatio;
const CANVAS_HEIGHT = WINDOW_HEIGHT * devicePixelRatio;

const MarginLeft = Math.round(CANVAS_WIDTH / 5);
const MarginTop = Math.round(CANVAS_HEIGHT / 5);

const R = Math.round((CANVAS_WIDTH * 3) / 5 / 108) - 1;

function ensureCanvasSize(canvas) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  canvas.style.width = `${WINDOW_WIDTH}px`;
  canvas.style.height = `${WINDOW_HEIGHT}px`;
}

function render(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const currentTime = getTime();
  diffLastAndCurrentTime(currentTime);
  updateBalls();
  renderTimeArr(currentTime.split(""), ctx);
  renderBalls(ctx);
  window.requestAnimationFrame(() => {
    render(ctx);
  });
}

function diffLastAndCurrentTime(currentTime) {
  if (!lastTime) lastTime = currentTime;
  if (lastTime !== currentTime) {
    const lastTimeArr = lastTime.split("");
    const currentTimeArr = currentTime.split("");
    let marginLeftCount = 0;
    for (let i = 0; i < currentTimeArr.length; i++) {
      if (currentTimeArr[i] !== lastTimeArr[i]) {
        const num = currentTimeArr[i];
        addBalls(MarginLeft + marginLeftCount * (R + 1), MarginTop, num);
      }
      marginLeftCount += currentTimeArr[i] === ":" ? 9 : 15;
    }
    lastTime = currentTime;
  }
}

function addBalls(x, y, num) {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j]) {
        balls.push({
          x: x + j * (R + 1) * 2 + R + 1,
          y: y + i * (R + 1) * 2 + R + 1,
          g: 1.2 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
  }
}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= CANVAS_HEIGHT - R) {
      balls[i].y = CANVAS_HEIGHT - R;
      balls[i].vy = -balls[i].vy * 0.55;
    }
  }
  let cnt = 0;
  for (let i = 0; i < balls.length; i++)
    if (balls[i].x + R > 0 && balls[i].x - R < CANVAS_WIDTH)
      balls[cnt++] = balls[i];

  while (balls.length > Math.min(cnt, 300)) {
    balls.pop();
  }
}

function getTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const time = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
  return time;
}

function renderTimeArr(timeArr, ctx) {
  let marginCount = 0;
  for (let i = 0; i < timeArr.length; i++) {
    const num = timeArr[i] === ":" ? 10 : timeArr[i];
    renderDigit(MarginLeft + marginCount * (R + 1), MarginTop, num, ctx);
    marginCount += timeArr[i] === ":" ? 9 : 15;
  }
}

function renderBalls(ctx) {
  for (var i = 0; i < balls.length; i++) {
    ctx.fillStyle = balls[i].color;

    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, R, 0, TAU);
    ctx.closePath();
    ctx.fill();
  }
}

function renderDigit(x, y, num, ctx) {
  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j]) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(
          x + j * (R + 1) * 2 + R + 1,
          y + i * (R + 1) * 2 + R + 1,
          R,
          0,
          TAU
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

ensureCanvasSize(canvas);
render(ctx);
