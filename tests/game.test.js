import { describe, it, expect } from 'vitest';
import {
  checkAnswer,
  calculateScore,
  getHintPenalty,
  createSession,
  getQuestionState,
  recordCorrectAnswer,
  recordFailedAttempt,
  recordHintUsed,
  computeModuleScore,
  computeModuleMaxScore,
  computeTotalScore,
  MAX_ATTEMPTS,
} from '../js/game.js';

describe('checkAnswer', () => {
  it('returns true for exact match', () => {
    expect(checkAnswer('4625', btoa('4625'))).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(checkAnswer('administrator', btoa('Administrator'))).toBe(true);
    expect(checkAnswer('ADMINISTRATOR', btoa('Administrator'))).toBe(true);
  });

  it('trims surrounding whitespace', () => {
    expect(checkAnswer('  4625  ', btoa('4625'))).toBe(true);
  });

  it('returns false for wrong answer', () => {
    expect(checkAnswer('9999', btoa('4625'))).toBe(false);
  });

  it('returns false for empty input against non-empty answer', () => {
    expect(checkAnswer('', btoa('4625'))).toBe(false);
  });
});

describe('calculateScore', () => {
  it('returns full points when no hint used', () => {
    expect(calculateScore(10, false)).toBe(10);
  });

  it('returns half points when hint used', () => {
    expect(calculateScore(10, true)).toBe(5);
  });

  it('floors half points for odd numbers', () => {
    expect(calculateScore(7, true)).toBe(3);
  });
});

describe('getHintPenalty', () => {
  it('returns half of points', () => {
    expect(getHintPenalty(10)).toBe(5);
  });

  it('floors for odd numbers', () => {
    expect(getHintPenalty(7)).toBe(3);
  });
});

describe('createSession', () => {
  it('creates session with given nick', () => {
    const s = createSession('alice');
    expect(s.nick).toBe('alice');
  });

  it('creates session with empty state', () => {
    const s = createSession('alice');
    expect(s.scores).toEqual({});
    expect(s.hintsUsed).toEqual({});
    expect(s.attempts).toEqual({});
    expect(s.completed).toEqual([]);
  });
});

describe('getQuestionState', () => {
  it('returns defaults for untouched question', () => {
    const s = createSession('alice');
    const qs = getQuestionState(s, 'q1');
    expect(qs.attempts).toBe(0);
    expect(qs.hintUsed).toBe(false);
    expect(qs.score).toBeNull();
    expect(qs.failed).toBe(false);
  });

  it('marks failed after MAX_ATTEMPTS wrong answers', () => {
    let s = createSession('alice');
    for (let i = 0; i < MAX_ATTEMPTS; i++) s = recordFailedAttempt(s, 'q1');
    const qs = getQuestionState(s, 'q1');
    expect(qs.failed).toBe(true);
  });

  it('does not mark failed if correct answer recorded even after attempts', () => {
    let s = createSession('alice');
    s = recordFailedAttempt(s, 'q1');
    s = recordCorrectAnswer(s, 'q1', 10, false);
    const qs = getQuestionState(s, 'q1');
    expect(qs.failed).toBe(false);
  });
});

describe('recordCorrectAnswer', () => {
  it('stores score in session', () => {
    let s = createSession('alice');
    s = recordCorrectAnswer(s, 'q1', 10, false);
    expect(s.scores['q1']).toBe(10);
  });

  it('stores half score when hint used', () => {
    let s = createSession('alice');
    s = recordCorrectAnswer(s, 'q1', 10, true);
    expect(s.scores['q1']).toBe(5);
  });

  it('does not mutate original session', () => {
    const s = createSession('alice');
    const s2 = recordCorrectAnswer(s, 'q1', 10, false);
    expect(s.scores).toEqual({});
    expect(s2.scores['q1']).toBe(10);
  });
});

describe('recordFailedAttempt', () => {
  it('increments attempt count', () => {
    let s = createSession('alice');
    s = recordFailedAttempt(s, 'q1');
    s = recordFailedAttempt(s, 'q1');
    expect(s.attempts['q1']).toBe(2);
  });
});

describe('recordHintUsed', () => {
  it('marks hint as used', () => {
    let s = createSession('alice');
    s = recordHintUsed(s, 'q1');
    expect(s.hintsUsed['q1']).toBe(true);
  });
});

const mockModule = {
  id: 'test',
  questions: [
    { id: 'q1', points: 10 },
    { id: 'q2', points: 10 },
    { id: 'q3', points: 10 },
  ],
};

describe('computeModuleScore', () => {
  it('sums scores of answered questions', () => {
    let s = createSession('alice');
    s = recordCorrectAnswer(s, 'q1', 10, false);
    s = recordCorrectAnswer(s, 'q2', 10, true);
    expect(computeModuleScore(s, mockModule)).toBe(15);
  });

  it('returns 0 if no questions answered', () => {
    const s = createSession('alice');
    expect(computeModuleScore(s, mockModule)).toBe(0);
  });
});

describe('computeModuleMaxScore', () => {
  it('sums all question points', () => {
    expect(computeModuleMaxScore(mockModule)).toBe(30);
  });
});

describe('computeTotalScore', () => {
  it('sums scores across all modules', () => {
    let s = createSession('alice');
    s = recordCorrectAnswer(s, 'q1', 10, false);
    s = recordCorrectAnswer(s, 'q2', 10, false);
    const mod2 = { id: 'mod2', questions: [{ id: 'q2', points: 10 }] };
    expect(computeTotalScore(s, [mockModule, mod2])).toBe(30);
  });
});
