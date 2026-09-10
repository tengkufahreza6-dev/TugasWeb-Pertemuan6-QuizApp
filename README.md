# Tugas Web Pertemuan 6 - Interactive Quiz App

Proyek ini merupakan aplikasi web **Interactive Quiz App** berbasis **Single Page Application (SPA)** yang dikembangkan menggunakan **HTML5**, **CSS3 (Custom Dark Glassmorphism)**, dan **Vanilla JavaScript (ES6+)**. Aplikasi ini dirancang untuk menguji pemahaman seputar Pemrograman Web, JavaScript, dan Ilmu Komputer secara interaktif, intuitif, dan responsif.

## Tautan Live Demo
[Github Pages Preview](https://tengkufahreza6-dev.github.io/TugasWeb-Pertemuan6-QuizApp/)

---

## 📌 Pemenuhan Kriteria Utama & Fitur Unggulan

Aplikasi ini telah memenuhi seluruh kriteria wajib dan fitur bonus pada rubrik penilaian Tugas Rutin 6:

1. **Sistem Kuis Dinamis & Bank 20 Soal:**
   Menyediakan 20 bank soal teknis yang dilengkapi dengan pilihan 3 tingkat kesulitan:
   - **Easy:** 5 Pertanyaan
   - **Medium:** 10 Pertanyaan
   - **Hard:** 20 Pertanyaan

2. **Render DOM Safe (XSS Protection):**
   Seluruh penyisipan teks soal, opsi jawaban, dan penjelasan dikelola secara aman menggunakan `textContent` dan `document.createElement()`, menghindari penggunaan `innerHTML` pada data masukan.

3. **Event Delegation:**
   Penanganan klik opsi jawaban memanfaatkan mekanisme *Event Delegation* pada kontainer utama opsi untuk efisiensi eksekusi memori.

4. **Algoritma Pengacakan (Fisher-Yates Shuffle):**
   Setiap sesi kuis baru mengacak urutan soal dan urutan pilihan ganda (A, B, C, D) secara otomatis agar kuis memiliki *replay value* tinggi.

5. **Timer & Warning Visual Kritis:**
   Setiap soal diberi alokasi waktu 15 detik. Peringatan visual berkedip merah (*warning pulse*) akan aktif secara otomatis jika waktu tersisa di bawah 5 detik.

6. **Feedback Visual Instan & Explanation Box:**
   Memberikan indikator warna langsung (hijau untuk benar, merah untuk salah) serta memunculkan kotak pembahasan (*Explanation Box*) ringkas setelah soal dijawab atau waktu habis.

7. **Question Dots Tracker & Progress Bar:**
   Indikator titik (*dots tracker*) dinamis di bagian atas soal yang mencatat status jawaban secara *real-time*, didukung *progress bar* visual yang bergerak seiring kemajuan kuis.

8. **Penyimpanan High Score Persisten:**
   Perhitungan skor otomatis di akhir sesi dengan integrasi `localStorage` untuk menyimpan rekor nilai tertinggi secara permanen di browser.

9. **UX Polish & Beforeunload Protection:**
   Penyesuaian konteks tombol navigasi utama (berubah menjadi *"Selesai & Lihat Hasil"* pada nomor terakhir) serta proteksi `beforeunload` untuk mencegah pengguna kehilangan progres kuis saat tidak sengaja me-refresh atau menutup tab browser.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** — Struktur dokumen semantik dan kontainer SPA.
- **CSS3** — Custom Styling, Dark Glassmorphism, Responsive Grid, dan Animasi Transisi (`@keyframes`).
- **JavaScript (Vanilla ES6+)** — State Management, Manipulasi DOM, Timer Interval, Event Delegation, dan LocalStorage API.
- **Font Awesome 6 & Google Fonts (Inter)** — Ikonografi dan tipografi antarmuka modern.

---

## 👤 Informasi Mahasiswa

- **Nama:** Tengku Fahreza (4252550005)
- **Kelas:** PSIK 25B
- **Program Studi:** S1 Ilmu Komputer
- **Mata Kuliah:** Pemrograman Web
- **Instansi:** Universitas Negeri Medan (UNIMED)