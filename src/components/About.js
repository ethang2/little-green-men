import React from 'react';

import Phone from './../svg/phone.svg';
import Email from './../svg/message.svg';

const About = () => {
    return (
        <div className="about">
            <h2>About us</h2>
            <p><i>Little Green Men</i> is designed to allow you access to tens of thousands of UFO sightings as reported by fellow belivers. If you have seen a UFO yourself, visit the Report a UFO page to share your experience.</p>

            <div className="contact">
                <div className="phone">
                    <img className="contact-icon" src={Phone} />
                    <p>(XXX) XXX-XXXX</p>
                </div>

                <div className="email">
                    <img className="contact-icon" src={Email} />
                    <p>littlegreenmen@comcast.net</p>
                </div>
                
            </div>
            
        </div>
    );
}

export default About;
