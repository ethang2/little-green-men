import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return ( 
        <div className="nav">
            <ul className="main-nav">
                <NavLink className="main-navlink" to="/little-green-men/sightings"><li>Sightings</li></NavLink>
                <NavLink className="main-navlink" to="/little-green-men/heat-map"><li>Heat Map</li></NavLink>
                <NavLink className="main-navlink" to="/little-green-men/report"><li>Report a UFO</li></NavLink>
                <NavLink className="main-navlink" to="/little-green-men/about"><li>About</li></NavLink>
            </ul>
        </div>
    );
}
 
export default Nav;