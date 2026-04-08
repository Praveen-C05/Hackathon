import React, { useState } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { LEARNING_CONTENT } from '../../constants.js';

const TYPE_STYLES = {
  Scheme:  { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  Article: { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  Video:   { bg: '#fdf4ff', color: '#9333ea', border: '#e9d5ff' },
};

export default function LearningHub({ t }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a, #166534)',
        borderRadius: '20px', padding: '28px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '16px',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px',
        }}>📚</div>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '22px', color: 'white', marginBottom: '4px' }}>
            {t('learning_hub')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Schemes, articles & guides for farmers
          </p>
        </div>
      </div>

      {/* Content list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {LEARNING_CONTENT.map(item => {
          const ts = TYPE_STYLES[item.type] || TYPE_STYLES.Article;
          return (
            <div
              key={item.id}
              onClick={() => setSelected(selected === item.id ? null : item.id)}
              style={{
                background: 'white', border: '1px solid #f3f4f6',
                borderRadius: '16px', padding: '20px',
                cursor: 'pointer', transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px', fontSize: '26px',
                  background: ts.bg, border: `1px solid ${ts.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <span style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: '100px',
                    fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`,
                  }}>
                    {item.type}
                  </span>
                </div>
                <ChevronRight size={18} color="#d1d5db" style={{
                  flexShrink: 0,
                  transform: selected === item.id ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }} />
              </div>

              {selected === item.id && (
                <div style={{
                  marginTop: '16px', paddingTop: '16px',
                  borderTop: '1px solid #f3f4f6',
                  color: '#6b7280', fontSize: '15px', lineHeight: 1.7,
                  animation: 'fadeIn 0.3s ease',
                }}>
                  <p>
                    This {item.type.toLowerCase()} provides detailed guidance on{' '}
                    <strong style={{ color: '#111827' }}>{item.title}</strong>.
                    Click "Learn More" below to access the full content and apply for benefits.
                  </p>
                  <button style={{
                    marginTop: '14px', padding: '10px 20px',
                    background: ts.bg, color: ts.color,
                    border: `1px solid ${ts.border}`,
                    borderRadius: '10px', fontWeight: 700, fontSize: '14px',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <BookOpen size={15} /> Learn More
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Highlight CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #fef9c3, #fef3c7)',
        border: '1px solid #fde68a', borderRadius: '16px', padding: '20px',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
        <div style={{ fontSize: '36px' }}>💡</div>
        <div>
          <h4 style={{ fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>Need help applying?</h4>
          <p style={{ color: '#b45309', fontSize: '14px' }}>Ask the AI assistant — just say "show schemes" in your language!</p>
        </div>
      </div>
    </div>
  );
}
