import React, { useEffect } from 'react'; // Added useEffect
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext'; // Added useAuth
import { Users, ShieldCheck, FileText, AlertTriangle, LayoutDashboard } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useAuth(); // Get user from context
  const navigate = useNavigate();

  // --- Security Logic ---
  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;
  // ----------------------

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '50px', borderLeft: '5px solid #d35400', paddingLeft: '20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '2.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
          Admin Control Center <LayoutDashboard size={36} />
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', marginTop: '5px' }}>
          Secure Oversight for the **Sanchari** Heritage Platform
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <AdminCard icon={<Users />} title="User Registry" desc="Manage system users, roles, and account deletions." link="/admin/manage-users" btnText="Open Registry" />
        <AdminCard icon={<ShieldCheck />} title="Verify Guides" desc="Review and approve official tour guide applications." link="/verify-guides" btnText="Review Now" />
        <AdminCard icon={<FileText />} title="Content Approval" desc="Moderate articles and virtual tours submitted by creators." link="/approve-content" btnText="View Pending" />
        <AdminCard icon={<AlertTriangle />} title="Safety Reports" desc="Check flagged users and community forum violations." link="/user-reports" btnText="View Reports" />
      </div>
    </div>
  );
}

function AdminCard({ icon, title, desc, link, btnText }) {
  return (
    <div style={{ background: 'white', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #f1f5f9', transition: 'transform 0.2s' }}>
      <div style={{ color: '#d35400', marginBottom: '20px', display: 'inline-block', padding: '15px', background: '#fff7ed', borderRadius: '15px' }}>
        {React.cloneElement(icon, { size: 35 })}
      </div>
      <h3 style={{ color: '#0f172a', marginBottom: '12px', fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '30px', lineHeight: '1.5' }}>{desc}</p>
      <Link to={link} style={{ textDecoration: 'none' }}>
        <button style={{ background: '#d35400', color: 'white', border: 'none', padding: '14px 0', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '1rem', transition: 'background 0.2s' }}>
          {btnText}
        </button>
      </Link>
    </div>
  );
}