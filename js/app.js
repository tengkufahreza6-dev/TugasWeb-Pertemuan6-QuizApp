// ============================================
// MAIN APP - AUDIO SYNTHESIZER & QUIZ ENGINE
// ============================================

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let isAnswered = false;
let selectedQuestionCount = 5; // Default Easy
let isMuted = false;

let highscore = localStorage.getItem('quiz_highscore') || 0;

// ---------- WEB AUDIO API SYNTHESIZER ----------
let audioCtx = null;

const initAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playSound = (type) => {
  if (isMuted) return;
  initAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  if (type === 'click') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } 
  else if (type === 'correct') {
    // Chord C-Major (C5 & E5) Arpeggio
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + (i * 0.08));
      gain.gain.setValueAtTime(0.15, now + (i * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.08) + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + (i * 0.08));
      osc.stop(now + (i * 0.08) + 0.2);
    });
  } 
  else if (type === 'incorrect') {
    // Low Sawtooth Tone
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } 
  else if (type === 'tick') {
    // Critical Timer Ping (Detik Kritis <= 5)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // Tone A5
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  else if (type === 'finish') {
    // Fanfare Result Screen
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + (i * 0.12));
      gain.gain.setValueAtTime(0.2, now + (i * 0.12));
      gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.12) + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + (i * 0.12));
      osc.stop(now + (i * 0.12) + 0.3);
    });
  }
};

// ---------- ELEMEN DOM ----------
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const diffButtons = document.querySelectorAll('.diff-btn');
const audioToggleBtn = document.getElementById('audio-toggle-btn');

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

// Audio Mute/Unmute Toggle
audioToggleBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  const icon = audioToggleBtn.querySelector('i');
  if (isMuted) {
    icon.className = 'fa-solid fa-volume-xmark';
    audioToggleBtn.classList.add('muted');
  } else {
    icon.className = 'fa-solid fa-volume-high';
    audioToggleBtn.classList.remove('muted');
    playSound('click');
  }
});

// Event Listener untuk Tombol Pilihan Difficulty
diffButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    diffButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedQuestionCount = parseInt(btn.dataset.count);
  });
});

// Proteksi Refresh / Tutup Tab Saat Kuis Berjalan
window.addEventListener('beforeunload', (e) => {
  if (!quizScreen.classList.contains('hidden')) {
    e.preventDefault();
    e.returnValue = '';
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
  playSound('click');
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

// Timer Mundur & Warning Kritis dengan Sound Ping
const startTimer = () => {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerBox.classList.add('warning');
      playSound('tick'); // Bunyi beep saat waktu kritis
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
  playSound('incorrect');
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
    playSound('correct');
    target.classList.add('correct');
    score++;
    updateDots(currentQuestionIndex, 'correct');
  } else {
    playSound('incorrect');
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
  playSound('click');
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

  playSound('finish');
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
  playSound('click');
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  startScreen.classList.add('quiz-card-animate');
});