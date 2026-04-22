/**
 * Pure game logic — no DOM dependencies.
 * All functions are side-effect free and easily testable.
 */

export const MAX_ATTEMPTS = 3;

/**
 * Compare a user's input against a base64-encoded correct answer.
 * Comparison is case-insensitive and trims surrounding whitespace.
 * @param {string} input - raw user input
 * @param {string} answerBase64 - btoa(correct answer)
 * @returns {boolean}
 */
export function checkAnswer(input, answerBase64) {
  const correct = atob(answerBase64).trim().toLowerCase();
  return input.trim().toLowerCase() === correct;
}

/**
 * Calculate points awarded for a question.
 * @param {number} points - max points for the question
 * @param {boolean} hintUsed - whether the hint was revealed
 * @returns {number} points earned (0 if failed)
 */
export function calculateScore(points, hintUsed) {
  if (hintUsed) return Math.floor(points / 2);
  return points;
}

/**
 * Points deducted when requesting a hint.
 * @param {number} points - max points for the question
 * @returns {number}
 */
export function getHintPenalty(points) {
  return Math.floor(points / 2);
}

/**
 * Create a fresh session state object.
 * @param {string} nick
 * @returns {SessionState}
 */
export function createSession(nick) {
  return {
    nick,
    scores: {},    // { [questionId]: number }
    hintsUsed: {}, // { [questionId]: boolean }
    attempts: {},  // { [questionId]: number }
    completed: [], // completed module ids
  };
}

/**
 * Get the current state of a question attempt.
 * @param {SessionState} session
 * @param {string} questionId
 * @returns {{ attempts: number, hintUsed: boolean, score: number|null, failed: boolean }}
 */
export function getQuestionState(session, questionId) {
  const attempts = session.attempts[questionId] ?? 0;
  const hintUsed = session.hintsUsed[questionId] ?? false;
  const score = session.scores[questionId] ?? null;
  const failed = attempts >= MAX_ATTEMPTS && score === null;
  return { attempts, hintUsed, score, failed };
}

/**
 * Record a correct answer in the session (immutable update).
 * @param {SessionState} session
 * @param {string} questionId
 * @param {number} points
 * @param {boolean} hintUsed
 * @returns {SessionState}
 */
export function recordCorrectAnswer(session, questionId, points, hintUsed) {
  return {
    ...session,
    scores: { ...session.scores, [questionId]: calculateScore(points, hintUsed) },
  };
}

/**
 * Record a failed attempt in the session (immutable update).
 * @param {SessionState} session
 * @param {string} questionId
 * @returns {SessionState}
 */
export function recordFailedAttempt(session, questionId) {
  const prev = session.attempts[questionId] ?? 0;
  return {
    ...session,
    attempts: { ...session.attempts, [questionId]: prev + 1 },
  };
}

/**
 * Record hint used in the session (immutable update).
 * @param {SessionState} session
 * @param {string} questionId
 * @returns {SessionState}
 */
export function recordHintUsed(session, questionId) {
  return {
    ...session,
    hintsUsed: { ...session.hintsUsed, [questionId]: true },
  };
}

/**
 * Compute total score for a module.
 * @param {SessionState} session
 * @param {{ questions: Array<{id: string}> }} module
 * @returns {number}
 */
export function computeModuleScore(session, module) {
  return module.questions.reduce((sum, q) => sum + (session.scores[q.id] ?? 0), 0);
}

/**
 * Compute the maximum possible score for a module.
 * @param {{ questions: Array<{points: number}> }} module
 * @returns {number}
 */
export function computeModuleMaxScore(module) {
  return module.questions.reduce((sum, q) => sum + q.points, 0);
}

/**
 * Compute total score across all modules.
 * @param {SessionState} session
 * @param {Array} modules
 * @returns {number}
 */
export function computeTotalScore(session, modules) {
  return modules.reduce((sum, mod) => sum + computeModuleScore(session, mod), 0);
}
