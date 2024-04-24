import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const ReportButton = ({ modalHandler, currentLocation, modalMapCenterHandler }) => {
    const reportButtonClick = () => {
        modalHandler();
        if (currentLocation.length) {
            modalMapCenterHandler(currentLocation[0]);
        } 
    }
    
    return (
        <Fab onClick={reportButtonClick} variant="extended" color="primary" sx={{
            position: "absolute",
            left: "20px",
            bottom: "30px",
        }}>
            <EditIcon sx={{ mr: 1 }} />
            Report
        </Fab>
    );
};

export default ReportButton;