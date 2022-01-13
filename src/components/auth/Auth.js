import React from "react";
import "../../css/auth.css";
import UnderLine from "../common/UnderLine";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";

const Auth = () => {
  return (
    <div className="auth">
      <h2>Login</h2>
      <UnderLine />
      <form autocomplete="off">
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
        <div className="btn-div">
          <button className="button-fill">Login</button>
        </div>
      </form>
      <div className="btn-div">
        <hr />
        <span>OR</span>
        <p>Don't have an account?</p>
        <button className="button-outline">Sign up</button>
      </div>
    </div>
  );
};

export default Auth;
