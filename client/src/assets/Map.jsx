import { useEffect } from 'react';
import MAPBOX_KEY from "./credentials";
import Box from '@mui/material/Box';

const Map = ({ mapConfig }) => {

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_KEY;
        const map = new mapboxgl.Map({
            container: mapConfig.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: mapConfig.center,
            zoom: mapConfig.zoom
        });
    })

    return (
        <div>
            <Box id={mapConfig.id} sx={{
                width: mapConfig.width, height: mapConfig.height
            }}></Box>
        </div> 
    );
}

export default Map;