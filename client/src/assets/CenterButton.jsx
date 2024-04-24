import Fab from '@mui/material/Fab';
import mainMapConfig from './mainMapConfig';

const CenterButton = ({ mainMap }) => {
    const centerMap = () => {
        mainMap.current.setCenter(mainMapConfig.center);
        mainMap.current.setZoom(mainMapConfig.zoom);
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