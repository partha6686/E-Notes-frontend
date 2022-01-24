import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfilePic from "./EditProfilePic";
import { BsCameraFill } from "react-icons/bs";

const ProfileHero = () => {
  const host = "http://localhost:3300/";
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <EditProfilePic show={show} handleClose={handleClose} />
      <div className="profile-hero">
        <div className="profile-img">
          <div className="img-div">
            <img src={`${host}${user.profileImg}`} alt="profile" />
            <button className="circular-btn" onClick={handleShow}>
              <BsCameraFill size="28px" />
            </button>
          </div>
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          {/*<button className='button-outline' onClick={handleShow}>Update Profile Picture</button>*/}
          <div>
            <span>
              <b>0 </b> BLOGS
            </span>
            <span>
              <b>0 </b> FOLLOWERS
            </span>
            <span>
              <b>0 </b> FOLLOWING
            </span>
          </div>
          <p>{user.bio}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileHero;
