import React from 'react';

import SightingPreview from './SightingPreview';

const Recent = (props) => {
    const data = props.data
    let sightings = data.map(sighting =>
        <SightingPreview data={sighting} key={sighting.id}/>    
    )
    return ( 
        <div className="data-list">
            <h2>Showing recent sightings</h2>
            <div className="sightings-list">
                {sightings}
            </div>
        </div>
    );
}
 
export default Recent;