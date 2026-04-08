import React, { useRef, useState, useEffect } from 'react';
import { Camera, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function CameraCapture({ onCapture, t }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCamera = async () => {
    setError(false);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      setError(true);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const handleCapture = () => {
    if (error) {
      // Fallback mock image
      const mock = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZmRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI4IiBmaWxsPSIjMTZhMzRhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+MviBNb2NrIFBob3RvPC90ZXh0Pjwvc3ZnPg==';
      setImage(mock);
      onCapture(mock);
      return;
    }
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setImage(dataUrl);
    onCapture(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setImage(null);
    onCapture(null);
    startCamera();
  };

  /* ── Preview (captured) ── */
  if (image) {
    return (
      <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '2px solid #22c55e' }}>
        <img
          src={image}
          alt="Captured"
          style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(22,163,74,0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '100px', padding: '4px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <CheckCircle size={14} color="white" />
          <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>Verified</span>
        </div>
        <button
          type="button"
          onClick={handleRetake}
          style={{
            position: 'absolute', bottom: '10px', right: '10px',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            border: 'none', borderRadius: '10px',
            padding: '8px 14px',
            color: 'white', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.65)'}
        >
          <Camera size={14} />
          {t('retake_photo')}
        </button>
      </div>
    );
  }

  /* ── Live camera / fallback ── */
  return (
    <div style={{
      position: 'relative', borderRadius: '14px', overflow: 'hidden',
      background: '#111827', height: '180px',
      border: '2px dashed #d1d5db',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {error ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
          <ImageIcon size={32} style={{ opacity: 0.5, marginBottom: '8px' }} />
          <p style={{ fontSize: '13px', lineHeight: 1.5 }}>
            Camera unavailable.<br />Click below for a mock photo.
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
        />
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        type="button"
        onClick={handleCapture}
        style={{
          position: 'absolute', bottom: '12px',
          background: 'white',
          border: 'none', borderRadius: '100px',
          padding: '10px 22px',
          color: '#111827', fontWeight: 700, fontSize: '14px',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.transform = 'scale(1.04)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; }}
      >
        <Camera size={16} color="#16a34a" />
        {t('take_photo')}
      </button>
    </div>
  );
}
