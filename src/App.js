import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Welcome from './Welcome';
import PatientInfo from './PatientInfo';
import Image from './Image';
import './style.css'; 
import PatientIntake from './PatientIntake';
import Vitals from './Vitals';
import { getBodyDataSet } from './PatientIntake';
import { getPerson } from './Image';



function toDatabase() { 

}

// layout credits to MUI base example: https://mui.com/material-ui/react-stepper/


const steps = [
  {
    label: 'Welcome',
    description: <Welcome/> 
  },
  {
    label: 'What Brings You In',
    description:
      <PatientIntake />,
  },
  {
    label: 'Basic Vitals',
    description: <Vitals/>,
  },
  {
    label: 'Get Insurance Information',
    description: <PatientInfo/>,
  },

    {
    label: 'Confirm Checkin',
    description: <Image/>,
  }
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    window.location.reload(false);

  };

  return (
   <Image /> 
  );
}