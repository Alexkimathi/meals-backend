
import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <div></div>;
  }


  return (
    <div>

    <Router>
  
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/register" element={<Register /> } />
    
        
    </Routes>
</Router>
    </div>

   
  );
}

export default App;
