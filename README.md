# 💍 Wedding Invitation

Undangan pernikahan online — HTML statis, deploy ke Netlify tanpa backend.

---

## 📁 Struktur Folder

```
wedding-invitation/
├── index.html              ← struktur halaman (tidak perlu diubah)
├── css/
│   ├── theme.css           ← ✏️  GANTI TEMA di sini (warna, font)
│   └── style.css           ← layout & komponen (tidak perlu diubah)
├── js/
│   └── app.js              ← logika halaman (tidak perlu diubah)
├── config/
│   └── config.js           ← ✏️  ISI DATA pernikahan di sini
├── assets/
│   ├── images/             ← taruh foto di sini
│   └── audio/              ← taruh file lagu di sini
└── README.md
```

---

## ✏️ Yang Perlu Diedit

### 1. Isi Data → `config/config.js`

Nama, tanggal, venue, foto, lagu, rekening — semua di satu file ini.

```js
images: {
  cover: "assets/images/cover.jpg",   // foto cover & panel kiri
  bride: "assets/images/bride.jpg",   // foto pengantin wanita
  groom: "assets/images/groom.jpg",   // foto pengantin pria
  ayat:  "assets/images/ayat-bg.jpg", // background section ayat
  event: "assets/images/event-bg.jpg",// background event/rsvp/wish
},

music: {
  src: "assets/audio/lagu.mp3",   // kosongkan ("") untuk nada bawaan
  volume: 0.4,
  loop: true,
},
```

---

### 2. Ganti Tema → `css/theme.css`

Semua warna dan font ada di variabel `:root`. Ubah di sini, seluruh halaman ikut berubah.

```css
:root {
  --color-primary:       #6b7c6e;   /* warna utama tombol & aksen */
  --color-primary-dark:  #4a5c4e;   /* tombol hover, countdown box */
  --color-primary-light: #8fa893;   /* nama tamu panel kiri */
  --color-bg:            #1e271f;   /* background halaman */
  --font-display: "Cormorant Garamond", serif;
  --font-body:    "Jost", sans-serif;
}
```

**Tema siap pakai** tersedia di bawah komentar di `theme.css`:
- 🌿 Sage Green *(aktif)*
- 🌸 Dusty Rose
- 🌙 Midnight Navy
- 🤍 Warm Ivory

Cara aktifkan: hapus `/*` dan `*/` di sekitar tema yang diinginkan, nonaktifkan tema lama.

**Ganti font:** ubah nama font di `theme.css`, lalu sesuaikan link Google Fonts di `<head>` pada `index.html`.

---

## 🔗 Kirim ke Tamu

Tambahkan `?to=Nama+Tamu` di URL:

```
https://nama-site.netlify.app/?to=Budi+Santoso
```

---

## 🚀 Deploy ke Netlify

### Via GitHub (recommended)
```bash
git add .
git commit -m "setup undangan"
git push
```
Lalu di Netlify: **Add new site → Import from GitHub → pilih repo → Deploy**.
Setiap `git push` akan auto-deploy.

### Via drag & drop
Drag folder `wedding-invitation/` ke [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🛠️ Local Development

Buka di VS Code → install ekstensi **Live Server** → klik kanan `index.html` → *Open with Live Server*.
