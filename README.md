# 🪟 Windows 11 Glass Desktop Portfolio

Portofolio interaktif dan modern yang dirancang dengan estetika **Frosted Glass / Glassmorphism** (menyerupai *Windows 11 Mica & Acrylic Aero Glass*). Dibangun menggunakan **React 19**, **Vite 8**, **Tailwind CSS v4**, dan **Lucide Icons**.

---

## ✨ Fitur Tema Glass (Glassmorphism)

- 🧊 **Aero & Mica Frosted Blur**: Panel jendela, taskbar, start menu, dan kartu informasi menggunakan efek blur latar belakang mendalam (`backdrop-filter: blur(...)`) dengan saturasi warna tinggi.
- ✨ **Specular Edge Reflections**: Refleksi cahaya di bibir atas jendela (*specular top glare*), border kaca tipis transparan, serta bayangan dinamis.
- 💎 **Glass Desktop Icons**: Ikon desktop bertema squircle kaca transparan dengan efek hover kilau.
- 🎨 **Latar Belakang Refraktif**: Wallpaper pilihan bergradasi cair dan neon yang memantulkan transmisi cahaya indah di balik lapisan kaca.

---

## ✨ Fitur Utama Sistem Operasi Desktop

1. **Desktop & Wallpaper System**
   - 🖐️ **Ikon Desktop Bebas Digeser (Draggable Icons)**: Ikon di desktop dapat diklik dan diseret (*drag & drop*) ke mana saja secara leluasa layaknya Windows asli!
   - 📌 **Penyimpanan Posisi Otomatis**: Posisi ikon tersimpan otomatis di *localStorage*, sehingga letak ikon tetap tersimpan meski halaman di-refresh.
   - 📐 **Ratakan Posisi Ikon (Auto Arrange)**: Tersedia opsi klik kanan di desktop untuk merapikan kembali posisi ikon ke kisi (*grid*) otomatis.
   - 5 pilihan wallpaper berkualitas tinggi yang menonjolkan efek kaca transparan.
   - Menu klik kanan (Desktop Context Menu) bertema kaca: Refresh, Ratakan Posisi Ikon, Ganti Wallpaper, Buka Terminal, Buat Catatan.
   - Ikon desktop dengan highlight seleksi dan drop shadow realistis.

2. **Window Management (Multi-Tasking)**
   - Jendela dapat **diseret (drag)** ke mana saja.
   - Tombol kontrol Windows asli: **Minimize (`-`)**, **Maximize / Restore (`□`)**, dan **Close (`✕`)**.
   - Manajemen kedalaman jendela (**z-index layering**) saat jendela diklik.
   - Responsif otomatis: di layar handphone/tablet, jendela otomatis memaksimalkan tampilan (fullscreen mode) demi kenyamanan pengguna.

3. **Taskbar & Start Menu**
   - Start Menu ala Windows 11 di tengah dengan bilah pencarian real-time, aplikasi tersemat, rekomendasi file (CV, proyek unggulan), profil pengguna, serta tombol Daya/Restart.
   - Taskbar terpusat dengan indikator titik/garis aktif pada aplikasi yang sedang berjalan.
   - **System Tray**:
     - Jam & kalender digital real-time dengan drawer notifikasi saat diklik.
     - Flyout Pengaturan Cepat (Quick Settings) dengan slider volume suara, toggle Wi-Fi, dan toggle dark mode.
     - Tombol *Show Desktop* di sudut kanan bawah.

4. **Aplikasi Bawaan (Portfolio Apps)**
   - 👤 **About Me**: Profil ringkas, bio lengkap, statistik pencapaian, filosofi kerja, tombol unduh CV, dan tautan sosial.
   - 💼 **Projects**: Galeri proyek portofolio dengan filter kategori (*Fullstack*, *AI & Tools*, *E-Commerce*, *Fintech*), pencarian, badge teknologi, dan modal detail lengkap beserta Live Demo & GitHub.
   - ⚡ **Tech Stack (Skills)**: Spesifikasi kemampuan teknis dengan visual gauge bar, persentase penguasaan, dan kategori *Frontend*, *Backend*, *DevOps/Cloud*, dan *Tools*.
   - 📜 **Experience**: Riwayat karier profesional dengan garis waktu (*timeline*), riwayat pendidikan, dan sertifikasi keahlian.
   - 💻 **Windows Terminal (PowerShell)**: Terminal interaktif yang mendukung perintah: `help`, `bio`, `skills`, `projects`, `experience`, `contact`, `neofetch`, `matrix`, `open <app>`, `whoami`, `date`, `echo`, `clear`, dan `exit`.
   - 📝 **Notepad (Hubungi Saya)**: Formulir pengiriman pesan langsung ke email, tombol salin email, animasi selebrasi (*confetti*), dan fitur **Simpan sebagai file .txt** asli!
   - ⚙️ **Settings**: Pengaturan tema, pergantian wallpaper, penyesuaian warna aksen, audio effect on/off, dan spesifikasi sistem.
   - 🎮 **Minesweeper Retro Game**: Game ranjau klasik Windows yang dapat dimainkan langsung dengan penghitung ranjau, timer, dan deteksi menang/kalah.
   - 🗑️ **Recycle Bin**: Berisi lelucon kode warisan pengembang (*legacy spaghetti code*) dengan tombol kosongkan recycle bin.

5. **Audio Synthesizer (Web Audio API)**
   - Efek suara klik, pembukaan jendela, minimasi, dan *startup chime* Windows tanpa perlu file aset audio eksternal. Dapat dimatikan kapan saja lewat System Tray atau Settings.

---

## 🚀 Cara Menjalankan Proyek

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka URL yang ditampilkan di terminal (biasanya `http://localhost:5173`).

2. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   Hasil build siap di-*deploy* di folder `dist/` ke Vercel, Netlify, GitHub Pages, atau Cloudflare Pages.

---

## 🛠️ Cara Mengubah Data Portofolio

Semua data profil, proyek, keahlian, pengalaman, dan wallpaper tersimpan rapi di satu file:
👉 **`src/data/portfolioData.js`**

Anda dapat dengan mudah mengubah:
- Nama, role, email, link GitHub, link LinkedIn, bio, dan foto avatar di objek `personal`.
- Daftar keahlian di objek `skills`.
- Proyek, deskripsi, gambar, dan link demo di objek `projects`.
- Pengalaman kerja & pendidikan di objek `experiences` dan `education`.
- Wallpaper kustom di array `wallpapers`.

---

© Dibuat dengan cinta untuk pengalaman portofolio yang unik dan tak terlupakan! 🚀
