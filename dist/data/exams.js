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
    'Does technological progress necessarily improve education?',
    'Should public policy be guided by expert judgement when most citizens disagree?',
    'Is fairness better understood as equal treatment or equal opportunity?',
    'Can competition improve a public service without undermining its purpose?',
    'Should an institution be judged mainly by its outcomes rather than its intentions?',
    'Does access to more information necessarily lead to better decisions?',
    'When, if ever, is it reasonable to preserve an inefficient tradition?',
    'Should individuals be responsible for harms they could reasonably have prevented?',
    'Is uncertainty a good reason to delay action?',
    'Can a decision be rational even when it produces a bad outcome?',
    'Should scarce educational resources be directed towards those most likely to benefit?',
    'Does measuring performance inevitably change the activity being measured?'
  ];
})();
