import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from '../Contexts/AuthContextComponent';
import { SearchContext } from '../Contexts/SearchContextComponent';
import Axios from 'axios';
import trophy from '../../src/images/sap_trophy.png';

export default function CoffeChat() {
    var searchContext = useContext(SearchContext);
    const {username,userData,setUserData,userEmails,setUserEmails,query,setQuery,email,setEmail,getEmails,getData,searchQuery,setterEmail} = searchContext;
    const context = useContext(AuthContext);
    context.checkLogin();
    const [sentRequest, setSentRequest] = useState(false);

    function submitCoffee(){
        Axios.post("http://localhost:3000/coffee",{"requestEmail":localStorage.getItem("email"),"targetEmail":email},
        {
            headers:{
                'content-type' : 'application/json' 
            }
        })
        .then(
            (msg)=>{
                console.log(msg);
                setSentRequest(true);
            }
            
        )
        .catch((error)=>{
            console.log(error);
        })
    }



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
        { !email && query.length<1
            ? <div className="coffee-chat-blurb">
                Get to know other SAP iXP interns through one-on-one coffee chats! 
              </div>
            : null
        }
    {!context.isLoggedIn
    ?  <div className="promsg"><p className="profile-msg">Please login to search other's profile.</p></div> 
    : 
    email?
        <div className="coffee-profile">
            <div className="coffee-container">
                <div className="bookCoffee">
                    {sentRequest 
                        ? <div className="request-feedback">Your coffee chat request has been sent to {username}!</div>
                        : <button type="button" onClick={submitCoffee} className="coffee-button">Book a <i class="fa fa-coffee" aria-hidden="true"></i> Chat with {username} </button>
                    }
                </div>
            </div>
            <div className="coffee-container">
            <div className='searched-profile-wrapper'>
                <center><h2>Profile</h2></center>
                <div className='info-block'>
                        {userData
                            ?   ( <> 
                                    <div className='info-group'>
                                        <div className='info-header'>Name</div>
                                        <div className='info'>{userData.name}</div>
                                    </div>
                                {Object.entries(userData).map(info => (
                                info[0] !== 'password' 
                                ? <div className='info-group' key={info}>
                                    {info[0] !== 'name' 
                                      ? <><div className='info-header'>{info[0] === 'inumber' ? 'iNumber' : info[0].charAt(0).toUpperCase() + info[0].slice(1)}</div>
                                        <div className='info'>{info[1]}</div></>
                                      : null}   
                                </div> 
                                : null
                            ))} </>)
                            : null
                        }
                    </div>
                <br/>
                <div className='info-block'> 
                    <div className='block-header'>
                        <strong>Badges</strong>
                    </div>
                    <div className='info-header'>
                        <img src={trophy} width='120px'/>
                    </div>

                </div>
            </div>
        </div>
    </div>
    :null}   
    </div>)

     
    
}