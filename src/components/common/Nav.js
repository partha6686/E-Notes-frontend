import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userMiddleware, alertMiddleware } from "../../state/index";
import { AiFillHome, AiFillCaretDown } from "react-icons/ai";
import { IoAddSharp, IoSettingsSharp, IoLogOutOutline } from "react-icons/io5";
import { BiUser, BiHelpCircle } from "react-icons/bi";

const Nav = () => {
  const host = 'http://localhost:3300/';
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const { showAlert } = bindActionCreators(alertMiddleware, dispatch);
  const { fetchUser } = bindActionCreators(userMiddleware, dispatch);

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (location.pathname !== '/auth/login' && location.pathname !== '/auth/signup') {
      if (localStorage.getItem("token")) {
        fetchUser();
      } else if (location.pathname !== '/') {
        showAlert("Please Login to Continue", "warning");
        history.push("/auth/login");
      }
    }
    // eslint-disable-next-line
  }, [])
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
                <Link to="/profile"><BiUser size='22px' className='icon' />Profile</Link>
                <Link to="/"><BiHelpCircle size='22px' className='icon' />Help</Link>
                <Link to="/"><IoSettingsSharp size='22px' className='icon' />Settings</Link>
                <hr />
                <a href="/auth/login" onClick={handleLogout}>
                  <IoLogOutOutline size='22px' className='icon' />Logout
                </a>
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
