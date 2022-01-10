import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { GoHome } from 'react-icons/go';
import {HiOutlineMail} from 'react-icons/hi';
import {RiCake2Line} from 'react-icons/ri';
import {RiGenderlessLine} from 'react-icons/ri';
import EditProfileDetails from './EditProfileDetails';

const ProfileInfo = () => {
    const user = useSelector(state=>state.user)
    const [show, setShow] = useState(false);
    const [euser, setEuser] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEuser({
            bio: user.bio,
            city: user.city,
            dob: user.dob,
            gender: user.gender
        })
        setShow(true); 
    }
    return (
        <>
            <EditProfileDetails show={show} handleClose={handleClose} user={euser} setUser={setEuser} />
            <div className='profile-sidebar'>
                <p><GoHome size={'22px'} style={{marginRight: '1rem'}}/>Lives in <b>{user.city}</b></p>
                <p><HiOutlineMail size={'22px'} style={{marginRight: '1rem'}} /><b>{user.email}</b></p>
                <p><RiCake2Line size={'22px'} style={{marginRight: '1rem'}} /><b>{user.dob}</b></p>
                <p><RiGenderlessLine size={'22px'} style={{marginRight: '1rem'}} />Gender: {user.gender}</p>
                <button className='button-outline' onClick={handleShow}>Edit Details</button>
            </div>
        </>
    )
}

export default ProfileInfo
