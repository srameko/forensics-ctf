import { MODULES } from './questions.js';
import {
  checkAnswer,
  createSession,
  recordCorrectAnswer,
  recordFailedAttempt,
  recordHintUsed,
  getQuestionState,
  computeModuleScore,
  computeModuleMaxScore,
  computeTotalScore,
  getHintPenalty,
  MAX_ATTEMPTS,
} from './game.js';

const SESSION_KEY = 'ctf_session';

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function showView(id) {
  document.querySelectorAll('.view').forEach((el) => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ── Intro view ───────────────────────────────────────────────────────────────

document.getElementById('btn-start').addEventListener('click', () => {
  const nick = document.getElementById('input-nick').value.trim();
  if (!nick) {
    showFieldError('nick-error', 'Please enter your nickname.');
    return;
  }
  const session = createSession(nick);
  saveSession(session);
  showModuleSelect();
});

document.getElementById('input-nick').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btn-start').click();
});

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.hidden = false; }
}

// ── Module select view ───────────────────────────────────────────────────────

function showModuleSelect() {
  const session = loadSession();
  const list = document.getElementById('module-list');
  list.innerHTML = '';

  const theoryDone = session.completed.includes(MODULES[0].id);

  MODULES.forEach((mod, index) => {
    const done = session.completed.includes(mod.id);
    const locked = index > 0 && !theoryDone;
    const score = done ? computeModuleScore(session, mod) : null;
    const max = computeModuleMaxScore(mod);
    const answeredCount = mod.questions.filter((q) => {
      const qs = getQuestionState(session, q.id);
      return qs.score !== null || qs.failed;
    }).length;
    const inProgress = !done && !locked && answeredCount > 0;

    const btn = document.createElement('button');
    btn.className = 'module-btn' + (done ? ' module-btn--done' : locked ? ' module-btn--locked' : inProgress ? ' module-btn--inprogress' : '');
    btn.disabled = done || locked;
    btn.innerHTML = `
      <span class="module-title">${esc(mod.title)}</span>
      ${done       ? `<span class="module-score">${score} / ${max} points ✓</span>`
        : locked     ? `<span class="module-locked">🔒 Complete Theory first</span>`
        : inProgress ? `<span class="module-progress">${answeredCount} / ${mod.questions.length} answered</span>`
        :              `<span class="module-questions">${mod.questions.length} questions</span>`}
    `;
    if (!done && !locked) btn.addEventListener('click', () => startModule(mod.id));
    list.appendChild(btn);
  });

  // Show total score if any modules done
  const totalEl = document.getElementById('running-total');
  const allModules = MODULES;
  const total = computeTotalScore(session, allModules);
  const totalMax = allModules.reduce((s, m) => s + computeModuleMaxScore(m), 0);
  totalEl.textContent = session.completed.length > 0
    ? `Total: ${total} / ${totalMax} points`
    : '';

  showView('view-modules');
}

// ── Question view ─────────────────────────────────────────────────────────────

let currentModuleId = null;
let currentQuestionIndex = 0;

function startModule(moduleId) {
  currentModuleId = moduleId;
  const session = loadSession();
  const mod = MODULES.find((m) => m.id === moduleId);
  const resumeIndex = mod.questions.findIndex((q) => {
    const qs = getQuestionState(session, q.id);
    return qs.score === null && !qs.failed;
  });
  currentQuestionIndex = resumeIndex === -1 ? 0 : resumeIndex;
  showQuestion();
}

function showQuestion() {
  const session = loadSession();
  const mod = MODULES.find((m) => m.id === currentModuleId);
  const q = mod.questions[currentQuestionIndex];
  const qs = getQuestionState(session, q.id);
  const remaining = MAX_ATTEMPTS - qs.attempts;

  document.getElementById('question-module-title').textContent = mod.title;
  document.getElementById('question-number').textContent =
    `Question ${currentQuestionIndex + 1} / ${mod.questions.length}`;
  document.getElementById('question-text').textContent = q.text;
  document.getElementById('answer-format').textContent = `Format: ${q.formatHint}`;
  document.getElementById('answer-input').value = '';
  document.getElementById('answer-input').disabled = false;
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('feedback').hidden = true;
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('hint-box').hidden = true;
  document.getElementById('hint-text-content').textContent = '';

  // Hint button
  const hintBtn = document.getElementById('btn-hint');
  if (qs.hintUsed) {
    hintBtn.textContent = 'Hint used';
    hintBtn.disabled = true;
    document.getElementById('hint-text-content').textContent = q.hintText;
    document.getElementById('hint-box').hidden = false;
  } else {
    const penalty = getHintPenalty(q.points);
    hintBtn.textContent = `Hint (−${penalty} points)`;
    hintBtn.disabled = false;
  }

  document.getElementById('attempts-remaining').textContent =
    `Attempts remaining: ${remaining}`;

  // Progress bar
  const pct = (currentQuestionIndex / mod.questions.length) * 100;
  document.getElementById('progress-fill').style.width = `${pct}%`;

  showView('view-question');
  document.getElementById('answer-input').focus();
}

document.getElementById('btn-submit').addEventListener('click', submitAnswer);
document.getElementById('answer-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitAnswer();
});

