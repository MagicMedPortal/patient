import * as React from React; 
import p5 from "p5";
import { Button } from "@mui/material";


// source for taking picture https://editor.p5js.org/son/sketches/LuJ2eGf9p


let video;
let button; 
let imageSnap; 

export function getImageSnap() {
    return(imageSnap); 
}

export default function PatientInfo() {

  function sketch (p5) {

        p5.setup = () => {

        p5.createCanvas(600, 257).id("canvas");
        p5.background(51);
        video = p5.createCapture(p5.VIDEO); //access live webcam
        video.size(600, 257); //change the size to 320 x 240
        button = p5.createButton('snap'); //create a button called "snap"
        button.mousePressed(takesnap); //when the button is pressed, call the function called "takesnap"
        
        }

        function takesnap() {
        imageSnap = p5.image(video, 0, 0); //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
        getImageSnap(); 
        p5.video.remove(); 
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


}

