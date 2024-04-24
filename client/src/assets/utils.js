import MAPBOX_API from './credentials';

const getAddress = async (lng, lat) => {
    const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${MAPBOX_API}`;
    const address = await fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            return {
                name: data.features[0].properties.name,
                address: data.features[0].properties.full_address
            };
        })
        .catch(error => { 
            console.log(error);
            return {
                name: "[UNSPECIFIED]",
                address: "[UNSPECIFIED]"
            };
        });
    return address;
}

export { getAddress };