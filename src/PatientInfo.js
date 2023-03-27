import * as React from 'react'; 
import p5 from "p5";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  useEffect, useRef } from "react";
import Upscaler from 'upscaler'; 



// source for taking picture https://editor.p5js.org/son/sketches/LuJ2eGf9p
// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js


let video;
let button; 
let imageSnap; 

export function getImageSnap() {
    const upscaler = new Upscaler(); 
    let upscaled = upscaler.upscale(imageSnap, {
      patchSize: 20,
      padding: 2,
    })
    console.log("successfully passing image"); 
    return(upscaled); 
}


export default function PatientInfo() {

  function sketch (p5) {

        p5.setup = () => {

        video = p5.createCapture(p5.VIDEO); 
        video.size(648, 408);
       
        button = p5.createButton('Take Photo').id("button"); //create a button called "snap"
        button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"

        
        }

        function takesnap() {

        p5.createCanvas(648, 408).id("canvasId");
        p5.image(video, 0, 0, 648, 408); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
        const canvas = document.getElementById("canvasId");
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


    <Card sx={{ maxWidth: 750, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Please provide a picture of your insurance card. Please fill the screen with your insurance card to capture all the necessary information. </Typography>

                     <Typography variant="body1" color="text.secondary" gutterBottom>

                     If you do not have insurance, please skip this step. You will have to manually fill out your information in the next screen.
                  </Typography>
                    <div  ref={p5ContainerRef} />


                </CardContent>
              </Card>


  )
    


}

