import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertMiddleware } from '../state/index';

const Navbar = () => {
    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
    const handleLogout = () => {
        localStorage.removeItem('token');
        showAlert("Logged out Successfully","success");
        history.push("/login"); 
    }
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
                    {!localStorage.getItem('token') ?
                    <form>
                        <Link className="btn btn-outline-danger mx-2" to='/login' >Login</Link>
                        <Link className="btn btn-danger mx-2" to='/signup' >Signup</Link>
                    </form>:
                    <form>
                        <button onClick={handleLogout} className="btn btn-danger mx-2" >Logout</button>
                        <Link to="/profile" className="btn btn-danger mx-2">Profile</Link>
                    </form>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
