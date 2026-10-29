// Language dictionary & auto-detection for Purikura Studio (ID / JP / EN)

export const detectLanguage = () => {
  try {
    const saved = localStorage.getItem('purikura_lang');
    if (saved && ['id', 'jp', 'en'].includes(saved)) {
      return saved;
    }
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('ja')) return 'jp';
    if (navLang.startsWith('id')) return 'id';
    return 'id'; // Default Indonesian as requested
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
      tagline: 'Japanese High School Edition',
      soundOn: 'Suara',
      soundMuted: 'Bisu',
      guide: 'Panduan',
      langSelect: 'Bahasa'
    },
    hero: {
      badge: 'JAPANESE HIGH SCHOOL SEISHUN PHOTOBOOTH',
      title: 'Purikura Studio',
      titleJp: '青春フォトスタジオ (高校エディション)',
      subtitle: 'Abadikan momen masa muda sekolah Jepang (Seishun 青春) bertema seragam navy & abu-abu, bingkai seifuku, serta sensor gestur AI',
      cta: 'MASUK BILIK FOTO',
      chips: [
        'Tema Sekolah Jepang (Navy & Grey)',
        'Seragam Seifuku & Blazer',
        '3x3 Air Puzzle AI'
      ],
      polaroidLeft: 'Memori Sekolah',
      polaroidRight: 'Sepulang Sekolah'
    },
    setup: {
      stepBadge: 'STEP 1 • PENGATURAN AWAL',
      title: 'Setup Bilik Foto Sekolah',
      desc: 'Pilih format cetak strip foto dan alur minigame sebelum mulai sesi jepret foto.',
      layoutLabel: '1. Format Strip Foto Khas Jepang',
      minigameLabel: '2. Pilihan Alur Foto (Minigame)',
      calloutTitle: 'Pemilihan Bingkai & Filter Realtime:',
      calloutDesc: 'Tema bingkai sekolah Jepang (Sailor Seifuku, Academy Blazer, Kokuban Chalkboard, Campus Notebook, Rooftop Sky) dan filter seragam bisa kamu pilih di Studio Dekorasi!',
      startBtn: 'MASUK BILIK FOTO (START BOOTH)'
    },
    layouts: [
      { id: 'strip_3', title: 'Classic 3-Strip', count: 3, icon: 'auto_awesome_motion', sub: '3 Foto Vertikal' },
      { id: 'strip_4', title: 'Arcade 4-Strip', count: 4, icon: 'view_agenda', sub: '4 Foto Vertikal' },
      { id: 'grid_2x2', title: 'Purikura 2x2', count: 4, icon: 'grid_view', sub: 'Grid 4 Kuadran' },
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
          title: 'Studio Dekorasi Kawaii',
          desc: 'Hias strip fotomu dengan bingkai Jepang, filter warna estetik, stiker lucu, dan kuas neon.'
        }
      ],
      footerBadge: 'Pure Vision AI Photobooth Experience'
    },
    howItWorks: {
      badge: 'PANDUAN LANGKAH • HOW IT WORKS',
      heading: 'Cara Seru Bermain di Purikura Studio',
      subheading: 'Cukup gunakan webcam laptop/HP biasa. AI cerdas mengenali gerakan tangan secara instan dan aman di browser lokal.',
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
          desc: 'Kunci puzzle dengan kepalan tangan (Fist), lalu pilih bingkai Jepang, filter warna, stiker kawaii, dan unduh strip HD siap cetak.'
        }
      ]
    },
    features: {
      badge: 'TEKNOLOGI JEPANG • TOKYO VIBES',
      heading: 'Keunikan & Fitur Unggulan',
      subheading: 'Menghadirkan pengalaman bilik foto Jepang asli dengan sentuhan AI modern, stiker lucu, dan kualitas cetak tinggi.',
      items: [
        {
          icon: 'auto_awesome',
          title: 'Pure Vision AI Sensor',
          desc: 'Didukung Google MediaPipe Hands Vision yang berjalan 100% di browser lokal Anda. Privasi terjamin tanpa upload kamera ke server.'
        },
        {
          icon: 'filter_vintage',
          title: '6 Tema Bingkai Khas Jepang',
          desc: 'Pilihan Sakura Blossom, Sweet Ribbon, Neko Cafe, Kyoto Tea, Y2K Sparkle, hingga Clean Minimalis yang bisa diganti langsung di studio.'
        },
        {
          icon: 'tune',
          title: 'Filter Warna Estetik Realtime',
          desc: 'Sesuaikan tone warna sesukamu: Bihaku White, Sakura Blush, Kyoto Film, Tokyo B&W, Golden Sunset, atau Natural Glow.'
        },
        {
          icon: 'ios_share',
          title: 'Unduh Strip HD Siap Cetak',
          desc: 'Hasil strip foto beresolusi tinggi tanpa distorsi (anti gepeng), dengan tata letak strip purikura asli siap dibagikan ke medsos.'
        }
      ]
    },
    contact: {
      badge: 'KONTAK & KREATOR',
      title: 'Terhubung dengan Kami',
      desc: 'Punya pertanyaan seputar sensor AI gestur, ide stiker baru, masukan, atau ingin berkolaborasi untuk Purikura Studio? Jangan ragu untuk menyapa kami!',
      instagram: 'Instagram',
      email: 'Mail',
      github: 'GitHub Repo'
    },
    footer: {
      logo: 'Purikura Studio',
      tagline: 'Modern AI Japanese Kawaii Photobooth & Gesture Air Puzzle • Didesain dengan estetika modern, hangat, dan menyenangkan.',
      copy: '© 2026 Purikura Studio (プリクラ). Hak cipta dilindungi undang-undang.',
      top: 'Ke Atas'
    }
  },

  jp: {
    nav: {
      home: 'ホーム',
      howItWorks: '遊び方',
      booth: 'プリクラブース',
      features: 'AI機能',
      contact: 'お問い合わせ'
    },
    header: {
      tagline: 'AI Japanese Photobooth プリクラ',
      soundOn: 'サウンド',
      soundMuted: 'ミュート',
      guide: 'ガイド',
      langSelect: '言語'
    },
    hero: {
      badge: 'JAPANESE KAWAII PHOTOBOOTH & AIR PUZZLE',
      title: 'Purikura Studio',
      titleJp: 'プリクラスタジオ',
      subtitle: 'かわいい瞬間をキャプチャ、空中で3x3パズルを解いて、本格プリクラをデコレーション！',
      cta: 'プリクラを始める',
      chips: [
        'Pure Vision AI (MediaPipe)',
        '2026年 東京エディション',
        '3x3 空中パズル'
      ],
      polaroidLeft: '大切な思い出',
      polaroidRight: '空中パズル'
    },
    setup: {
      stepBadge: 'STEP 1 • 初期設定',
      title: 'ブースのセットアップ',
      desc: '撮影セッションを開始する前に、プリントフォーマットとミニゲームモードを選択してください。',
      layoutLabel: '1. プリクラシートのレイアウト',
      minigameLabel: '2. 撮影フロー (ミニゲーム)',
      calloutTitle: 'リアルタイムフレーム＆フィルター設定:',
      calloutDesc: '桜ブロッサム、リボン、ネコカフェ、京都抹茶、Y2Kなどの日本風フレームとカラーフィルターは、撮影後のデコスタジオで自由に変更できます！',
      startBtn: 'ブースに入る (START BOOTH)'
    },
    layouts: [
      { id: 'strip_3', title: 'クラシック 3-Strip', count: 3, icon: 'view_column', sub: '3枚 縦型レイアウト' },
      { id: 'strip_4', title: 'アーケード 4-Strip', count: 4, icon: 'view_stream', sub: '4枚 縦型レイアウト' },
      { id: 'grid_2x2', title: 'プリクラ 2x2', count: 4, icon: 'grid_view', sub: '4分割 グリッド' },
      { id: 'polaroid_1', title: 'ソロポラロイド', count: 1, icon: 'crop_portrait', sub: '1枚 メイン写真' }
    ],
    minigames: [
      {
        id: 'puzzle',
        title: '3x3 写真パズル',
        icon: 'extension',
        tag: 'メイン機能',
        sub: '空中でピース合わせ (ピンチ & 握り拳)'
      },
      {
        id: 'skip',
        title: 'ダイレクトスタジオ',
        icon: 'bolt',
        tag: 'インスタント',
        sub: 'パズルなしですぐデコレーション'
      }
    ],
    showcase: {
      badge: 'ジェスチャー制御 • 空中操作',
      title: '手のひら操作機能',
      desc: 'マウスやキーボードに触れず、Webカメラの前で手や指を動かすだけで直感的に操作できます。',
      items: [
        {
          icon: 'crop_free',
          title: 'ハンドフレーム / ピースサイン (撮影)',
          desc: '両手でフレームを作るか、ピースサインを構えると3秒カウントダウンで自動シャッター！'
        },
        {
          icon: 'pinch',
          title: 'ピンチ＆ドラッグ (空中パズル)',
          desc: '親指と人差し指をつまむ (ピンチ) 動作で、空中のパズルピースを掴んで移動できます。'
        },
        {
          icon: 'front_hand',
          title: 'フィストロック (保存＆固定)',
          desc: 'パズル完成後、拳を約1秒間握るとロックされ、スタジオへ進みます。'
        },
        {
          icon: 'palette',
          title: 'かわいいデコスタジオ',
          desc: '和風フレーム、エステティックフィルター、可愛いスタンプ、ネオンブラシで自由に落書き。'
        }
      ],
      footerBadge: 'Pure Vision AI Photobooth Experience'
    },
    howItWorks: {
      badge: '遊び方ガイド • HOW IT WORKS',
      heading: 'プリクラスタジオの楽しみ方',
      subheading: '特別な機器は不要。通常のWebカメラだけで、ビジョンAIが手の動きを安全・瞬時に検出します。',
      steps: [
        {
          step: '01',
          icon: 'add_a_photo',
          title: 'レイアウトを選んでブースへ',
          desc: '3カット、4カット、グリッド、ポラロイドから好みのレイアウトを選んでブースに入ります。'
        },
        {
          step: '02',
          icon: 'pan_tool',
          title: 'ポーズを決めて自動シャッター',
          desc: '両手フレームやピースサインを決めると、AIが自動で3秒カウントダウンして激写！'
        },
        {
          step: '03',
          icon: 'extension',
          title: '空中で3x3パズルに挑戦',
          desc: '指先をつまむピンチジェスチャーで、空中に散らばった写真ピースを正しい位置へ組み立てます。'
        },
        {
          step: '04',
          icon: 'palette',
          title: 'スタジオでデコ＆高画質保存',
          desc: '拳を握ってロックしたら、フレーム、スタンプ、フィルターで可愛く落書きしてHD保存！'
        }
      ]
    },
    features: {
      badge: '日本発のテクノロジー • TOKYO VIBES',
      heading: 'プリクラスタジオの特長',
      subheading: '本場原宿・渋谷のプリクラの楽しさに、最先端のAIジェスチャー操作を融合。',
      items: [
        {
          icon: 'auto_awesome',
          title: 'Pure Vision AI センサー',
          desc: 'Google MediaPipe Handsを活用し、ブラウザ上で100%ローカル動作。カメラデータは外部に送信されず安心です。'
        },
        {
          icon: 'filter_vintage',
          title: '6種類の本格和風フレーム',
          desc: '桜ブロッサム、スイートリボン、ネコカフェ、京都茶室、Y2K、クリーンミニマルから選べます。'
        },
        {
          icon: 'tune',
          title: 'リアルタイム美肌＆カラーフィルター',
          desc: '美白ホワイト、桜ブラッシュ、京都フィルム、東京モノクロ、夕暮れなど多彩なトーン調整。'
        },
        {
          icon: 'ios_share',
          title: '高解像度プリント用シート出力',
          desc: '画像の歪みなく高解像度で生成。印刷にもSNSシェアにもそのまま使える本格仕上がり。'
        }
      ]
    },
    contact: {
      badge: 'GET IN TOUCH • お問い合わせ',
      title: 'お問い合わせ・メッセージ',
      desc: 'AIセンサーの機能要望、新しいスタンプのアイデア、ご意見など、いつでもお気軽にお知らせください！',
      instagram: 'Instagram',
      email: 'Mail',
      github: 'GitHub リポジトリ'
    },
    footer: {
      logo: 'Purikura Studio',
      tagline: 'Modern AI Japanese Kawaii Photobooth & Gesture Air Puzzle • 原宿カルチャーとテクノロジーの融合。',
      copy: '© 2026 Purikura Studio (プリクラ). All rights reserved.',
      top: 'トップへ'
    }
  },

  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      booth: 'Photobooth',
      features: 'AI Features',
      contact: 'Contact'
    },
    header: {
      tagline: 'AI Japanese Photobooth プリクラ',
      soundOn: 'Sound',
      soundMuted: 'Muted',
      guide: 'Guide',
      langSelect: 'Language'
    },
    hero: {
      badge: 'JAPANESE KAWAII PHOTOBOOTH & AIR PUZZLE',
      title: 'Purikura Studio',
      titleJp: 'プリクラスタジオ',
      subtitle: 'Capture memorable moments, solve 3x3 photo puzzles in the air, and decorate authentic Japanese photo strips!',
      cta: 'ENTER PHOTOBOOTH',
      chips: [
        'Pure Vision AI (MediaPipe)',
        'Tokyo 2026 Edition',
        '3x3 Air Gesture Puzzle'
      ],
      polaroidLeft: 'Sweet Memories',
      polaroidRight: 'Air 3x3 Puzzle'
    },
    setup: {
      stepBadge: 'STEP 1 • INITIAL SETUP',
      title: 'Photobooth Setup',
      desc: 'Choose your desired photo strip format and minigame workflow before entering the camera booth.',
      layoutLabel: '1. Japanese Photo Strip Layout',
      minigameLabel: '2. Workflow (Minigame Challenge)',
      calloutTitle: 'Realtime Frames & Aesthetic Filters:',
      calloutDesc: 'Graphic themes (Sakura Blossom, Sweet Ribbon, Neko Cafe, Kyoto Tea, Y2K) and color filters can be freely changed in the Decorator Studio!',
      startBtn: 'ENTER PHOTOBOOTH (START BOOTH)'
    },
    layouts: [
      { id: 'strip_3', title: 'Classic 3-Strip', count: 3, icon: 'view_column', sub: '3 Vertical Photos' },
      { id: 'strip_4', title: 'Arcade 4-Strip', count: 4, icon: 'view_stream', sub: '4 Vertical Photos' },
      { id: 'grid_2x2', title: 'Purikura 2x2', count: 4, icon: 'grid_view', sub: '4 Quadrant Grid' },
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
          title: 'Kawaii Decorator Studio',
          desc: 'Personalize with Japanese frames, aesthetic color grading, cute stickers, and neon pens.'
        }
      ],
      footerBadge: 'Pure Vision AI Photobooth Experience'
    },
    howItWorks: {
      badge: 'STEP-BY-STEP GUIDE • HOW IT WORKS',
      heading: 'How to Enjoy Purikura Studio',
      subheading: 'No hardware needed beyond your standard webcam. Smart Vision AI detects gestures instantly and privately inside your browser.',
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
          desc: 'Lock with a fist gesture, customize with Japanese borders, kawaii stickers, and download high-res printable strips.'
        }
      ]
    },
    features: {
      badge: 'JAPANESE TECH • TOKYO VIBES',
      heading: 'Unique Highlights & Craft',
      subheading: 'Bringing authentic Tokyo Harajuku photobooth charm together with next-gen Vision AI gesture technology.',
      items: [
        {
          icon: 'auto_awesome',
          title: 'Pure Vision AI Sensor',
          desc: 'Powered by Google MediaPipe Hands running 100% on your device. Complete privacy with zero camera streaming to external servers.'
        },
        {
          icon: 'filter_vintage',
          title: '6 Japanese Themed Frames',
          desc: 'Sakura Blossom, Sweet Ribbon, Neko Cafe, Kyoto Tea, Y2K Sparkle, and Clean Minimalist styles.'
        },
        {
          icon: 'tune',
          title: 'Realtime Aesthetic Color Grading',
          desc: 'Bihaku White, Sakura Blush, Kyoto Film, Tokyo Monochrome, Golden Sunset, and Natural Glow tones.'
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
      desc: 'Have questions, feedback, or sticker suggestions for Purikura Studio? We would love to hear from you!',
      instagram: 'Instagram',
      email: 'Mail',
      github: 'GitHub Repo'
    },
    footer: {
      logo: 'Purikura Studio',
      tagline: 'Modern AI Japanese Kawaii Photobooth & Gesture Air Puzzle • Where Tokyo street culture meets Vision AI.',
      copy: '© 2026 Purikura Studio (プリクラ). All rights reserved.',
      top: 'Back to Top'
    }
  }
};
