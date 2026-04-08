import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf, ArrowRight, ShieldCheck, Truck, Mic,
  TrendingUp, Globe, Star, ChevronDown, Zap,
  Users, BarChart2, CheckCircle
} from 'lucide-react';

/* ── FLOATING PARTICLE ── */
function Particle({ style }) {
  return <div className="particle" style={style} />;
}

/* ── STAT COUNTER ── */
function StatCounter({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        let start = 0;
        const step = Math.ceil(value / 60);
        const interval = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(interval); }
          else setCount(start);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #4ade80, #22c55e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1.1,
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: 500, marginTop: '6px' }}>
        {label}
      </div>
    </div>
  );
}

/* ── FEATURE CARD ── */
function FeatureCard({ icon, title, desc, delay, color }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: delay,
        opacity: 0,
        animationFillMode: 'forwards',
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #f0fdf4',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(22,163,74,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{
        width: 52, height: 52,
        background: color,
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '18px',
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

/* ── TESTIMONIAL CARD ── */
function TestimonialCard({ name, role, text, emoji, delay }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: delay,
        opacity: 0,
        animationFillMode: 'forwards',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '28px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        e.currentTarget.style.borderColor = 'rgba(74,222,128,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      }}
    >
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
        "{text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 44, height: 44,
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
        }}>{emoji}</div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{name}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN LANDING PAGE ── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    background: 'rgba(74, 222, 128, 0.4)',
    borderRadius: '50%',
    position: 'absolute',
    animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 3}s`,
    pointerEvents: 'none',
  }));

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* ── STICKY NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 32px',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10, 46, 26, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Leaf size={18} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800, fontSize: '20px',
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>KrishiMitra</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hide-mobile">
          {['features', 'stats', 'testimonials'].map(s => (
            <button key={s} onClick={() => scrollToSection(s)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '15px',
              textTransform: 'capitalize', transition: 'color 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
              onMouseEnter={e => e.target.style.color = '#4ade80'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white', border: 'none',
            borderRadius: '12px',
            fontWeight: 700, fontSize: '15px',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 16px rgba(34,197,94,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(34,197,94,0.3)';
          }}
        >
          Get Started
        </button>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="bg-hero mesh-pattern" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Animated background orbs */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', top: '-150px', right: '-150px',
          background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', bottom: '0', left: '-100px',
          background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Decorative orbit rings */}
        <div style={{
          position: 'absolute', right: '8%', top: '15%',
          width: '320px', height: '320px',
          border: '1px solid rgba(34,197,94,0.12)',
          borderRadius: '50%',
          animation: 'spin-slow 20s linear infinite',
        }} />
        <div style={{
          position: 'absolute', right: '8%', top: '15%',
          width: '220px', height: '220px',
          border: '1px dashed rgba(34,197,94,0.18)',
          borderRadius: '50%',
          transform: 'translate(50px, 50px)',
          animation: 'spin-slow 14s linear infinite reverse',
        }} />

        {/* Floating particles */}
        {particles.map((p, i) => <div key={i} style={p} />)}

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', width: '100%', paddingTop: '100px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '680px' }}>

            {/* Badge */}
            <div
              className="animate-fade-in-up"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: '100px',
                marginBottom: '28px',
                opacity: 0, animationFillMode: 'forwards',
              }}
            >
              <Zap size={14} color="#4ade80" />
              <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>
                India's #1 AgriTech Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.15,
                marginBottom: '24px',
                opacity: 0, animationFillMode: 'forwards',
              }}
            >
              Empowering Farmers,<br />
              <span style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e, #86efac)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Connecting Markets
              </span>
            </h1>

            {/* Sub */}
            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                maxWidth: '520px',
                marginBottom: '40px',
                opacity: 0, animationFillMode: 'forwards',
              }}
            >
              KrishiMitra cuts out the middlemen — giving you real-time crop pricing, AI-powered guidance, secure escrow payments, and equipment rentals in your language.
            </p>

            {/* CTA Buttons */}
            <div
              className="animate-fade-in-up delay-300"
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => navigate('/login')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white', border: 'none',
                  borderRadius: '16px', fontWeight: 700,
                  fontSize: '16px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 8px 28px rgba(34,197,94,0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(34,197,94,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(34,197,94,0.4)';
                }}
              >
                Start for Free
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollToSection('features')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '15px 31px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '16px', fontWeight: 600,
                  fontSize: '16px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
              >
                See Features
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Trust row */}
            <div
              className="animate-fade-in-up delay-400"
              style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '44px', opacity: 0, animationFillMode: 'forwards' }}
            >
              <div style={{ display: 'flex' }}>
                {['👨‍🌾', '👩‍🌾', '🧑‍🌾', '👨‍💼'].map((e, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    border: '2px solid rgba(10,46,26,0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px',
                    marginLeft: i > 0 ? '-8px' : '0',
                    zIndex: 4 - i,
                    position: 'relative',
                  }}>{e}</div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />)}
                  <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '13px', marginLeft: '4px' }}>4.9</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Trusted by 50,000+ farmers</div>
              </div>
            </div>
          </div>

          {/* Hero Panel (right side - desktop) */}
          <div
            className="animate-float hide-mobile"
            style={{
              position: 'absolute', right: '5%', top: '50%',
              transform: 'translateY(-50%)',
              width: '320px',
            }}
          >
            {/* Floating App Panel */}
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <TrendingUp size={22} color="white" />
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>Live Market</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Updated 2 mins ago</div>
                </div>
                <div style={{
                  marginLeft: 'auto', background: 'rgba(34,197,94,0.15)',
                  color: '#4ade80', padding: '3px 10px', borderRadius: '100px',
                  fontSize: '12px', fontWeight: 600,
                }}>LIVE</div>
              </div>
              {[
                { crop: '🍅 Tomato', price: '₹42/kg', change: '+12%', up: true },
                { crop: '🥔 Potato', price: '₹26/kg', change: '+3%',  up: true },
                { crop: '🧅 Onion',  price: '₹31/kg', change: '-5%',  up: false },
                { crop: '🌾 Wheat',  price: '₹23/kg', change: '+1%',  up: true },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{item.crop}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{item.price}</span>
                    <span style={{
                      color: item.up ? '#4ade80' : '#f87171',
                      background: item.up ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                      padding: '2px 8px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 600,
                    }}>{item.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating notification badge */}
            <div
              className="animate-bounce-soft"
              style={{
                position: 'absolute', bottom: '-20px', right: '-16px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '14px', padding: '12px 18px',
                boxShadow: '0 8px 24px rgba(251,191,36,0.35)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <CheckCircle size={16} color="white" />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>Order Secured!</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.1em' }}>SCROLL TO EXPLORE</span>
          <div className="animate-bounce-soft">
            <ChevronDown size={20} color="rgba(255,255,255,0.3)" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 0', background: '#fafffe' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 16px',
              background: '#dcfce7', color: '#15803d',
              borderRadius: '100px', fontSize: '13px', fontWeight: 600,
              marginBottom: '16px',
            }}>
              <Zap size={13} />
              Platform Features
            </div>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 900, color: '#111827',
              marginBottom: '16px',
            }}>
              Everything a farmer needs,<br />in one place
            </h2>
            <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '520px', margin: '0 auto' }}>
              From selling crops to renting equipment — KrishiMitra is the all-in-one platform built for India's farmers.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            <FeatureCard delay="0s"    color="#dcfce7" icon={<TrendingUp size={24} color="#16a34a" />} title="Live Market Prices" desc="Real-time crop pricing from 500+ mandis across India. Know when to sell for max profit." />
            <FeatureCard delay="0.1s"  color="#dbeafe" icon={<ShieldCheck size={24} color="#2563eb" />} title="Escrow Payments"    desc="Your money is held securely in escrow until delivery is confirmed. Zero fraud risk." />
            <FeatureCard delay="0.2s"  color="#fef3c7" icon={<Mic size={24} color="#d97706" />}        title="Voice AI Assistant"  desc="Ask anything in Hindi, English, or Kannada. Our AI agent acts on your voice commands." />
            <FeatureCard delay="0.3s"  color="#ede9fe" icon={<Truck size={24} color="#7c3aed" />}       title="Logistics Network"   desc="24-hour delivery network partnered with 200+ logistics providers across 15 states." />
            <FeatureCard delay="0.4s"  color="#fce7f3" icon={<Globe size={24} color="#db2777" />}       title="Multilingual"        desc="Fully available in English, Hindi, and Kannada — with more languages coming soon." />
            <FeatureCard delay="0.5s"  color="#d1fae5" icon={<BarChart2 size={24} color="#059669" />}   title="Analytics Dashboard" desc="Track your sales, trends, and earnings with beautiful charts and insights." />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="bg-hero mesh-pattern" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900, color: 'white', marginBottom: '16px',
            }}>
              Trusted by India's farming community
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px' }}>
              Real numbers from real farmers across India
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px 32px',
          }}>
            <StatCounter value={50000}  suffix="+"  label="Active Farmers" />
            <StatCounter value={12000}  suffix="+"  label="Buyers & Traders" />
            <StatCounter value={850}    suffix="Cr" label="GMV Transacted (₹)" />
            <StatCounter value={15}     suffix=""   label="States Covered" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900, color: '#111827', marginBottom: '16px',
            }}>
              Get started in 3 easy steps
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }}>
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up with your mobile number. OTP verification in seconds — no documents needed.', emoji: '📱' },
              { step: '02', title: 'List or Browse Crops', desc: 'Take a real-time photo to verify quality, set your price, and list your crop in minutes.', emoji: '📸' },
              { step: '03', title: 'Get Paid Securely',   desc: 'Buyer pays into escrow — you get your money released automatically on delivery.', emoji: '💳' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <div style={{
                    width: 56, height: 56, borderRadius: '16px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '26px', flexShrink: 0,
                  }}>{item.emoji}</div>
                  {i < 2 && (
                    <div style={{
                      width: '2px', height: '40px',
                      background: 'linear-gradient(to bottom, #22c55e, transparent)',
                      margin: '8px auto',
                    }} />
                  )}
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px' }}>STEP {item.step}</div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="bg-hero" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900, color: 'white', marginBottom: '16px',
            }}>
              What farmers are saying
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', alignItems: 'center' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />)}
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginLeft: '8px' }}>4.9 / 5 from 2,400+ reviews</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <TestimonialCard delay="0s"   emoji="👨‍🌾" name="Ramesh Kumar" role="Wheat Farmer, Punjab" text="KrishiMitra helped me sell my wheat directly to buyers at ₹8 more per kg than the local mandi. I made ₹40,000 extra this season alone." />
            <TestimonialCard delay="0.1s" emoji="👩‍🌾" name="Lakshmi Devi" role="Vegetable Grower, Karnataka" text="The Kannada voice assistant is amazing! I just speak and it finds buyers for me. My income doubled in 6 months." />
            <TestimonialCard delay="0.2s" emoji="🧑‍🌾" name="Suresh Patel"  role="Tomato Farmer, Maharashtra"  text="Escrow payment system is very trustworthy. Earlier I was cheated many times. Now I get guaranteed payment every time." />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '100px 0', background: '#f0fdf4' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0a2e1a, #166534)',
            borderRadius: '32px', padding: '64px 48px',
            boxShadow: '0 24px 60px rgba(22,101,52,0.3)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌾</div>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
              fontWeight: 900, color: 'white', marginBottom: '16px',
            }}>
              Ready to grow your income?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '36px', lineHeight: 1.7 }}>
              Join 50,000+ farmers already using KrishiMitra to sell smarter, earn more, and farm better.
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '18px 40px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white', border: 'none',
                borderRadius: '16px', fontWeight: 700,
                fontSize: '18px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(34,197,94,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,197,94,0.4)';
              }}
            >
              Get Started Free
              <ArrowRight size={20} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
              {['No fees to join', 'Pay only on sales', '24/7 AI support'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={15} color="#4ade80" />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a2e1a', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: 30, height: 30, borderRadius: '8px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Leaf size={16} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px',
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>KrishiMitra</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
          © 2026 KrishiMitra · Empowering India's Farmers · Built with ❤️
        </p>
      </footer>
    </div>
  );
}
