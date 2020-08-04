import React,{useState, useContext} from 'react';
//import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import logo from './logo.svg';
import Home from './components/Home';
import './App.css';
import Login from './login/login'
import CSV from './login/csv'
import Leaderboard from './leaderboard';
import Axios from 'axios';
import Navigation from './components/Navigation';
import Profile from './components/Profile'
import Redeem from './components/Redeem'
import InternInfo from './components/InternInfo'
import {AuthContextComponent,AuthContext} from './Contexts/AuthContextComponent';
import {DataContextComponent, DataContext} from './Contexts/DataContextComponent';
import AdminDashboard from './admin/AdminDashboard';
import Events from './components/Events';
import Main from './components/Main'
import { SearchContextComponent } from './Contexts/SearchContextComponent';
import Feed from './components/SMFeed';
function Navigate() {
  const authContext = useContext(AuthContext);

  var handleLogin = ()=>{
    if(authContext.isLoggedIn){
      if(authContext.isAdmin){
        return <Route exact path="/login">
              <Redirect to="/admin"/> 
          </Route>
      }
      else{
        return <Route exact path="/login">
                  <Redirect to="/profile"/> 
            </Route>
      }
    }
    else{
          return <Route exact path="/login" component={Login}/>
    }
  }

  return (  
    
     <BrowserRouter>
      <div>
        <Navigation />
          <Switch>
           <Route path="/" component={Home} exact/>
           {
            authContext.isLoggedIn ?
            <Route path ="/redeem" component = {Redeem} />
            :
            <Route  path="/redeem">
                  <Redirect to="/login"/> 
            </Route>
            }
           {
             handleLogin()
           }
           
           <Route path ="/main" component = {Main} />
           <Route path ="/interninfo" component = {InternInfo} />
           <Route path ="/feed" component = {Feed} /> 
           {
             (authContext.isLoggedIn && authContext.isAdmin)?
             <Route path = '/admin' component = {AdminDashboard} />
             :
             <>
             <Route exact path="/admin">
                  <Redirect to="/login"/> 
            </Route>

            <Route path ="/interninfo" component = {InternInfo} exact/>

            {
              authContext.isLoggedIn?
              
            <Route path ="/redeem" component = {Redeem} exact/>
            :
            null
            }
            <Route path="/profile" component = {Profile} />
            </>
           }
           
          </Switch>   
      </div>
     </BrowserRouter> 
    
    
  );
}



function App() {
  
  return (
    <>
    <SearchContextComponent>
    <DataContextComponent>
      <AuthContextComponent>
        <Navigate/>
      </AuthContextComponent>
    </DataContextComponent>
    </SearchContextComponent>
    
    </>
  );
}

export default App;
