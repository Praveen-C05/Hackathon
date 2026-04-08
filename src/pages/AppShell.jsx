import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  Leaf, Home, ShoppingCart, Truck, Tractor,
  MessageCircle, BookOpen, LogOut, Languages,
} from 'lucide-react';
import { i18n, INITIAL_CROPS, INITIAL_EQUIPMENT, callGrokAI } from '../constants.js';

// Inner pages
import Dashboard    from './inner/Dashboard.jsx';
import Marketplace  from './inner/Marketplace.jsx';
import Orders       from './inner/Orders.jsx';
import Equipment    from './inner/Equipment.jsx';
import ActionBot    from './inner/ActionBot.jsx';
import LearningHub  from './inner/LearningHub.jsx';

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        width: '100%', padding: '13px 16px',
        borderRadius: '12px', border: 'none',
        background: active
          ? 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(34,197,94,0.1))'
          : 'transparent',
        borderLeft: active ? '3px solid #22c55e' : '3px solid transparent',
        color: active ? '#4ade80' : 'rgba(255,255,255,0.6)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px', fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
        }
      }}
    >
      {React.cloneElement(icon, { size: 18 })}
      <span>{label}</span>
    </button>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '2px', padding: '8px 12px',
        background: 'none', border: 'none',
        color: active ? '#22c55e' : '#9ca3af',
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        transition: 'color 0.2s',
      }}
    >
      {React.cloneElement(icon, { size: 22 })}
      <span style={{ fontSize: '10px', fontWeight: active ? 700 : 500 }}>{label}</span>
    </button>
  );
}

export default function AppShell({ user, setUser, lang, setLang }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [crops, setCrops]       = useState(INITIAL_CROPS);
  const [orders, setOrders]     = useState([]);
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);
  const [marketTab, setMarketTab] = useState('browse');
  const [equipTab, setEquipTab]   = useState('rent');

  const t = (key) => i18n[lang][key] || key;

  const currentRoute = location.pathname.replace('/app', '') || '/';

  const goTo = (path) => navigate(`/app${path}`);

  const navItems = [
    { path: '/',       icon: <Home />,          label: t('nav_home')   },
    { path: '/market', icon: <ShoppingCart />,   label: t('nav_market') },
    { path: '/orders', icon: <Truck />,           label: t('nav_orders') },
    { path: '/equip',  icon: <Tractor />,         label: t('nav_equip')  },
    { path: '/ask',    icon: <MessageCircle />,   label: t('nav_ask')    },
    { path: '/learn',  icon: <BookOpen />,        label: t('nav_learn')  },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#f9fafb', fontFamily: 'Inter, sans-serif',
    }}>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: 'linear-gradient(160deg, #0a2e1a, #0d3d22)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }} className="hide-mobile">
        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
          }}>
            <Leaf size={18} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px',
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{t('appTitle')}</span>
        </div>

        {/* User badge */}
        <div style={{
          margin: '16px 12px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px', padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: user.role === 'farmer'
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
          }}>
            {user.role === 'farmer' ? '👨‍🌾' : '🛒'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </div>
            <div style={{
              fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
              color: user.role === 'farmer' ? '#4ade80' : '#60a5fa',
            }}>
              {user.role === 'farmer' ? 'Farmer' : 'Buyer'}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={currentRoute === item.path}
              onClick={() => goTo(item.path)}
            />
          ))}
        </nav>

        {/* Bottom controls */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', justifyContent: 'center' }}>
            {['en', 'hi', 'kn'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '5px 10px', borderRadius: '8px', border: 'none',
                  background: lang === l ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                  color: lang === l ? '#4ade80' : 'rgba(255,255,255,0.4)',
                  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                }}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हि' : 'ಕ'}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '100%', padding: '10px 14px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: '10px', cursor: 'pointer',
              color: '#f87171', fontSize: '13px', fontWeight: 600,
              fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top Header */}
        <header style={{
          background: 'white',
          borderBottom: '1px solid #f3f4f6',
          padding: '0 24px',
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 40,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          {/* Mobile logo */}
          <div className="hide-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '9px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Leaf size={16} color="white" />
            </div>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{t('appTitle')}</span>
          </div>

          {/* Desktop page title */}
          <div className="hide-mobile" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '18px', color: '#111827' }}>
            {navItems.find(n => n.path === currentRoute)?.label || 'Dashboard'}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '6px 14px',
              background: user.role === 'farmer' ? '#f0fdf4' : '#eff6ff',
              color: user.role === 'farmer' ? '#16a34a' : '#2563eb',
              borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none',
            }}>
              {user.role === 'farmer' ? '👨‍🌾 Farmer' : '🛒 Buyer'}
            </div>
            <button
              onClick={handleLogout}
              className="hide-mobile"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px',
                background: 'transparent', border: '1px solid #e5e7eb',
                borderRadius: '10px', color: '#6b7280',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#f87171';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', maxWidth: '1000px', width: '100%', margin: '0 auto', paddingBottom: '80px' }}>
          <Routes>
            <Route index                element={<Dashboard  t={t} user={user} />} />
            <Route path="market"        element={<Marketplace t={t} crops={crops} setCrops={setCrops} role={user.role} addOrder={o => setOrders([o, ...orders])} tab={marketTab} setTab={setMarketTab} />} />
            <Route path="orders"        element={<Orders     t={t} orders={orders} setOrders={setOrders} role={user.role} />} />
            <Route path="equip"         element={<Equipment  t={t} equipment={equipment} setEquipment={setEquipment} tab={equipTab} setTab={setEquipTab} />} />
            <Route path="ask"           element={<ActionBot  t={t} lang={lang} callAI={callGrokAI} goTo={goTo} setMarketTab={setMarketTab} setEquipTab={setEquipTab} />} />
            <Route path="learn"         element={<LearningHub t={t} />} />
            <Route path="*"             element={<Navigate to="/app" replace />} />
          </Routes>
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="hide-desktop" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'white',
        borderTop: '1px solid #f3f4f6',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        display: 'flex', justifyContent: 'space-around',
        padding: '6px 0',
      }}>
        {navItems.slice(0, 5).map(item => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={currentRoute === item.path}
            onClick={() => goTo(item.path)}
          />
        ))}
      </nav>
    </div>
  );
}
