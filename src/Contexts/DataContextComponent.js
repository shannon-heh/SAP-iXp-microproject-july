import React, {useState,createContext} from 'react';
import Axios from 'axios';
const DataContext = createContext(null);

export function DataContextComponent(props){

    const [data, setData] = useState();
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
  
    function getData (loc) {
      if(loc=="All"){
        Axios.get("http://localhost:3000/user")
        .then((res) => {
            setData(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
      } 
      else{
        Axios.get("http://localhost:3000/user?location="+loc)
        .then((res) => {
            setData(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
      }
  
      }
      
  
    return (
      <DataContext.Provider value = {{"data":data,"setData":setData,"getData":getData,"getLocations":getLocations,"loc":loc,"setLoc":setLoc,"locations":locations,"setLocations":setLocations}}>
          {props.children}
      </DataContext.Provider>
    )
  
  };

  export {DataContext};
  