// import React from 'react';
// import { Container, Row, Col } from 'react-grid';

// export default function InternInfo() {
//     return (
        
//         <div className='intern-block'>
//             <h2>Welcome to the SAP Internship Experience Project!</h2>
         
          
  
//             <p>Over the course of your internship, you will have the opportunity to earn points. The points can be used to redeem gifts, badges, and other
//                 awards. 
//             </p>
        
//             <p1>You can achieve points for:</p1>
//             <ul>
//                 <li>Logging-in daily</li>
//                 <li>Attending events</li>
//                 <li>Completing trainings</li>
//                 <li>Engaging with other interns (e.g. coffee chats)</li>
//                 <li>Recognizing and being recognized by other interns</li>
//                 <li>For completing surverys or watching videos</li>
//             </ul>
    
//         </div>
//     ); 
// }

import React,{useState, useEffect,useContext} from 'react';
import Axios from 'axios';
import {AuthContext} from '../Contexts/AuthContextComponent'


export default function Profile() {
   

     
    
    return (<div className='interninfo'>
         <div className='points-block'> 
            <div className='block-header'>
                <strong>What Do Points Mean?</strong>
            </div>
            <div className='info-text'>
            Points are a way to keep track of how active you have been within the SAP iXp program!<br></br> <br></br>
            
                 For each event/action you participate in, you can achieve points.
                 The more points you get, the more rewards you get!
                 You can use the calendar to register for events.
                 You can use your profile to keep track of how many points you have and do things like invite other employees for chats or accept their invitations.
                 Additionally, your manager can give you points for performing well, which will give you badges that can also go towards rewards.<br></br><br></br>
                 We hope you enjoy your time as an SAP iXp intern!
             

            </div>

        </div>
  
        <br/>
        <div className='intern-block'> 
            <div className='block-header'>
                <strong>How To Get Points</strong>
            </div>
            <div className='earn-text'>
                <div className='info-text'>
                You can achieve points for: <br></br> <br></br>
                
                <ul className='earn-list'>
                    <li>Logging-in daily</li>
                    <li>Attending events</li>
                    <li>Completing trainings</li>
                    <li>Engaging with other interns (e.g. coffee chats)</li>
                    <li>Recognizing and being recognized by other interns</li>
                    <li>For completing surverys or watching videos</li>
                </ul>  
                    {/* Logging-in daily<br></br>
                    Attending events<br></br>
                    Completing trainings<br></br>
                    Engaging with other interns (e.g. coffee chats)<br></br>
                    Recognizing and being recognized by other interns<br></br>
                    For completing surverys or watching videos<br></br> */}
            </div>

            </div>
            
        </div>
        <div className="promsg"><p className="profile-msg">Redeem Points</p></div> 


     </div> )
    
}