import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userMiddleware, alertMiddleware } from '../state/index';

const ProfileHero = () => {
    const host = 'http://localhost:3300/';
    const dispatch = useDispatch()
    const {fetchUser} = bindActionCreators(userMiddleware,dispatch)
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)

    let history = useHistory()

    const user = useSelector(state=>state.user)

    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchUser();
        }else{
            showAlert("Please Login to Continue","warning");
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])
    // console.log(user);
    return (
        <div className='profile-hero'>
            <div className='profile-img'>
                <img src={`${host}${user.profileImg}`} alt='profile'/>
            </div>
            <div className='profile-info'>
                <button className='btn btn-primary'>Edit Profile</button>
                <h1>{user.name}</h1>
                <p>{user.bio}</p>
            </div>
        </div>
    )
}

export default ProfileHero
