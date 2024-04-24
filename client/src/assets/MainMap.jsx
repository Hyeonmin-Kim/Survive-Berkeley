import { Map, Marker }  from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MAPBOX_API from './credentials';
import { useRef } from 'react';
import mainMapConfig from './mainMapConfig';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const MainMap = ({ hooker, popupHandler, highlightPins, highlightPinHandler, currentLocation, currentLocationHandler, modalMapCenterHandler }) => {
    const mainMapRef = useRef();

    const watchLocation = () => {
        const gpsSucceed = (pos) => {
            // console.log("GPS updated!");
            currentLocationHandler([{
                key: 0,
                lng: pos.coords.longitude,
                lat: pos.coords.latitude
            }]);
        };
        const gpsError = (err) => {
            currentLocationHandler([]);
            console.log("GPS ERROR!");
            console.log(err);
        };
        navigator.geolocation.watchPosition(gpsSucceed, gpsError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    };
    
    const getAddress = async (lng, lat) => {
        const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${MAPBOX_API}`;
        const address = await fetch(url)
            .then(res => res.json())
            .then(data => {
                return data.features[0].properties.name;
            })
            .catch(error => { 
                console.log(error);
                return "[UNSPECIFIED]";
            });
        return address;
    }

    const mainMapOnClick = async (event) => {
        const newPin = {
            key: 0,
            lng: event.lngLat.lng,
            lat: event.lngLat.lat,
        }
        newPin.address = await getAddress(event.lngLat.lng, event.lngLat.lat);
        highlightPinHandler([newPin]);
        modalMapCenterHandler({
            lng: event.lngLat.lng,
            lat: event.lngLat.lat,
        });
        popupHandler(true);
    };

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
                hooker(mainMapRef);
                watchLocation();
            }}
            onClick={mainMapOnClick}
        >
            {highlightPins.map((highlightPin) => 
                <Marker key={highlightPin.key} longitude={highlightPin.lng} latitude={highlightPin.lat} anchor="bottom" >
                    <AddLocationIcon fontSize='large' color='secondary'/>
                </Marker>
            )}
            {currentLocation.map((currPos) => 
                <Marker key={currPos.key} longitude={currPos.lng} latitude={currPos.lat} anchor="bottom" >
                    <GpsFixedIcon fontSize='small' color='primary'/>
                </Marker>
            )}
        </Map>
    );
}

export default MainMap;