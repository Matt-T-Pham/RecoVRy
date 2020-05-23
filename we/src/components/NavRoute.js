import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import '../css/Page.scss';
import Navbar from '../components/Navbar';
import { useStateValue } from '../state';

const NavRoute = ({exact, path, component: Component, innerProps}) => {

    const [{authenticated},] = useStateValue();

    if(authenticated) {
        return (
            <Route exact={exact} path={path} render={(props) => (
                <div className="Page">
                    <Navbar />
                    <div className="Page__body">
                        <Component {...props} {...innerProps}/>
                    </div>
                </div>
            )}/> 
        );
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export default NavRoute;