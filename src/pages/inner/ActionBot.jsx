import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Sun, CloudRain } from 'lucide-react';

export default function ActionBot({ t, lang, callAI, goTo, setMarketTab, setEquipTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1, sender: 'bot',
      text: `Namaste! 👋 I am your ${t('appTitle')} AI Agent. Ask me about weather, crop prices, or say "sell my crop", "rent tractor", or "show schemes"!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-IN';
      window.speechSynthesis.speak(utt);
    }
  };

  const addBot = (text, widget) =>
    setMessages(p => [...p, { id: Date.now(), sender: 'bot', text, widget }]);

  const processIntent = async (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('weather') || lower.includes('mausam')) {
      const reply = t('weather_alert');
      addBot(reply, 'weather');
      speak(reply);
    } else if (lower.includes('sell') || lower.includes('bech')) {
      const reply = t('bot_sell_action');
      addBot(reply);
      speak(reply);
      setTimeout(() => { goTo('/market'); setMarketTab('sell'); }, 2000);
    } else if (lower.includes('rent') || lower.includes('tractor') || lower.includes('kiraya')) {
      const reply = t('bot_rent_action');
      addBot(reply);
      speak(reply);
      setTimeout(() => { goTo('/equip'); }, 2000);
    } else if (lower.includes('scheme') || lower.includes('yojana')) {
      const reply = t('bot_scheme_action');
      addBot(reply);
      speak(reply);
      setTimeout(() => { goTo('/learn'); }, 2000);
    } else {
      setIsLoading(true);
      const reply = await callAI(text);
      setIsLoading(false);
      addBot(reply);
      speak(reply);
    }
  };

  const handleSend = async (text) => {
    if (!text?.trim()) return;
    setMessages(p => [...p, { id: Date.now(), sender: 'user', text }]);
    setInput('');
    await processIntent(text);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice not supported. Type your question below!');
      return;
    }
    if (isListening) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-IN';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      const t2 = e.results[0][0].transcript;
      setInput(t2);
      handleSend(t2);
    };
    rec.onerror = rec.onend = () => setIsListening(false);
    rec.start();
  };

  return (
    <div style={{
      background: 'white', borderRadius: '20px', border: '1px solid #f3f4f6',
      display: 'flex', flexDirection: 'column',
      height: 'calc(100vh - 160px)', minHeight: '480px',
      overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a, #166534)',
        padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '14px',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
          }}>🤖</div>
          {isListening && (
            <span style={{
              position: 'absolute', top: -2, right: -2,
              width: 12, height: 12, borderRadius: '50%', background: '#ef4444',
              animation: 'ping 1s infinite',
            }} />
          )}
        </div>
        <div>
          <h2 style={{ color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px', marginBottom: '2px' }}>
            {t('ask_krishi')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
            {isListening ? '🎤 Listening…' : 'Your AI farm assistant'}
          </p>
        </div>
        <div style={{
          marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%',
          background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.6)',
        }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fafffe' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                padding: '14px 18px', fontSize: '15px', lineHeight: 1.6,
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : 'white',
                color: msg.sender === 'user' ? 'white' : '#111827',
                boxShadow: msg.sender === 'user'
                  ? '0 4px 16px rgba(34,197,94,0.25)'
                  : '0 2px 8px rgba(0,0,0,0.07)',
                border: msg.sender === 'bot' ? '1px solid #f3f4f6' : 'none',
              }}>
                {msg.text}
              </div>
              {msg.widget === 'weather' && (
                <div style={{
                  background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px',
                  padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.1)',
                }}>
                  <Sun size={32} color="#fbbf24" />
                  <div>
                    <p style={{ fontWeight: 800, color: '#1e40af', fontSize: '18px', fontFamily: 'Outfit, sans-serif' }}>24°C</p>
                    <p style={{ color: '#3b82f6', fontSize: '13px' }}>Rain expected tomorrow</p>
                  </div>
                  <CloudRain size={20} color="#60a5fa" style={{ marginLeft: 'auto' }} />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              background: 'white', border: '1px solid #f3f4f6',
              borderRadius: '18px 18px 18px 4px', padding: '14px 18px',
              display: 'flex', gap: '6px', alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                  animation: 'bounce-soft 1s infinite',
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #f3f4f6', background: 'white' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={toggleVoice}
            style={{
              width: 52, height: 52, borderRadius: '14px',
              background: isListening
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isListening ? '0 4px 16px rgba(239,68,68,0.35)' : '0 2px 8px rgba(34,197,94,0.15)',
              transition: 'all 0.2s', flexShrink: 0,
              transform: isListening ? 'scale(1.05)' : 'none',
            }}
          >
            <Mic size={22} color={isListening ? 'white' : '#16a34a'} />
          </button>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder={isListening ? '🎤 Listening…' : t('voice_hint')}
            style={{
              flex: 1, padding: '14px 18px',
              background: '#f9fafb', border: '2px solid #f3f4f6',
              borderRadius: '14px', fontSize: '15px', color: '#111827',
              outline: 'none', fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}
            onFocus={e => { e.target.style.border = '2px solid #22c55e'; e.target.style.background = 'white'; }}
            onBlur={e => { e.target.style.border = '2px solid #f3f4f6'; e.target.style.background = '#f9fafb'; }}
          />
          <button
            onClick={() => handleSend(input)}
            style={{
              width: 52, height: 52, borderRadius: '14px',
              background: input.trim()
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : '#f3f4f6',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: input.trim() ? '0 4px 14px rgba(34,197,94,0.3)' : 'none',
              transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            <Send size={20} color={input.trim() ? 'white' : '#d1d5db'} />
          </button>
        </div>
      </div>
    </div>
  );
}
