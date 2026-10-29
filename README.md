# PUZORA — Interactive AI Photobooth & Gesture Air Puzzle

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Tasks_Vision-0097A7?style=flat-square&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas_2D-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_Synth-orange?style=flat-square)](https://developer.mozilla.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**PUZORA** adalah aplikasi bilik foto (*photobooth*) interaktif berbasis **React.js + Vite** yang dikendalikan tanpa sentuhan menggunakan gestur tangan AI (**Google MediaPipe Hands**). Aplikasi ini memadukan pengalaman bilik foto modern, minigame penyusunan puzzle kepingan foto 3x3 di udara (*air gesture puzzle*), studio dekorasi stiker & filter, serta ekspor strip foto beresolusi tinggi (HD).

---

## 🌟 Fitur Utama

- 📸 **Jepret Foto Hands-Free**: Deteksi gestur tangan otomatis menggunakan AI vision lokal untuk memicu hitung mundur foto 3 detik tanpa menyentuh keyboard atau mouse.
- 🧩 **3x3 Air Gesture Puzzle**: Kepingan foto teracak ke dalam grid 3x3. Pemain menyusun pecahan foto di udara dengan gestur mencubit (*Pinch*) lalu mengunci hasil puzzle dengan kepalan tangan (*Fist*).
- 🎨 **Studio Dekorasi Kreatif**: Pilihan beragam tema bingkai estetik (Classic Navy, Royal Gold, Slate Chalkboard, Diary Notebook, Rooftop Sky, Navy Silver), filter warna sinematik, stiker visual, dan kuas warna.
- 🔊 **Synthesizer Audio Prosedural**: Efek suara interaktif (*click*, *shutter*, *pop*, *snap*, *celebration chime*) disintesis langsung menggunakan Web Audio API tanpa ketergantungan file audio eksternal.
- 💾 **Ekspor Strip Foto HD & Google Drive**: Unduh hasil foto strip berkualitas tinggi siap cetak atau integrasikan ke Google Drive via webhook.

---

## 🕹️ Panduan Kontrol Gestur Tangan

1. **Pengambilan Foto (Camera Shutter):**
   - 🫶 **Hand Frame:** Bentuk bingkai kotak menggunakan kedua tangan di depan kamera untuk memicu hitung mundur foto 3 detik.
   - ✌️ **Peace Sign (V):** Angkat tanda dua jari untuk memicu hitung mundur satu tangan.
2. **Minigame Puzzle (Air Gesture):**
   - 🤏 **Pinch to Drag:** Satukan ujung telunjuk dan jempol di atas kepingan puzzle untuk mengangkat dan memindahkannya ke slot yang tepat.
   - ✊ **Fist to Lock:** Kepalkan tangan selama ~1 detik setelah puzzle tersusun untuk mengunci dan menyimpan foto.
   - ⚡ **Tombol Pintas:** Tersedia opsi instan untuk langsung menyelesaikan atau melewati puzzle menuju studio dekorasi.

---

## 🚀 Cara Menjalankan

### Persyaratan
- Node.js v18 atau lebih baru.
- Peramban web modern (Google Chrome, Microsoft Edge, Brave) dengan akses webcam.

### Instalasi & Menjalankan Dev Server
```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server lokal
npm run dev
```

Buka peramban di `http://localhost:5173` dan izinkan akses kamera webcam saat diminta.

### Build Produksi
```bash
npm run build
```
Hasil build siap deploy akan tersedia di folder `dist/`.

---

## 🛠️ Stack Teknologi

- **Frontend Core**: React 19, Vite 8
- **Vision AI**: `@mediapipe/tasks-vision` (Google MediaPipe Hands)
- **Graphic Rendering**: HTML5 Canvas 2D API
- **Audio**: Web Audio API (Synthesizer Prosedural)
- **Effects**: Canvas Confetti
- **Typography & Icons**: Plus Jakarta Sans, Outfit, Material Symbols
