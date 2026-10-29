import React from 'react';
import { sfx } from '../utils/audio';

export default function GestureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card kawaii-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <span className="kawaii-badge">VISION AI GESTURE CONTROL</span>
            <h2 className="modal-title">Panduan Sensor Gestur Tangan AI</h2>
          </div>
          <button
            className="btn-close-modal"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            aria-label="Tutup Panduan"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="gesture-grid">
            {/* 1. Frame Gesture */}
            <div className="gesture-card highlighted">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">🫶</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">UTAMA • AMBIL FOTO</div>
                <h3 className="gesture-title">Bingkai Dua Tangan (Hand Frame)</h3>
                <p className="gesture-desc">
                  Bentuk bingkai kotak di depan kamera menggunakan telunjuk dan jempol kedua tanganmu. Kamera otomatis menghitung mundur 3 detik untuk mengambil foto!
                </p>
              </div>
            </div>

            {/* 2. Peace Sign */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">✌️</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">ALTERNATIF • SATU TANGAN</div>
                <h3 className="gesture-title">Pose Peace Sign (V)</h3>
                <p className="gesture-desc">
                  Pose foto klasik favorit! Cukup angkat tanda dua jari (Peace) di depan kamera untuk memicu hitung mundur foto otomatis.
                </p>
              </div>
            </div>

            {/* 3. Pinch Gesture */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">🤏</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">PUZZLE MINIGAME</div>
                <h3 className="gesture-title">Mencubit di Udara (Pinch to Drag)</h3>
                <p className="gesture-desc">
                  Satukan ujung telunjuk dan jempol untuk menjepit kepingan puzzle foto, lalu geser tanganmu di udara untuk memindahkannya ke posisi yang benar.
                </p>
              </div>
            </div>

            {/* 4. Fist Gesture */}
            <div className="gesture-card">
              <div className="gesture-icon-wrap">
                <span className="gesture-emoji">✊</span>
              </div>
              <div className="gesture-info">
                <div className="gesture-tag">KUNCI & SIMPAN</div>
                <h3 className="gesture-title">Kepalan Tangan (Fist Lock)</h3>
                <p className="gesture-desc">
                  Setelah kepingan puzzle tersusun rapi, kepalkan tanganmu dan tahan ~1 detik. Meteran penguncian akan terisi dan foto langsung tersimpan!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-kawaii btn-primary btn-modal-close-action"
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[19px]">check_circle</span>
            <span>Sudah Paham, Tutup Panduan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
