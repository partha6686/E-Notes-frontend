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
    return (
        <div className='profile-hero'>
            <div className='profile-img'>
                <img src={`${host}${user.profileImg}`} alt='profile'/>
            </div>
            <div className='profile-info'>
                <h1>{user.name}</h1>
                <button className='button-outline'>Edit Profile</button>
                <div>
                    <span><b>0 </b> BLOGS</span>
                    <span><b>0 </b> FOLLOWERS</span>
                    <span><b>0 </b> FOLLOWING</span>
                </div>
                <p>{user.bio}</p>
            </div>
        </div>
    )
}

export default ProfileHero
