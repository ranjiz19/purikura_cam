import React from 'react';
import { sfx } from '../utils/audio';
import { translations } from '../utils/i18n';

export default function Header({
  isMuted,
  onToggleMute,
  onOpenGuide,
  lang = 'id'
}) {
  const t = translations[lang] || translations.id;

  return (
    <div className="kawaii-header-wrap">
      <header className="kawaii-header">
        <div className="header-brand">
          <a href="#hero" className="brand-logo-link">
            <div className="brand-logo-icon">
              <span className="material-symbols-outlined">photo_camera_front</span>
            </div>
            <div className="brand-texts">
              <div className="brand-title-wrap">
                <h1 className="brand-title">Purikura Studio</h1>
              </div>
              <span className="brand-tagline">{t.header.tagline}</span>
            </div>
          </a>
        </div>

        {/* Clean Modern Nav Links */}
        <nav className="header-nav">
          <a href="#hero" className="nav-link">
            <span>{t.nav.home}</span>
          </a>
          <a href="#how-it-works" className="nav-link">
            <span>{t.nav.howItWorks}</span>
          </a>
          <a href="#features" className="nav-link">
            <span>{t.nav.features}</span>
          </a>
          <a href="#contact" className="nav-link">
            <span>{t.nav.contact}</span>
          </a>
        </nav>

        <div className="header-actions">
          {/* Audio Mute Toggle */}
          <button
            className="btn-header"
            onClick={() => {
              onToggleMute();
              sfx.playClick();
            }}
            title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
          >
            <span className="material-symbols-outlined text-[17px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            <span className="btn-text">{isMuted ? t.header.soundMuted : t.header.soundOn}</span>
          </button>

          {/* Gesture Guide Button */}
          {onOpenGuide && (
            <button
              className="btn-header btn-guide"
              onClick={() => {
                sfx.playClick();
                onOpenGuide();
              }}
              title="Panduan Sensor Gestur Tangan"
            >
              <span className="material-symbols-outlined text-[17px]">pan_tool</span>
              <span className="btn-text">{t.header.guide}</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
