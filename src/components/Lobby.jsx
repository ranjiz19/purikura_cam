import React from 'react';
import { sfx } from '../utils/audio';
import { translations } from '../utils/i18n';

export default function Lobby({
  layout,
  setLayout,
  minigameMode,
  setMinigameMode,
  onStart,
  lang = 'id'
}) {
  const t = translations[lang] || translations.id;

  return (
    <div className="lobby-page-wrapper">
      {/* 1. Hero Introduction with Japanese Purikura Theme & Floating Polaroids */}
      <section className="lobby-hero-banner" id="hero">
        {/* Floating polaroids decoration styled like Japanese Purikura strips */}
        <div className="hero-floating-decor">
          <div className="floating-polaroid polaroid-left">
            <div className="polaroid-photo polaroid-purikura-left">
              <div className="purikura-sample-badge">セーラー服 🏫</div>
              <span className="material-symbols-outlined polaroid-placeholder-icon">school</span>
            </div>
            <span className="polaroid-caption">{t.hero.polaroidLeft}</span>
          </div>

          <div className="floating-polaroid polaroid-right">
            <div className="polaroid-photo polaroid-purikura-right">
              <div className="purikura-sample-badge">放課後 3x3 🎓</div>
              <span className="material-symbols-outlined polaroid-placeholder-icon">menu_book</span>
            </div>
            <span className="polaroid-caption">{t.hero.polaroidRight}</span>
          </div>
        </div>

        {/* Central Paper Card with Japanese Kawaii Flare */}
        <div className="hero-paper-card">
          <div className="hero-tagline-badge">
            <span className="material-symbols-outlined text-[15px]">school</span>
            <span>{t.hero.badge}</span>
          </div>

          <div className="hero-title-group">
            <h1 className="hero-main-title">
              {t.hero.title}
            </h1>
            <span className="hero-kanji-sub">{t.hero.titleJp}</span>
          </div>

          <div className="hero-divider-wrap">
            <span className="hero-line"></span>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <span className="hero-line"></span>
          </div>

          <button
            id="landingStartBtn"
            className="hero-start-cta btn-primary-gradient"
            onClick={() => {
              sfx.playSuccess();
              onStart();
            }}
          >
            <span className="btn-cta-text">{t.hero.cta}</span>
            <span className="material-symbols-outlined btn-cta-icon">photo_camera_front</span>
          </button>

          <div className="hero-meta-chips">
            {t.hero.chips.map((chip, idx) => (
              <div key={idx} className="meta-chip">
                <span className="material-symbols-outlined text-sm">
                  {idx === 0 ? 'auto_awesome' : idx === 1 ? 'local_florist' : 'extension'}
                </span>
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Setup Photobooth Section */}
      <section className="lobby-section" id="setup">
        <div className="lobby-grid">
          {/* Left: Setup Configuration */}
          <div className="paper-card setup-card">
            <div className="card-header">
              <span className="card-badge">{t.setup.stepBadge}</span>
              <h2 className="card-title">{t.setup.title}</h2>
              <p className="card-desc">{t.setup.desc}</p>
            </div>

            {/* Layout Selection */}
            <div className="form-group">
              <label className="group-label">
                <span className="material-symbols-outlined text-[16px] align-middle mr-1">view_day</span>
                {t.setup.layoutLabel}
              </label>
              <div className="options-grid">
                {t.layouts.map(item => (
                  <button
                    key={item.id}
                    className={`option-chip ${layout === item.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setLayout(item.id);
                    }}
                  >
                    <span className="chip-icon-box">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </span>
                    <div className="chip-texts">
                      <span className="chip-title">{item.title}</span>
                      <span className="chip-sub">{item.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Minigame Selection */}
            <div className="form-group">
              <label className="group-label">
                <span className="material-symbols-outlined text-[16px] align-middle mr-1">sports_esports</span>
                {t.setup.minigameLabel}
              </label>
              <div className="options-grid minigame-grid">
                {t.minigames.map(mg => (
                  <button
                    key={mg.id}
                    className={`option-chip ${minigameMode === mg.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setMinigameMode(mg.id);
                    }}
                  >
                    <span className="chip-icon-box">
                      <span className="material-symbols-outlined">{mg.icon}</span>
                    </span>
                    <div className="chip-texts">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="chip-title">{mg.title}</span>
                        <span className="micro-tag">{mg.tag}</span>
                      </div>
                      <span className="chip-sub">{mg.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Callout */}
            <div className="lobby-info-callout">
              <span className="material-symbols-outlined callout-icon">flare</span>
              <div className="callout-text">
                <strong>{t.setup.calloutTitle}</strong>
                <p>{t.setup.calloutDesc}</p>
              </div>
            </div>

            {/* Start CTA */}
            <button
              className="hero-start-cta btn-primary-gradient w-full-btn"
              onClick={() => {
                sfx.playSuccess();
                onStart();
              }}
            >
              <span className="btn-cta-text">{t.setup.startBtn}</span>
              <span className="material-symbols-outlined btn-cta-icon">photo_camera_front</span>
            </button>
          </div>

          {/* Right: Japanese ATM Gesture Showcase */}
          <div className="paper-card showcase-card">
            <div className="card-header">
              <span className="card-badge">{t.showcase.badge}</span>
              <h2 className="card-title">{t.showcase.title}</h2>
              <p className="card-desc">{t.showcase.desc}</p>
            </div>

            <div className="features-vertical-list">
              {t.showcase.items.map((item, idx) => (
                <div key={idx} className="feature-item">
                  <span className="feature-icon-box">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </span>
                  <div className="feature-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="showcase-decor-box">
              <span className="material-symbols-outlined text-sm align-middle mr-1">local_florist</span>
              <span>{t.showcase.footerBadge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
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

      {/* 4. Key Features Section */}
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

      {/* 5. Contact Section */}
      <section className="lobby-content-section contact-section" id="contact">
        <div className="contact-card-container">
          <div className="contact-paper-card paper-card">
            <span className="material-symbols-outlined contact-icon-large">mail</span>
            <span className="section-badge">{t.contact.badge}</span>
            <h2 className="contact-title">{t.contact.title}</h2>
            <p className="contact-desc">{t.contact.desc}</p>

            <div className="contact-links-grid">
              <a
                href="https://www.instagram.com/devitaizhal_?igsh=MWs4Y2pnejQ0M3E3Yg=="
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-btn btn-instagram"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                <span className="contact-text">{t.contact.instagram}</span>
              </a>

              <a
                href="mailto:hello@purikurastudio.com"
                className="contact-pill-btn btn-email"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span className="contact-text">{t.contact.email}</span>
              </a>

              <a
                href="https://github.com/Shafira0605/puzzle_cam.git"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-btn btn-github"
              >
                <span className="material-symbols-outlined text-sm">code</span>
                <span className="contact-text">{t.contact.github}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Website Footer */}
      <footer className="lobby-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="material-symbols-outlined align-middle mr-1 text-sm">local_florist</span>
              {t.footer.logo}
            </span>
            <p className="footer-tagline">
              {t.footer.tagline}
            </p>
          </div>

          <div className="footer-nav">
            <a href="#hero">{t.nav.home}</a>
            <a href="#how-it-works">{t.nav.howItWorks}</a>
            <a href="#setup">{t.nav.booth}</a>
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
    </div>
  );
}
