import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserReports() {
  const [reports, setReports] = useState([
    { 
      id: 1, 
      severity: 'high', 
      title: 'Spam Comments Detected', 
      user: '@travelbot99',
      description: 'Multiple spam links pointing to malicious external sites were posted on the Taj Mahal and Qutub Minar articles. Immediate action required to prevent phishing.', 
      actionLabel: 'Ban User',
      resolvedLabel: 'User Banned 🔨',
      status: 'Open' 
    },
    { 
      id: 2, 
      severity: 'medium', 
      title: 'Broken Map Link', 
      user: 'System Bot',
      description: "The Google Maps API link embedded on the 'Lotus Temple' page is returning a 404 error. The coordinate data might be corrupted in the database.", 
      actionLabel: 'Investigate',
      resolvedLabel: 'Investigating 🔍',
      status: 'Open' 
    }
  ]);

  // State to control the popup modal
  const [selectedReport, setSelectedReport] = useState(null);

  const handleResolve = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'Resolved' } : report
    ));
    setSelectedReport(null); // Close modal after action
  };

  const getSeverityColors = (severity) => {
    if (severity === 'high') return { border: '#ef4444', bg: '#fee2e2', text: '#991b1b', btn: '#ef4444' };
    if (severity === 'medium') return { border: '#f59e0b', bg: '#fef3c7', text: '#b45309', btn: '#f59e0b' };
    return { border: '#3b82f6', bg: '#dbeafe', text: '#1e40af', btn: '#3b82f6' };
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <Link to="/admin-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>
      <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>User Reports ⚠️</h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>Manage flagged accounts, platform bugs, and content disputes.</p>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {reports.map((report) => {
          const colors = getSeverityColors(report.severity);
          return (
            <div key={report.id} style={{ borderLeft: `5px solid ${colors.border}`, paddingLeft: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '20px', borderRadius: '0 8px 8px 0' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.2rem' }}>{report.title}</h3>
                <p style={{ color: '#64748b', margin: '0', fontSize: '0.9rem' }}>Reported entity: <strong>{report.user}</strong></p>
              </div>

              <div>
                {report.status === 'Open' ? (
                  <button 
                    onClick={() => setSelectedReport(report)} 
                    style={{ background: '#1e293b', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    View Details
                  </button>
                ) : (
                  <span style={{ fontWeight: 'bold', padding: '8px 16px', borderRadius: '20px', background: colors.bg, color: colors.text }}>
                    {report.resolvedLabel}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌟 PREMIUM LIQUID GLASS MODAL 🌟 */}
      {selectedReport && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          
          {/* Glass Card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '90%', position: 'relative' }}>
            
            <button onClick={() => setSelectedReport(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <h2 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.6rem' }}>{selectedReport.title}</h2>
            <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '15px' }}>
              Target: {selectedReport.user}
            </p>
            
            <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '35px' }}>
              <strong>Issue Details:</strong> <br/> {selectedReport.description}
            </p>

            <button 
              onClick={() => handleResolve(selectedReport.id)} 
              style={{ width: '100%', background: getSeverityColors(selectedReport.severity).btn, color: 'white', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)' }}
            >
              Execute: {selectedReport.actionLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}