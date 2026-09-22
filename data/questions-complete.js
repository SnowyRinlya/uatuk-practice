// Assemble the canonical bank. Papers are generated later; this file never
// truncates the bank into a single fixed paper.
(function () {
  const UATUK = window.UATUK;
  const foundation = UATUK.foundationQuestions || [];
  const active = UATUK.questions || [];
  const modules = [
    ['ESAT','Mathematics 1'],['ESAT','Mathematics 2'],['ESAT','Physics'],
    ['ESAT','Chemistry'],['ESAT','Biology'],['TMUA','Paper 1'],
    ['TMUA','Paper 2'],['TARA','Critical Thinking'],['TARA','Problem Solving']
  ];
  const output=[];
  for (const [exam,module] of modules) {
    const chosen=[], seenId=new Set(), seenPrompt=new Set();
    const primary=active.filter(q=>q.exam===exam&&q.module===module);
    const reserve=foundation.filter(q=>q.exam===exam&&q.module===module);
    for (const q of [...primary,...reserve]) {
      const signature=q.prompt.replace(/<[^>]+>/g,'').replace(/[−-]?\d+(?:\.\d+)?/g,'#').replace(/\s+/g,' ').trim();
      if(seenId.has(q.id)||seenPrompt.has(signature)) continue;
      seenId.add(q.id);seenPrompt.add(signature);
      chosen.push(UATUK.questionSchema.normalise(q));
    }
    output.push(...chosen);
  }
  UATUK.questions=UATUK.questionSchema.validate(output);
})();
