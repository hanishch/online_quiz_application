document.addEventListener('DOMContentLoaded', () => {
  let quizData = [];
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;

  const quizContainer = document.getElementById('quiz-container');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next-btn');
  const timerEl = document.getElementById('time');
  const resultContainer = document.getElementById('result-container');
  const scoreEl = document.getElementById('score');
  const totalEl = document.getElementById('total');
  const restartBtn = document.getElementById('restart-btn');
  const categoryBtns = document.querySelectorAll('#category-container button');

  // Category buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoryId = btn.getAttribute('data-category');
      console.log("Clicked category ID:", categoryId); // Debugging
      fetchQuestions(categoryId);
    });
  });

  function fetchQuestions(categoryId) {
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        quizData = data.results.map(q => ({
          question: decodeHtml(q.question),
          options: shuffleArray([...q.incorrect_answers.map(decodeHtml), decodeHtml(q.correct_answer)]),
          answer: decodeHtml(q.correct_answer)
        }));
        currentQuestion = 0;
        score = 0;
        quizContainer.style.display = 'block';
        document.getElementById('category-container').style.display = 'none';
        resultContainer.style.display = 'none';
        showQuestion();
      })
      .catch(err => console.error(err));
  }

  function showQuestion() {
    resetTimer();
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = '';
    current.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'option-btn', 'mb-2');
      button.textContent = option;
      button.addEventListener('click', () => selectOption(option, button));
      optionsEl.appendChild(button);
    });
    startTimer();
  }

  function selectOption(selected, button) {
    clearInterval(timer);
    const correctAnswer = quizData[currentQuestion].answer;
    if (selected === correctAnswer) {
      score++;
      button.classList.add('correct');
    } else {
      button.classList.add('wrong');
      [...optionsEl.children].forEach(btn => {
        if (btn.textContent === correctAnswer) btn.classList.add('correct');
      });
    }
    [...optionsEl.children].forEach(btn => btn.disabled = true);
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
  }

  restartBtn.addEventListener('click', () => {
    document.getElementById('category-container').style.display = 'block';
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'none';
  });

  function startTimer() {
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        [...optionsEl.children].forEach(btn => {
          if (btn.textContent === quizData[currentQuestion].answer) btn.classList.add('correct');
          btn.disabled = true;
        });
      }
    }, 1000);
  }

  function resetTimer() { clearInterval(timer); }
  function shuffleArray(array) { return array.sort(() => Math.random() - 0.5); }
  function decodeHtml(html) { const txt = document.createElement("textarea"); txt.innerHTML = html; return txt.value; }

});
