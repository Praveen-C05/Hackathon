import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AppShell from './pages/AppShell.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');

  return (
    <Routes>
      <Route path="/"      element={<LandingPage />} />
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/app" replace />
            : <LoginPage setUser={setUser} lang={lang} setLang={setLang} />
        }
      />
      <Route
        path="/app/*"
        element={
          user
            ? <AppShell user={user} setUser={setUser} lang={lang} setLang={setLang} />
            : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
