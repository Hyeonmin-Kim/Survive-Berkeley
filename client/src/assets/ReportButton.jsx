import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const ReportButton = ({ modalHandler }) => {
    return (
        <Fab onClick={modalHandler} variant="extended" sx={{
            position: "absolute",
            right: "20px",
            bottom: "20px"
        }}>
            <EditIcon sx={{ mr: 1 }} />
            Report
        </Fab>
    );
};

export default ReportButton;