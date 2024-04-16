import MAPBOX_KEY from "./credentials";
import Box from '@mui/material/Box';

const Map = () => {
    const loadMap = (event) => {
        mapboxgl.accessToken = MAPBOX_KEY;
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }

    return (
        <div>
            <Box id="map" sx={{
                width: "100%",
                height: "calc(100vh - 64px)",
            }} onClick={loadMap}></Box>
        </div> 
    );
}

export default Map;