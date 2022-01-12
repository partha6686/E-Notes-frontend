import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertMiddleware } from '../../state/index';

const Login = () => {
    const host = 'http://localhost:3300';
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    let history = useHistory();
    const dispatch = useDispatch();
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            }) 
        });
        // eslint-disable-next-line
        const json = await response.json();
        console.log(json);
        if(response.status === 200){
            localStorage.setItem('token', json.authToken);
            //Redirect
            history.push('/');
            showAlert("Logged in Successfully","success");
        }else{
            showAlert(json.errors.msg?json.errors.msg:json.errors,"danger");
            // alert(json.errors);
        }
    }
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    }

    return (
        <div className="container col-md-6 my-3">
            <h2 className="text-center my-3">Login</h2>
            <form className="mt-3" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
