import React, {useState} from 'react';
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


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({message, type});
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Switch>
            <Route exact path="/"><Home showAlert={showAlert} /></Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/add-note"><AddNote showAlert={showAlert} /></Route>
            <Route exact path="/signup"><SignUp showAlert={showAlert} /></Route>
            <Route exact path="/login"><Login showAlert={showAlert} /></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
