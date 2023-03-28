import * as React from 'react'; 
import p5 from "p5";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react";


// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js

let painValue; 
let otherSymptom; 
let patientNotes; 

export default function PatientIntake() {
  return(


    <Card sx={{ maxWidth: 750, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    What brings you in today? 
                  </Typography>

                  

                </CardContent>
              </Card>


  )
    


}

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
    {type: "Body", symptom: "Pain", value: painValue} 
]