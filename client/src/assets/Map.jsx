import { useEffect } from 'react';
import MAPBOX_KEY from "./credentials";
import Box from '@mui/material/Box';

const Map = () => {

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_KEY;
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-122.259094, 37.871960],
            zoom: 14
        });
    })

    return (
        <div>
            <Box id="map" sx={{
                width: "100%",
                height: "calc(100vh - 64px)",
            }}></Box>
        </div> 
    );
}

export default Map;