function submitAnswer() {
  let session = loadSession();
  const mod = MODULES.find((m) => m.id === currentModuleId);
  const q = mod.questions[currentQuestionIndex];
  const qs = getQuestionState(session, q.id);
  const input = document.getElementById('answer-input').value;

  if (!input.trim()) return;

  const feedbackEl = document.getElementById('feedback');

  if (checkAnswer(input, q.answerBase64)) {
    const earned = qs.hintUsed
      ? Math.floor(q.points / 2)
      : q.points;
    session = recordCorrectAnswer(session, q.id, q.points, qs.hintUsed);
    saveSession(session);

    feedbackEl.textContent = `✓ Correct! +${earned} points`;
    feedbackEl.className = 'feedback feedback--correct';
    feedbackEl.hidden = false;
    document.getElementById('answer-input').disabled = true;
    document.getElementById('btn-submit').disabled = true;

    setTimeout(() => advanceQuestion(session, mod), 1400);
  } else {
    session = recordFailedAttempt(session, q.id);
    saveSession(session);
    const newQs = getQuestionState(session, q.id);
    const remaining = MAX_ATTEMPTS - newQs.attempts;

    if (newQs.failed) {
      const correct = atob(q.answerBase64);
      feedbackEl.innerHTML = `✗ Incorrect. Correct answer: <strong>${esc(correct)}</strong>`;
      feedbackEl.className = 'feedback feedback--wrong';
      feedbackEl.hidden = false;
      document.getElementById('answer-input').disabled = true;
      document.getElementById('btn-submit').disabled = true;
      document.getElementById('attempts-remaining').textContent = 'No attempts left';
      setTimeout(() => advanceQuestion(session, mod), 2200);
    } else {
      feedbackEl.textContent = `✗ Incorrect. Attempts remaining: ${remaining}`;
      feedbackEl.className = 'feedback feedback--wrong';
      feedbackEl.hidden = false;
      document.getElementById('attempts-remaining').textContent =
        `Attempts remaining: ${remaining}`;
    }
  }
}

function advanceQuestion(session, mod) {
  currentQuestionIndex++;
  if (currentQuestionIndex >= mod.questions.length) {
    // Mark module complete
    session = {
      ...session,
      completed: [...session.completed, mod.id],
    };
    saveSession(session);
    showModuleResult(session, mod);
  } else {
    showQuestion();
  }
}

document.getElementById('btn-back-to-menu').addEventListener('click', () => {
  showModuleSelect();
});

document.getElementById('btn-hint').addEventListener('click', () => {
  let session = loadSession();
  const mod = MODULES.find((m) => m.id === currentModuleId);
  const q = mod.questions[currentQuestionIndex];
  const qs = getQuestionState(session, q.id);
  if (qs.hintUsed) return;

  const penalty = getHintPenalty(q.points);
  const confirmed = window.confirm(
    `Show hint?\nYou will lose ${penalty} points for this question.`
  );
  if (!confirmed) return;

  session = recordHintUsed(session, q.id);
  saveSession(session);

  const hintBtn = document.getElementById('btn-hint');
  hintBtn.textContent = 'Hint used';
  hintBtn.disabled = true;
  document.getElementById('hint-text-content').textContent = q.hintText;
  document.getElementById('hint-box').hidden = false;
});

// ── Module result view ────────────────────────────────────────────────────────

function showModuleResult(session, mod) {
  const score = computeModuleScore(session, mod);
  const max = computeModuleMaxScore(mod);

  document.getElementById('result-module-title').textContent = mod.title;
  document.getElementById('result-score').textContent = `${score} / ${max} points`;

  const breakdown = document.getElementById('result-breakdown');
  breakdown.innerHTML = '';
  mod.questions.forEach((q, i) => {
    const earned = session.scores[q.id] ?? 0;
    const hinted = session.hintsUsed[q.id] ? ' (hint)' : '';
    const li = document.createElement('li');
    li.className = earned > 0 ? 'result-item--correct' : 'result-item--wrong';
    li.textContent = `Question ${i + 1}: ${earned} / ${q.points} points${hinted}`;
    breakdown.appendChild(li);
  });

  const allDone = MODULES.every((m) => session.completed.includes(m.id));
  const nextBtn = document.getElementById('btn-next-module');
  if (allDone) {
    nextBtn.textContent = 'Show results →';
    nextBtn.onclick = () => showFinalScore(session);
  } else {
    nextBtn.textContent = 'Next module →';
    nextBtn.onclick = () => showModuleSelect();
  }

  showView('view-module-result');
}

// ── Final score view ──────────────────────────────────────────────────────────

function showFinalScore(session) {
  const total = computeTotalScore(session, MODULES);
  const totalMax = MODULES.reduce((s, m) => s + computeModuleMaxScore(m), 0);

  document.getElementById('final-nick').textContent = session.nick;
  document.getElementById('final-total').textContent = `${total} / ${totalMax} points`;

  const breakdown = document.getElementById('final-breakdown');
  breakdown.innerHTML = '';
  MODULES.forEach((mod) => {
    const score = computeModuleScore(session, mod);
    const max = computeModuleMaxScore(mod);
    const li = document.createElement('li');
    li.textContent = `${mod.title}: ${score} / ${max} points`;
    breakdown.appendChild(li);
  });

  showView('view-final');
}

document.getElementById('btn-restart').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('input-nick').value = '';
  document.getElementById('nick-error').hidden = true;
  showView('view-intro');
});
