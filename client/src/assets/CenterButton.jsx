import Fab from '@mui/material/Fab';

const CenterButton = ({ mainMap }) => {
    const centerMap = () => {
        mainMap.current.setCenter([-122.259094, 37.871960]);
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