import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from '../Contexts/AuthContextComponent';
import Axios from 'axios';
import { SearchContext } from '../Contexts/SearchContextComponent';

export default function SearchProfile() {
    var searchContext = useContext(SearchContext);
    const {userData,setUserData,userEmails,setUserEmails,query,setQuery,email,setEmail,getEmails,getData,searchQuery,setterEmail} = searchContext;
    const context = useContext(AuthContext);
    context.checkLogin();

    
    return (
    <div className='container'>
        <div className="profileSearch">
        <input type = "text" placeholder = "Search user by email" value = {query} onChange ={searchQuery} />
            <div className="resultList" >
                {userEmails != undefined && query.length>1
                ?
                    userEmails.map((em)=>{
                        return <div className="searchItem" onClick ={(e)=>setterEmail(e)} >
                            {em}
                        </div>
                    })
                :
                null
            }
            </div>
        </div>
    {!context.isLoggedIn
    ?  <div className="promsg"><p className="profile-msg">Please login to search other's profile.</p></div> 
    : 
    email?
    <div className='searched-profile-wrapper'>
        <center><h2>Profile</h2></center>
        <div className='info-block'>
            {userData
                ?  Object.entries(userData).map(info => (
                    info[0] !== 'password' 
                    ? <div className='info-group' key={info}>
                        <div className='info-header'>{info[0] === 'inumber' ? 'iNumber' : info[0].charAt(0).toUpperCase() + info[0].slice(1)}</div>
                        <div className='info'>{info[1]}</div>
                    </div> 
                    : null
                ))
                : null
            }
        </div>
        <br/>
        <div className='info-block'> 
            <div className='block-header'>
                <strong>Badges</strong>
            </div>
            <div className='info-header'>
                You have 0 badges. Earn badges by accumulating points!
            </div>

        </div>
        
       
    </div>
    :null}   
    </div>)

     
    
}