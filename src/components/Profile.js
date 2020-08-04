import React,{useState, useEffect,useContext} from 'react';
import Axios from 'axios';
import {AuthContext} from '../Contexts/AuthContextComponent'
import trophy from '../../src/images/sap_trophy.png'


export default function Profile() {
    const [userData,setUserData] = useState();
    const [coffeeList,setCoffeeList] = useState([]);
    const context = useContext(AuthContext);
    context.checkLogin();

     function getData () {
        return Axios.get("http://localhost:3000/user?email="+localStorage.getItem("email"))
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => console.log(err));
    }

    function getCoffee(){
        Axios.get("http://localhost:3000/coffee?email="+localStorage.getItem("email"))
        .then((res)=>{
            setCoffeeList(res.data);
        })
        .catch(err=>console.log(err));
    }

    if (!userData && context.isLoggedIn){
        getData();
        getCoffee();

    }
    console.log(userData);
    
    return (
    <div className='profile'>
        {!context.isLoggedIn 
        ?  <div className="promsg"><p className="profile-msg">Please login to see your profile.</p></div> 
        :  <>
            <center><h2>Profile</h2></center>
            <div className='profile-wrapper'>
                <div>
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
                        <i className='fa fa-share share-icon'></i>
                    </div>
                </div>
                <div className="coffee-container">
                    <div class="coffeeList">
                        <div className="coffeeHeader">
                            <i className="fa fa-coffee coffee-request-text" aria-hidden="true"></i> Chat Requests
                        </div>
                        <div className="coffeeEmails">
                            {coffeeList.length === 0 
                            ? <div className='info-header no-coffee-msg'>No coffee chat requests yet... <br/><br/>Send out requests from the Main page to connect with other interns!</div> 
                            : null}
                            {coffeeList.map((email,i)=>(
                                <>
                                    <div className="coffeeItem">
                                        <div className="coffeeEmail">{email.charAt(0).toUpperCase()+email.split(".")[0].slice(1)+" "
                                                +email.split(".")[1].split("@")[0].charAt(0).toUpperCase()+email.split(".")[1].split("@")[0].slice(1)}</div>
                                        <span 
                                            title={"Email "+
                                                email.charAt(0).toUpperCase()+email.split(".")[0].slice(1)+" "
                                                +email.split(".")[1].split("@")[0].charAt(0).toUpperCase()+email.split(".")[1].split("@")[0].slice(1)
                                                +" to set up a time to meet!"
                                            }>
                                            <i className="fa fa-envelope-o mail-icon"></i>
                                        </span>
                                    </div>
                                    <hr className="separator"></hr>
                                </>
                            ))}
                        </div>  
                    </div>
                </div>
            </div>
            
        </>}   
    </div>); 
}