import * as React from 'react'; 
import p5 from "p5";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useRef } from "react";


// source for using P5 in react https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js



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

