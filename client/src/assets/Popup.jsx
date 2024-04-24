import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
  
  const card = (
    <React.Fragment>
      <CardContent>
        Address here
      </CardContent>
      <CardActions>
        <Button size="small">Report</Button>
      </CardActions>
    </React.Fragment>
  );

function Popup() {
      return (
          <Card sx={{ width : "300px", position : "absolute", bottom : "30px", left : "calc(50% - 150px)" }}variant="outlined">{card}</Card>
      );

}

export default Popup;