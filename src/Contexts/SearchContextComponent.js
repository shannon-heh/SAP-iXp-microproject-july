import React,{useState,useEffect,createContext} from 'react';
import Axios from 'axios';
var SearchContext = createContext();

export function SearchContextComponent(props){
    const [userData,setUserData] = useState("");
    const [userEmails,setUserEmails] = useState([]);
    const [query,setQuery] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");

    function getEmails (q) {
        console.log(query);
       Axios.post("http://localhost:3000/findemails",{query:q},
       {
           headers: { 
               'content-type' : 'application/json' 
           }
       })
       .then(
           (res)=>{
               console.log(res.data)
               setUserEmails(res.data)
           }
       )
       .catch(err => console.log(err));
   }

   function getData () {
    return Axios.get("http://localhost:3000/user?email="+email)
        .then(res => {
            setUserData(res.data);
            setUsername(res.data.name);
        })
        .catch(err => console.log(err));
}

function searchQuery(e){
    setQuery(e.target.value);
    getData(e.target.value)  
}

useEffect(()=>{
        getEmails(query);
},[query])


function setterEmail(e){
    console.log(e.target.textContent);
    setEmail(e.target.textContent);
    setQuery("");
}

useEffect(()=>{
    getData()
},[email])


    return(
        <SearchContext.Provider value = {{username,userData,setUserData,userEmails,setUserEmails,query,setQuery,email,setEmail,getEmails,getData,searchQuery,setterEmail}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export {SearchContext};