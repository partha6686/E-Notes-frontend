import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={location.pathname==='/'?"nav-link active":"nav-link"} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={location.pathname==='/about'?"nav-link active":"nav-link"} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={location.pathname==='/add-note'?"nav-link active":"nav-link"} to="/add-note">Add Note</Link>
                        </li> 
                    </ul>
                    <Link className="btn btn-outline-danger mx-2" to='/login' >Login</Link>
                    <Link className="btn btn-danger mx-2" to='/signup' >Signup</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
