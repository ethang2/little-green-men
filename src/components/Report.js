import React, { Component } from 'react';

import Options from './Options';

class Report extends Component {
    state = {
        dateTime: '',
        datePosted: this.getDate(),
        city: '',
        state: '',
        shape: '',
        duration: '',
        summary: '',
        latitude: 47.7987072,
        longitude: -122.4981921
    }

    getDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        const data = this.state;
        fetch('https://ufo-sightings-api.herokuapp.com/api/ufosightings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .catch(error => console.log(error));
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

        return ( 
            <div className="report">

                <h2>Report form</h2>

                <form onSubmit={this.submitHandler} className="report-form">

                    <div>
                        <label>Event Date</label><br></br>
                        <input type="text" name="dateTime" value={dateTime} onChange={this.changeHandler} placeholder="YYYY-MM-DD HH:MM:SS"></input>
                    </div>

                    <div>
                        <label>City</label><br></br>
                        <input type="text" name="city" value={city} onChange={this.changeHandler} placeholder="City nearest to the sighting..."></input>
                    </div>

                    <div>
                        <label>State</label><br></br>
                        <select value={state} name="state" onChange={this.changeHandler}>
                            <option defaultValue >Select a state</option>
                            {states}
                        </select>
                    </div>

                    <div>
                        <label>Shape</label><br></br>
                        <select value={shape} name="shape" onChange={this.changeHandler}>
                            <option defaultValue >Select a shape</option>
                            {shapes}
                        </select>
                    </div>

                    <div>
                        <label>Duration</label><br></br>
                        <input type="text" name="duration" value={duration} onChange={this.changeHandler} placeholder="e.g. '5 minutes' or 'No more than 30 seconds'"></input>
                    </div>

                    <div>
                        <label>Summary</label><br></br>
                        <textarea type="text" name="summary" value={summary} onChange={this.changeHandler} maxLength={1234} rows={8} cols={50} placeholder="Provide a brief account of the sighting..."></textarea>
                    </div>

                    <button type="submit">Submit Report</button>

                </form>
            </div>
        );
    }
}
 
export default Report;