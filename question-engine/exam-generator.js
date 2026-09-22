// Balanced paper generation with controlled per-sitting difficulty variation.
(function () {
  const UATUK = window.UATUK;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const shuffle = values => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const mean = values => values.reduce((sum, n) => sum + n, 0) / Math.max(values.length, 1);
  const spread = values => {
    const m = mean(values);
    return Math.sqrt(mean(values.map(n => (n - m) ** 2)));
  };
  const observedDifficulty = question => {
    const d = question.difficulty;
    const centre = d.calibrated == null ? d.authorEstimate : d.calibrated;
    return clamp(centre + (Math.random() * 2 - 1) * d.uncertainty, 0, 1);
  };

  function scorePaper(items, profile) {
    const values = items.map(item => item.sessionDifficulty);
    const bands = [0, 0, 0, 0];
    values.forEach(v => bands[v < 0.5 ? 0 : v < 0.65 ? 1 : v < 0.8 ? 2 : 3]++);
    const desired = [0.12, 0.28, 0.42, 0.18].map(x => x * items.length);
    const bandError = bands.reduce((sum, n, i) => sum + Math.abs(n - desired[i]), 0) / items.length;
    return Math.abs(mean(values) - profile.targetMean) * 8
      + Math.abs(spread(values) - profile.targetSpread) * 3
      + bandError;
  }

  function generate({ exam, module, topic = 'all', count, order = 'random' }) {
    let pool = UATUK.questions.filter(q => q.exam === exam && q.module === module && (topic === 'all' || q.topic === topic));
    if (order === 'fixed') pool = [...pool];
    const wanted = Math.min(count, pool.length);
    const configured = UATUK.difficultyProfiles[exam];
    const estimates = pool.map(q => q.difficulty.calibrated == null ? q.difficulty.authorEstimate : q.difficulty.calibrated).sort((a, b) => a - b);
    const lowestPossible = mean(estimates.slice(0, wanted));
    const highestPossible = mean(estimates.slice(-wanted));
    const profile = {
      ...configured,
      // A narrow topic or a still-growing bank may not be able to reach the
      // global target. Use the nearest achievable mean instead of pretending.
      targetMean: clamp(configured.targetMean, lowestPossible, highestPossible)
    };
    let best = null;
    for (let attempt = 0; attempt < (order === 'fixed' ? 1 : 300); attempt++) {
      const families = new Set();
      const candidate = [];
      for (const question of (order === 'fixed' ? pool : shuffle(pool))) {
        if (families.has(question.family)) continue;
        families.add(question.family);
        candidate.push({ ...question, sessionDifficulty: observedDifficulty(question) });
        if (candidate.length === wanted) break;
      }
      const score = scorePaper(candidate, profile);
      if (!best || score < best.score) best = { score, questions: candidate };
      if (Math.abs(mean(candidate.map(q => q.sessionDifficulty)) - profile.targetMean) <= profile.tolerance && score < 0.35) break;
    }
    return best ? best.questions : [];
  }

  UATUK.examGenerator = { generate };
})();
