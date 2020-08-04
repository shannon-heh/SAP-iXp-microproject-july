import React,{useState,useEffect,useContext} from 'react';
import {AuthContext} from '../Contexts/AuthContextComponent';
import Axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authContext = useContext(AuthContext);
    const [error,setError] = useState(false);

    authContext.checkLogin();
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }

    
  
    function handleSubmit(event) {
      event.preventDefault();
      if(!authContext.isAdmin){
                Axios.post("http://localhost:3000/login",
            {email:email,password:password},
            {
                headers: { 
                    'content-type' : 'application/json' 
                }
            }
            )
            .then((res)=>{
                console.log(res.data);
                localStorage.setItem("email",res.data.user);
                localStorage.setItem("sessionID",res.data.sessionId);
                setError(false);
                authContext.checkLogin();
                authContext.setAdmin(false);
            })
            .catch((error)=>{
                setError(true);
            })
      }
      else{
        Axios.post("http://localhost:3000/admin",
        {email:email,password:password},
        {
          headers: { 
              'content-type' : 'application/json' 
          }
      }
        )
        .then((res)=>{
            console.log(res.data);
            localStorage.setItem("email",res.data.user);
            localStorage.setItem("sessionID",res.data.sessionId);
            localStorage.setItem("isAdmin",true);
            setError(false);
            authContext.checkLogin();
            authContext.setAdmin(true);
        })
        .catch((error)=>{
            setError(true);
        })
  
      }
      
    }

    var errorHandler = ()=>{
        if(error){
            return <div className="login-error">Invalid Credentials</div>
        }
        else{
            return null
        }
    }

    useEffect(
        ()=>{
            authContext.checkLogin();
        },
        [authContext.isLoggedIn]
    )

    useEffect(
        ()=>{
            console.log(authContext.isAdmin)
        }
        ,[authContext.isAdmin]
    )
  
    return (
        <div className="formContainer">
            { authContext.isLoggedIn
            ?<div className="msg-success">Already Logged In </div>
            :
            <div  className="Login">
            <p> Login </p>
            <form onSubmit={handleSubmit}>
                <div controlId="email" bsSize="large">
                <input
                autoFocus
                type="email"
                value={email}
                placeholder="Enter your Email"
                onChange={e => setEmail(e.target.value)}
                />
                </div>
                <div controlId="password" bsSize="large">
                    <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    type="password"
                    />
                </div>
                <div controlId="admin" bsSize="large">
                <input type="checkbox" id="scales" name="scales" checked = {authContext.isAdmin} onChange = {()=>{
                    authContext.setAdmin(!authContext.isAdmin);
                }} />
                <label for="scales" style={{marginLeft:'10px'}}>Are you Admin ?</label>
                </div>
                
                <button block bsSize="large" disabled={!validateForm()} type="submit">
                Submit
                </button>
                {errorHandler()}
            </form>
            </div>
        
        }
            
        </div>
    );
  }

