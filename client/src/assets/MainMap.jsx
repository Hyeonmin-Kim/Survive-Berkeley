import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MAPBOX_API from './credentials';
import { useEffect, useRef } from 'react';

const mainMapConfig = {
    id: "mainMap",
    width: "100%",
    height: "calc(100vh - 64px)",
    center: [-122.259094, 37.871960],
    zoom: 15
}

const MainMap = ({ centerButtonCnt }) => {
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_API;
        const map = new mapboxgl.Map({
            container: 'mainMap',
            center: mainMapConfig.center,
            zoom: mainMapConfig.zoom
        });
        console.log(map);
    }, [centerButtonCnt]);

    return (
        <Map
            id="mainMap"
            mapboxAccessToken={MAPBOX_API}
            initialViewState={{
                longitude: mainMapConfig.center[0],
                latitude: mainMapConfig.center[1],
                zoom: mainMapConfig.zoom
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{
                width: mainMapConfig.width,
                height: mainMapConfig.height,
            }}
        >
        </Map>
    );
}

export default MainMap;