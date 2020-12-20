import React, {Component} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Recent from './Recent';
import Dates from './Dates';
import ShapesAndStates from './ShapesAndStates';
import Sighting from './Sighting';

class Sightings extends Component {
    render() {
        return (
            <div className="sightings-grid">
    
                <div className="sightings-div">
                    <ul className="sightings-nav">
                        <NavLink className="sightings-navlink"  to='/little-green-men/sightings/event-dates'><li>Event Date</li></NavLink>
                        <NavLink className="sightings-navlink" to='/little-green-men/sightings/shapes'><li>Shape of UFO</li></NavLink>
                        <NavLink className="sightings-navlink" to='/little-green-men/sightings/states'><li>State</li></NavLink>
                        <NavLink className="sightings-navlink" to='/little-green-men/sightings/dates-posted'><li>Date Posted</li></NavLink>
                    </ul>
    
                    <Route exact path="/little-green-men/sightings" render={() => <Redirect to="/little-green-men/sightings/recent" /> } />

                    <Route exact path="/little-green-men/sightings/recent" render={() => <Recent data={this.props.recent} />} />

                    <Route path="/little-green-men/sightings/sighting/:id" render={(props) => <Sighting {...props} />} />
    
                    <Route exact path='/little-green-men/sightings/event-dates' render={() => <Dates data={this.props.eventDates} type={'event-dates'} apiValue={'dateTime'}/>}/>
    
                    <Route exact path='/little-green-men/sightings/shapes' render={() => <ShapesAndStates data={this.props.shapes} type={'shapes'} value={'shape'} />} />
    
                    <Route exact path='/little-green-men/sightings/states' render={() => <ShapesAndStates data={this.props.states} type={'states'} value={'state'} />} />
    
                    <Route exact path='/little-green-men/sightings/dates-posted' render={() => <Dates data={this.props.datesPosted} type={'dates-posted'} apiValue={'datePosted'}/>} />
                </div>           
    
            </div>
        );
    }
    
}

export default Sightings;