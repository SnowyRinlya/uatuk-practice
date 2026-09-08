// Exam configuration, official UAT-UK resource links, and writing-task prompts.
(function () {
  const UATUK = (window.UATUK = window.UATUK || {});

  UATUK.official = {
    prepare: 'https://esat-tmua.ac.uk/prepare/',
    ESAT: 'https://esat-tmua.ac.uk/esat-preparation-materials/',
    TMUA: 'https://esat-tmua.ac.uk/tmua-preparation-materials/',
    TARA: 'https://esat-tmua.ac.uk/tara-preparation-materials/'
  };

  UATUK.exams = {
    ESAT: {
      description: 'Engineering and Science Admissions Test',
      format: '27 questions · 40 minutes per module',
      modules: ['Mathematics 1', 'Mathematics 2', 'Physics', 'Chemistry', 'Biology'],
      count: 27,
      time: 40
    },
    TMUA: {
      description: 'Test of Mathematics for University Admission',
      format: '20 questions · 75 minutes per paper',
      modules: ['Paper 1', 'Paper 2'],
      count: 20,
      time: 75
    },
    TARA: {
      description: 'Test of Academic Reasoning for Admissions',
      format: '22 questions · 40 minutes per MCQ module',
      modules: ['Critical Thinking', 'Problem Solving', 'Writing Task'],
      count: 22,
      time: 40
    }
  };

  UATUK.writing = [
    'Should universities give greater weight to potential than demonstrated attainment?',
    'Is it ever reasonable to limit individual choice for the benefit of society?',
    'Does technological progress necessarily improve education?'
  ];
})();
