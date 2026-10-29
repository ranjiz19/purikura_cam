// Language dictionary & auto-detection for PUZORA (ID / EN)

export const detectLanguage = () => {
  try {
    const saved = localStorage.getItem('puzora_lang');
    if (saved && ['id', 'en'].includes(saved)) {
      return saved;
    }
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('en')) return 'en';
    return 'id'; // Default Indonesian
  } catch (_) {
    return 'id';
  }
};

export const translations = {
  id: {
    nav: {
      home: 'Beranda',
      howItWorks: 'Cara Main',
      booth: 'Bilik Foto',
      features: 'Fitur AI',
      contact: 'Kontak'
    },
    header: {
      tagline: 'Interactive Photobooth & Gesture Air Puzzle',
      soundOn: 'Suara',
      soundMuted: 'Bisu',
      guide: 'Panduan',
      langSelect: 'Bahasa'
    },
    hero: {
      badge: 'AI PHOTOBOOTH & GESTURE AIR PUZZLE',
      title: 'PUZORA',
      titleJp: 'Interactive Photobooth',
      subtitle: 'Abadikan momen spesialmu dengan bilik foto interaktif bertenaga AI, pecahkan puzzle foto di udara, dan hias strip fotomu dengan berbagai pilihan bingkai estetik.',
      cta: 'MASUK BILIK FOTO',
      chips: [
        'Pure Vision AI (MediaPipe)',
        '3x3 Air Gesture Puzzle',
        'Kualitas Cetak HD'
      ],
      polaroidLeft: 'Aesthetic Strip',
      polaroidRight: 'Air 3x3 Puzzle'
    },
    setup: {
      stepBadge: 'STEP 1 • PENGATURAN AWAL',
      title: 'Setup Bilik Foto',
      desc: 'Pilih format cetak strip foto dan alur minigame sebelum mulai sesi jepret foto.',
      layoutLabel: '1. Format Strip Foto',
      minigameLabel: '2. Pilihan Alur Foto (Minigame)',
      calloutTitle: 'Pemilihan Bingkai & Filter Realtime:',
      calloutDesc: 'Pilihan tema bingkai estetik (Classic Navy, Royal Gold, Slate Chalkboard, Diary Notebook, Rooftop Sky, dan Navy Silver) serta filter warna dapat kamu atur di Studio Dekorasi!',
      startBtn: 'MASUK BILIK FOTO (START BOOTH)'
    },
    layouts: [
      { id: 'strip_3', title: 'Classic 3-Strip', count: 3, icon: 'auto_awesome_motion', sub: '3 Foto Vertikal' },
      { id: 'strip_4', title: 'Arcade 4-Strip', count: 4, icon: 'view_agenda', sub: '4 Foto Vertikal' },
      { id: 'grid_2x2', title: 'Grid 2x2', count: 4, icon: 'grid_view', sub: 'Grid 4 Kuadran' },
      { id: 'polaroid_1', title: 'Solo Polaroid', count: 1, icon: 'crop_portrait', sub: '1 Foto Utama' }
    ],
    minigames: [
      {
        id: 'puzzle',
        title: '3x3 Air Puzzle',
        icon: 'extension',
        tag: 'Rekomendasi',
        sub: 'Susun puzzle foto di udara dengan gestur'
      },
      {
        id: 'skip',
        title: 'Direct Studio',
        icon: 'bolt',
        tag: 'Instan',
        sub: 'Langsung menghias tanpa bermain puzzle'
      }
    ],
    showcase: {
      badge: 'SENSOR GESTUR • KONTROL UDARA',
      title: 'Fitur & Kontrol Tangan',
      desc: 'Kendalikan kamera dan puzzle tanpa menyentuh mouse atau keyboard, murni gestur webcam.',
      items: [
        {
          icon: 'crop_free',
          title: 'Hand Frame / Peace (Bilik Foto)',
          desc: 'Bentuk bingkai kedua tangan (Hand Frame) atau pose Peace untuk shutter otomatis 3 detik.'
        },
        {
          icon: 'pinch',
          title: 'Pinch Drag (Puzzle Minigame)',
          desc: 'Satukan jempol & telunjuk di udara untuk mengangkat dan memindahkan kepingan foto 3x3.'
        },
        {
          icon: 'front_hand',
          title: 'Fist Lock (Kunci & Simpan)',
          desc: 'Kepalkan tangan selama 1 detik setelah kepingan puzzle tersusun untuk mengunci dan menyimpan foto.'
        },
        {
          icon: 'palette',
          title: 'Studio Dekorasi Lengkap',
          desc: 'Hias strip fotomu dengan bingkai estetik, filter warna menarik, stiker kreatif, dan kuas warna.'
        }
      ],
      footerBadge: 'Pure Vision AI Photobooth Experience'
    },
    howItWorks: {
      badge: 'PANDUAN LANGKAH • HOW IT WORKS',
      heading: 'Cara Seru Bermain di PUZORA',
      subheading: 'Cukup gunakan webcam laptop atau perangkat Anda. AI cerdas mengenali gerakan tangan secara instan dan aman di browser lokal.',
      steps: [
        {
          step: '01',
          icon: 'add_a_photo',
          title: 'Pilih Format & Masuk Bilik',
          desc: 'Tentukan format cetak favoritmu (3-Strip, 4-Strip, Grid 2x2, atau Polaroid), lalu tekan Masuk Bilik Foto.'
        },
        {
          step: '02',
          icon: 'pan_tool',
          title: 'Pose & Jepret Otomatis',
          desc: 'Bentuk Hand Frame atau pose Peace. Sensor Vision AI langsung mendeteksi dan menghitung mundur 3 detik tanpa sentuh layar.'
        },
        {
          step: '03',
          icon: 'extension',
          title: 'Susun Puzzle di Udara',
          desc: 'Kepingan foto 3x3 teracak. Satukan jempol & telunjuk (Pinch) di depan kamera untuk menyusun kepingan foto ke slot pas.'
        },
        {
          step: '04',
          icon: 'palette',
          title: 'Hias di Studio & Unduh HD',
          desc: 'Kunci puzzle dengan kepalan tangan (Fist), lalu pilih bingkai estetik, filter warna, stiker menarik, dan unduh strip HD siap cetak.'
        }
      ]
    },
    features: {
      badge: 'TEKNOLOGI AI • SMART VISION',
      heading: 'Keunikan & Fitur Unggulan',
      subheading: 'Menghadirkan pengalaman bilik foto modern dengan sentuhan AI interaktif, dekorasi kreatif, dan kualitas cetak tinggi.',
      items: [
        {
          icon: 'auto_awesome',
          title: 'Pure Vision AI Sensor',
          desc: 'Didukung Google MediaPipe Hands Vision yang berjalan 100% di browser lokal Anda. Privasi terjamin tanpa upload kamera ke server.'
        },
        {
          icon: 'filter_vintage',
          title: '6 Pilihan Tema Bingkai Estetik',
          desc: 'Pilihan Classic Navy, Royal Gold, Slate Chalkboard, Diary Notebook, Rooftop Sky, hingga Navy Silver yang bisa diganti langsung di studio.'
        },
        {
          icon: 'tune',
          title: 'Filter Warna Estetik Realtime',
          desc: 'Sesuaikan tone warna sesukamu: Natural Tone, Aesthetic Blue, Porcelain Glow, Warm Sunset, atau Classic Monokrom.'
        },
        {
          icon: 'ios_share',
          title: 'Unduh Strip HD Siap Cetak',
          desc: 'Hasil strip foto beresolusi tinggi tanpa distorsi (anti gepeng), dengan tata letak strip modern siap dibagikan ke media sosial.'
        }
      ]
    },
    contact: {
      badge: 'KONTAK & KREATOR',
      title: 'Terhubung dengan Kami',
      desc: 'Punya pertanyaan seputar sensor AI gestur, ide stiker baru, masukan, atau ingin berkolaborasi untuk PUZORA? Jangan ragu untuk menyapa kami!',
      instagram: 'Instagram',
      email: 'Mail',
      github: 'GitHub Repo'
    },
    footer: {
      logo: 'PUZORA',
      tagline: 'Modern Interactive Photobooth & Gesture Air Puzzle • Didesain dengan estetika modern, bersih, dan menyenangkan.',
      copy: '© 2026 PUZORA. Hak cipta dilindungi undang-undang.',
      top: 'Ke Atas'
    }
  },

  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      booth: 'Photo Booth',
      features: 'AI Features',
      contact: 'Contact'
    },
    header: {
      tagline: 'Interactive Photobooth & Gesture Air Puzzle',
      soundOn: 'Sound',
      soundMuted: 'Muted',
      guide: 'Guide',
      langSelect: 'Language'
    },
    hero: {
      badge: 'AI PHOTOBOOTH & GESTURE AIR PUZZLE',
      title: 'PUZORA',
      titleJp: 'Interactive Photobooth',
      subtitle: 'Capture memorable moments with interactive AI photobooth technology, solve 3x3 photo puzzles in the air, and decorate aesthetic photo strips!',
      cta: 'ENTER PHOTOBOOTH',
      chips: [
        'Pure Vision AI (MediaPipe)',
        '3x3 Air Gesture Puzzle',
        'Print-Ready HD Quality'
      ],
      polaroidLeft: 'Aesthetic Strip',
      polaroidRight: 'Air 3x3 Puzzle'
    },
    setup: {
      stepBadge: 'STEP 1 • INITIAL SETUP',
      title: 'Photobooth Setup',
      desc: 'Choose your desired photo strip format and minigame workflow before entering the camera booth.',
      layoutLabel: '1. Photo Strip Layout',
      minigameLabel: '2. Workflow (Minigame Challenge)',
      calloutTitle: 'Realtime Frames & Aesthetic Filters:',
      calloutDesc: 'Graphic themes (Classic Navy, Royal Gold, Slate Chalkboard, Diary Notebook, Rooftop Sky, and Navy Silver) and color filters can be freely changed in the Decorator Studio!',
      startBtn: 'ENTER PHOTOBOOTH (START BOOTH)'
    },
    layouts: [
      { id: 'strip_3', title: 'Classic 3-Strip', count: 3, icon: 'view_column', sub: '3 Vertical Photos' },
      { id: 'strip_4', title: 'Arcade 4-Strip', count: 4, icon: 'view_stream', sub: '4 Vertical Photos' },
      { id: 'grid_2x2', title: 'Grid 2x2', count: 4, icon: 'grid_view', sub: '4 Quadrant Grid' },
      { id: 'polaroid_1', title: 'Solo Polaroid', count: 1, icon: 'crop_portrait', sub: '1 Main Portrait' }
    ],
    minigames: [
      {
        id: 'puzzle',
        title: '3x3 Photo Puzzle',
        icon: 'extension',
        tag: 'MAIN FEATURE',
        sub: 'Solve puzzle in the air (Pinch & Fist)'
      },
      {
        id: 'skip',
        title: 'Direct to Studio',
        icon: 'bolt',
        tag: 'INSTANT',
        sub: 'Directly decorate without puzzle'
      }
    ],
    showcase: {
      badge: 'VISION AI • AIR GESTURE CONTROL',
      title: 'Gesture Control Suite',
      desc: 'Control the camera booth and air puzzle completely hands-free using your webcam.',
      items: [
        {
          icon: 'crop_free',
          title: 'Hand Frame / Peace (Camera Shutter)',
          desc: 'Form a hand frame with both hands or pose with a peace sign for an automatic 3s shutter.'
        },
        {
          icon: 'pinch',
          title: 'Pinch & Drag (Air Puzzle)',
          desc: 'Pinch your thumb and index finger together to pick up and snap 3x3 puzzle pieces.'
        },
        {
          icon: 'front_hand',
          title: 'Fist Lock (Lock & Save)',
          desc: 'Hold a closed fist for 1 second after solving to lock and advance to the studio.'
        },
        {
          icon: 'palette',
          title: 'Creative Decorator Studio',
          desc: 'Personalize with aesthetic borders, color grading, creative stickers, and color pens.'
        }
      ],
      footerBadge: 'Pure Vision AI Photobooth Experience'
    },
    howItWorks: {
      badge: 'STEP-BY-STEP GUIDE • HOW IT WORKS',
      heading: 'How to Enjoy PUZORA',
      subheading: 'No extra hardware needed beyond your standard webcam. Smart Vision AI detects gestures instantly and privately inside your browser.',
      steps: [
        {
          step: '01',
          icon: 'add_a_photo',
          title: 'Choose Layout & Enter',
          desc: 'Select your favorite print format (3-Strip, 4-Strip, Grid 2x2, or Polaroid), then enter the camera booth.'
        },
        {
          step: '02',
          icon: 'pan_tool',
          title: 'Pose & Auto Shutter',
          desc: 'Form a hand frame or hold up peace signs. Vision AI triggers an automatic 3-second countdown.'
        },
        {
          step: '03',
          icon: 'extension',
          title: 'Solve the Puzzle in the Air',
          desc: 'Your photo is shuffled into a 3x3 grid. Pinch in the air to pick up and place pieces into their correct slots.'
        },
        {
          step: '04',
          icon: 'palette',
          title: 'Decorate & Export HD',
          desc: 'Lock with a fist gesture, customize with aesthetic borders, creative stickers, and download high-res printable strips.'
        }
      ]
    },
    features: {
      badge: 'SMART TECH • MODERN VIBES',
      heading: 'Unique Highlights & Craft',
      subheading: 'Bringing modern photobooth charm together with next-gen Vision AI gesture technology.',
      items: [
        {
          icon: 'auto_awesome',
          title: 'Pure Vision AI Sensor',
          desc: 'Powered by Google MediaPipe Hands running 100% on your device. Complete privacy with zero camera streaming to external servers.'
        },
        {
          icon: 'filter_vintage',
          title: '6 Aesthetic Themed Frames',
          desc: 'Classic Navy, Royal Gold, Slate Chalkboard, Diary Notebook, Rooftop Sky, and Navy Silver styles.'
        },
        {
          icon: 'tune',
          title: 'Realtime Aesthetic Color Grading',
          desc: 'Natural Tone, Aesthetic Blue, Porcelain Glow, Warm Sunset, and Classic Monokrom tones.'
        },
        {
          icon: 'ios_share',
          title: 'Print-Ready HD Photo Strip',
          desc: 'Crisp, high-definition photo strips without distortion, pre-formatted for printing or instant social media sharing.'
        }
      ]
    },
    contact: {
      badge: 'GET IN TOUCH',
      title: 'Get in Touch',
      desc: 'Have questions, feedback, or sticker suggestions for PUZORA? We would love to hear from you!',
      instagram: 'Instagram',
      email: 'Mail',
      github: 'GitHub Repo'
    },
    footer: {
      logo: 'PUZORA',
      tagline: 'Modern Interactive Photobooth & Gesture Air Puzzle • Dressed in clean, modern aesthetics.',
      copy: '© 2026 PUZORA. All rights reserved.',
      top: 'Back to Top'
    }
  }
};
