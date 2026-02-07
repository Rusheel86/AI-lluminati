import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CounselorDashboard from './components/CounselorDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <nav className="sidebar">
          <h1 className="logo">Sukoon</h1>
          <ul>
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Counselor Dashboard</NavLink></li>
            <li><NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin Dashboard</NavLink></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CounselorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;