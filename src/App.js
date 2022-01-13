import React from 'react';
import Navbar from "./components/common/Navbar";
import Home from "./components/blog/Home";
import About from "./components/About";
import { 
  BrowserRouter as Router, 
  Switch,
  Route 
} from "react-router-dom";
import Alert from './components/common/Alert';
import AddNote from './components/blog/AddNote';
// import SignUp from './components/auth/SignUp';
// import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertMiddleware } from './state/index';
import './css/App.css';
import Auth from './components/auth/Auth';
import AuthR from './components/auth/AuthR';


function App() {
  const dispatch = useDispatch();
  const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Alert />
        <div className="hero-box">
          <Switch>
            <Route exact path="/"><Home showAlert={showAlert} /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/add-note"><AddNote /></Route>
            <Route exact path="/auth/login"><Auth /></Route>
            <Route exact path="/auth/signup"><AuthR /></Route>
            <Route exact path="/profile"><Profile /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
