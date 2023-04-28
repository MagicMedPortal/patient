import { createWorker } from "tesseract.js";
import { useState, useEffect, useRef } from "react";
import p5 from "p5";
import './style.css'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css'; 
import Insurance from './bcbstx.png'
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import * as dataURL from './dataURI.txt' ; 
import { getImageSnap } from "./PatientInfo";
import { OpenAIApi, Configuration } from "openai";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// progress code is from Material UI  https://mui.com/material-ui/react-progress/#LinearDeterminate.js 
// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js- specifically this guy: https://stackoverflow.com/a/71369517 



let dataText; 
const config = new Configuration({apiKey: process.env.REACT_APP_APIKEY})
const openai = new OpenAIApi(config)



export function getPerson() {

  return (JSON.stringify(dataText))
}

// this is  for the progress bar! 
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '600px', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ maxWidth: '750px' }}>
        <Typography variant="caption" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};



export default function Image() {

//let image = getImageSnap(); 

let image = getImageSnap(); // get image from the patient in take  

  let img; // this is for the p5 processing 

  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0)
  const [parsed, setParsed] = useState(0); 

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
    p5.image(img, 0, 0);  

    //  for image processing p5.filter(p5.THRESHOLD) --- please refer to the the threshold.js 

  
  // make quadrants this will be easier for the OCR to parse data 
      
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

    // this will initiate it 
    // for logic you can set a confidence level by setting m.confidence 
    // this is taken from the documentation 
    (async () => {
        const worker = await createWorker({
          logger: m => setProgress(m.progress*100)
        });  
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/0123456789:',
          preserve_interword_spaces: '0'

        })
        const values = [];
        console.log(rectangles.length)

        for (let i = 0; i < rectangles.length; i++) {
          const { data: { text } } = await worker.recognize(canvas, { rectangle: rectangles[i] });
          values.push(text.replace(/(\n+)/g, "\n").replace(/(1\n|,\n|  |,)/g, "")); //clean up text to remove weird linebreaks 
        }
        setText(values[0].concat(values[1]));  // this is to clean out the junk text 
        console.log(`this is what ${text} looks like`)
        console.log(typeof text)
        await worker.terminate();

        console.log("Running Chat GPT")



  // chat gpt to start parsing this data 
      const {data : {choices} } = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: `can you please identify the key value pairs in this text: ${text} \n then turn it into the corresponding JSON. Please do so by removing all unncessary characters, and output the JSON`,
        max_tokens: 500,
        n: 1,
        temperature: 0.3,
      });

      console.log(choices[0].text)
      setParsed(choices[0].text)

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
                  <Typography variant="h6" color="text.primary" gutterBottom>
OCR output below:                  </Typography>
                  <img src={image} /> 
 

                               <Typography variant="body1" color="text.primary" gutterBottom>
OCR Progress:                </Typography>       
      <LinearProgressWithLabel value={progress} />


          <p></p>
                <p></p>

      <TextField
          id="ocr-output"
          label="OCR Output"
          defaultValue={text}
          onChange={event=> setText(event.target.value)}
          multiline
          fullWidth
          helperText= "This is after chatGPT has cleaned it up."
          style={{whiteSpace: "pre-wrap"}}
        />

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="chat-gpt"
        >
          <Typography>Chat GPT Output</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" style={{whiteSpace: "pre-wrap"}}>
            
            {parsed}</Typography>
        </AccordionDetails>
      </Accordion>
      

        

        <p></p>
            <Button variant="contained" onClick={() => {
              console.log(text) 
              dataText = {"imageURL": dataURL, "output": text}
              getPerson(); 
    console.log(getPerson()); 
  }}>Complete with OCR</Button> 
  
   &nbsp; &nbsp; &nbsp;             
  
  <Button variant="contained" onClick={() => {
              console.log(parsed) 
              dataText = {"imageURL": dataURL, "output": parsed}
              getPerson(); 
    console.log(getPerson()); 
  }}>Complete with ChatGPT</Button>  





                </CardContent>
              </Card>


  )

}
