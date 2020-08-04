import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { JsonToTable } from 'react-json-to-table';
import Dropdown from './components/Dropdown';

export default function Leaderboard(props) {

    var getData = props.getData;
    var setData = props.setData;
    var data = props.data
    var users = [];
    const [loc,setLoc] = useState("All");
    const [locations,setLocations] = useState([]);

    function getLocations () {
        Axios.get("http://localhost:3000/locations")
            .then((res) => {
                setLocations(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }

    if (!data) {    // if data is undefined
        getData(loc);
        getLocations();
    }
    else {
        for (let i=0; i<data.length; i++) {
            const displayed = (({ name, points }) => ({ name, points }))(data[i]);
            // console.log(displayed);
            users.push(displayed);
        }
        
        var table = <JsonToTable json={users} />
    }

    useEffect(()=>{
        getData(loc)
    },[loc])
    


    return (
        <div className="home">
            <h1>Leaderboard</h1>
            <Dropdown locations = {locations} setLoc = {setLoc} />
            <div>{table}</div>
        </div>
    );
}