import React from 'react'
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Login from './components/Login';
import Register from "./components/Register";
import Addbook from "./components/Addbook";

function App() {
  return (
    <div className="App">
     <Router>
    <Routes>
    <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/addbook" element={<Addbook/>} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
