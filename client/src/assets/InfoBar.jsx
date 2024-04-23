import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

const InfoBar = ({ open }) => {
    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Box sx={{
                width: "350px",
                height: "calc(100vh - 114px)",
                position: "absolute",
                bottom: "30px",
                right: "20px",
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                backgroundColor: "white",
            }}>
                Information Bar Here
            </Box>
        </Slide>
        
    );
};

export default InfoBar;