import React,{useState,createContext, useEffect} from 'react';

var AuthContext = createContext(false);

export function AuthContextComponent(props){

    const [isLoggedIn,setLogin] = useState(false);
    const [isAdmin,setAdmin] = useState(false);

    function checkLogin(){
        if(localStorage.getItem("email") && localStorage.getItem('sessionID')){
            setLogin(true);
            if(localStorage.getItem("isAdmin")){
                setAdmin(true);
            }
        }
        else{
            setLogin(false)
        }
    }

    // 

    useEffect(()=>{
        checkLogin();
    },[isLoggedIn])
    
    return(
        <AuthContext.Provider value = {{"isLoggedIn": isLoggedIn,"setLogin":setLogin,"checkLogin":checkLogin,"isAdmin":isAdmin,"setAdmin":setAdmin}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext};