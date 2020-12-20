import React, {useState, useEffect} from 'react';

import SightingPreview from './SightingPreview';
import Options from './Options';

const ShapesAndStates = props => {
    let [value, setValue] = useState();
    const [sightings, setSightings] = useState([]);
    const [query, setQuery] = useState(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/?type=${props.value}&order=ASC`);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(query)
            .then(res => res.json())
            .then(data => setSightings(data))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, [query, sightings]);

    const onClickHandler = () => {
        setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/${props.type}/?${props.value}=${value}`);
    }

    const changeHandler = e => {
        setValue(value = e.target.value);
    }

    const data = props.data;
    let options = data.map(option => 
        <Options data={option[props.value]} key={data.indexOf(option)} />
    );

    let sightingsList = sightings.map(sighting =>
        <SightingPreview data={sighting} key={sighting.id} />
    );

    return (  
        <div className="data-list">
            <h2>Showing sightings by {props.type}</h2>

            <div className="select-group">
                <select className="sightings-select" value={value} onChange={changeHandler}>
                    <option defaultValue>Select {props.type}</option>
                    {options}
                </select>

                <button className="sightings-submit" onClick={onClickHandler}>Search</button>
            </div>
            

            <div className="sightings-list">
                {
                    isLoading
                    ? <p>Loading...</p>
                    : sightingsList
                }
            </div>
        </div>
    );
}
 
export default ShapesAndStates;