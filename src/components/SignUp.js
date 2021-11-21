import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const SignUp = (props) => {
    const host = 'http://localhost:3300';
    const [createUser, setCreateUser] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });
    let history = useHistory();
    const handleChange = (e)=>{
        setCreateUser({...createUser, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/register`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: createUser.name,
                email: createUser.email,
                password: createUser.password
            }) 
        });
        // eslint-disable-next-line
        const json = await response.json();
        console.log(json);
        if(response.status === 200){
            localStorage.setItem('token', json.authToken);
            //Redirect
            history.push('/');
            props.showAlert("Sign up Successful","success");
        }else{
            props.showAlert(json.errors,"danger");
        }
    }
    return (
        <div className="container col-md-6 my-3">
            <h2 class="text-center my-3">SignUp</h2>
           <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={handleChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={handleChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> 
        </div>
    )
}

export default SignUp
