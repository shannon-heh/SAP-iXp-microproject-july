import React,{useState,useEffect} from 'react';
import Axios from 'axios';

export default function Dropdown(props){
   
    function handleChange(event) {
        props.setLoc(event.target.value);
      }

    var locations = props.locations;

    return(
        
        <>
            <select name="locations" id="locations" onChange = {handleChange}>
                {locations.map((location)=>{
                    return <option value={location}>{location}</option>
                })}
            </select>
        </>
    );
}