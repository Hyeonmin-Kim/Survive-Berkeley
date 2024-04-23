import Box from '@mui/material/Box';

const InfoBar = () => {
    return (
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

        </Box>
    );
};

export default InfoBar;