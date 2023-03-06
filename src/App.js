
import React from "react";
import Sketch from "react-p5";
 

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(window.innerWidth, window.innerHeight).parent(
    canvasParentRef
  );
  p5.frameRate(this.fr);
  // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
};
const draw = p5 => {
  p5.background(255);
  p5.ellipse(50, 50, 70, 70);
  p5.stroke("#ff0000");
  p5.fill(255, 0, 0);
};
export default function App() {


 
 
 return <Sketch setup={setup} draw={draw} />
}