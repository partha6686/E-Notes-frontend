import React, { useState } from "react";
import "../../css/auth.css";
import UnderLine from "../common/UnderLine";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import {BsArrowCounterclockwise} from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { alertMiddleware } from "../../state/index";

const SignUp = () => {
  const host = "http://localhost:3300";
  const [error, setError] = useState();
  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const { showAlert } = bindActionCreators(alertMiddleware, dispatch);
  const formValidator = () => {
    if (
      createUser.name.length < 3 ||
      !/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(
        createUser.email
      ) ||
      createUser.password.length < 5 ||
      createUser.cpassword !== createUser.password
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
    formValidator();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValidator();
    if (!error) {
      const url = `${host}/api/auth/register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: createUser.name,
          email: createUser.email,
          password: createUser.password,
        }),
      });
      // eslint-disable-next-line
      const json = await response.json();
      console.log(json);
      if (response.status === 200) {
        localStorage.setItem("token", json.authToken);
        //Redirect
        history.push("/profile");
        showAlert("Sign up Successful", "success");
      } else {
        showAlert(json.errors.msg ? json.errors.msg : json.errors, "danger");
      }
    }
  };

  return (
    <div className="auth">
      <h2>Sign up</h2>
      <UnderLine />
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <div className="input-div">
            <FaRegUser size="20px" className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter you name"
              onChange={handleChange}
            />
            <br />
          </div>
          {createUser.name.length && createUser.name.length < 3 ? (
            <p className="input-error">
              <BiErrorCircle size="18px" /> Name must have atleast 3 charecters
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <div className="input-div">
            <HiOutlineMail size="22px" className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />
            <br />
          </div>
          {createUser.email &&
          /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(
            createUser.email
          ) === false ? (
            <p className="input-error">
              <BiErrorCircle size="18px" /> Enter a Valid email address
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <div className="input-div">
            <RiLockPasswordLine size="22px" className="icon" />
            <input
            type={!showPassword ?"password": "text"}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {!showPassword ? (
              <AiOutlineEye
                size="22px"
                className="pass-icon"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                size="22px"
                className="pass-icon"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
            <br />
          </div>
          {createUser.password.length && createUser.password.length < 5 ? (
            <p className="input-error">
              <BiErrorCircle size="18px" /> Password must have atleast 5
              charecters
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <div className="input-div">
            <BsArrowCounterclockwise size="22px" className="icon" />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <br />
          </div>
          {createUser.cpassword &&
            createUser.cpassword !== createUser.password && (
              <p className="input-error">
                <BiErrorCircle size="18px" /> Passwords doesn't match
              </p>
            )}
        </div>
        <div className="btn-div">
          <button className="button-fill">Sign up</button>
        </div>
      </form>
      <div className="btn-div">
        <hr />
        <span>OR</span>
        <p>Already have an account?</p>
        <Link to="/auth/login">
          <button className="button-outline">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
