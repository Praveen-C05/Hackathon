import React, { useState } from 'react';
import { ShieldCheck, MapPin, Camera, CheckCircle, Image as ImageIcon } from 'lucide-react';
import CameraCapture from '../../components/CameraCapture.jsx';

export default function Marketplace({ t, crops, setCrops, role, addOrder, tab, setTab }) {
  const [newCrop, setNewCrop] = useState({ name: '', qty: '', price: '' });
  const [photoData, setPhotoData] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const handleSell = (e) => {
    e.preventDefault();
    if (!photoData) return alert(t('photo_required'));
    const crop = {
      id: Date.now(), name: newCrop.name,
      qty: Number(newCrop.qty), price: Number(newCrop.price),
      farmer: 'You', img: '🌾', photoUrl: photoData, verified: true,
    };
    setCrops([crop, ...crops]);
    setNewCrop({ name: '', qty: '', price: '' });
    setPhotoData(null);
    setTab('browse');
  };

  const handleBuy = (crop) => {
    setProcessingId(crop.id);
    setTimeout(() => {
      addOrder({
        id: 'ORD' + Math.floor(Math.random() * 10000),
        cropName: crop.name, qty: 100,
        total: 100 * crop.price, status: 'ordered',
        date: new Date().toLocaleDateString(),
      });
      setProcessingId(null);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab switcher */}
      <div style={{
        background: 'white', borderRadius: '16px', padding: '6px',
        border: '1px solid #f3f4f6', display: 'flex', gap: '6px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}>
        <button
          onClick={() => setTab('browse')}
          style={{
            flex: 1, padding: '11px', borderRadius: '12px', border: 'none',
            background: tab === 'browse' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'transparent',
            color: tab === 'browse' ? 'white' : '#6b7280',
            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
            boxShadow: tab === 'browse' ? '0 4px 12px rgba(34,197,94,0.3)' : 'none',
          }}
        >{t('market_browse')}</button>
        {role === 'farmer' && (
          <button
            onClick={() => setTab('sell')}
            style={{
              flex: 1, padding: '11px', borderRadius: '12px', border: 'none',
              background: tab === 'sell' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'transparent',
              color: tab === 'sell' ? 'white' : '#6b7280',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease',
              boxShadow: tab === 'sell' ? '0 4px 12px rgba(34,197,94,0.3)' : 'none',
            }}
          >{t('market_sell')}</button>
        )}
      </div>

      {/* Browse */}
      {tab === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {crops.map(crop => (
            <div key={crop.id} style={{
              background: 'white', borderRadius: '16px',
              border: '1px solid #f3f4f6', padding: '18px',
              display: 'flex', gap: '16px', alignItems: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none'; }}
            >
              {crop.photoUrl ? (
                <img src={crop.photoUrl} alt="crop" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '12px', border: '2px solid #f3f4f6', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 80, height: 80, background: '#f9fafb', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>
                  {crop.img}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#111827' }}>{crop.name}</h3>
                  {crop.verified && <ShieldCheck size={16} color="#22c55e" />}
                </div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9ca3af', fontSize: '13px', marginBottom: '10px' }}>
                  <MapPin size={12} /> {crop.farmer}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600 }}>
                    {crop.qty} kg
                  </span>
                  <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                    ₹{crop.price}/kg
                  </span>
                </div>
              </div>
              {role === 'buyer' && (
                <button
                  onClick={() => handleBuy(crop)}
                  disabled={processingId === crop.id}
                  style={{
                    padding: '12px 20px',
                    background: processingId === crop.id ? '#d1d5db' : 'linear-gradient(135deg,#22c55e,#16a34a)',
                    color: processingId === crop.id ? '#9ca3af' : 'white',
                    border: 'none', borderRadius: '12px',
                    fontWeight: 700, fontSize: '14px', cursor: processingId === crop.id ? 'not-allowed' : 'pointer',
                    flexShrink: 0, fontFamily: 'Inter, sans-serif',
                    boxShadow: processingId === crop.id ? 'none' : '0 4px 12px rgba(34,197,94,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {processingId === crop.id ? '⏳' : t('buy_now')}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sell form */}
      {tab === 'sell' && (
        <form onSubmit={handleSell} style={{
          background: 'white', borderRadius: '20px',
          border: '1px solid #f3f4f6', padding: '28px',
          display: 'flex', flexDirection: 'column', gap: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '20px', color: '#111827' }}>
            List Your Crop
          </h3>

          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '14px', display: 'flex', gap: '10px' }}>
            <Camera size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ color: '#c2410c', fontSize: '14px', fontWeight: 600 }}>{t('photo_required')}</p>
          </div>

          <CameraCapture onCapture={setPhotoData} t={t} />

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{t('crop_name')}</label>
            <input
              required type="text"
              value={newCrop.name}
              onChange={e => setNewCrop({ ...newCrop, name: e.target.value })}
              style={{
                width: '100%', padding: '13px 16px',
                background: '#f9fafb', border: '2px solid #f3f4f6',
                borderRadius: '12px', fontSize: '15px', color: '#111827',
                outline: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s', boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.border = '2px solid #22c55e'; e.target.style.background = 'white'; }}
              onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { key: 'qty', label: t('qty'), type: 'number' },
              { key: 'price', label: t('price'), type: 'number' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{f.label}</label>
                <input
                  required type={f.type}
                  value={newCrop[f.key]}
                  onChange={e => setNewCrop({ ...newCrop, [f.key]: e.target.value })}
                  style={{
                    width: '100%', padding: '13px 16px',
                    background: '#f9fafb', border: '2px solid #f3f4f6',
                    borderRadius: '12px', fontSize: '15px', color: '#111827',
                    outline: 'none', fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.target.style.border = '2px solid #22c55e'; e.target.style.background = 'white'; }}
                  onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!photoData}
            style={{
              padding: '15px',
              background: photoData ? 'linear-gradient(135deg,#22c55e,#16a34a)' : '#e5e7eb',
              color: photoData ? 'white' : '#9ca3af',
              border: 'none', borderRadius: '14px',
              fontWeight: 700, fontSize: '16px',
              cursor: photoData ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              fontFamily: 'Inter, sans-serif',
              boxShadow: photoData ? '0 6px 20px rgba(34,197,94,0.35)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <ShieldCheck size={20} /> {t('list_crop')}
          </button>
        </form>
      )}
    </div>
  );
}
