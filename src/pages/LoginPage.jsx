import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Phone, ArrowRight, ShieldCheck, ChevronLeft, Check } from 'lucide-react';
import { i18n } from '../constants.js';

function LangButton({ lang, currentLang, setLang }) {
  const labels = { en: 'EN', hi: 'हि', kn: 'ಕ' };
  const active = lang === currentLang;
  return (
    <button
      onClick={() => setLang(lang)}
      style={{
        padding: '6px 14px',
        borderRadius: '100px',
        border: 'none',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600, fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: active ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255,255,255,0.08)',
        color: active ? 'white' : 'rgba(255,255,255,0.6)',
        boxShadow: active ? '0 4px 12px rgba(34,197,94,0.3)' : 'none',
      }}
    >
      {labels[lang]}
    </button>
  );
}

function OtpBox({ value, onChange }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputs = React.useRef([]);

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    onChange(next.join(''));
    if (v && i < 3) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          style={{
            width: '64px', height: '64px',
            borderRadius: '16px',
            border: d ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.1)',
            background: d ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
            color: 'white',
            fontSize: '28px', fontWeight: 800,
            textAlign: 'center',
            fontFamily: 'Outfit, sans-serif',
            outline: 'none',
            transition: 'all 0.2s ease',
            caretColor: '#22c55e',
          }}
          onFocus={e => {
            e.target.style.border = '2px solid #22c55e';
            e.target.style.boxShadow = '0 0 0 4px rgba(34,197,94,0.15)';
          }}
          onBlur={e => {
            if (!d) {
              e.target.style.border = '2px solid rgba(255,255,255,0.1)';
              e.target.style.boxShadow = 'none';
            }
          }}
        />
      ))}
    </div>
  );
}

