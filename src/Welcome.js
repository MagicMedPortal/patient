import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './style.css'; 
import Button from '@mui/material/Button';
import { Container} from '@mui/material';


export default function Welcome() { 


    return(
         

           <Card sx={{ maxWidth: 800, display: "flex" }}>
                <CardContent style={{padding: 10, margin: 10, flex: 1}}>
                  <Typography variant="h4" color="text.primary" gutterBottom>
                    <center><b>Welcome!</b></center>
                  </Typography>
            

                  <Typography variant="body2" component="div">
                    <strong>Please bypass this kiosk and immediately see staff if you are experiencing any of the following: </strong> 
                    <ol>
                      <li>Chest pains or shortness of breath</li>
                      <li>Dizziness or nausea</li>
                      <li>Extreme headaches</li>
                      <li>Slurred Speech</li>
                    </ol>
                  </Typography>
                  <p></p>

                  <span style={{margin: 10}}><center><Button variant="contained" size="large">I am not experiencing any of those symptoms</Button></center></span>

                </CardContent>
              </Card>

          )



}