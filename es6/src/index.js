import { Observable, BehaviorSubject, animationFrame } from './rxjsMiddle';
import { DIRECTIONS, SPEED, SNAKE_LENGTH, FPS, POINTS_PER_APPLE } from './konstante';

import {
  createCanvasElement,
  renderScene,
  renderGameOver
} from './polje';

import {
  isGameOver,
  nextDirection,
  move,
  eat,
  generateSnake,
  generateApples
} from './funkcije';

/*napravi canvas i 2d context*/
let canvas = createCanvasElement();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);


const POCETNA_POZ = DIRECTIONS[39];

/**
 * Determines the speed of the snake
 */
let ticks$ = Observable.interval(SPEED);


let keydown$ = Observable.fromEvent(document, 'keydown');



/**
 * Change direction of the snake based on the latest arrow keypress by the user
 */
let direction$ = keydown$
  .map((event) => DIRECTIONS[event.keyCode])
  .filter(direction => !!direction)
  .scan(nextDirection)
  .startWith(POCETNA_POZ)
  .distinctUntilChanged();

//Obavesti sve kolika je duzina zmijice
let length$ = new BehaviorSubject(SNAKE_LENGTH);
/**
 * Accumulates the length of the snake (number of body segments)
 */
let snakeLength$ = length$
  .scan((step, snakeLength) => snakeLength + step)
  .share();

/**
 * Player's score
 */
let score$ = snakeLength$
  .startWith(0)
  .scan((score, _) => score + POINTS_PER_APPLE);

/**
 * Accumulates an array of body segments. Each segment is represented
 * as a cell on the grid
 */
let snake$= ticks$
  .withLatestFrom(direction$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength])
  .scan(move, generateSnake())
  .share();

/**
 * List of apples
 */
let apples$ = snake$
  .scan(eat, generateApples())
  .distinctUntilChanged()
  .share();

/**
 * Used to broadcast collisions to update the score and add a new 
 * body segment to the snake
 */
let appleEaten$ = apples$
  .skip(1)
  .do(() => length$.next(POINTS_PER_APPLE))
  .subscribe();

/**
 * Core game logic which returns an Observable of the scene. This will be 
 * used to render the game to the canvas as it unfolds
 */
let scene$ = Observable.combineLatest(snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score }))

/**
 * This stream takes care of rendering the game while maintaining 60 FPS
 */
let game$ = Observable.interval(1000 / FPS, animationFrame)
  .withLatestFrom(scene$, (_, scene) => scene)
  .takeWhile(scene => !isGameOver(scene))
  .subscribe({
    next: (scene) =>{
      console.log(scene$);
      renderScene(ctx, scene)

    }
    ,
    complete: () => renderGameOver(canvas)
  });