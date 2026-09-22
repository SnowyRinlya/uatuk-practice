// Exam-level targets. Mean, spread and bands are controlled independently.
(function () {
  const UATUK = window.UATUK;
  UATUK.difficultyProfiles = {
    ESAT: { targetMean: 0.72, targetSpread: 0.15, tolerance: 0.025 },
    TMUA: { targetMean: 0.68, targetSpread: 0.14, tolerance: 0.025 },
    TARA: { targetMean: 0.66, targetSpread: 0.15, tolerance: 0.03 }
  };
})();
