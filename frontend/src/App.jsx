import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Overview /> : <Navigate to="/login" />} />
          <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
