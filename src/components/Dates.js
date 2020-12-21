import React , {useState, useEffect} from 'react';

import SightingPreview from './SightingPreview';
import Options from './Options';

const Dates = props => {

    let [year, setYear] = useState('');
    let [month, setMonth] = useState('');
    const [sightings, setSightings] = useState([]);
    const [query, setQuery] = useState(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/?type=${props.apiValue}&order=DESC`);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(query)
            .then(res => res.json())
            .then(data => setSightings(data))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
        
    }, [query, sightings, page]);

    const onClickHandler = () => {
        setPage(1);
        setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/${props.type}/?year=${year}&month=${month}&page=${page}`);
    }

    const changeHandlerMonth = e => {
        setMonth(month = e.target.value);
    }

    const changeHandlerYear = e => {
        setYear(year = e.target.value);
    }

    const nextPageHandler = () => {
        setPage(page + 1);
        if (year === '' && month === '') {
            setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/?type=${props.apiValue}&order=DESC&page=${page + 1}`);
        } else {
            setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/${props.type}/?year=${year}&month=${month}&page=${page + 1}`);
        }
        setIsLoading(true);
    }

    const prevPageHandler = () => {
        if (page > 1) {
            setPage(page - 1);
            if (year === '' && month === '') {
                setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/?type=${props.apiValue}&order=DESC&page=${page - 1}`);
            } else {
                setQuery(`https://ufo-sightings-api.herokuapp.com/api/ufosightings/${props.type}/?year=${year}&month=${month}&page=${page - 1}`);
            }
            setIsLoading(true);
        }
    }

    const data = props.data;
    let years = data.map(date => 
        <Options data={date.year} key={data.indexOf(date)} />
    );

    let sightingsList = sightings.map(sighting =>
        <SightingPreview data={sighting} key={sighting.id} />
    );

    return ( 
        <div className="data-list">
            <h2>Showing sightings by {props.type}</h2>

            <div className="select-group">
                <select className="sightings-select" value={month} onChange={changeHandlerMonth}>
                    <option defaultValue>Select month</option>
                    <option value={'01'}>01</option>
                    <option value={'02'}>02</option>
                    <option value={'03'}>03</option>
                    <option value={'04'}>04</option>
                    <option value={'05'}>05</option>
                    <option value={'06'}>06</option>
                    <option value={'07'}>07</option>
                    <option value={'08'}>08</option>
                    <option value={'09'}>09</option>
                    <option value={'10'}>10</option>
                    <option value={'11'}>11</option>
                    <option value={'12'}>12</option>
                </select>
                <select className="sightings-select" value={year} onChange={changeHandlerYear}>
                    <option defaultValue>Select year</option>
                    {years}
                </select>

                <button className="sightings-submit" onClick={onClickHandler}>Search</button>
            </div>

            <div className="page-btn-group">
                {
                    (page < 2)
                    ? <div></div>
                    : <button className="page-btn page-prev-btn" onClick={prevPageHandler}>Previous</button>
                }

                <p>Page {page}</p>
                
                <button className="page-btn page-next-btn" onClick={nextPageHandler}>Next</button>
            </div>
            

            <div className="sightings-list">
                {
                    isLoading
                    ? <p>Loading...</p>
                    : sightingsList
                }
            </div>

            <div className="page-btn-group">
                {
                    (page < 2)
                    ? <div></div>
                    : <button className="page-btn page-prev-btn" onClick={prevPageHandler}>Previous</button>
                }

                <p>Page {page}</p>
                
                <button className="page-btn page-next-btn" onClick={nextPageHandler}>Next</button>
            </div>
            

        </div>
    );
}
 
export default Dates;