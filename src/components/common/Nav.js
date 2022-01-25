import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userMiddleware, alertMiddleware } from "../../state/index";
import { AiFillHome, AiFillCaretDown } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";

const Nav = () => {
  const host = 'http://localhost:3300/';
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const { showAlert } = bindActionCreators(alertMiddleware, dispatch);
  const { fetchUser } = bindActionCreators(userMiddleware, dispatch);

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup' && location.pathname !== '/') {
      if (localStorage.getItem("token")) {
        fetchUser();
      } else {
        showAlert("Please Login to Continue", "warning");
        history.push("/auth/login");
      }
    }
    // eslint-disable-next-line
  }, [user])
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logged out Successfully", "success");
  };
  return (
    <>
      {(location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') && <div className="nav-bar">
        <h1>Logo</h1>
        <div className="nav-bar-links">
          <div className="nav-link">
            <Link to="/">
              <AiFillHome size="32px" />
            </Link>
          </div>
          {user._id ? <>
            <div className="nav-link">
              <Link to="/add-note">
                <IoAddSharp size="32px" />
              </Link>
            </div>
            <div className="nav-dropdown-btn nav-link">
              <img src={`${host}${user.profileImg}`} width={32} alt='profile' />
              <AiFillCaretDown size="16px" />
              <div className="dropdown-div">
                <Link to="/profile">Profile</Link>
                <Link to="/">Help</Link>
                <Link to="/">Settings</Link>
                <hr />
                <Link to="/auth/login" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </> :
            <>
              <div className="nav-link">
                <Link to='/auth/login' className='btn button-outline'>Login/ Signup</Link>
              </div>
            </>
          }
        </div>
      </div>}
    </>
  );
};

export default Nav;
