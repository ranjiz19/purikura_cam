// PUZORA Aesthetic Photobooth Stickers, Frames & Filters

export const STICKERS = [
  {
    id: "puzora_logo_sticker",
    name: "PUZORA Emblem",
    category: "badge",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="circleClipSticker">
          <circle cx="50" cy="50" r="44"/>
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#162846" stroke="#2563EB" stroke-width="3"/>
      <image href="/Logo.jpeg" x="6" y="6" width="88" height="88" clip-path="url(#circleClipSticker)" preserveAspectRatio="xMidYMid slice"/>
      <circle cx="50" cy="50" r="44" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "classic_ribbon",
    name: "Classic Ribbon",
    category: "fashion",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Ribbon Wings in Elegant Red -->
      <path d="M50 42 C30 18 10 28 22 55 C32 66 45 52 50 48 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/>
      <path d="M50 42 C70 18 90 28 78 55 C68 66 55 52 50 48 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/>
      <!-- Ribbon Tails -->
      <path d="M44 48 L32 88 L46 82 L49 54 Z" fill="#B91C1C"/>
      <path d="M56 48 L68 88 L54 82 L51 54 Z" fill="#B91C1C"/>
      <!-- Center Knot with Gold Button -->
      <circle cx="50" cy="45" r="7.5" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <circle cx="50" cy="45" r="3" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: "royal_crest",
    name: "Royal Crest",
    category: "badge",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Shield Navy & Gold -->
      <path d="M50 15 L78 26 C78 60 50 82 50 85 C50 82 22 60 22 26 Z" fill="#0F1E36" stroke="#F59E0B" stroke-width="3"/>
      <!-- Inner star -->
      <polygon points="50,30 55,42 68,43 57,51 61,64 50,56 39,64 43,51 32,43 45,42" fill="#F59E0B"/>
      <circle cx="50" cy="47" r="4" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: "perfect_stamp",
    name: "Perfect 100",
    category: "badge",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Spiral Stamp Badge -->
      <circle cx="50" cy="50" r="36" fill="none" stroke="#DC2626" stroke-width="3.5" stroke-dasharray="8 4"/>
      <circle cx="50" cy="50" r="24" fill="none" stroke="#DC2626" stroke-width="3"/>
      <circle cx="50" cy="50" r="10" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
      <text x="50" y="54" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="12" fill="#DC2626" text-anchor="middle">PERFECT</text>
      <text x="50" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#DC2626" text-anchor="middle">100%</text>
    </svg>`
  },
  {
    id: "travel_bag",
    name: "Travel Bag",
    category: "fashion",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="38" width="64" height="46" rx="8" fill="#162846" stroke="#0F172A" stroke-width="3"/>
      <path d="M30 42 C30 20 70 20 70 42" fill="none" stroke="#64748B" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="26" y="52" width="48" height="26" rx="4" fill="#1E3A5F" stroke="#334155" stroke-width="2"/>
      <line x1="26" y1="56" x2="74" y2="56" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="72" cy="46" r="4" fill="#FF5C8A"/>
    </svg>`
  },
  {
    id: "sakura_blossom",
    name: "Sakura Blossom",
    category: "nature",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF0F5"/>
          <stop offset="60%" stop-color="#FFB6C1"/>
          <stop offset="100%" stop-color="#FF7597"/>
        </radialGradient>
      </defs>
      <!-- 5 Petals -->
      <path d="M50 50 C40 20 20 25 32 10 C45 20 50 40 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C60 20 80 25 68 10 C55 20 50 40 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C80 35 90 55 90 40 C75 55 60 50 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C70 80 85 85 70 88 C60 75 55 60 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C30 80 15 85 30 88 C40 75 45 60 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C20 35 10 55 10 40 C25 55 40 50 50 50 Z" fill="url(#sakuraGrad)"/>
      <circle cx="50" cy="50" r="7" fill="#FF4D79"/>
      <circle cx="50" cy="50" r="3" fill="#FFF"/>
    </svg>`
  },
  {
    id: "sparkle_star",
    name: "Kira Sparkle",
    category: "sparkle",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 Q50 50 90 50 Q50 50 50 90 Q50 50 10 50 Q50 50 50 10 Z" fill="#F59E0B" stroke="#D97706" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="6" fill="#FFF"/>
      <circle cx="78" cy="22" r="4" fill="#F59E0B"/>
      <circle cx="22" cy="78" r="3" fill="#F59E0B"/>
    </svg>`
  },
  {
    id: "cute_onigiri",
    name: "Bento Snack",
    category: "food",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C68 15 85 65 78 80 C70 90 30 90 22 80 C15 65 32 15 50 15 Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="3.5"/>
      <rect x="36" y="55" width="28" height="28" rx="6" fill="#0F172A"/>
      <circle cx="42" cy="48" r="2.5" fill="#1E293B"/>
      <circle cx="58" cy="48" r="2.5" fill="#1E293B"/>
      <ellipse cx="38" cy="52" rx="4" ry="2.5" fill="#FFB6C1"/>
      <ellipse cx="62" cy="52" rx="4" ry="2.5" fill="#FFB6C1"/>
      <path d="M47 51 Q50 54 53 51" stroke="#1E293B" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: "speech_best",
    name: "Best Vibes",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#EFF6FF" stroke="#1E3A5F" stroke-width="3"/>
      <text x="70" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="16" fill="#1E3A5F" text-anchor="middle">★ PUZORA ★</text>
    </svg>`
  },
  {
    id: "speech_peace",
    name: "Peace Sign",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#F1F5F9" stroke="#475569" stroke-width="3"/>
      <text x="70" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="15" fill="#1E293B" text-anchor="middle">PEACE &amp; SMILE</text>
    </svg>`
  },
  {
    id: "speech_forever",
    name: "Sparkle Badge",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#0F1E36" stroke="#94A3B8" stroke-width="2.5"/>
      <text x="70" y="35" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">✧ BEST MOMENT ✧</text>
    </svg>`
  }
];

// PUZORA Themed Aesthetic Frames (Navy & Slate Palette)
export const FRAME_STYLES = [
  {
    id: "sailor_navy",
    name: "Classic Navy",
    icon: "palette",
    bg: "#0F1E36",
    border: "#E2E8F0",
    accent: "#DC2626",
    tag: "NAVY",
    sub: "Aksen garis ganda putih navy elegan & pita merah"
  },
  {
    id: "gakuran_blazer",
    name: "Royal Gold",
    icon: "military_tech",
    bg: "#162846",
    border: "#F59E0B",
    accent: "#94A3B8",
    tag: "GOLD",
    sub: "Bingkai navy gelap dengan aksen lencana emas mewah"
  },
  {
    id: "blackboard_chalk",
    name: "Slate Chalkboard",
    icon: "draw",
    bg: "#152336",
    border: "#CBD5E1",
    accent: "#FDE047",
    tag: "CHALK",
    sub: "Papan tulis slate-navy & ornamen kapur artistik"
  },
  {
    id: "campus_notebook",
    name: "Diary Notebook",
    icon: "menu_book",
    bg: "#F8FAFC",
    border: "#1E3A5F",
    accent: "#DC2626",
    tag: "NOTEBOOK",
    sub: "Kertas bergaris minimalis & stempel bintang"
  },
  {
    id: "rooftop_sky",
    name: "Rooftop Sky",
    icon: "wb_sunny",
    bg: "#1A365D",
    border: "#60A5FA",
    accent: "#93C5FD",
    tag: "SKY",
    sub: "Gradasi biru langit luas & awan lembut"
  },
  {
    id: "silver_navy_minimal",
    name: "Navy & Silver",
    icon: "star",
    bg: "#0B132B",
    border: "#94A3B8",
    accent: "#F8FAFC",
    tag: "CLASSIC",
    sub: "Nuansa navy pekat & aksen perak elegan"
  }
];

// Color Filters (Clean & Aesthetic Lighting)
export const FILTERS = [
  {
    id: "pure_natural",
    name: "Natural Tone",
    icon: "wb_incandescent",
    sub: "Warna natural jernih dan tajam",
    css: "none"
  },
  {
    id: "aesthetic_blue",
    name: "Aesthetic Blue",
    icon: "water_drop",
    sub: "Tone biru sejuk menawan",
    css: "brightness(1.08) contrast(1.1) saturate(1.15) hue-rotate(6deg)"
  },
  {
    id: "bihaku_porcelain",
    name: "Porcelain Glow",
    icon: "face",
    sub: "Efek kulit bersih, lembut dan cerah",
    css: "brightness(1.18) contrast(1.06) saturate(0.94)"
  },
  {
    id: "afterschool_film",
    name: "Warm Sunset",
    icon: "wb_twilight",
    sub: "Nuansa senja hangat sinematik",
    css: "sepia(0.28) contrast(1.12) brightness(1.06) saturate(1.28)"
  },
  {
    id: "tokyo_bw",
    name: "Classic Monokrom",
    icon: "filter_b_and_w",
    sub: "Monokrom artistik dengan kontras elegan",
    css: "grayscale(1) contrast(1.24) brightness(1.06)"
  }
];

export function getStickerDataUrl(svgString) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
}
