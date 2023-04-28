import { Button } from "@mui/material";
import { useState } from "react";

//this uses chrome's Serial API 
// code based off of this https://fidisys.com/blog/serial-port-devices/ 

/*global TextDecoderStream */


let vitals; 
let vitals2; 
let value; 

export function getVitals(){

    vitals = JSON.stringify({"temp": 100, "heartrate": 100})

    return(vitals)

}

export default function Vitals() { 

  const [portOpen, setOpen] = useState(false)
  const [readVitals, setVitals] = useState("")

  function handleClose(event, newState) {
    setOpen(false); 
    handleClick(); 
  }

  async function handleClick(event, newState) {

    setOpen(newState)

    console.log(`Value of PortOpen: {portOpen}`)

          const port = navigator.serial.requestPort(); 
      console.log(`listening to port: ${port}`)
      port.open({baudRate: 9600, flowControl: 'hardware'})

      // Listen to data coming from the serial device.
        const textDecoder = await new TextDecoderStream();
        const readableStreamClosed = await port.readable.pipeTo(textDecoder.writable);
        const reader  =await  textDecoder.readable.getReader();

    if(portOpen){

        while (true) {
          const { value, done } = reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          // value is a string will be streaming here.
          console.log(value);
          setVitals(value); 
        }

      }

      else{
        reader.releaseLock();
        port.close(); 
      }


    }




  if ("serial" in navigator) {
  console.log("Awesome, The serial port is supported.")}

  else
  {
    return(<div>
      Your browser does not support the Serial API <br></br>

      <Button variant="contained" onClick={getVitals}>Submit Dummy Data</Button>
    </div>)
  }



  return(<div>{vitals}<p><Button id="start" onClick={handleClick} variant="contained">Start Gathering Vitals</Button></p>
  <Button id="done" variant="outlined" onClick={handleClose}>Submit Vitals</Button></div>)



}
