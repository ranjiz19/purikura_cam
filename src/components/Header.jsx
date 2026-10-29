import React from 'react';
import { sfx } from '../utils/audio';
import { translations } from '../utils/i18n';

export default function Header({
  aiStatus,
  isMuted,
  onToggleMute,
  onOpenGuide,
  lang = 'id',
  onSetLang
}) {
  const t = translations[lang] || translations.id;

  return (
    <div className="kawaii-header-wrap">
      <header className="kawaii-header">
        <div className="header-brand">
          <a href="#hero" className="brand-logo-link">
            <div className="brand-logo-icon">
              <span className="material-symbols-outlined">flare</span>
            </div>
            <div className="brand-texts">
              <div className="brand-title-wrap">
                <h1 className="brand-title">Purikura Studio</h1>
                <span className="brand-kanji-pill">青春高校</span>
              </div>
              <span className="brand-tagline">{t.header.tagline}</span>
            </div>
          </a>
        </div>

        {/* Clean Modern Nav Links with Japanese Charm */}
        <nav className="header-nav">
          <a href="#hero" className="nav-link">
            <span>{t.nav.home}</span>
            <span className="nav-jp-sub">ホーム</span>
          </a>
          <a href="#how-it-works" className="nav-link">
            <span>{t.nav.howItWorks}</span>
            <span className="nav-jp-sub">遊び方</span>
          </a>
          <a href="#setup" className="nav-link">
            <span>{t.nav.booth}</span>
            <span className="nav-jp-sub">ブース</span>
          </a>
          <a href="#features" className="nav-link">
            <span>{t.nav.features}</span>
            <span className="nav-jp-sub">機能</span>
          </a>
          <a href="#contact" className="nav-link">
            <span>{t.nav.contact}</span>
            <span className="nav-jp-sub">連絡</span>
          </a>
        </nav>

        <div className="header-actions">
          {/* Language Selector / Detect Language Pill (ID / 日本語 / EN) */}
          <div className="lang-switcher-pill" title="Pilih Bahasa / 言語選択 / Language">
            <span className="material-symbols-outlined lang-icon">translate</span>
            <div className="lang-options">
              <button
                className={`btn-lang ${lang === 'id' ? 'active' : ''}`}
                onClick={() => {
                  sfx.playClick();
                  onSetLang && onSetLang('id');
                }}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="lang-divider">|</span>
              <button
                className={`btn-lang ${lang === 'jp' ? 'active' : ''}`}
                onClick={() => {
                  sfx.playClick();
                  onSetLang && onSetLang('jp');
                }}
                title="日本語 (Japanese)"
              >
                JP
              </button>
              <span className="lang-divider">|</span>
              <button
                className={`btn-lang ${lang === 'en' ? 'active' : ''}`}
                onClick={() => {
                  sfx.playClick();
                  onSetLang && onSetLang('en');
                }}
                title="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* AI Status Badge with Radar Ping */}
          <div className={`ai-status-pill status-${aiStatus.type}`} title={`Vision AI Sensor: ${aiStatus.text}`}>
            <span className="status-radar">
              <span className="radar-ping"></span>
              <span className="status-dot"></span>
            </span>
            <span className="status-label">{aiStatus.text}</span>
          </div>

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
        </div>
      </header>
    </div>
  );
}
