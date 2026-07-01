/**
 * ============================================================
 *  APP.JS  –  Logika halaman (tidak perlu diubah)
 * ============================================================
 */

// ── Terapkan semua data dari CONFIG ke DOM ──
function applyConfig() {
  const b = CONFIG.couple.bride;
  const g = CONFIG.couple.groom;
  const ev = CONFIG.event;
  const img = CONFIG.images;

  // Format tanggal ke Bahasa Indonesia
  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const akadFmt = fmtDate(ev.akadDate);
  const resepsiFmt = fmtDate(ev.resepsiDate);
  const shortDate = new Date(ev.akadDate)
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, " . ");

  // ── Cover mobile ──
  setText("cover-names", `${b.firstName} & ${g.firstName}`);
  setText("cover-date", akadFmt);
  setBg("mobile-cover", img.cover);

  // ── Desktop panel kiri ──
  setBg("left-bg", img.cover);

  // ── Ayat ──
  document.getElementById("ayat-names").innerHTML =
    `${b.firstName.toUpperCase()} <span class="amp">&</span> ${g.firstName.toUpperCase()}`;
  setText("ayat-date", akadFmt);
  setBg("bg-ayat", img.ayat);

  // ── Bride ──
  setBg("bg-bride", img.bride);
  setText("bride-fullname", b.fullName.toUpperCase());
  setText("bride-pdesc", b.parentDesc);
  setText("bride-parents", b.parents);
  setAttr("bride-ig", "href", b.instagram);

  // ── Groom ──
  setBg("bg-groom", img.groom);
  setText("groom-fullname", g.fullName.toUpperCase());
  setText("groom-pdesc", g.parentDesc);
  setText("groom-parents", g.parents);
  setAttr("groom-ig", "href", g.instagram);

  // ── Event ──
  setBg("bg-event", img.event);
  document.getElementById("ev-akad").innerHTML =
    `${akadFmt}<br>${ev.akadTime}<br><br>${ev.venue}<br>${ev.venueAddress}`;
  document.getElementById("ev-resepsi").innerHTML =
    `${resepsiFmt}<br>${ev.resepsiTime}<br><br>${ev.venue}<br>${ev.venueAddress}`;
  setAttr("ev-akad-map", "href", ev.mapsLink);
  setAttr("ev-resepsi-map", "href", ev.mapsLink);

  // Tombol simpan kalender → Google Calendar
  document.getElementById("btn-cal").addEventListener("click", () => {
    const fmt = (iso) => iso.replace(/[-:T]/g, "").slice(0, 15) + "Z";
    const url =
      "https://www.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent("Pernikahan " + b.firstName + " & " + g.firstName)}` +
      `&dates=${fmt(ev.akadDate)}/${fmt(ev.resepsiDate)}` +
      `&location=${encodeURIComponent(ev.venueAddress)}`;
    window.open(url, "_blank");
  });

  // ── Gift ──
  setBg("bg-gift", img.event); // ← ganti img.gift jika punya foto berbeda
  setText("gift-name", "Kirim Hadiah: " + CONFIG.giftAddress.name);
  setText(
    "gift-street",
    CONFIG.giftAddress.street + ", " + CONFIG.giftAddress.city,
  );

  // Kartu rekening (generated)
  document.getElementById("rek-cards").innerHTML = CONFIG.rekening
    .map(
      (r) => `
    <div class="rek-card">
      <div>
        <div class="bank-logo">${r.bank}</div>
        <div class="bank-label">Kami tunggu kedatangannya</div>
        <div class="rek-num">${r.noRek}</div>
        <div class="rek-name"> ${r.atas}</div>
      </div>
      <button class="btn-copy" onclick="copyTxt('${r.noRek}', this)"></button>
    </div>`,
    )
    .join("");

  // ── RSVP & Wish pakai foto event ──
  setBg("bg-rsvp", img.event);
  setBg("bg-wish", img.event);

  // ── Footer ──
  setText("footer-names", `${b.firstName} & ${g.firstName}`);
  setText("footer-date", shortDate);

  // ── Judul tab browser ──
  document.title = `Wedding Invitation – ${b.firstName} & ${g.firstName}`;
}

// ── Helper ──
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, val);
}
function setBg(id, url) {
  const el = document.getElementById(id);
  if (el) el.style.backgroundImage = `url("${url}")`;
}

// ── Nama tamu dari URL (?to=Nama+Tamu) ──
function applyGuestName() {
  const name =
    new URLSearchParams(window.location.search).get("to") || "Tamu Undangan";
  document
    .querySelectorAll(".guest-name-placeholder")
    .forEach((el) => (el.textContent = name));
}

