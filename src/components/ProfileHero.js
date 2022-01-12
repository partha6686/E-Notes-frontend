import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userMiddleware, alertMiddleware } from '../state/index';
import EditProfilePic from './EditProfilePic';

const ProfileHero = () => {
    const host = 'http://localhost:3300/';
    const dispatch = useDispatch()
    const {fetchUser} = bindActionCreators(userMiddleware,dispatch)
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
    const [show, setShow] = useState(false);

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
    }, [user])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <EditProfilePic show={show} handleClose={handleClose}/>
            <div className='profile-hero'>
                <div className='profile-img'>
                    <img src={`${host}${user.profileImg}`} alt='profile'/>
                </div>
                <div className='profile-info'>
                    <h1>{user.name}</h1>
                    <button className='button-outline' onClick={handleShow}>Update Profile Picture</button>
                    <div>
                        <span><b>0 </b> BLOGS</span>
                        <span><b>0 </b> FOLLOWERS</span>
                        <span><b>0 </b> FOLLOWING</span>
                    </div>
                    <p>{user.bio}</p>
                </div>
            </div>
        </>
    )
}

export default ProfileHero
