import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'enthusiast'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // We 'await' the register function because it now makes an Axios call to port 8080
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      if (result.success) {
        switch(result.role) {
          case 'admin': navigate('/admin-dashboard'); break;
          case 'enthusiast': navigate('/enthusiast-dashboard'); break;
          case 'creator': navigate('/creator-dashboard'); break;
          case 'guide': navigate('/guide-dashboard'); break;
          default: navigate('/');
        }
      } else {
        // Displays errors like "Email already exists" from your backend
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfbf7', width: '100%', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '30px', textAlign: 'left' }}>
        <h2 style={{ color: '#d35400', textAlign: 'center' }}>Create Account</h2>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '5px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold' }}>Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={{ fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={{ fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={{ fontWeight: 'bold' }}>Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="enthusiast">Cultural Enthusiast</option>
            <option value="guide">Tour Guide</option>
            <option value="creator">Content Creator</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#d35400', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '5px 0 15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box'
};