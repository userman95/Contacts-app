import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactList from './components/ContactList';
import CreateContact from './components/CreateContact';
import EditContact from './components/EditContact';
import './style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ContactList}/>
        <Route path="/create" component={CreateContact} />
        <Route path="/edit/:id" component={EditContact} />
      </div>
    </Router>
  );
}

export default App;
