import React from 'react';
import {Link} from 'react-router-dom';

// Assets
import TelescopeIcon from './../svg/telescope.svg';
import MapIcon from './../svg/location.svg';
import ReportIcon from './../svg/contact-form.svg';
import AboutIcon from './../svg/about.svg';

const Home = () => {
    return (

        <div className="grid-container">
          <div className="grid-item grid-item-1">
            <Link to="/little-green-men/sightings">
              <img className="grid-item-logo" src={TelescopeIcon} alt="telescope" />
              <h3>Sightings</h3>
              <p>Are you a believer? Explore a vast array of detailed accounts of UFO Sightings throughout the United States. The truth is out there...</p>
            </Link>
          </div>
          <div className="grid-item grid-item-2">
            <Link to="/little-green-men/heat-map">
              <img className="grid-item-logo" src={MapIcon} alt="telescope" />
              <h3>Heat Map</h3>
              <p>Get a more visual representation of where sightings have occured.</p>
            </Link>
          </div>
          <div className="grid-item grid-item-3">
            <Link to="/little-green-men/report">
              <img className="grid-item-logo" src={ReportIcon} alt="telescope" />
              <h3>Report a UFO</h3>
              <p>Seen something? Say something. Report your own sighting and tell your story.</p>
            </Link>
          </div>
          <div className="grid-item grid-item-4">
            <Link to="/little-green-men/about">
              <img className="grid-item-logo" src={AboutIcon} alt="telescope" /> 
              <h3>About</h3>
              <p>Find out about us and what we do here. Also included are our own speculations about why sightings occur based on the time and location.</p>
            </Link>
          </div>
        </div>

    );
}

export default Home;