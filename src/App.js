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
import { getVitals } from './Vitals';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




// layout credits to MUI base example: https://mui.com/material-ui/react-stepper/

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  let dataSet = JSON.stringify({"time": Date.now(), "body": getBodyDataSet(), "vitals": getVitals, "person": getPerson()}) 
  console.log(dataSet); 

  


  return (
    <Dialog onClose={handleClose} open={open} maxWidth='500px'>
      <Card sx={{ maxWidth: 750, display: "flex" }}>
      <CardContent style={{padding: 10, margin: 10, flex: 1}}>
        <p><Typography variant="h6">Confirmation Successful!</Typography></p>
      <Typography variant='body1'>Due to the technical constraints of this demo, there isn't an actual function to submit to a database. However, this is where data will be passed to the database of choice. Below is what the passover would look like: 
      <p>
        
        <code>

          {dataSet}


        </code>
        
        </p></Typography></CardContent></Card>
   
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    handleReset(); 
  };

  //return (
   //<Image /> 
  //);

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
          <Button onClick={handleClickOpen} sx={{ mt: 1, mr: 1 }}>
            Complete Check In
          </Button>
          <SimpleDialog
        open={open}
        onClose={handleClose}
      />
        </Paper>
      )}
    </Box>
    </Container>
  );
}