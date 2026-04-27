import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Video, BookOpen } from 'lucide-react';
import axios from 'axios';

export default function RoleSelection() {
  const roles = [
    { name: "Cultural Enthusiast", icon: <User size={40}/>, link: "/login", desc: "Explore content & take tours" },
    { name: "Tour Guide", icon: <Video size={40}/>, link: "/login", desc: "Host tours & answer queries" },
    { name: "Content Creator", icon: <BookOpen size={40}/>, link: "/login", desc: "Upload blogs & videos" },
    { name: "Admin", icon: <Shield size={40}/>, link: "/login", desc: "Manage users & content" }
  ];

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Select Your Role</h1>
      <p>Login to access your personalized dashboard</p>
      
      <div className="grid-4" style={{ marginTop: '40px' }}>
        {roles.map((role, index) => (
          <div key={index} className="card" style={{ cursor: 'pointer', border: '1px solid #eee' }}>
            <div style={{ color: '#d35400', marginBottom: '10px' }}>{role.icon}</div>
            <h3>{role.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{role.desc}</p>
            <Link to={role.link} className="btn" style={{ display: 'block', marginTop: '15px' }}>Login</Link>
          </div>
        ))}
      </div>
    </div>
  );
}