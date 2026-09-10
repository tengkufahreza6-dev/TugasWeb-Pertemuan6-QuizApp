// ============================================
// DATA BANK SOAL QUIZ APP (20 PERTANYAAN)
// ============================================

const quizQuestions = [
  {
    question: "Apa fungsi utama dari metode 'async/await' dalam JavaScript modern?",
    options: [
      "Menghentikan eksekusi program secara total",
      "Menangani operasi asynchronous agar terbaca seperti sinkronus",
      "Mempercepat kinerja CPU komputer",
      "Mengubah tipe data string menjadi integer"
    ],
    answer: 1,
    explanation: "Async/await merupakan syntactic sugar berbasis Promise yang mempermudah penulisan dan pembacaan kode asynchronous secara sequential."
  },
  {
    question: "Manakah metode array di bawah ini yang digunakan untuk menyaring elemen berdasarkan kondisi tertentu?",
    options: [".map()", ".forEach()", ".filter()", ".reduce()"],
    answer: 2,
    explanation: "Metode .filter() menghasilkan array baru yang hanya berisi elemen-elemen yang lolos pengujian fungsi predikat."
  },
  {
    question: "Apa tujuan utama dari penerapan teknik 'Event Delegation' pada DOM?",
    options: [
      "Mengurangi jumlah event listener dengan memanfaatkan event bubbling",
      "Menghapus seluruh elemen HTML secara otomatis",
      "Mempercepat proses rendering gambar",
      "Mengamankan data dari serangan SQL Injection"
    ],
    answer: 0,
    explanation: "Event delegation memanfaatkan mekanisme event propagation (bubbling) sehingga cukup memasang satu listener pada elemen induk."
  },
  {
    question: "Properti CSS apa yang digunakan untuk membuat efek buram (blur) pada latar belakang elemen?",
    options: ["opacity", "backdrop-filter", "box-shadow", "filter-blur"],
    answer: 1,
    explanation: "Properti backdrop-filter mengaplikasikan efek grafis seperti blur atau warna ke area tepat di belakang elemen."
  },
  {
    question: "Di mana penyimpanan lokal browser yang aman untuk data persisten berukuran kecil adalah...",
    options: ["SessionStorage", "LocalStorage", "Cookies Secure", "IndexedDB Cache"],
    answer: 1,
    explanation: "LocalStorage menyimpan data kuncian pasangan key-value yang tetap ada meskipun peramban ditutup (tidak kadaluarsa)."
  },
  {
    question: "Manakah sintaks penulisan variabel modern ES6+ yang direkomendasikan untuk nilai yang tidak diubah?",
    options: ["var", "let", "const", "static"],
    answer: 2,
    explanation: "Sintaks 'const' mendeklarasikan variabel bertipe read-only reference yang nilainya tidak dapat di-reassign."
  },
  {
    question: "Apa kode status HTTP yang menandakan bahwa suatu sumber daya (resource) tidak ditemukan?",
    options: ["200 OK", "401 Unauthorized", "404 Not Found", "500 Internal Error"],
    answer: 2,
    explanation: "HTTP 404 Not Found mengindikasikan bahwa server berhasil berkomunikasi, tetapi resource yang diminta tidak tersedia."
  },
  {
    question: "Framework CSS apa yang digunakan dalam proyek Katalog Produk sebelumnya (TR 3)?",
    options: ["Tailwind CSS", "Bootstrap 5", "Bulma CSS", "Foundation"],
    answer: 1,
    explanation: "Proyek TR 3 Katalog memanfaatkan Bootstrap 5.3 CDN untuk sistem grid dan komponen UI modal/cards."
  },
  {
    question: "Metode manipulasi DOM apa yang paling aman dari kerentanan XSS saat menyisipkan teks murni?",
    options: ["innerHTML", "outerHTML", "textContent", "document.write()"],
    answer: 2,
    explanation: "textContent memperlakukan masukan sebagai teks murni (plain text) tanpa melakukan parsing elemen HTML, mencegah eksekusi skrip jahat."
  },
  {
    question: "Apa kepanjangan dari singkatan SPA dalam arsitektur pengembangan web modern?",
    options: [
      "Simple Program Architecture",
      "Single Page Application",
      "Standard Protocol Access",
      "Secure Process Automation"
    ],
    answer: 1,
    explanation: "Single Page Application (SPA) adalah arsitektur web yang memuat satu halaman tunggal dan memperbarui konten secara dinamis tanpa reload."
  },
  {
    question: "Tag HTML manakah yang digunakan untuk mendefinisikan skrip sisi klien (JavaScript)?",
    options: ["<script>", "<javascript>", "<code", "<js>"],
    answer: 0,
    explanation: "Tag <script> digunakan untuk menyematkan atau merujuk ke skripexecutable yang dijalankan oleh browser."
  },
  {
    question: "Manakah operator perbandingan di JavaScript yang memeriksa nilai DAN tipe data secara bersamaan?",
    options: ["==", "=", "===", "!=="],
    answer: 2,
    explanation: "Operator strict equality (===) memeriksa kesamaan nilai sekaligus kesamaan tipe data tanpa konversi implisit."
  },
  {
    question: "Apa nama fungsi bawaan JavaScript untuk mengubah string JSON menjadi objek JavaScript?",
    options: ["JSON.stringify()", "JSON.parse()", "Object.parse()", "String.toJSON()"],
    answer: 1,
    explanation: "JSON.parse() mengurai string format JSON dan mengembalikannya menjadi objek atau struktur data JavaScript yang valid."
  },
  {
    question: "Properti CSS Flexbox apa yang mengatur perataan sumbu utama (main axis)?",
    options: ["align-items", "justify-content", "flex-direction", "align-content"],
    answer: 1,
    explanation: "justify-content mendistribusikan ruang antar dan di sekitar item flex di sepanjang sumbu utama (main axis)."
  },
  {
    question: "Sistem kontrol versi terdistribusi manakah yang menjadi standar industri saat ini?",
    options: ["SVN", "Mercurial", "Git", "CVS"],
    answer: 2,
    explanation: "Git adalah sistem kontrol versi terdistribusi yang dirancang untuk menangani segala hal mulai dari proyek kecil hingga sangat besar dengan cepat."
  },
  {
    question: "Apa fungsi dari atribut 'alt' pada tag gambar HTML (<img>)?",
    options: [
      "Menentukan ukuran piksel gambar",
      "Menyediakan teks alternatif jika gambar gagal dimuat atau untuk aksesibilitas",
      "Mengatur tata letak border gambar",
      "Menjalankan animasi saat kursor diarahkan"
    ],
    answer: 1,
    explanation: "Atribut alt mendeskripsikan teks alternatif bagi pembaca layar (screen reader) atau ketika file gambar gagal dirender."
  },
  {
    question: "Manakah struktur data yang beroperasi dengan prinsip LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: 1,
    explanation: "Stack (tumpukan) beroperasi dengan prinsip LIFO, di mana elemen yang terakhir dimasukkan akan menjadi yang pertama keluar."
  },
  {
    question: "Dalam konteks basis data relasional, apa kepanjangan dari SQL?",
    options: [
      "Simple Query Language",
      "Structured Query Language",
      "Sequential Question Logic",
      "System Quality Link"
    ],
    answer: 1,
    explanation: "SQL singkatan dari Structured Query Language, bahasa standar untuk mengelola dan merelasikan data di RDBMS."
  },
  {
    question: "Metode HTTP mana yang umumnya digunakan untuk mengirim data baru ke server?",
    options: ["GET", "POST", "DELETE", "HEAD"],
    answer: 1,
    explanation: "Metode POST digunakan untuk mengirimkan ent 데이터를 ke sumber daya tertentu, seringkali menyebabkan perubahan state di server."
  },
  {
    question: "Apa komponen utama yang berfungsi mengeksekusi instruksi program di dalam komputer?",
    options: ["RAM", "Hard Disk", "CPU (Central Processing Unit)", "GPU"],
    answer: 2,
    explanation: "CPU bertindak sebagai otak komputer yang mengambil, mendekode, dan mengeksekusi instruksi dari program."
  }
];