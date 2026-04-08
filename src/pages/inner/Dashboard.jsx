import React from 'react';
import { CloudRain, Sun, AlertTriangle, Leaf, TrendingUp, ShoppingCart, Truck } from 'lucide-react';

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div style={{
      background: bg, borderRadius: '16px',
      padding: '20px', display: 'flex', alignItems: 'center', gap: '16px',
      border: `1px solid ${color}20`,
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}18`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: '12px',
        background: `${color}18`, border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {React.cloneElement(icon, { size: 22, color })}
      </div>
      <div>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827', fontFamily: 'Outfit, sans-serif' }}>{value}</div>
        <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

export default function Dashboard({ t, role }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a, #166534)',
        borderRadius: '20px', padding: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(34,197,94,0.08)',
          pointerEvents: 'none',
        }} />
        <div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 800,
            color: 'white', marginBottom: '6px',
          }}>
            Good morning! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Here's what's happening on your farm today.
          </p>
        </div>
        <div style={{ fontSize: '56px', flexShrink: 0 }} className="hide-mobile">
          {role === 'farmer' ? '🌾' : '🛒'}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <StatCard icon={<TrendingUp />}  label="Today's Crop Price"  value="₹42/kg" color="#16a34a" bg="#f0fdf4" />
        <StatCard icon={<ShoppingCart />} label="Active Listings"    value="3"      color="#2563eb" bg="#eff6ff" />
        <StatCard icon={<Truck />}        label="Pending Deliveries"  value="1"      color="#d97706" bg="#fffbeb" />
      </div>

      {/* Weather card */}
      <div style={{
        background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        borderRadius: '16px', padding: '24px',
        border: '1px solid #bfdbfe',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <CloudRain size={18} color="#2563eb" />
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#1e40af' }}>Today's Weather</span>
          </div>
          <p style={{ color: '#3b82f6', fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>24°C</p>
          <p style={{ color: '#60a5fa', fontSize: '14px', marginTop: '4px' }}>Cloudy · 70% chance of rain tomorrow</p>
        </div>
        <Sun size={64} color="#fbbf24" style={{ flexShrink: 0, opacity: 0.8 }} />
      </div>

      {/* Alert */}
      <div style={{
        background: '#fffbeb', border: '1px solid #fde68a',
        borderLeft: '4px solid #f59e0b',
        borderRadius: '12px', padding: '18px',
        display: 'flex', gap: '12px', alignItems: 'flex-start',
      }}>
        <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '1px' }} />
        <p style={{ color: '#92400e', fontSize: '15px', lineHeight: 1.6 }}>{t('weather_alert')}</p>
      </div>

      {/* Price tip */}
      {role === 'farmer' && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderLeft: '4px solid #22c55e',
          borderRadius: '12px', padding: '18px',
          display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <Leaf size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ color: '#14532d', fontSize: '15px', lineHeight: 1.6 }}>{t('price_high')}</p>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { label: role === 'farmer' ? 'Sell Crop' : 'Browse Crops', emoji: '📤', color: '#16a34a' },
            { label: 'Check Orders',  emoji: '📦', color: '#2563eb' },
            { label: 'Rent Equipment', emoji: '🚜', color: '#d97706' },
            { label: 'Ask AI',       emoji: '🤖', color: '#7c3aed' },
          ].map(a => (
            <button key={a.label} style={{
              background: 'white', border: '1px solid #f3f4f6',
              borderRadius: '14px', padding: '18px 14px',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '8px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease', fontFamily: 'Inter, sans-serif',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${a.color}40`;
                e.currentTarget.style.boxShadow = `0 6px 16px ${a.color}15`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#f3f4f6';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span style={{ fontSize: '28px' }}>{a.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
