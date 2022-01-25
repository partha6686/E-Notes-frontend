import React from 'react'
import Note from '../blog/Note';
import ProfileHero from './ProfileHero';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
    return (
        <div>
            <ProfileHero />
            <div className='profile'>
                <ProfileInfo />
                <div className='profile-notes'>
                    <Note />
                </div>
            </div>
        </div>
    )
}

export default Profile
