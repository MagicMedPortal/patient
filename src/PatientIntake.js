import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState} from "react";


import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Button, TextField } from '@mui/material';

let dataSet; 
const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));


// these icons are from the MUI guide 
// this is for human-computer interaction 



const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Extremely Ill',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Terrible',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Some sickness',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Minor',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Fine/Just here for followup',
  },
};

const painIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'In Extreme Pain',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Severe Amount of Pain',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Moderate Amount of Pain',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Mild Pain',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'No Pain',
  },
};


function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export function getBodyDataSet() {
  return (JSON.stringify(dataSet))
}


export default function PatientIntake() {

  const [painValue, setPainValue] = useState(0); 
  const [feelValue, setFeelValue] = useState(0); 
  const [body, setBody] = useState(['']); 

  

  const handleFeel=(event, newFeel) => {
    setFeelValue(newFeel); 
  }

    const handlePainValue=(event, newPain) => {
    setPainValue(newPain); 
  }

  const handleBody = (event, newBody) => {
    setBody(newBody)
  }



  return(


    <Card sx={{ maxWidth: 750, display: "flex" }}>
      <CardContent style={{padding: 10, margin: 10, flex: 1}}>
        <Typography variant="body1" color="text.primary" gutterBottom>
          What brings you in today?  Please be as descriptive as possible. 
        </Typography>

        <p><Typography variant="button" color="text.info">How do you feel?</Typography></p>

            <StyledRating
                    name="how-feel"
                    defaultValue={2}
                    value={feelValue}
                    onChange={handleFeel}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value) => customIcons[value].label}
                    highlightSelectedOnly
                    size='large'
                  />

          <br></br>

                  <Typography variant="overline">{customIcons[feelValue] == null ? "" : customIcons[feelValue].label}</Typography>


                  <p><Typography variant="button">How much pain are you in?</Typography></p>


                  <StyledRating
                    name="paint"
                    defaultValue={1}
                    value={painValue}
                    onChange={handlePainValue}
                    IconContainerComponent={IconContainer}
                    getLabelText={(value) => painIcons[value].label}
                    highlightSelectedOnly
                    size='large'
                    >

                    </StyledRating> 
                    <br></br>
                    <Typography variant="overline">{painIcons[painValue] == null ? "" : painIcons[painValue].label}</Typography>

                    <p><Typography variant="button">What are some symptoms</Typography></p>


            <ToggleButtonGroup
                          value={body}
              onChange={handleBody}
              aria-label="text formatting"
              orientation='vertical'
              fullWidth
            >
              <ToggleButton value="whole-body-chills" aria-label="whole-body">
                Whole Body Chills
              </ToggleButton>
              <ToggleButton value="broken-limb" aria-label="sprain">
                Broken Limb
              </ToggleButton>
              <ToggleButton value="cough" aria-label="cough">
                Cough
              </ToggleButton>
              <ToggleButton value="headaches" aria-label="headaches">
                Headaches
              </ToggleButton>
              <ToggleButton value="lower-body" aria-label="lower-body">
                Midsection Pain
              </ToggleButton>
            </ToggleButtonGroup>
            <p></p>

            <Button variant="contained" onClick={() => {
    dataSet = {"feel": feelValue, "pain": painValue, "symptoms": body}
    getBodyDataSet(); 
    console.log(getBodyDataSet()); 
  }}>Submit</Button>

      
                    


      </CardContent>
    </Card>


  )
    


}


