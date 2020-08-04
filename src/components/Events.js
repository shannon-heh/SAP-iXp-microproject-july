import React,{useState, useEffect,useContext} from 'react';

const events = [
    {
        name: 'MOVE with Silicon Valley: Zumba',
        category: 'Social',
        date: 'July 24, 2020',
        time: '9:00 AM - 9:30 AM PDT',
        where: 'https://sap-se.zoom.com/j/93320376049',
        rsvped: 13,
        rsvp: true
    },
    {
        name: 'U.S. Manager/Mentor Office Hours',
        category: 'Other',
        date: 'July 24, 2020',
        time: '10:00 AM - 11:00 AM PDT',
        where: 'Register for Zoom link',
        rsvped: 23,
        rsvp: false
    },
    {
        name: 'U.S. Keynote - Brent LaBathe, Head of US SMB Sales',
        category: 'Webinar',
        date: 'July 27, 2020',
        time: '9:00 AM - 10:00 AM PDT',
        where: 'https://sap-se.zoom.com/j/94352202024',
        rsvped: 85,
        rsvp: false
    },
    {
        name: 'U.S. Power Hour - Telling Stories with Impact & Conviction',
        category: 'Webinar',
        date: 'July 28, 2020',
        time: '8:00 AM - 9:00 AM PDT',
        where: 'https://sap-se.zoom.com/j/96800597696',
        rsvped: 63,
        rsvp: false
    }

]

export default function Events() {
    return (
        <div className='events'>
            <h2>Upcoming Events</h2>
            {events.map(event => (
                <div className='event'> 
                    <div>
                        <div className='event-header'><strong>{event.name}</strong></div>
                        <div className='info-group'>
                            <div className='info-header'>Date</div>
                            <div className='when'>{event.date}</div>
                        </div>
                        <div className='info-group'>
                            <div className='info-header'>Time</div>
                            <div className='when'>{event.time}</div>
                        </div>
                        <div className='info-group'>
                            <div className='info-header'>Location</div>
                            {event.where}
                        </div>
                    </div>
                    <div className='left-eventinfo'>
                        <div className='info-header'>{event.rsvped} interns registered</div>
                        <button>View Details</button>
                        <button>Register</button>
                    </div>
                </div>
            ))}
        </div>
        
    );


}