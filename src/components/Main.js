import React,{useEffect} from 'react';
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    NavLink} from 'react-router-dom';
import Events from './Events';
import CoffeChat from './CoffeeChat';

export default function Main(){
    var match = useRouteMatch();
    var history = useHistory();

    useEffect(()=>{
        history.push(`${match.url}/events`)
    },[]);

    return(
        <>
        <div className="miniNav">
        <NavLink to={`${match.url}/events`} activeClassName = "miniActive">Events</NavLink>
        <NavLink to={`${match.url}/coffee`} activeClassName="miniActive">Coffee Chat</NavLink>
        </div>

        <Switch>
          <Route path={`${match.url}/events`} component={Events} />
          <Route path={`${match.url}/coffee`} component={CoffeChat}  />
        </Switch>
        </>
    )
    
}