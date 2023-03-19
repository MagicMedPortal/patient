import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";
import { useState, useEffect, useRef } from "react";
import p5 from "p5";
import './style.css'; 
import { display } from "@mui/system";
import BlueCross from '../src/bcbstx.png';
import License from '../src/license.jpeg';


export default function Image(image, ...props) {

  const image = props; 
  let img; 


  const [text, setText] = useState("");
  const [displayImage, setDisplay] = useState("")

  function sketch (p5) {


  p5.preload = () => {


    try{
    img = p5.loadImage(image)
        console.log("successfully loaded image")

    }

    catch(error){
      console.log(error)
    }
  }; 

  p5.setup = () => {
    p5.clear()
    p5.noCanvas(); 
    p5.createCanvas(img.width, img.height).id("canvas");
    img.filter(p5.THRESHOLD, .55)
    p5.image(img, 0, 0)
    const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL();
    setDisplay(dataURL);  
    
    const rectangles = [
      {
        left: 0,
        top: 0,
        width: canvas.width/2,
        height: canvas.height,
      },
      {
        left: (canvas.width/2),
        top: 0,
        width: canvas.width/2,
        height: canvas.height,
      },
  ];

  (async () => {
      const worker = await createWorker({
        logger: m => console.log(m),
      });  
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const values = [];
      console.log(rectangles.length)

      for (let i = 0; i < rectangles.length; i++) {
        const { data: { text } } = await worker.recognize(canvas, { rectangle: rectangles[i] });
        values.push(text);
      }
      console.log(values);
      setText(values); 
      await worker.terminate();
    })();
  
  
  }

}

    // create a reference to the container in which the p5 instance should place the canvas
    const p5ContainerRef = useRef();

    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, []); 
  return(<div><img src={displayImage}/><br/>
  <h1>{text}</h1><br/></div>)

};
