// Canonical question schema and runtime validation.
(function () {
  const UATUK = (window.UATUK = window.UATUK || {});
  const required = ['id', 'exam', 'module', 'topic', 'prompt', 'options', 'answer', 'explanation'];

  function hash(value) {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function estimateDifficulty(question) {
    if (question.difficulty && typeof question.difficulty === 'object') return question.difficulty;
    const sourceBase = question.difficulty === 'Stretch' ? 0.82
      : question.difficulty === 'Paper standard' ? 0.70 : 0.54;
    // A small stable per-question adjustment prevents an entire source group
    // from sharing one artificial value. It is stable across sessions/builds.
    const adjustment = ((hash(question.id) % 101) - 50) / 1000;
    return {
      authorEstimate: Math.max(0.25, Math.min(0.95, sourceBase + adjustment)),
      uncertainty: question.difficulty === 'Paper standard' ? 0.045 : 0.06,
      calibrated: null,
      sampleSize: 0
    };
  }

  function normalise(question) {
    const difficulty = estimateDifficulty(question);
    return {
      ...question,
      family: question.family || question.id,
      difficulty,
      metadata: {
        style: 'official-like',
        version: 1,
        ...(question.metadata || {})
      }
    };
  }

  function validate(questions) {
    const errors = [];
    const ids = new Set();
    questions.forEach((question, index) => {
      for (const key of required) if (question[key] === undefined || question[key] === '') errors.push(`#${index + 1}: missing ${key}`);
      if (ids.has(question.id)) errors.push(`${question.id}: duplicate id`);
      ids.add(question.id);
      if (!Array.isArray(question.options) || question.options.length < 2) errors.push(`${question.id}: needs at least two options`);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) errors.push(`${question.id}: invalid answer`);
      const d = question.difficulty || {};
      if (!(d.authorEstimate >= 0 && d.authorEstimate <= 1)) errors.push(`${question.id}: invalid difficulty estimate`);
      if (!(d.uncertainty >= 0 && d.uncertainty <= 0.25)) errors.push(`${question.id}: invalid difficulty uncertainty`);
    });
    if (errors.length) throw new Error(`Question bank validation failed:\n${errors.slice(0, 20).join('\n')}`);
    return questions;
  }

  UATUK.questionSchema = { normalise, validate };
})();
