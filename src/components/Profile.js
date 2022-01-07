import React from 'react'
import Note from './Note';
import ProfileHero from './ProfileHero';
import '../css/profile.css'

const Profile = () => {
    return (
        <div>
            <ProfileHero />
            <Note />
        </div>
    )
}

export default Profile
