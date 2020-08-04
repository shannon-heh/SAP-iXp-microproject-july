import React, { useEffect } from 'react';
import CSV from '../login/csv';
import SearchProfile from './SearchProfile';
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    NavLink} from 'react-router-dom';

export default function AdminDashboard(){
    var match = useRouteMatch();
    var history = useHistory();

    useEffect(()=>{
        history.push(`${match.url}/csv`)
    },[])
    
    console.log(match.url)
    return(
        <>
        <div className="miniNav">
        <NavLink to={`${match.url}/csv`} activeClassName = "miniActive">Upload Csv</NavLink>
        <NavLink to={`${match.url}/search`} activeClassName="miniActive">Search User</NavLink>
        </div>
        
        <Switch>
          <Route path={`${match.url}/csv`} component={CSV} />
          <Route path={`${match.url}/search`} component={SearchProfile}  />
        </Switch>
        
        </>
        
    )
}