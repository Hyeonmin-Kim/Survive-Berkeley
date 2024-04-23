import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const ReportButton = ({ modalHandler }) => {
    return (
        <Fab onClick={modalHandler} variant="extended" color="primary" sx={{
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