import React, { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext'; // Added useAuth
import { Eye, Heart, PlusCircle, CheckCircle, Clock } from 'lucide-react';

export default function CreatorDashboard() {
  const { user } = useAuth(); // Get user context
  const navigate = useNavigate();

  // --- Security Logic ---
  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'creator') {
      navigate('/login');
    }
  }, [user, navigate]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('History');
  const [content, setContent] = useState('');

  const [myPosts, setMyPosts] = useState([
    { id: 1, title: 'The Hidden Secrets of Hampi', category: 'History', views: '1.2k', likes: 342, status: 'Published' },
    { id: 2, title: 'Top 5 Street Foods in Delhi', category: 'Culture', views: '840', likes: 120, status: 'Published' },
  ]);

  if (!user) return null;
  // ----------------------

  const handleUpload = () => {
    if(!title || !content) return;
    setMyPosts([{
      id: Date.now(),
      title: title,
      category: category,
      views: '0',
      likes: 0,
      status: 'Pending'
    }, ...myPosts]);
    setUploadSuccess(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(false);
      setTitle('');
      setContent('');
    }, 2000);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', marginBottom: '10px' }}>Creator Studio ✍️</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', margin: 0 }}>Upload new articles and track your content performance.</p>
        </div>
        <button 
          onClick={() => setIsUploading(true)} 
          style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)', transition: 'transform 0.1s' }}
        >
          <PlusCircle size={20} /> Upload Content
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 25px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, color: '#0f172a' }}>My Content Portfolio</h3>
        </div>
        {myPosts.map((post) => (
          <div key={post.id} style={{ padding: '25px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>{post.title}</h3>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{post.category}</span>
              </div>
              {post.status === 'Published' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 'bold', color: '#166534', background: '#dcfce7', padding: '6px 12px', borderRadius: '20px' }}>
                  <CheckCircle size={14} /> Published 🌍
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 'bold', color: '#b45309', background: '#fef3c7', padding: '6px 12px', borderRadius: '20px' }}>
                  <Clock size={14} /> Pending Approval ⏳
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', color: '#64748b' }}>
              <div style={{ textAlign: 'center' }}>
                <Eye size={20} style={{ margin: '0 auto 5px auto', display: 'block', color: post.status === 'Published' ? '#3b82f6' : '#cbd5e1' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{post.status === 'Published' ? post.views : '-'}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Heart size={20} style={{ margin: '0 auto 5px auto', display: 'block', color: post.status === 'Published' ? '#ef4444' : '#cbd5e1' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{post.status === 'Published' ? post.likes : '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isUploading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            {!uploadSuccess && (
              <button onClick={() => setIsUploading(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            )}
            {!uploadSuccess ? (
              <>
                <h2 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.8rem' }}>Upload Article 📝</h2>
                <p style={{ color: '#64748b', marginBottom: '25px' }}>Submit your heritage content for admin review.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option value="History">History</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Culture">Culture</option>
                  </select>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" style={{ width: '100%', height: '150px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}></textarea>
                  <button onClick={handleUpload} style={{ width: '100%', background: '#8b5cf6', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold' }}>Submit for Review</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={60} color="#22c55e" style={{ margin: '0 auto 15px auto' }} />
                <h2 style={{ color: '#166534' }}>Submitted!</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}