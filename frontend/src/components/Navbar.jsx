import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="top-nav">
      <div className="nav-brand">
        <Package color="var(--primary)" size={18} />
        <span>PLM <span style={{ fontWeight: 400, color: 'var(--text-dim)' }}>Pro</span></span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Overview
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Products
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
          Partners
        </NavLink>
        <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 8px' }}></div>
        <button 
            className="nav-pill" 
            onClick={onLogout} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', background: '#3fb950', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>{user.name}</span>
      </div>
    </nav>
  );
};

export default Navbar;
