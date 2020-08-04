import React,{useContext}from 'react';
import {AuthContext} from '../Contexts/AuthContextComponent';
import { NavLink,useHistory } from 'react-router-dom';
import Popup from "reactjs-popup";
const Navigation = () => {
   const context = useContext(AuthContext);
   const history = useHistory();
   
   var logout = ()=>{
      localStorage.clear();
      context.setLogin(false);
      history.push("/")
   }

    return (
       <div>
          <nav className='navbar'>
             <ul className='navbar-nav'>
               <li><NavLink exact className='nav-item' activeClassName="active" to="/">Home</NavLink></li>
               <li><NavLink className='nav-item' activeClassName="active" to="/main">Main</NavLink></li>
               <li><NavLink className='nav-item' activeClassName="active" to="/interninfo">Intern Info</NavLink></li>
               <li><NavLink className='nav-item' activeClassName="active" to="/feed">Feed</NavLink></li>
               {
                  context.isAdmin && context.isLoggedIn?
                  null
                  :
                  <li><NavLink className='nav-item' activeClassName="active" to="/profile">Profile</NavLink></li>
               }

               {
                  context.isLoggedIn?<li><NavLink className='nav-item' activeClassName="active" to="/redeem">Redeem</NavLink></li>:null
               }
               
               {context.isLoggedIn && context.isAdmin
               ?
               <li className='nav-item'><NavLink className='nav-item' activeClassName="active" to="/admin">Admin</NavLink></li>
                  :
               null
               }
               {context.isLoggedIn 
               ?
               <li className='login-link'>
                  <Popup modal= {true} onClose= {logout} trigger={<button className ='nav-button' >Logout</button>} position="bottom center">
                     <div className="Modal">You have been Logged Out !</div>
                  </Popup>
                  
                  </li>
                  :
               <li className='login-link'><NavLink className='nav-item' activeClassName="active" to="/login">Login</NavLink></li>
               }
            </ul>
          </nav>
       </div>
    );
}
 
export default Navigation;