import React, { useState } from 'react';
import { MapPin, ShieldCheck, Camera } from 'lucide-react';
import CameraCapture from '../../components/CameraCapture.jsx';

export default function Equipment({ t, equipment, setEquipment, tab, setTab }) {
  const [newEquip, setNewEquip] = useState({ name: '', rate: '', per: 'Day' });
  const [photoData, setPhotoData] = useState(null);

  const styleInput = {
    width: '100%', padding: '13px 16px',
    background: '#f9fafb', border: '2px solid #f3f4f6',
    borderRadius: '12px', fontSize: '15px', color: '#111827',
    outline: 'none', fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s', boxSizing: 'border-box',
  };

  const handleList = (e) => {
    e.preventDefault();
    if (!photoData) return alert(t('photo_required'));
    const item = {
      id: Date.now(), name: newEquip.name, type: 'Tool',
      rate: Number(newEquip.rate), per: newEquip.per,
      owner: 'You', img: '🔧', photoUrl: photoData, verified: true,
    };
    setEquipment([item, ...equipment]);
    setNewEquip({ name: '', rate: '', per: 'Day' });
    setPhotoData(null);
    setTab('rent');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab bar */}
      <div style={{
        background: 'white', borderRadius: '16px', padding: '6px',
        border: '1px solid #f3f4f6', display: 'flex', gap: '6px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        {['rent', 'list'].map(t2 => (
          <button key={t2} onClick={() => setTab(t2)} style={{
            flex: 1, padding: '11px', borderRadius: '12px', border: 'none',
            background: tab === t2 ? 'linear-gradient(135deg,#d97706,#b45309)' : 'transparent',
            color: tab === t2 ? 'white' : '#6b7280',
            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
            boxShadow: tab === t2 ? '0 4px 12px rgba(217,119,6,0.3)' : 'none',
          }}>
            {t2 === 'rent' ? '🚜 ' + t('equip_rent') : '➕ ' + t('equip_list')}
          </button>
        ))}
      </div>

      {/* Rent list */}
      {tab === 'rent' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {equipment.map(item => (
            <div key={item.id} style={{
              background: 'white', borderRadius: '16px',
              border: '1px solid #f3f4f6', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column', gap: '16px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {item.photoUrl ? (
                  <img src={item.photoUrl} alt="equip" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 80, height: 80, background: '#fff7ed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>
                    {item.img}
                  </div>
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>{item.name}</h3>
                    {item.verified && <ShieldCheck size={14} color="#22c55e" />}
                  </div>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '13px', marginBottom: '8px' }}>
                    <MapPin size={12} /> {item.owner}
                  </p>
                  <span style={{
                    background: '#fff7ed', color: '#ea580c',
                    padding: '4px 12px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 700,
                  }}>₹{item.rate}/{item.per}</span>
                </div>
              </div>
              <button style={{
                padding: '12px',
                background: 'linear-gradient(135deg,#111827,#374151)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.2s',
              }}>
                📅 {t('book_now')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* List form */}
      {tab === 'list' && (
        <form onSubmit={handleList} style={{
          background: 'white', borderRadius: '20px', border: '1px solid #f3f4f6',
          padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '20px', color: '#111827' }}>
            List Your Equipment
          </h3>
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '14px', display: 'flex', gap: '10px' }}>
            <Camera size={18} color="#ea580c" style={{ flexShrink: 0 }} />
            <p style={{ color: '#c2410c', fontSize: '14px', fontWeight: 600 }}>{t('photo_required')} for quality check.</p>
          </div>

          <CameraCapture onCapture={setPhotoData} t={t} />

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Equipment Name</label>
            <input required type="text" value={newEquip.name} onChange={e => setNewEquip({ ...newEquip, name: e.target.value })}
              style={styleInput}
              onFocus={e => { e.target.style.border = '2px solid #d97706'; e.target.style.background = 'white'; }}
              onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Rate (₹)</label>
              <input required type="number" value={newEquip.rate} onChange={e => setNewEquip({ ...newEquip, rate: e.target.value })}
                style={styleInput}
                onFocus={e => { e.target.style.border = '2px solid #d97706'; e.target.style.background = 'white'; }}
                onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Per</label>
              <select value={newEquip.per} onChange={e => setNewEquip({ ...newEquip, per: e.target.value })}
                style={{ ...styleInput }}
                onFocus={e => { e.target.style.border = '2px solid #d97706'; e.target.style.background = 'white'; }}
                onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
              >
                <option>Hour</option><option>Day</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={!photoData} style={{
            padding: '15px',
            background: photoData ? 'linear-gradient(135deg,#d97706,#b45309)' : '#e5e7eb',
            color: photoData ? 'white' : '#9ca3af',
            border: 'none', borderRadius: '14px',
            fontWeight: 700, fontSize: '16px', cursor: photoData ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: photoData ? '0 6px 20px rgba(217,119,6,0.35)' : 'none',
          }}>
            <ShieldCheck size={20} /> Verify &amp; List Equipment
          </button>
        </form>
      )}
    </div>
  );
}
