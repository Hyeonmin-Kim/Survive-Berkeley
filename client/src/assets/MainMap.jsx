import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MAPBOX_API from './credentials';
import { useRef } from 'react';
import mainMapConfig from './mainMapConfig';

const MainMap = ({ hooker }) => {
    const mainMapRef = useRef();

    return (
        <Map
            id="mainMap"
            ref={mainMapRef}
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
            onLoad={() => {
                console.log("onLoad");
                hooker(mainMapRef);
            }}
        >
        </Map>
    );
}

export default MainMap;