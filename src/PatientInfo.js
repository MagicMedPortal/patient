import * as React from 'react'; 
import p5 from "p5";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react";



// source for taking picture https://editor.p5js.org/son/sketches/LuJ2eGf9p


let video;
let button; 
let imageSnap; 

export function getImageSnap() {
    console.log("successfully passing image"); 
    return(imageSnap); 
}

export default function PatientInfo() {

  function sketch (p5) {

        p5.setup = () => {

        p5.createCanvas(533.33, 400).id("canvas");
        p5.background(51);
        video = p5.createCapture(p5.VIDEO); //access live webcam
        video.size(533.33, 400); //change the size to 320 x 240
        button = p5.createButton('snap'); //create a button called "snap"
        button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"

        
        }

        function takesnap() {
        p5.image(video, 0, 0); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
        const canvas = document.getElementById("canvas");
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

    <Card sx={{ maxWidth: 800, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    Please provide a picture of your driver's license.
                  </Typography>
            

                          <div className="App" ref={p5ContainerRef} />


                </CardContent>
              </Card>


  )


}

