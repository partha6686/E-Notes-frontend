import React, { useState } from "react";
import UnderLine from "../common/UnderLine";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userMiddleware, alertMiddleware } from '../../state/index';

const Login = () => {
  const host = "http://localhost:3300";
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const { showAlert } = bindActionCreators(alertMiddleware, dispatch);
  const { fetchUser } = bindActionCreators(userMiddleware, dispatch);

  /******************************************************************************************************************************************/
  const formValidator = () => {
    if (
      !/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(
        user.email
      )
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  /*****************************************************************************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    formValidator();
    if (!error) {
      const url = `${host}/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      // eslint-disable-next-line
      const json = await response.json();
      if (response.status === 200) {
        await localStorage.setItem("token", json.authToken);
        fetchUser();
        //Redirect
        history.push("/");
        showAlert("Logged in Successfully", "success");

      } else {
        showAlert(json.errors.msg ? json.errors.msg : json.errors, "danger");
      }
    }
  };

  /*****************************************************************************************************************************************/
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    formValidator();
  };

  /*****************************************************************************************************************************************/


  return (
    <div className="auth">
      <h2>Login</h2>
      <UnderLine />
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <div className="input-div">
            <HiOutlineMail size="22px" className="icon" />
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              vlaue={user.email}
              onChange={handleChange}
            />
            <br />
          </div>

          {user.email &&
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(
              user.email
            ) === false ? (
            <p className="input-error">
              <BiErrorCircle size="18px" /> Enter a Valid email address
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="input-div">
          <RiLockPasswordLine size="22px" className="icon" />
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
          />
          {showPassword ? <AiOutlineEye size="22px" className="pass-icon" onClick={() => { setShowPassword(!showPassword) }} /> :
            <AiOutlineEyeInvisible size="22px" className="pass-icon" onClick={() => { setShowPassword(!showPassword) }} />}
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
        <Link to="/auth/signup">
          <button className="button-outline">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
