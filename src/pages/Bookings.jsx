import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Import directly for better performance

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user: authUser } = useAuth();

  // 1. Fetch only THIS user's bookings on load
  useEffect(() => {
    if (authUser?.id) {
      fetchUserBookings();
    }
  }, [authUser]);

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(`https://indianheritage-backend-final.onrender.com/api/bookings/user/${authUser.id}`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  // States for the custom booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [newLocationType, setNewLocationType] = useState('Village');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // 2. Handle canceling an existing tour
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this tour?")) return;
    try {
      await axios.put(`https://indianheritage-backend-final.onrender.com/api/bookings/${id}/cancel`);
      // Update local state to reflect change immediately
      setBookings(bookings.map(b =>
        b.id === id ? { ...b, status: 'Cancelled' } : b
      ));
    } catch (err) {
      console.error("Failed to cancel", err);
      alert("Error canceling booking.");
    }
  };

  // 3. Handle adding a brand new custom trip
  const handleBookTrip = async () => {
    if (!newDestination.trim() || !newDate || !newTime) {
      alert("Please fill in all fields.");
      return;
    }

    const newBooking = {
      title: `${newDestination} Exploration`,
      type: newLocationType,
      guide: 'Local Expert (Auto-Assigned)',
      date: newDate,
      time: newTime,
      status: 'Upcoming',
      user: { id: authUser.id } // Link to current user for MySQL foreign key
    };

    try {
      const response = await axios.post('https://indianheritage-backend-final.onrender.com/api/bookings', newBooking);
      setBookings([response.data, ...bookings]); // Add to top of list

      // Reset form and close
      setNewDestination('');
      setNewDate('');
      setNewTime('');
      setIsBookingModalOpen(false);
      alert("Trip Booked Successfully!");
    } catch (err) {
      console.error("Failed to book", err);
      alert("Server Error: Could not save booking.");
    }
  };

  // Helper to format time
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <Link to="/enthusiast-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>My Bookings 🎟️</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', margin: 0 }}>Manage your upcoming virtual heritage tours.</p>
        </div>
        <button
          onClick={() => setIsBookingModalOpen(true)}
          style={{ background: '#22c55e', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '15px', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)' }}
        >
          + Book Custom Trip
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderLeft: `5px solid ${booking.status === 'Upcoming' ? '#3b82f6' : booking.status === 'Completed' ? '#22c55e' : '#ef4444'}` }}>

            <div style={{ flex: '1 1 60%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>{booking.title}</h3>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{booking.type}</span>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', color: '#64748b', fontSize: '0.95rem', marginBottom: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={16} /> {booking.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {booking.time?.includes('AM') ? booking.time : formatTime(booking.time)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={16} /> {booking.guide}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px', textAlign: 'center' }}>
              <span style={{
                fontWeight: 'bold', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                background: booking.status === 'Upcoming' ? '#dbeafe' : booking.status === 'Completed' ? '#dcfce7' : '#fee2e2',
                color: booking.status === 'Upcoming' ? '#1e40af' : booking.status === 'Completed' ? '#166534' : '#991b1b'
              }}>
                {booking.status === 'Upcoming' && <Clock size={16} />}
                {booking.status === 'Completed' && <CheckCircle size={16} />}
                {booking.status === 'Cancelled' && <XCircle size={16} />}
                {booking.status}
              </span>

              {booking.status === 'Upcoming' && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                >
                  Cancel Tour
                </button>
              )}
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', color: '#64748b' }}>
            No bookings found. Click "Book Custom Trip" to get started!
          </div>
        )}
      </div>

      {/* Modal remains same logic, just linked to handleBookTrip */}
      {isBookingModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsBookingModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', fontSize: '1.5rem', cursor: 'pointer', background: 'none' }}>✖</button>
            <h2 style={{ marginBottom: '5px' }}>Book Custom Trip 🗺️</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input type="text" value={newDestination} onChange={(e) => setNewDestination(e.target.value)} placeholder="Destination" style={inputStyle} />
              <select value={newLocationType} onChange={(e) => setNewLocationType(e.target.value)} style={inputStyle}>
                <option value="Village">Village</option>
                <option value="Town">Town</option>
                <option value="City">City</option>
              </select>
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={inputStyle} />
              <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} style={inputStyle} />
              <button onClick={handleBookTrip} style={{ padding: '15px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' };