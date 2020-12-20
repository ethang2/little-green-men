import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

// App Components
import Header from './components/Header';
import Home from './components/Home';
import Sightings from './components/Sightings';
import Report from './components/Report';
import HeatMap from './components/HeatMap';
import About from './components/About';
import Footer from './components/Footer';

class App extends React.Component {

  state = {
    eventDates: [],
    shapes: [],
    states: [],
    datesPosted: [],
    recent: [],
    latlong: [],
    atHome: true
  };

  componentDidMount() {

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/event-dates')
    .then(res => res.json())
    .then(data => this.setState({eventDates: data[0]}))
    .catch(error => console.log(error));

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/shapes')
    .then(res => res.json())
    .then(data => this.setState({shapes: data[0]}))
    .catch(error => console.log(error));

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/states')
    .then(res => res.json())
    .then(data => this.setState({states: data[0]}))
    .catch(error => console.log(error));

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/dates-posted')
    .then(res => res.json())
    .then(data => this.setState({datesPosted: data[0]}))
    .catch(error => console.log(error));

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/recent')
    .then(res => res.json())
    .then(data => this.setState({recent: data}))
    .catch(error => console.log(error));

    fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings/latlong')
    .then(res => res.json())
    .then(data => this.setState({latlong: data[0]}))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          
          <Header atHome={this.state.atHome} />
  
          <Route exact path="/little-green-men/" component={Home} />

          <Switch>
            <Route path="/little-green-men/sightings" component={() => 
              <Sightings  
                eventDates={this.state.eventDates} 
                shapes={this.state.shapes}
                states={this.state.states}
                datesPosted={this.state.datesPosted} 
                recent={this.state.recent}
              />} 
            />

            <Route path="/little-green-men/report" component={() => <Report states={this.state.states} shapes={this.state.shapes}/>} />

            <Route path="/little-green-men/heat-map" render={() => <HeatMap latlong={this.state.latlong} />} />

            <Route path="/little-green-men/about" render={() => <About/>} />
          </Switch>

          <Footer />
  
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
