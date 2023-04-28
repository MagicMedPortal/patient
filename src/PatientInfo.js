import * as React from 'react'; 
import p5 from "p5";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  useEffect, useRef } from "react";



// source for taking picture https://editor.p5js.org/son/sketches/LuJ2eGf9p
// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js (specifically: https://stackoverflow.com/a/71369517) 
// example for upscaler: 


let video;
let button; 
let imageSnap; 

export function getImageSnap() {
    return(imageSnap); 
}


export default function PatientInfo() {

  function sketch (p5) {

        p5.setup = () => {

        button = p5.createButton('Take Photo').id("button"); //create a button called "snap"
        button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"


        video = p5.createCapture(p5.VIDEO); 
        video.size(500,  375);
        
        }

        function takesnap() {

        p5.createCanvas(500, 375).id("canvas");
        const canvas = document.getElementById("canvas");
        p5.image(video, 0, 0, 500, 375); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
        imageSnap = canvas.toDataURL();
        getImageSnap(); 

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


    <Card sx={{ minWidth: 600, display: "block" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="body1" color="text.primary" gutterBottom>
                    Please Provide Picture of Your Insurance Card. For sake of this demo, we are using insurance card because 
                    it is easier for the OCR to parse versus the human cognition of driver's licenses. </Typography>
                        <div  ref={p5ContainerRef}  />


                </CardContent>
              </Card>


  )
    


}

