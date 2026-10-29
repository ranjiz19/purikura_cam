import React, { useEffect, useState } from 'react';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function FinishScreen({
  finalStripDataUrl,
  onRestart,
  driveLink,
  onOpenDrive
}) {
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    sfx.playSuccess();
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.5 }
    });
  }, []);

  function handleDownload() {
    sfx.playSuccess();
    const link = document.createElement('a');
    link.download = `puzora-${Date.now()}.png`;
    link.href = finalStripDataUrl;
    link.click();
  }

  async function handleCopyImage() {
    sfx.playClick();
    try {
      const response = await fetch(finalStripDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopiedToast(true);
      sfx.playSuccess();
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      // Fallback: download if clipboard API is restricted
      handleDownload();
    }
  }

  return (
    <section className="finish-section">
      <div className="finish-card kawaii-card">
        <div className="finish-header">
          <span className="kawaii-badge">STRIP FOTO SELESAI • PUZORA STUDIO</span>
          <h2 className="finish-title">Foto Strip Siap Diunduh</h2>
          <p className="finish-desc">Hasil foto dan dekorasi kreasi Anda telah selesai diproses.</p>
        </div>

        {/* Cloud Storage Status Banner if Saved */}
        {driveLink && (
          <div className="finish-cloud-banner">
            <span className="material-symbols-outlined text-emerald-600 text-sm">cloud_done</span>
            <span>Tersimpan di Google Drive:</span>
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="finish-drive-link"
            >
              Buka di Drive ↗
            </a>
          </div>
        )}

        <div className="finish-preview-box">
          <img src={finalStripDataUrl} alt="Hasil Foto PUZORA Strip" className="finish-strip-img" />
        </div>

        {/* Copy Image Toast Notification */}
        {copiedToast && (
          <div className="finish-toast-pill">
            <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
            <span>Gambar berhasil disalin ke clipboard! Siap di-paste ke chat / medsos.</span>
          </div>
        )}

        <div className="finish-actions-row">
          <button className="btn-kawaii btn-primary btn-lg" onClick={handleDownload} title="Download format PNG resolusi tinggi">
            <span className="material-symbols-outlined">download</span>
            <span>Download Foto HD (PNG)</span>
          </button>

          <button className="btn-kawaii btn-secondary btn-lg" onClick={handleCopyImage} title="Salin gambar langsung ke clipboard">
            <span className="material-symbols-outlined">content_copy</span>
            <span>Salin Gambar</span>
          </button>

          {onOpenDrive && (
            <button
              className="btn-kawaii btn-secondary btn-lg"
              onClick={() => {
                sfx.playClick();
                onOpenDrive();
              }}
              title="Simpan foto ke Google Drive"
            >
              <span className="material-symbols-outlined">cloud_upload</span>
              <span>{driveLink ? 'Kelola Drive' : 'Simpan ke Drive'}</span>
            </button>
          )}

          <button className="btn-kawaii btn-secondary btn-lg btn-restart-booth" onClick={onRestart} title="Mulai sesi foto baru dari awal">
            <span className="material-symbols-outlined">replay</span>
            <span>Sesi Baru</span>
          </button>
        </div>
      </div>
    </section>
  );
}
