//import React from 'react';
import React,{useState,useEffect, useContext} from 'react';
import { JsonToTable } from 'react-json-to-table';
import Dropdown from './Dropdown';
import {DataContext} from '../Contexts/DataContextComponent';

export default function Home() {
    return (
       <div>
          <Leaderboard />
       </div>
    );
}


function Leaderboard(props) {

    const dataContext = useContext(DataContext);
    var users = [];
    const clone = (obj) => Object.assign({}, obj);
    const renameKey = (object, key, newKey) => {

        const clonedObj = clone(object);
      
        const targetKey = clonedObj[key];
      
      
      
        delete clonedObj[key];
      
        clonedObj[newKey] = targetKey;
      
        return clonedObj;
      
      };

    if (!dataContext.data) {    // if data is undefined
        dataContext.getData(dataContext.loc);
        dataContext.getLocations();
    }
    else {
        for (let i=0; i<dataContext.data.length; i++) {
            let displayed = (({ Ranking, name, points }) => ({ Ranking, name, points }))(dataContext.data[i]);
            users.push(renameKey(renameKey(displayed,"name","Intern"),"points","Points"));
        }

    users.map((user, index) => {
        users[index].Ranking = index+1;        
    }
    )

    console.log(users);

        
        var table = <JsonToTable json={users} />
    }

    useEffect(()=>{
        dataContext.getData(dataContext.loc)
    },[dataContext.loc])
    


    return (
        <div id="home">
            <h2>Leaderboard</h2>
            <Dropdown locations = {dataContext.locations} setLoc = {dataContext.setLoc} />
            <div>{table}</div>
        </div>
    );
}
 
//export default Home;