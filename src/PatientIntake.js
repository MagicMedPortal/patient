import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js




export default function PatientIntake() {




  const [formats, setFormats] = React.useState(() => ['']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Card sx={{ maxWidth: 750, display: "flex" }}>
    <CardContent style={{padding: 10, margin: 10, flex: 1}}>
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      orientation='vertical'
      fullWidth
    >
      <ToggleButton value="whole-body" aria-label="whole-body">
        Whole Body
      </ToggleButton>
      <ToggleButton value="head" aria-label="head">
       Head/Face/Ears/Nose/Neck
      </ToggleButton>
      <ToggleButton value="chest" aria-label="chest">
        Chest, Shoulders, Arms, Hands
      </ToggleButton>
      <ToggleButton value="midsection" aria-label="midsection">
        Stomach, Stomach-Area, Bowels
      </ToggleButton>
      <ToggleButton value="lower-body" aria-label="lower-body">
        Hips, Sexual Organs, Back, Thighs, Legs, Feet
      </ToggleButton>
    </ToggleButtonGroup>



    </CardContent>
    </Card>

  );
  
    

}

