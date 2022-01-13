import React from "react";
import "../../css/auth.css";
import UnderLine from "../common/UnderLine";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const AuthR = () => {
  return (
    <div className="auth">
      <h2>Sign up</h2>
      <UnderLine />
      <form autocomplete="off">
        <div className="input-div">
          <FaRegUser size="20px" className="icon" />
          <input type="text" name="name" placeholder="Enter you name" />
          <br />
        </div>
        <div className="input-div">
          <HiOutlineMail size="22px" className="icon" />
          <input type="email" name="email" placeholder="Enter Email" />
          <br />
        </div>
        <div className="input-div">
          <RiLockPasswordLine size="22px" className="icon" />
          <input type="password" name="password" placeholder="Enter Password" />
          <AiOutlineEye size="22px" className="pass-icon" />
          <br />
        </div>
        <div className="input-div">
          <RiLockPasswordLine size="22px" className="icon" />
          <input type="password" name="cpassword" placeholder="Confirm Password" />
          <br />
        </div>
        <div className="btn-div">
          <button className="button-fill">Sign up</button>
        </div>
      </form>
      <div className="btn-div">
        <hr />
        <span>OR</span>
        <p>Already have an account?</p>
        <button className="button-outline">Login</button>
      </div>
    </div>
  );
};

export default AuthR;
