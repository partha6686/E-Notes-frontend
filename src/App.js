import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import { 
  BrowserRouter as Router, 
  Switch,
  Route 
} from "react-router-dom";
import Alert from './components/Alert';
import AddNote from './components/AddNote';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message='This is a Alert Component' />
          <div className="container">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/add-note"><AddNote /></Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
