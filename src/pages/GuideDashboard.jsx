import React, { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext';
import { 
  X, Send, Wallet, Calendar, MessageCircle, 
  CheckCircle, Users, ArrowUpRight 
} from 'lucide-react';

export default function GuideDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- Security Logic ---
  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'guide') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [activeQuery, setActiveQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [tours] = useState([
    { id: 1, name: "Taj Mahal Sunrise Walk", time: "Tomorrow, 06:00 AM", guests: [{ name: "Rahul Sharma", country: "India" }] }
  ]);

  const [earnings] = useState({ total: 12800, weekly: 4500, history: [{ id: 1, customer: "Anjali Gupta", amount: 1500, date: "24 Feb" }] });

  const [queries, setQueries] = useState([
    { id: 101, user: "Amit", text: "Is the Taj Mahal tour wheelchair accessible?", status: "Pending" }
  ]);

  if (!user) return null;
  // ----------------------

  const handleSendReply = () => {
    setIsSending(true);
    setTimeout(() => {
      setQueries(queries.map(q => q.id === activeQuery.id ? { ...q, status: "Replied" } : q));
      setIsSending(false);
      setActiveQuery(null);
      setReplyText("");
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '30px', minHeight: '100vh', background: '#fdfbf7' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#d35400', fontSize: '2.4rem', margin: 0, fontWeight: '800' }}>Tour Guide Hub 🚩</h1>
        <p style={{ color: '#555', fontSize: '1.1rem', marginTop: '8px' }}>
          Welcome back, <strong>{user?.name}</strong>.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        <div style={whiteCardStyle}>
          <h3 style={headerStyle}><Calendar size={22} color="#d35400" /> Upcoming Tours</h3>
          {tours.map(tour => (
            <div key={tour.id} style={itemBoxStyle}>
              <strong>{tour.name}</strong>
              <p style={{ fontSize: '13px', color: '#888' }}>{tour.time}</p>
            </div>
          ))}
        </div>

        <div style={whiteCardStyle}>
          <h3 style={headerStyle}><MessageCircle size={22} color="#d35400" /> User Queries</h3>
          {queries.map(q => (
            <div key={q.id} style={itemBoxStyle}>
              <span style={{ fontWeight: '700' }}>{q.user}</span>
              <p style={{ fontSize: '14px' }}>"{q.text}"</p>
              {q.status === "Pending" && <button onClick={() => setActiveQuery(q)} style={replyLinkStyle}>Reply</button>}
            </div>
          ))}
        </div>

        <div style={whiteCardStyle}>
          <h3 style={headerStyle}><Wallet size={22} color="#d35400" /> Earnings Hub</h3>
          <h2 style={{ color: '#2c3e50' }}>₹{earnings.total}</h2>
        </div>
      </div>

      {activeQuery && (
        <div style={overlayStyle}>
          <div style={glassModalStyle}>
            <button onClick={() => setActiveQuery(null)} style={closeBtnStyle}><X size={24} /></button>
            <h2 style={{ color: '#d35400' }}>Send Reply</h2>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} style={glassTextareaStyle} />
            <button onClick={handleSendReply} disabled={isSending || !replyText} style={sendBtnStyle}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// (Keep your existing CSS objects at the bottom of the file)
const whiteCardStyle = { background: '#fff', padding: '25px', borderRadius: '16px', borderTop: '6px solid #d35400' };
const headerStyle = { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.3rem' };
const itemBoxStyle = { padding: '15px 0', borderBottom: '1px solid #f5f5f5' };
const replyLinkStyle = { background: 'none', border: 'none', color: '#d35400', cursor: 'pointer', fontWeight: '700' };
const overlayStyle = { position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' };
const glassModalStyle = { background: '#fff', borderRadius: '28px', padding: '40px', width: '520px', position: 'relative' };
const glassTextareaStyle = { width: '100%', height: '140px', padding: '15px', borderRadius: '10px', marginBottom: '20px' };
const sendBtnStyle = { width: '100%', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', cursor: 'pointer', fontWeight: '800' };
const closeBtnStyle = { position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer' };