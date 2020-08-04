import React,{useState} from 'react';
import Axios from 'axios';
// import { JsonToTable } from 'react-json-to-table';

export default function Leaderboard() {
    const [data,setData] = useState();

     function getData () {
        // asynchronous call to get user data from server
        // Axios.get returns a promise object
        // if promise is fulfilled, response object is returned and then() is run
        // if promise is reject, error is returned and catch() is run
        // .then() returns Promise object
        return Axios.get("http://localhost:3000/user")
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }

    if (!data){
        getData();
    }
    console.log(data);

    return <p>hi </p>;
}