// ── Buka undangan (tombol mobile) ──
function openInvitation() {
  document.getElementById("mobile-cover").classList.add("hidden");
  document.getElementById("right-content").classList.add("visible");
  startCountdown();
  setTimeout(initScroll, 300);
}

// ── Desktop: tampilkan langsung ──
function checkDesktop() {
  if (window.innerWidth >= 769) {
    const rc = document.getElementById("right-content");
    rc.style.opacity = "1";
    rc.style.pointerEvents = "all";
    startCountdown();
    initScroll();
  }
}

// ── Countdown ──
function startCountdown() {
  const target = new Date(CONFIG.event.akadDate);
  function update() {
    const diff = target - new Date();
    if (diff <= 0) return;
    document.getElementById("cd-days").textContent = Math.floor(
      diff / 86400000,
    );
    document.getElementById("cd-hours").textContent = Math.floor(
      (diff % 86400000) / 3600000,
    );
    document.getElementById("cd-mins").textContent = Math.floor(
      (diff % 3600000) / 60000,
    );
    document.getElementById("cd-secs").textContent = Math.floor(
      (diff % 60000) / 1000,
    );
  }
  update();
  setInterval(update, 1000);
}

// ── Scroll fade-in ──
function initScroll() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 75);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));
}

// ── Toggle rekening ──
function toggleRek() {
  const cards = document.getElementById("rek-cards");
  const btn = document.getElementById("btn-rek");
  btn.textContent = cards.classList.toggle("show")
    ? "🙈 Sembunyikan Rekening"
    : "🔍 Lihat Rekening";
}

// ── Copy nomor rekening ──
function copyTxt(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Nomor rekening disalin ✓");
    btn.textContent = "✓";
    setTimeout(() => (btn.textContent = "📋"), 2000);
  });
}

// ── Ucapan (tersimpan permanen) ──
const WISH_KEY = "wedding_wishes_v1";

async function loadWishes() {
  try {
    const res = await window.storage.get(WISH_KEY, true);
    const wishes = res ? JSON.parse(res.value) : [];
    renderWishes(wishes);
  } catch (e) {
    console.warn("Gagal memuat ucapan:", e);
  }
}

function renderWishes(wishes) {
  const list = document.getElementById("wish-list");
  if (!list) return;
  list.innerHTML = wishes
    .map(
      (w) => `<div class="wish-item">
        <div class="wish-sender">${esc(w.name)}</div>
        <div class="wish-text">"${esc(w.text)}"</div>
      </div>`,
    )
    .join("");
}

async function submitWish() {
  const name = document.getElementById("wname").value.trim();
  const text = document.getElementById("wtext").value.trim();
  if (!name || !text) {
    showToast("Lengkapi nama dan ucapan 🌿");
    return;
  }
  try {
    const res = await window.storage.get(WISH_KEY, true);
    const existing = res ? JSON.parse(res.value) : [];
    const updated = [{ name, text, ts: Date.now() }, ...existing];
    await window.storage.set(WISH_KEY, JSON.stringify(updated), true);
    renderWishes(updated);
    document.getElementById("wname").value = "";
    document.getElementById("wtext").value = "";
    showToast("Ucapan terkirim! 💌");
  } catch (e) {
    console.error("Gagal menyimpan ucapan:", e);
    showToast("Gagal menyimpan, coba lagi 🌿");
  }
}

function esc(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Toast notifikasi ──
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}

// ── Musik ──
let audio,
  aCtx,
  gain,
  playing = false;
function toggleMusic() {
  const btn = document.getElementById("music-btn");

  // Mode 1: file audio dari config
  if (CONFIG.music.src) {
    if (!audio) {
      audio = new Audio(CONFIG.music.src);
      audio.volume = CONFIG.music.volume;
      audio.loop = CONFIG.music.loop !== false;
    }
    if (playing) {
      audio.pause();
      playing = false;
      btn.textContent = "♪";
    } else {
      audio.play();
      playing = true;
      btn.textContent = "♫";
    }
    return;
  }

  // Mode 2: fallback nada sine
  if (!aCtx) {
    aCtx = new (window.AudioContext || window.webkitAudioContext)();
    gain = aCtx.createGain();
    gain.gain.value = 0.035;
    gain.connect(aCtx.destination);
    [261.63, 329.63, 392.0, 523.25].forEach((f) => {
      const o = aCtx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(gain);
      o.start();
    });
    playing = true;
    btn.textContent = "♫";
  } else if (playing) {
    gain.gain.value = 0;
    playing = false;
    btn.textContent = "♪";
  } else {
    gain.gain.value = 0.035;
    playing = true;
    btn.textContent = "♫";
  }
}

// ── Init ──
window.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  applyGuestName();
  checkDesktop();
  loadWishes();
});
window.addEventListener("resize", checkDesktop);
