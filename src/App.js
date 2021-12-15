import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { 
  BrowserRouter as Router, 
  Switch,
  Route 
} from "react-router-dom";
import Alert from './components/Alert';
import AddNote from './components/AddNote';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertMiddleware } from './state/index';


function App() {
  const dispatch = useDispatch();
  const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
  return (
    <>
      <Router>
        <Navbar />
        <Alert />
        <div className="container">
          <Switch>
            <Route exact path="/"><Home showAlert={showAlert} /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/add-note"><AddNote /></Route>
            <Route exact path="/signup"><SignUp /></Route>
            <Route exact path="/login"><Login /></Route>
            <Route exact path="/profile"><Profile /></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
