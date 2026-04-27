import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import axios from 'axios';
// 👇 THIS LINE MUST SAY "export default"
export default function Login() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#fdfbf7',
      width: '100%',
      padding: '20px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ color: '#d35400', marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Login to access your dashboard</p>
        
        {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '0.9rem', background: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', background: 'white' }}>
              <Mail size={18} color="#666" style={{ marginRight: '10px' }} />
              <input 
                type="email" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', background: 'white' }}>
              <Lock size={18} color="#666" style={{ marginRight: '10px' }} />
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>Login</button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          <p>Don't have an account? <Link to="/signup" style={{ color: '#d35400', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up here</Link></p>
        </div>

        <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#555', textAlign: 'left', background: '#eee', padding: '15px', borderRadius: '8px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Demo Credentials (Password: 123):</p>
          <ul style={{ paddingLeft: '20px', margin: '0', lineHeight: '1.6' }}>
            <li>Admin: admin@test.com</li>
            <li>Enthusiast: enthusiast@test.com</li>
            <li>Creator: creator@test.com</li>
            <li>Guide: guide@test.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}