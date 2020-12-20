import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    HeatmapLayer,
    Marker,
} from '@react-google-maps/api';

import mapStyles from './mapStyles';
import HomeBase from './../svg/observatory.svg';

const mapContainerStyle = {
    width: '100%',
    height: '300px'
}

const center = {
    lat: 39.8283,
    lng: -98.5795
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const libraries = ["visualization"];

export default function HeatMap(props) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading map";

    const data = props.latlong;
    let points = data.map(coords => 
        new window.google.maps.LatLng(coords.latitude, coords.longitude)    
    );

    return(
        <div className="map-grid">
            <h2>Heat Map</h2>
            <p>This map shows heat signatures based on the density of sightings within a given area. Faint green being the lowest density and red being the highest. Based on the data we have collected, it is determined that Los Angeles, California is the best location for setting up a home-base observatory (icon on the map).</p>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={center}
                options={options}
            >

                <Marker position={{lat: 34.0522, lng: -118.2437}} icon={{url: HomeBase, scaledSize: new window.google.maps.Size(30, 30)}} />

                <HeatmapLayer data={points} options={{radius: 12}}/>
                
            </GoogleMap>
        </div>
    );
}