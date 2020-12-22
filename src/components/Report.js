import React, { Component } from 'react';

import Options from './Options';

const dateTimeRE = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;

function getDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const initialState = {
    dateTime: '',
    datePosted: getDate(),
    city: '',
    state: '',
    shape: '',
    duration: '',
    summary: '',
    latitude: 47.7987072,
    longitude: -122.4981921,
    dateTimeError: '',
    cityError: '',
    stateError: '',
    shapeError: '',
    durationError: '',
    summaryError: ''
}

class Report extends Component {
    state = initialState;

    validate = () => {
        let dateTimeError = '';
        let cityError = '';
        let stateError = '';
        let shapeError = '';
        let durationError = '';
        let summaryError = '';

        if (dateTimeRE.test(this.state.dateTime) === false) {
            dateTimeError = 'Must use YYYY-MM-DD HH:MM:SS format. If you don\'t know the exact time, type 00:00:00';
        }

        if (this.state.city === '') {
            cityError = 'Please provide a city';
        }

        if (this.state.state === '' || this.state.state === 'Select a state') {
            stateError = 'Please select a state';
        }

        if (this.state.shape === '' || this.state.shape === 'Select a shape') {
            shapeError = 'Please select a shape';
        }

        if (this.state.duration === '') {
            durationError = 'Duration cannot be blank';
        }

        if (this.state.summary === '') {
            summaryError = 'Summary cannot be blank';
        }

        if (dateTimeError || cityError || stateError || shapeError || durationError || summaryError) {
            this.setState({dateTimeError, cityError, stateError, shapeError, durationError, summaryError})
            return false;
        }

        return true;
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const data = this.state;
            fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .catch(error => console.log(error));
            this.setState(initialState);
        }
    }

    render() {
        const {dateTime, city, state, shape, duration, summary} = this.state;

        const stateData = this.props.states;
        let states = stateData.map(state => 
            <Options data={state.state} key={stateData.indexOf(state)}/>
        );

        const shapeData = this.props.shapes;
        let shapes = shapeData.map(shape =>
            <Options data={shape.shape} key={shapeData.indexOf(shape)} />
        );

        const errorStyles = {
            color: "red",
            backgroundColor: "transparent",
            fontSize: "12px",
            boxShadow: "none"
        }

        return ( 
            <div className="report">

                <h2>Report form</h2>

                <form onSubmit={this.submitHandler} className="report-form">

                    <div>
                        <label>Event Date</label><br></br>
                        <input type="text" name="dateTime" value={dateTime} onChange={this.changeHandler} placeholder="YYYY-MM-DD HH:MM:SS"></input>
                        {this.state.dateTimeError ? (
                            <div style={errorStyles}>{this.state.dateTimeError}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>City</label><br></br>
                        <input type="text" name="city" value={city} onChange={this.changeHandler} placeholder="City nearest to the sighting..."></input>
                        {this.state.cityError ? (
                            <div style={errorStyles}>{this.state.cityError}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>State</label><br></br>
                        <select value={state} name="state" onChange={this.changeHandler}>
                            <option defaultValue >Select a state</option>
                            {states}
                        </select>
                        {this.state.stateError ? (
                            <div style={errorStyles}>{this.state.stateError}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Shape</label><br></br>
                        <select value={shape} name="shape" onChange={this.changeHandler}>
                            <option defaultValue >Select a shape</option>
                            {shapes}
                        </select>
                        {this.state.shapeError ? (
                            <div style={errorStyles}>{this.state.shapeError}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Duration</label><br></br>
                        <input type="text" name="duration" value={duration} onChange={this.changeHandler} placeholder="e.g. '5 minutes' or 'No more than 30 seconds'"></input>
                        {this.state.durationError ? (
                            <div style={errorStyles}>{this.state.durationError}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Summary</label><br></br>
                        <textarea type="text" name="summary" value={summary} onChange={this.changeHandler} maxLength={1234} rows={8} cols={50} placeholder="Provide a brief account of the sighting..."></textarea>
                        {this.state.summaryError ? (
                            <div style={errorStyles}>{this.state.summaryError}</div>
                        ) : null}
                    </div>

                    <button type="submit">Submit Report</button>

                </form>
            </div>
        );
    }
}
 
export default Report;