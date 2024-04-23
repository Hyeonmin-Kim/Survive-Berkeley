import Fab from '@mui/material/Fab';

const CenterButton = () => {
    const centerMap = () => {
        console.log("clicked!");
    };

    return (
        <Fab onClick={centerMap} variant="extended" sx={{
            position: "absolute",
            left: "160px",
            bottom: "30px"
        }}>
            Center Map
        </Fab>
    );
};

export default CenterButton;