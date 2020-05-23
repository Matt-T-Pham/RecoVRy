import React from 'react';
import '../css/Navbar.scss';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state';
import Logo from '../images/logo.png';

function maybeActiveLink(path) {
    if(window.location.pathname === path)
        return "Navbar--active"
}

const Navbar = () => {

    const [{ accessLevel }, dispatch] = useStateValue();

    const deauthenticate = () => {
        dispatch({
            type: 'logoutUser'
        })
    }

    return(
        <div className="Navbar">
            <div className="Navbar--logo">
                <Link to="/"><img src={Logo} alt="RecoVRy" height={75}/></Link>
            </div>
            <Link to="/" className={maybeActiveLink("/")}>Dashboard</Link>
            {accessLevel === 'patient' ? 
                <>
                <Link to="/ranking" className={maybeActiveLink("/ranking")}>Ranking</Link>
                <Link to="/workouts" className={maybeActiveLink("/workouts")}>All Workouts</Link>
                </> :
                <Link to="/patients" className={maybeActiveLink("/patients")}>Patients</Link>}
            <Link to="/progress" className={maybeActiveLink("/progress")}>Progress</Link>
            <Link to="/account" className={maybeActiveLink("/account")}>Account</Link>
            <Link to="/login" onClick={deauthenticate} className="Navbar--logout">Logout</Link>
        </div>
    )
}

export default Navbar;