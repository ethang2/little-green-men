import React, {useState, useEffect} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from '@react-google-maps/api';

import AlienHead from './../svg/alien2.svg';
import mapStyles from './mapStyles';

const mapContainerStyle = {
    width: '100%',
    height: '300px'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false
}

const libraries = ["visualization"];

const Sighting = (props) => {

    const [sighting, setSighting] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/?sightingID=${props.match.params.id}`)
            .then(res => res.json())
            .then(data => setSighting(data[0]))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, [sighting]);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading map";

    return (  
        <div className='sighting'>

                {
                    isLoading
                    ? <p>Loading...</p>
                    : <div>
                        <GoogleMap 
                            mapContainerStyle={mapContainerStyle}
                            zoom={12}
                            center={{lat: sighting.latitude, lng: sighting.longitude}}
                            options={options}    
                        >

                            <Marker position={{lat: sighting.latitude, lng: sighting.longitude}} icon={{url: AlienHead, scaledSize: new window.google.maps.Size(40, 40)}} />
                            
                        </GoogleMap>

                        <div className="info">
                            <p><span>Event Date</span>: {sighting.dateTime}</p>
                            <p><span>Date Posted</span>: {sighting.datePosted}</p>
                            <p><span>Location</span>: {sighting.city}, {sighting.state}</p>
                            <p><span>Latitude</span>: {sighting.latitude}</p>
                            <p><span>Longitude</span>: {sighting.longitude}</p>
                            <p><span>Shape</span>: {sighting.shape}</p>
                            <p><span>Duration</span>: {sighting.duration}</p>
                            <p><span>Summary</span>: {sighting.summary}</p>
                        </div>
                    </div>
                }
            
            
            
        </div>
    );
}
 
export default Sighting;