import React, { useState } from 'react';
import { sfx } from '../utils/audio';
import { translations } from '../utils/i18n';

export default function Lobby({
  layout,
  setLayout,
  minigameMode,
  setMinigameMode,
  onStart,
  lang = 'id',
  isConfigModalOpen,
  setIsConfigModalOpen
}) {
  const t = translations[lang] || translations.id;
  // Local state fallback if not controlled by parent
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const modalOpen = isConfigModalOpen !== undefined ? isConfigModalOpen : localModalOpen;
  const setModalOpen = setIsConfigModalOpen || setLocalModalOpen;

  function handleConfirmStart() {
    sfx.playSuccess();
    setModalOpen(false);
    onStart();
  }

  return (
    <div className="lobby-page-wrapper">
      {/* 1. Hero Banner with Modern Aesthetic */}
      <section className="lobby-hero-banner" id="hero">
        {/* Floating polaroids decoration styled like Japanese Purikura strips */}
        <div className="hero-floating-decor">
          <div className="floating-polaroid polaroid-left">
            <div className="polaroid-photo polaroid-purikura-left">
              <div className="purikura-sample-badge">Classic Navy</div>
              <span className="material-symbols-outlined polaroid-placeholder-icon">photo_camera</span>
            </div>
            <span className="polaroid-caption">{t.hero.polaroidLeft}</span>
          </div>

          <div className="floating-polaroid polaroid-right">
            <div className="polaroid-photo polaroid-purikura-right">
              <div className="purikura-sample-badge">Air Puzzle 3x3</div>
              <span className="material-symbols-outlined polaroid-placeholder-icon">extension</span>
            </div>
            <span className="polaroid-caption">{t.hero.polaroidRight}</span>
          </div>
        </div>

        {/* Central Paper Card with Modern Theme */}
        <div className="hero-paper-card">
          <div className="hero-tagline-badge">
            <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
            <span>{t.hero.badge}</span>
          </div>

          <div className="hero-title-group">
            <h1 className="hero-main-title">
              {t.hero.title}
            </h1>
          </div>

          <div className="hero-divider-wrap">
            <span className="hero-line"></span>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <span className="hero-line"></span>
          </div>

          {/* Primary CTA: Opens Setup Modal */}
          <button
            id="landingStartBtn"
            className="hero-start-cta btn-primary-gradient"
            onClick={() => {
              sfx.playClick();
              setModalOpen(true);
            }}
          >
            <span className="btn-cta-text">{t.hero.cta}</span>
            <span className="material-symbols-outlined btn-cta-icon">photo_camera_front</span>
          </button>

          <div className="hero-meta-chips">
            {t.hero.chips.map((chip, idx) => (
              <div key={idx} className="meta-chip">
                <span className="material-symbols-outlined text-sm">
                  {idx === 0 ? 'auto_awesome' : idx === 1 ? 'school' : 'extension'}
                </span>
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="lobby-content-section" id="how-it-works">
        <div className="section-title-wrap">
          <span className="section-badge">{t.howItWorks.badge}</span>
          <h2 className="section-heading">{t.howItWorks.heading}</h2>
          <p className="section-subheading">
            {t.howItWorks.subheading}
          </p>
        </div>

        <div className="how-it-works-grid">
          {t.howItWorks.steps.map((item, idx) => (
            <div key={idx} className="step-card paper-card">
              <div className="step-card-top">
                <span className="step-number">{item.step}</span>
                <div className="step-icon-box">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
              </div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Key Features Section */}
      <section className="lobby-content-section" id="features">
        <div className="section-title-wrap">
          <span className="section-badge">{t.features.badge}</span>
          <h2 className="section-heading">{t.features.heading}</h2>
          <p className="section-subheading">
            {t.features.subheading}
          </p>
        </div>

        <div className="features-grid-cards">
          {t.features.items.map((feat, idx) => (
            <div key={idx} className="feature-card-detailed paper-card">
              <div className="feature-card-icon">
                <span className="material-symbols-outlined">{feat.icon}</span>
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact Section */}
      <section className="lobby-content-section contact-section" id="contact">
        <div className="contact-card-container">
          <div className="contact-paper-card paper-card">
            <span className="material-symbols-outlined contact-icon-large">mail</span>
            <span className="section-badge">{t.contact.badge}</span>
            <h2 className="contact-title">{t.contact.title}</h2>
            <p className="contact-desc">{t.contact.desc}</p>

            <div className="contact-links-grid">
              <a
                href="https://www.instagram.com/rafinurajiz/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-btn btn-instagram"
                title="Instagram @rafinurajiz"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                <span className="contact-text">{t.contact.instagram}</span>
              </a>

              <a
                href="mailto:rafinurajiz19@gmail.com"
                className="contact-pill-btn btn-email"
                title="Email rafinurajiz19@gmail.com"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span className="contact-text">{t.contact.email}</span>
              </a>

              <a
                href="https://github.com/ranjiz19/purikura_cam"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-btn btn-github"
                title="GitHub ranjiz19/purikura_cam"
              >
                <span className="material-symbols-outlined text-sm">code</span>
                <span className="contact-text">{t.contact.github}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Website Footer */}
      <footer className="lobby-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="material-symbols-outlined align-middle mr-1 text-sm">auto_awesome</span>
              PUZORA
            </span>
            <p className="footer-tagline">
              Modern Interactive Photobooth & Gesture Air Puzzle — Abadikan momen berhargamu dengan kendali gestur tangan canggih.
            </p>
          </div>

          <div className="footer-nav">
            <a href="#hero">{t.nav.home}</a>
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <button
              className="footer-nav-btn"
              onClick={() => {
                sfx.playClick();
                setModalOpen(true);
              }}
            >
              Bilik Foto
            </button>
            <a href="#features">{t.nav.features}</a>
            <a href="#contact">{t.nav.contact}</a>
            <button
              className="btn-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="material-symbols-outlined text-xs align-middle">arrow_upward</span> {t.footer.top}
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer.copy}</span>
        </div>
      </footer>

      {/* ================= POPUP / MODAL PENGATURAN BILIK FOTO ================= */}
      {modalOpen && (
        <div className="config-modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="config-modal-card kawaii-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="config-modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-badge">
                  <span className="material-symbols-outlined">tune</span>
                </div>
                <div>
                  <h3 className="config-dialog-title">Pengaturan Bilik Foto</h3>
                  <p className="config-dialog-subtitle">Pilih format cetak strip & alur minigame sebelum mulai</p>
                </div>
              </div>
              <button
                className="btn-modal-close"
                onClick={() => {
                  sfx.playClick();
                  setModalOpen(false);
                }}
                aria-label="Tutup"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="config-modal-body">
              {/* Option 1: Format Strip Foto */}
              <div className="config-group">
                <div className="config-group-header">
                  <span className="config-step-num">1</span>
                  <label className="config-label">Pilih Format Strip Foto</label>
                </div>
                <div className="config-layout-grid">
                  {t.layouts.map((item) => {
                    const isSelected = layout === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`config-layout-card ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          sfx.playClick();
                          setLayout(item.id);
                        }}
                      >
                        <div className="layout-card-icon-wrap">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div className="layout-card-texts">
                          <span className="layout-card-title">{item.title}</span>
                          <span className="layout-card-sub">{item.sub}</span>
                        </div>
                        <div className="layout-card-check">
                          <span className="material-symbols-outlined">
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 2: Minigame Mode */}
              <div className="config-group">
                <div className="config-group-header">
                  <span className="config-step-num">2</span>
                  <label className="config-label">Pilihan Alur (Minigame)</label>
                </div>
                <div className="config-minigame-grid">
                  {t.minigames.map((mg) => {
                    const isSelected = minigameMode === mg.id;
                    return (
                      <button
                        key={mg.id}
                        type="button"
                        className={`config-minigame-card ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          sfx.playClick();
                          setMinigameMode(mg.id);
                        }}
                      >
                        <div className="minigame-card-icon-wrap">
                          <span className="material-symbols-outlined">{mg.icon}</span>
                        </div>
                        <div className="minigame-card-texts">
                          <div className="minigame-card-headline">
                            <span className="minigame-card-title">{mg.title}</span>
                            <span className={`micro-tag-clean ${mg.id === 'puzzle' ? 'tag-primary' : 'tag-neutral'}`}>{mg.tag}</span>
                          </div>
                          <span className="minigame-card-sub">{mg.sub}</span>
                        </div>
                        <div className="minigame-card-check">
                          <span className="material-symbols-outlined">
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Info Note */}
              <div className="config-note-box">
                <span className="material-symbols-outlined note-icon">palette</span>
                <span>
                  Bingkai tema estetik & stiker kreatif dapat kamu pilih dan hias di Studio Dekorasi setelah sesi foto selesai.
                </span>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="config-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => {
                  sfx.playClick();
                  setModalOpen(false);
                }}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-kawaii btn-primary btn-modal-start"
                onClick={handleConfirmStart}
              >
                <span className="material-symbols-outlined">photo_camera</span>
                <span>Mulai Sesi Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
