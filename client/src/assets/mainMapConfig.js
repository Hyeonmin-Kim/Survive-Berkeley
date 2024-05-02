import { LngLat, LngLatBounds } from "mapbox-gl";

const centerLng = -122.259094;
const centerLat = 37.871960;
const offsetLng = 0.03;
const offsetLat = 0.015;

const mainMapConfig = {
    id: "mainMap",
    width: "100%",
    height: "calc(100vh - 64px)",
    center: [centerLng, centerLat],
    zoom: 15,
    minZoom: 14,
    maxBounds: new LngLatBounds(
        new LngLat(centerLng - offsetLng, centerLat - offsetLat),
        new LngLat(centerLng + offsetLng, centerLat + offsetLat)
    )
}

export default mainMapConfig;