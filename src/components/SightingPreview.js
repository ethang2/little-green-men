import React from 'react';
import {Link} from 'react-router-dom';

const SightingPreview = props => {
    const sighting = props.data;
    return (
        <Link className="sighting-preview" to={`/little-green-men/sightings/sighting/${sighting.id}`}>
            <h3>{`${sighting.shape.charAt(0).toUpperCase() + sighting.shape.slice(1)} in ${sighting.city}, ${sighting.state}`}</h3>
            <p>Event Date: {sighting.dateTime}</p>
            <p>Date Posted: {sighting.datePosted}</p>
            <p>Location: {sighting.city}, {sighting.state}</p>
            <p>Shape: {sighting.shape}</p>
        </Link>
    );
}

export default SightingPreview;