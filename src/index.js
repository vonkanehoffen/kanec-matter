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
import logo1 from "./img/120/creativeCloud.png";
import logo2 from "./img/120/git.png";
import logo3 from "./img/120/gitlab.png";
import logo4 from "./img/120/graphQL.png";
import logo5 from "./img/120/redux.png";
import logo6 from "./img/120/sketch.png";
import logo7 from "./img/120/ubuntu.png";
import logo8 from "./img/120/react.png";

// const element = document.querySelector('body');
// const width = element.clientWidth;
// const height = element.clientHeight;
// console.log(width, height)

// create an engine
let engine = Engine.create();

const body = document.querySelector("body");
const vw = body.clientWidth;
const vh = body.clientHeight;

// create a renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: vw,
    height: vh,
    wireframes: false,
    background: "#121212"
  }
});

// create two boxes and a ground
// let boxA = Bodies.rectangle(400, 200, 80, 80);
// let boxB = Bodies.rectangle(450, 50, 80, 80);
const heroW = vw / 2,
  heroH = vh / 2;

// const hero = Bodies.circle(vw / 2, vh / 2, vw / 6, {
//   isStatic: true
// });
// const hero = Bodies.rectangle(vw / 2, vh / 2, heroW, heroH, {
//   isStatic: true
// });
let ground = Bodies.rectangle(vw / 2, vh, vw, 10, { isStatic: true });
let leftSide = Bodies.rectangle(0, vh / 2, 10, vh, { isStatic: true });
let rightSide = Bodies.rectangle(vw, vh / 2, 10, vh, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, leftSide, rightSide]);

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
// const logoConstraintTL = Constraint.create({
//   pointA: { x: 0, y: 0 },
//   pointB: { x: -heroW / 2, y: -heroH / 2 },
//   bodyB: hero,
//   ...lcCommonProps
// });
//
// const logoConstraintTR = Constraint.create({
//   pointA: { x: vw, y: 0 },
//   pointB: { x: heroW / 2, y: -heroH / 2 },
//   bodyB: hero,
//   ...lcCommonProps
// });
//
// const logoConstraintBR = Constraint.create({
//   pointA: { x: vw, y: vh },
//   pointB: { x: heroW / 2, y: heroH / 2 },
//   bodyB: hero,
//   ...lcCommonProps
// });
//
// const logoConstraintBL = Constraint.create({
//   pointA: { x: 0, y: vh },
//   pointB: { x: -heroW / 2, y: heroH / 2 },
//   bodyB: hero,
//   ...lcCommonProps
// });
//
// World.add(engine.world, [
//   logoConstraintTL,
//   logoConstraintTR,
//   logoConstraintBR,
//   logoConstraintBL
// ]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

const boxSize = 60;
const maxBoxes = Math.floor(((vw / boxSize) * (vh / boxSize)) / 2);
console.log("max boxes = ", maxBoxes);

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

let boxCount = 0;
const i = setInterval(() => {
  if (!document.hidden && maxBoxes > boxCount) {
    const thing = Bodies.rectangle(Math.random() * vw, -120, 60, 60, {
      angle: Math.random() * (Math.PI * 2),
      render: {
        strokeStyle: "#ffffff",
        sprite: {
          texture: logos[Math.floor(Math.random() * logos.length)],
          xScale: 0.5,
          yScale: 0.5
        }
      }
    });
    World.add(engine.world, thing);
    boxCount += 1;
    console.log(boxCount);
  }
}, 500);

//
//
// var canvas = document.createElement('canvas'),
//   context = canvas.getContext('2d');
//
// canvas.width = 800;
// canvas.height = 600;
//
// document.body.appendChild(canvas);
//
// (function render() {
//   var bodies = Composite.allBodies(engine.world);
//
//   window.requestAnimationFrame(render);
//
//   context.fillStyle = '#fff';
//   context.fillRect(0, 0, canvas.width, canvas.height);
//
//   context.beginPath();
//
//   for (var i = 0; i < bodies.length; i += 1) {
//     var vertices = bodies[i].vertices;
//
//     context.moveTo(vertices[0].x, vertices[0].y);
//
//     for (var j = 1; j < vertices.length; j += 1) {
//       context.lineTo(vertices[j].x, vertices[j].y);
//     }
//
//     context.lineTo(vertices[0].x, vertices[0].y);
//   }
//
//   context.lineWidth = 1;
//   context.strokeStyle = '#999';
//   context.stroke();
// })();
