import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Orders({ t, orders, setOrders, role }) {
  const handleDeliver = (id) =>
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'delivered' } : o));

  if (orders.length === 0) {
    return (
      <div style={{
        background: 'white', borderRadius: '20px', padding: '60px 32px',
        textAlign: 'center', border: '1px solid #f3f4f6',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📦</div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
          No orders yet
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '15px' }}>
          Orders you place or receive will appear here.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Escrow notice */}
      <div style={{
        background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #3b82f6',
        borderRadius: '12px', padding: '16px',
        display: 'flex', gap: '10px', alignItems: 'center',
      }}>
        <ShieldCheck size={20} color="#2563eb" />
        <span style={{ color: '#1e40af', fontWeight: 600, fontSize: '15px' }}>{t('escrow_msg')}</span>
      </div>

      {orders.map(o => (
        <div key={o.id} style={{
          background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em' }}>
                ORDER {o.id}
              </span>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px', color: '#111827', marginTop: '4px' }}>
                {o.cropName} · {o.qty} kg
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '2px' }}>{o.date}</p>
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 900, color: '#16a34a' }}>
              ₹{o.total.toLocaleString()}
            </span>
          </div>

          {/* Progress steps */}
          <div style={{ position: 'relative', padding: '8px 0' }}>
            <div style={{ height: '3px', background: '#f3f4f6', borderRadius: '100px', position: 'absolute', top: '22px', left: '20px', right: '20px' }} />
            <div style={{
              height: '3px', borderRadius: '100px',
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              position: 'absolute', top: '22px', left: '20px',
              width: o.status === 'delivered' ? 'calc(100% - 40px)' : '50%',
              transition: 'width 0.6s ease',
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              {[
                { label: t('status_ordered'), done: true },
                { label: 'In Transit', done: o.status === 'delivered' },
                { label: t('status_delivered'), done: o.status === 'delivered' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: step.done ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'white',
                    border: step.done ? 'none' : '2px solid #e5e7eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: step.done ? '0 2px 8px rgba(34,197,94,0.3)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {step.done && <CheckCircle size={16} color="white" />}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: step.done ? '#16a34a' : '#9ca3af', textAlign: 'center', maxWidth: '80px' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {o.status === 'ordered' && role === 'buyer' && (
            <button
              onClick={() => handleDeliver(o.id)}
              style={{
                width: '100%', marginTop: '20px', padding: '14px',
                background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 6px 18px rgba(79,70,229,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >
              ✅ {t('confirm_delivery')}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
