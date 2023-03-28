import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';


// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js




export default function PatientIntake() {


  const [body, setBody] = useState([]);
  const [patientNotes, setPatientNotes] = useState("")
  const [painValue, setPainValue] = useState(0)


  const bodyLocations = [
    {part: "Whole Body", location: "Whole Body", value: "3"},
    {part: "Upper Body", location: "Head", value: "5"}, 
    {part: "Upper Body", location: "Neck", value: "5"}, 
    {part: "Upper Body", location: "Back", value: "4"}, 
    {part: "Chest", location: "Shoulders", value: "3"}, 
    {part: "Chest", location: "Chest", value:"5"}, 
    {part: "Chest", location: "Arms", value: "1"}, 
    {part: "Chest", location: "Hands", value: "1"}, 
    {part: "Midsection", location: "Stomach Area", value:"3"}, 
    {part: "Midsection", location: "Hips", value: "2"}, 
    {part: "Midsection", location: "Sexual Organs", value: "2"}, 
    {part: "Lower Body", location: "Upper Thighs", value: "2"}, 
    {part: "Lower Body", location: "Lower Legs", value: "2"}, 
    {part: "Lower Body", location: "Feet", value: "1"}
]

const symptomsCount = [
    {type: "Infection", symptom: "Fever",  value: "5"}, 
    {type: "Body", symptom: "Chills", value: "5" }, 
    {type: "Body", symptom: "Fluids", value: "5"}, 
    {type: "Body", symptom: "Sprain", value: "2"}, 
    {type: "Infection", symtpom: "Vomitting", value: "4"}, 
    {type: "Infection", symptom: "", value: "5"}, 
    {type: "Other", symptom: patientNotes, value: "5"}, 
    {type: "Body", symptom: "Laceration/Cut", value: "4"}, 
    {type: "Body", symptom: "Bodily Trauma", value: "5"},
    {type: "Body", symptom: "Pain", value: painValue}, 
    {type: "Infection", symptom: "Burning Sensation", value: "5"}
]


  const handleChangeBody = (event) => {
    const {
      target: { value },
    } = event;
    setBody(
      typeof value === 'string' ? value.split(',') : value,
  
    );

    
  };



  return(


    <Card sx={{ maxWidth: 750, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    What brings you in today? 
                  </Typography>

                <p></p>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Enter as many places where you feel any symptoms. Tap as many areas are you need to. </Typography>

                  <p></p>

                 
                  <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Location of Symptoms</InputLabel>
                        <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={body}
                              onChange={handleChangeBody}
                              input={<OutlinedInput label="Location of Symptoms" />}
                            >
                       {bodyLocations.map((place) => (
                              <MenuItem
                                key={place.location}
                                value={place.location}
                              >
                                {place.location}
                              </MenuItem>
                            ))}
                      </Select>
                      </FormControl>

                </CardContent>
              </Card>


  )
    


}

