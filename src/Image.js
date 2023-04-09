import { createWorker } from "tesseract.js";
import { useState, useEffect, useRef } from "react";
import p5 from "p5";
import './style.css'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getImageSnap } from "./PatientInfo";
import { getBodyDataSet } from "./PatientIntake";
import './style.css'; 
import License from './license.jpeg'
import Insurance from './bcbstx.png'

// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js

let firstName; 

export default function Image() {

//let image = getImageSnap(); 

let image = getImageSnap(); 



let img; 

  const [text, setText] = useState("");

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
    p5.createCanvas(img.width, img.height).id("canvasId");
       const canvas = document.getElementById("canvasId");
    img.filter(p5.GRAY)
    p5.image(img, 0, 0)
 
// make quadrants
    
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
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/0123456789',
        preserve_interword_spaces: '0'

      })
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
  return(

    <Card sx={{ minWidth: 750, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
Please Confirm Your Information Below: 
                  </Typography>
                  <img src={image} /> 
                  <div style={{width: "500px"}}>{text}</div>

                  


                </CardContent>
              </Card>


  )

};
