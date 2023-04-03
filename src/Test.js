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
    <Container maxWidth="sm">
      <div style={{padding: 10}}>&nbsp;</div>
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished! Someone will be with you shortly.</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Complete Check In
          </Button>
        </Paper>
      )}
    </Box>
    </Container>
  );
}