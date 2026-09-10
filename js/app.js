// ============================================
// MAIN APP - DIFFICULTY SELECTOR & BEFOREUNLOAD
// ============================================

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let isAnswered = false;
let selectedQuestionCount = 5; // Default Easy

let highscore = localStorage.getItem('quiz_highscore') || 0;

// Elemen DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const diffButtons = document.querySelectorAll('.diff-btn');

const questionCounter = document.getElementById('question-counter');
const timeLeftDisplay = document.getElementById('time-left');
const timerBox = document.getElementById('timer-box');
const dotsContainer = document.getElementById('dots-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const explanationBox = document.getElementById('explanation-box');
const explanationText = document.getElementById('explanation-text');

const finalScoreDisplay = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');
const displayHighscore = document.getElementById('display-highscore');

document.addEventListener('DOMContentLoaded', () => {
  displayHighscore.textContent = highscore;
});

// Event Listener untuk Tombol Pilihan Difficulty
diffButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    diffButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedQuestionCount = parseInt(btn.dataset.count);
  });
});

// Proteksi Refresh / Tutup Tab Saat Kuis Berjalan
window.addEventListener('beforeunload', (e) => {
  if (!quizScreen.classList.contains('hidden')) {
    e.preventDefault();
    e.returnValue = ''; // Standar browser untuk menampilkan dialog konfirmasi
  }
});

// Algoritma Fisher-Yates untuk Pengacakan Array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Menyiapkan Data Soal Berdasarkan Jumlah yang Dipilih
const prepareShuffledQuestions = () => {
  const rawQuestions = shuffleArray(quizQuestions);
  // Potong array sesuai jumlah tingkat kesulitan yang dipilih (5, 10, atau 20)
  const slicedQuestions = rawQuestions.slice(0, selectedQuestionCount);

  return slicedQuestions.map(q => {
    const optionsWithIndex = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.answer
    }));
    const shuffledOptions = shuffleArray(optionsWithIndex);
    return {
      question: q.question,
      options: shuffledOptions,
      explanation: q.explanation
    };
  });
};

// Inisialisasi Dots Tracker Soal
const initDots = () => {
  dotsContainer.innerHTML = '';
  currentQuestions.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
};

const updateDots = (index, status) => {
  const dots = dotsContainer.querySelectorAll('.dot');
  if (dots[index]) {
    dots[index].classList.remove('active');
    dots[index].classList.add(status);
  }
};

// Mulai Kuis
startBtn.addEventListener('click', () => {
  if (typeof quizQuestions === 'undefined' || !quizQuestions.length) {
    alert('Data soal belum terhubung! Periksa berkas js/questions.js kamu.');
    return;
  }
  
  currentQuestions = prepareShuffledQuestions();
  currentQuestionIndex = 0;
  score = 0;

  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  initDots();
  loadQuestion();
});

// Memuat Pertanyaan
const loadQuestion = () => {
  clearInterval(timer);
  timeLeft = 15;
  timeLeftDisplay.textContent = timeLeft;
  timerBox.classList.remove('warning');
  isAnswered = false;

  nextBtn.classList.add('hidden');
  explanationBox.classList.add('hidden');

  // PERBARUI TEKS TOMBOL: Jika soal terakhir, ubah teksnya
  if (currentQuestionIndex === currentQuestions.length - 1) {
    nextBtn.textContent = 'Selesai & Lihat Hasil';
  } else {
    nextBtn.textContent = 'Lanjut Soal';
  }

  quizScreen.classList.remove('quiz-card-animate');
  void quizScreen.offsetWidth; 
  quizScreen.classList.add('quiz-card-animate');

  const currentQ = currentQuestions[currentQuestionIndex];
  questionCounter.textContent = `Soal ${currentQuestionIndex + 1} dari ${currentQuestions.length}`;
  
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    if (idx === currentQuestionIndex && !dot.classList.contains('correct') && !dot.classList.contains('incorrect')) {
      dot.classList.add('active');
    }
  });

  const progressPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  questionText.textContent = currentQ.question;
  optionsContainer.innerHTML = '';

  currentQ.options.forEach((optObj, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = optObj.text;
    btn.dataset.index = index;
    optionsContainer.appendChild(btn);
  });

  startTimer();
};

// Timer Mundur & Warning Kritis
const startTimer = () => {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerBox.classList.add('warning');
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
};

// Menampilkan Penjelasan Soal
const showExplanation = () => {
  const currentQ = currentQuestions[currentQuestionIndex];
  explanationText.textContent = currentQ.explanation;
  explanationBox.classList.remove('hidden');
};

const handleTimeout = () => {
  if (isAnswered) return;
  isAnswered = true;
  updateDots(currentQuestionIndex, 'incorrect');
  highlightCorrectAnswer();
  disableAllOptions();
  showExplanation();

  if (currentQuestionIndex === currentQuestions.length - 1) {
    nextBtn.textContent = 'Selesai & Lihat Hasil';
  } else {
    nextBtn.textContent = 'Lanjut Soal';
  }

  nextBtn.classList.remove('hidden');
};

optionsContainer.addEventListener('click', (e) => {
  if (isAnswered) return;
  const target = e.target.closest('.option-btn');
  if (!target) return;

  isAnswered = true;
  clearInterval(timer);

  const selectedIndex = parseInt(target.dataset.index);
  const currentQ = currentQuestions[currentQuestionIndex];
  const isCorrect = currentQ.options[selectedIndex].isCorrect;

  if (isCorrect) {
    target.classList.add('correct');
    score++;
    updateDots(currentQuestionIndex, 'correct');
  } else {
    target.classList.add('incorrect');
    highlightCorrectAnswer();
    updateDots(currentQuestionIndex, 'incorrect');
  }

  disableAllOptions();
  showExplanation();
  nextBtn.classList.remove('hidden');
});

const highlightCorrectAnswer = () => {
  const currentQ = currentQuestions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    if (currentQ.options[idx].isCorrect) {
      btn.classList.add('correct');
    }
  });
};

const disableAllOptions = () => {
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
};

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResultScreen();
  }
});

const showResultScreen = () => {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  resultScreen.classList.add('quiz-card-animate');
  progressBarFill.style.width = `100%`;

  finalScoreDisplay.textContent = `${score} / ${currentQuestions.length}`;

  if (score === currentQuestions.length) {
    scoreMessage.textContent = "Luar biasa! Nilai sempurna untuk performa teknis kamu!";
  } else if (score >= (currentQuestions.length * 0.7)) {
    scoreMessage.textContent = "Sangat baik! Penguasaan materi sudah matang.";
  } else {
    scoreMessage.textContent = "Cukup baik, terus tingkatkan pemahaman kodingmu!";
  }

  if (score > highscore) {
    highscore = score;
    localStorage.setItem('quiz_highscore', highscore);
    displayHighscore.textContent = highscore;
  }
};

restartBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  startScreen.classList.add('quiz-card-animate');
});