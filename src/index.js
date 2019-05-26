import Matter from 'matter-js';
import './main.css';

console.log('hello', Matter);
// const element = document.querySelector('body');
// const width = element.clientWidth;
// const height = element.clientHeight;
// console.log(width, height)

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;


// create an engine
var engine = Engine.create();

const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: vw,
    height: vh,
  }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(vw/2, vh, vw, 10, { isStatic: true });
var leftSide = Bodies.rectangle(0, vh/2, 10, vh, { isStatic: true });
var rightSide = Bodies.rectangle(vw, vh/2, 10, vh, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, leftSide, rightSide]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const i = setInterval(() => {
  if(!document.hidden) {
    const thing = Bodies.rectangle(Math.random()*vw, 200, 60, 60, { angle: Math.random()*(Math.PI*2) });
    World.add(engine.world, thing);
  }
}, 1000)
