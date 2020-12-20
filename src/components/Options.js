import React from 'react';

const Options = (props) => {
    return (  
        <option value={props.data}>{props.data}</option>
    );
}
 
export default Options;