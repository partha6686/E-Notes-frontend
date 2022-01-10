import React from 'react'
import Note from './Note';
import ProfileHero from './ProfileHero';
import '../css/profile.css'
import ProfileInfo from './ProfileInfo';

const Profile = () => {
    return (
        <div>
            <ProfileHero />
            <div className='profile'>
                <ProfileInfo />
                <Note />
            </div>
        </div>
    )
}

export default Profile
