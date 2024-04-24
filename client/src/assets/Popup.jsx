import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Grow from '@mui/material/Grow';

function Popup({ highlightPins, highlightPinHandler, modalHandler, popupHandler, open, modalMapCenterHandler }) {
    const closePopup = () => {
      popupHandler(false);
      setTimeout(() => {
        highlightPinHandler([]);
      }, 100);
      
    };

    const openModal = () => {
      modalMapCenterHandler({
        lng: highlightPins[0].lng,
        lat: highlightPins[0].lat
      });
      closePopup();
      modalHandler();

    }

    return (
      <Grow in={open}>
        <Card sx={{ 
          width : "300px", 
          position : "absolute", 
          bottom : "30px", 
          left : "calc(50% - 150px)" 
        }} variant="outlined">
          <CardContent>
            {highlightPins.length ? highlightPins[0].address : "[UNSPECIFIED]"}
          </CardContent>
          <CardActions>
            <Button onClick={openModal} size="small">Report</Button>
            <CloseIcon fontSize='small' color='disabled' sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer"
            }} onClick={closePopup}/>
          </CardActions>
        </Card>
      </Grow>
    );
}

export default Popup;