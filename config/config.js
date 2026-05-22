/**
 * ============================================================
 *  CONFIG.JS  –  Isi data pernikahan di sini
 * ============================================================
 */

const CONFIG = {
  // ── PASANGAN ──────────────────────────────────────────────
  couple: {
    bride: {
      firstName: "Hesta",
      fullName: "Hesta Galuh Listantina S.Psi",
      parentDesc: "Putri Pertama dari",
      parents: "Bapak Listiyono & Ibu Purwanti",
      instagram: "https://instagram.com/hestagaluh",
    },
    groom: {
      firstName: "Fiqi",
      fullName: "Fiqi Nur Rohman",
      parentDesc: "Putra Pertama dari",
      parents: "Bapak Muhlisin & Ibu Sri Haryati",
      instagram: "https://instagram.com/fiqinur76",
    },
  },

  // ── TANGGAL & ACARA ───────────────────────────────────────
  event: {
    akadDate: "2026-08-02T08:00:00", // format: YYYY-MM-DDTHH:MM:SS
    resepsiDate: "2026-08-02T10:00:00",
    akadTime: "08.00 WIB – Selesai",
    resepsiTime: "10.00 – 14.00 WIB",
    venue: "Rumah Mempelai Wanita",
    venueAddress:
      "Jl Argopratolo 03/08 Gandu, Kel. Ledok, Kec. Argomulyo, Kota Salatiga",
    mapsLink: "https://maps.app.goo.gl/V76NALGgjyANwQ7T8",
  },

  // ── GAMBAR ────────────────────────────────────────────────
  // Simpan foto di assets/images/ lalu ganti path di bawah.
  // Bisa juga pakai URL eksternal.
  images: {
    cover:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=85",
    ayat: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80",
    bride:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4f7e?w=800&q=80",
    groom:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    event:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  },

  // ── MUSIK ─────────────────────────────────────────────────
  // Simpan file di assets/audio/ lalu isi path-nya.
  // Kosongkan src ("") untuk pakai nada bawaan.
  music: {
    src: "", // contoh: "assets/audio/lagu.mp3"
    volume: 0.4,
    loop: true,
  },

  // ── REKENING ─────────────────────────────────────────────
  rekening: [
    {
      bank: "Hadiah terbaik adalah kedatangan anda",
      noRek: "",
      atas: "",
    },
    // { bank: "BCA", noRek: "029xxxxxxx", atas: "Hesta Galuh Listantina" },
  ],

  // ── ALAMAT HADIAH ─────────────────────────────────────────
  giftAddress: {
    name: "",
    street: "Hadiah bisa diberikan langsung kepada mempelai",
    city: "",
  },
};

if (typeof module !== "undefined") module.exports = CONFIG;
