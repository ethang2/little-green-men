import React from 'react';
import {Route, Link} from 'react-router-dom';

import Nav from './Nav';

import AlienImg from './../svg/alien.svg';
import AlienHoverImg from './../svg/alien-hover.svg';

const Header = props => {
    return (
        <header>
          <Link to="/little-green-men">
            <img className="logo logo1" src={AlienImg} alt="alien logo" />
            <img className="logo logo2" src={AlienHoverImg} alt="alien logo" />
          </Link>

          <Route exact path="/little-green-men" render={() => {
              return (
                <div className="title">
                  <h1>Little Green Men</h1>
                  <p>“Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.”</p>
                  <p>― Arthur C. Clarke</p>
                </div>
              );
            }
          } />

          <Route path="/little-green-men/:something" render={() => {
              return (
                <Nav />
              )
            }}
          />
          
          
        </header>
    );
}

export default Header;