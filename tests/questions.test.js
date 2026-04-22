import { describe, it, expect } from 'vitest';
import { MODULES } from '../js/questions.js';

describe('MODULES structure', () => {
  it('exports an array', () => {
    expect(Array.isArray(MODULES)).toBe(true);
  });

  it('contains at least 2 modules', () => {
    expect(MODULES.length).toBeGreaterThanOrEqual(2);
  });

  it('each module has required fields', () => {
    MODULES.forEach((mod) => {
      expect(mod).toHaveProperty('id');
      expect(mod).toHaveProperty('title');
      expect(Array.isArray(mod.questions)).toBe(true);
    });
  });

  it('each module has at least 1 question', () => {
    MODULES.forEach((mod) => {
      expect(mod.questions.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('Question fields', () => {
  MODULES.forEach((mod) => {
    mod.questions.forEach((q) => {
      describe(`${mod.id} / ${q.id}`, () => {
        it('has required fields', () => {
          expect(q).toHaveProperty('id');
          expect(q).toHaveProperty('text');
          expect(q).toHaveProperty('answerBase64');
          expect(q).toHaveProperty('formatHint');
          expect(q).toHaveProperty('hintText');
          expect(q).toHaveProperty('points');
        });

        it('has positive points value', () => {
          expect(q.points).toBeGreaterThan(0);
        });

        it('answerBase64 is valid base64 (non-empty when decoded)', () => {
          const decoded = atob(q.answerBase64);
          expect(decoded.length).toBeGreaterThan(0);
        });

        it('text is a non-empty string', () => {
          expect(typeof q.text).toBe('string');
          expect(q.text.length).toBeGreaterThan(0);
        });

        it('hintText is a non-empty string', () => {
          expect(typeof q.hintText).toBe('string');
          expect(q.hintText.length).toBeGreaterThan(0);
        });
      });
    });
  });
});

describe('Question IDs are unique', () => {
  it('no duplicate question ids across all modules', () => {
    const ids = MODULES.flatMap((m) => m.questions.map((q) => q.id));
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
