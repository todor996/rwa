
export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);

export function createCanvasElement() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}


export function renderScene(ctx, scene) {
  renderBackground(ctx);
  renderScore(ctx, scene.score);
  renderApples(ctx, scene.apples);
  renderSnake(ctx, scene.snake);
  
}


export function renderScore(ctx, score) {
  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;
  localStorage.setItem("score",score);
  drawText(ctx, score.toString(), textX, textY, 'rgba(0, 0, 0, 0.1)', 150);
}


export function renderApples(ctx, apples=[]) {
  apples.forEach(apple => paintCell(ctx, apple, 'red'));
}


export function renderSnake(ctx, snake) {
  snake.forEach((segment, index) => paintCell(ctx, wrapBounds(segment), getSegmentColor(index)));
}


export function renderGameOver(ctx) {
 ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //let q=localStorage.getItem("score");
  let textX = CANVAS_WIDTH / 2;
  let textY = CANVAS_HEIGHT / 2;
 /* let table=document.querySelector("#tbl");
  let thead=document.createElement("thead");
  let th=document.createElement("th");
  let th2=document.createElement("th");
  th.innerText="User";
  th2.innerText="Score";
  thead.appendChild(th);
  thead.appendChild(th2);
  table.appendChild(thead);
  table.style.border="1px solid black";
  canvas.style.display="none";*/
 drawText(ctx, "GAME OVE", textX, textY, 'black', 25);
}


export function getRandomPosition(snake = []) {
  let position = {
    x: getRandomNumber(0, COLS - 1),
    y: getRandomNumber(0, ROWS - 1)
  };

  if (isEmptyCell(position, snake)) {
    return position;
  }

  return getRandomPosition(snake);
}


export function checkCollision(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function renderBackground(ctx) {
  ctx.fillStyle = '#EEE';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawText(ctx, text, x, y, fillStyle,
  fontSize, horizontalAlign = 'center', verticalAlign = 'middle') {

  ctx.fillStyle = fillStyle;
  ctx.font = `bold ${fontSize}px sans-serif`;

  let textX = x;
  let textY = y;

  ctx.textAlign = horizontalAlign;
  ctx.textBaseline = verticalAlign;

  ctx.fillText(text, textX, textY);
}

export function paintCell(ctx, point, color) {
  const x = point.x * CELL_SIZE + (point.x * GAP_SIZE);
  const y = point.y * CELL_SIZE + (point.y * GAP_SIZE);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function isEmptyCell(position, snake) {
  return !snake.some(segment => checkCollision(segment, position));
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function getSegmentColor(index) {
  return index === 0 ? 'black' : '#2196f3';
}

function wrapBounds(point) {
  point.x = point.x >= COLS ? 0 : point.x < 0 ? COLS - 1 : point.x;
  point.y = point.y >= ROWS ? 0 : point.y < 0 ? ROWS - 1 : point.y;

  return point;
}
