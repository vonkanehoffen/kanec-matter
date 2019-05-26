import {
  Engine,
  Render,
  World,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Constraint
} from "matter-js";
import "./main.css";

// const element = document.querySelector('body');
// const width = element.clientWidth;
// const height = element.clientHeight;
// console.log(width, height)

// create an engine
let engine = Engine.create();

const vw = document.documentElement.clientWidth;
const vh = document.documentElement.clientHeight;

// create a renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: vw,
    height: vh
  }
});

// create two boxes and a ground
// let boxA = Bodies.rectangle(400, 200, 80, 80);
// let boxB = Bodies.rectangle(450, 50, 80, 80);
const heroW = vw / 2,
  heroH = vh / 2;

const hero = Bodies.rectangle(vw / 2, vh / 2, heroW, heroH, {
  // isStatic: true
});
let ground = Bodies.rectangle(vw / 2, vh, vw, 10, { isStatic: true });
let leftSide = Bodies.rectangle(0, vh / 2, 10, vh, { isStatic: true });
let rightSide = Bodies.rectangle(vw, vh / 2, 10, vh, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [hero, ground, leftSide, rightSide]);

// add mouse control
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

World.add(engine.world, mouseConstraint);
render.mouse = mouse;

const lcCommonProps = {
  stiffness: 0.01,
  render: {
    visible: false
  }
};
// Pin logo
const logoConstraintTL = Constraint.create({
  pointA: { x: 0, y: 0 },
  pointB: { x: -heroW / 2, y: -heroH / 2 },
  bodyB: hero,
  ...lcCommonProps
});

const logoConstraintTR = Constraint.create({
  pointA: { x: vw, y: 0 },
  pointB: { x: heroW / 2, y: -heroH / 2 },
  bodyB: hero,
  ...lcCommonProps
});

const logoConstraintBR = Constraint.create({
  pointA: { x: vw, y: vh },
  pointB: { x: heroW / 2, y: heroH / 2 },
  bodyB: hero,
  ...lcCommonProps
});

const logoConstraintBL = Constraint.create({
  pointA: { x: 0, y: vh },
  pointB: { x: -heroW / 2, y: heroH / 2 },
  bodyB: hero,
  ...lcCommonProps
});

World.add(engine.world, [
  logoConstraintTL,
  logoConstraintTR,
  logoConstraintBR,
  logoConstraintBL
]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const i = setInterval(() => {
  if (!document.hidden) {
    const thing = Bodies.rectangle(Math.random() * vw, 0, 60, 60, {
      angle: Math.random() * (Math.PI * 2)
    });
    World.add(engine.world, thing);
  }
}, 1000);