export default function LoginPage({ setUser, lang, setLang }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);       // 1=phone, 2=otp, 3=role
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const [nameErr, setNameErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');

  const t = (key) => i18n[lang][key] || key;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setNameErr('Please enter your full name');
      return;
    }
    setNameErr('');

    if (phone.replace(/\D/g, '').length < 10) {
      setPhoneErr('Please enter a valid 10-digit number');
      return;
    }
    setPhoneErr('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      alert('Incorrect OTP. Use demo OTP: 1234');
      return;
    }
    setStep(3);
  };

  const handleSelectRole = (selectedRole) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name, phone, role: selectedRole });
      navigate('/app');
    }, 700);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a2e1a 0%, #0d3d22 40%, #1a5c34 100%)',
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', width: '700px', height: '700px',
        borderRadius: '50%', top: '-300px', right: '-200px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px',
        borderRadius: '50%', bottom: '-150px', left: '-100px',
        background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Left panel — branding (desktop) */}
      <div className="hide-mobile" style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 80px',
        maxWidth: '520px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px' }}>
          <div style={{
            width: 46, height: 46, borderRadius: '14px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
          }}>
            <Leaf size={22} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '24px',
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>KrishiMitra</span>
        </div>

        <h1 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight: 900, color: 'white',
          lineHeight: 1.2, marginBottom: '20px',
        }}>
          Welcome back to<br />
          <span style={{
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>your farm hub</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.8, marginBottom: '48px', maxWidth: '380px' }}>
          Thousands of farmers across India trust KrishiMitra to sell their crops, access schemes, and grow their income.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: '✅', text: 'OTP-based secure login — no passwords' },
            { icon: '🌾', text: 'Sell crops directly to buyers' },
            { icon: '🤖', text: 'AI assistant in your language' },
            { icon: '💳', text: 'Guaranteed escrow payments' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '28px',
          padding: '40px 36px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          animation: 'fadeInUp 0.5s ease-out forwards',
        }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none', borderRadius: '10px',
                  padding: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <ChevronLeft size={18} color="rgba(255,255,255,0.7)" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none', borderRadius: '10px',
                  padding: '8px 12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <ChevronLeft size={14} /> Home
              </button>
            )}

            {/* Lang switcher */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['en', 'hi', 'kn'].map(l => (
                <LangButton key={l} lang={l} currentLang={lang} setLang={setLang} />
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '100px',
                background: s <= step
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'rgba(255,255,255,0.1)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>

          {/* ── STEP 1: Phone ── */}
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.1))',
                  border: '1px solid rgba(34,197,94,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Phone size={24} color="#4ade80" />
                </div>
                <h2 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '8px',
                }}>
                  {t('login_title')}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                  {t('login_sub')}
                </p>
              </div>

              <form onSubmit={handleSendOtp}>
                {/* Name input */}
                <div style={{ marginBottom: '16px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={e => { setName(e.target.value); setNameErr(''); }}
                    style={{
                      width: '100%',
                      padding: '16px 18px',
                      background: 'rgba(255,255,255,0.06)',
                      border: nameErr ? '2px solid #f87171' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '14px',
                      color: 'white', fontSize: '17px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => {
                      e.target.style.border = '2px solid #22c55e';
                      e.target.style.background = 'rgba(34,197,94,0.05)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(34,197,94,0.12)';
                    }}
                    onBlur={e => {
                      if (!nameErr) {
                        e.target.style.border = '2px solid rgba(255,255,255,0.1)';
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
                {nameErr && (
                  <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>{nameErr}</p>
                )}

                {/* Phone input */}
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <div style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 600,
                    borderRight: '1px solid rgba(255,255,255,0.15)',
                    paddingRight: '12px', userSelect: 'none',
                  }}>+91</div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setPhoneErr(''); }}
                    style={{
                      width: '100%',
                      padding: '16px 18px 16px 70px',
                      background: 'rgba(255,255,255,0.06)',
                      border: phoneErr ? '2px solid #f87171' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '14px',
                      color: 'white', fontSize: '17px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      outline: 'none',
                      letterSpacing: '0.05em',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => {
                      e.target.style.border = '2px solid #22c55e';
                      e.target.style.background = 'rgba(34,197,94,0.05)';
                      e.target.style.boxShadow = '0 0 0 4px rgba(34,197,94,0.12)';
                    }}
                    onBlur={e => {
                      if (!phoneErr) {
                        e.target.style.border = '2px solid rgba(255,255,255,0.1)';
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
                {phoneErr && (
                  <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>{phoneErr}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: loading
                      ? 'rgba(34,197,94,0.4)'
                      : 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white', border: 'none',
                    borderRadius: '14px', fontWeight: 700,
                    fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(34,197,94,0.35)',
                    transition: 'all 0.3s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    marginTop: '4px',
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(34,197,94,0.45)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = loading ? 'none' : '0 8px 24px rgba(34,197,94,0.35)';
                  }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin-slow 0.8s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Sending OTP…
                    </>
                  ) : (
                    <>{t('send_otp')} <ArrowRight size={18} /></>
                  )}
                </button>
              </form>

              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.1))',
                  border: '1px solid rgba(34,197,94,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px', fontSize: '26px',
                }}>📨</div>
                <h2 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '8px',
                }}>
                  Enter OTP
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                  Sent to +91 {phone}
                </p>
              </div>

              <div style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '12px', padding: '10px 16px',
                marginBottom: '28px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <ShieldCheck size={16} color="#4ade80" />
                <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>
                  {t('mock_otp_msg')}
                </span>
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div style={{ marginBottom: '28px' }}>
                  <OtpBox value={otp} onChange={setOtp} />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '16px',
                    background: otp.length === 4
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : 'rgba(255,255,255,0.08)',
                    color: otp.length === 4 ? 'white' : 'rgba(255,255,255,0.3)',
                    border: 'none', borderRadius: '14px', fontWeight: 700,
                    fontSize: '16px', cursor: otp.length === 4 ? 'pointer' : 'not-allowed',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: otp.length === 4 ? '0 8px 24px rgba(34,197,94,0.35)' : 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}
                >
                  {t('verify_otp')} {otp.length === 4 && <Check size={18} />}
                </button>
              </form>

              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.4)', fontSize: '14px',
                  cursor: 'pointer', marginTop: '20px', width: '100%',
                  textAlign: 'center', fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#4ade80'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >
                Didn't receive OTP? Resend
              </button>
            </div>
          )}

          {/* ── STEP 3: Role ── */}
          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>👋</div>
                <h2 style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '8px',
                }}>
                  Who are you?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                  Select your role to get a personalized experience
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { value: 'farmer', label: t('role_farmer'), emoji: '👨‍🌾', desc: 'List crops, rent equipment, access schemes', color: '#22c55e' },
                  { value: 'buyer',  label: t('role_buyer'),  emoji: '🛒',    desc: 'Browse crops, place bulk orders, track deliveries', color: '#3b82f6' },
                ].map(r => (
                  <button
                    key={r.value}
                    onClick={() => handleSelectRole(r.value)}
                    disabled={loading}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `2px solid rgba(255,255,255,0.1)`,
                      borderRadius: '16px', padding: '20px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={e => {
                      if (!loading) {
                        e.currentTarget.style.background = `rgba(${r.color === '#22c55e' ? '34,197,94' : '59,130,246'},0.08)`;
                        e.currentTarget.style.borderColor = r.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}25`;
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: '14px', fontSize: '26px',
                      background: `${r.color}18`,
                      border: `1px solid ${r.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>{r.emoji}</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{r.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{r.desc}</div>
                    </div>
                    <ArrowRight style={{ marginLeft: 'auto', flexShrink: 0 }} size={18} color="rgba(255,255,255,0.3)" />
                  </button>
                ))}
              </div>

              {loading && (
                <div style={{ textAlign: 'center', marginTop: '20px', color: '#4ade80', fontSize: '14px' }}>
                  Setting up your dashboard…
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
