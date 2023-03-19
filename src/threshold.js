 
import { useEffect, useRef } from "react";
import p5 from "p5";

let img; 
let dataURL; 
let imagePath; 

export function sketch (p5, imagePath) {

  p5.preload = () => {


    try{
    img = p5.loadImage(imagePath)
        console.log("successfully loaded image")

    }

    catch(error){
      console.log(error)
    }
  }; 

  p5.setup = () => {

    try{

      p5.clear()
    
    p5.createCanvas(img.width, img.height).id("canvas");

    
    img.filter(p5.GRAY)
    p5.image(img, 0, 0)
    
    const canvasURL = document.getElementById("canvas");
    dataURL = canvasURL.toDataURL(); 

    }

    catch(err){
      console.log("unable to create canvas")
      dataURL = "" 
    }


  return(dataURL)


  }

}