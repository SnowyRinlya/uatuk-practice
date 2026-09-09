// Assemble one complete structurally varied paper for every selectable module.
(function () {
  const UATUK = window.UATUK;
  const foundation = UATUK.foundationQuestions || [];
  const active = UATUK.questions || [];
  const limits = {ESAT:27, TMUA:20, TARA:22};
  const modules = [
    ['ESAT','Mathematics 1'],['ESAT','Mathematics 2'],['ESAT','Physics'],
    ['ESAT','Chemistry'],['ESAT','Biology'],['TMUA','Paper 1'],
    ['TMUA','Paper 2'],['TARA','Critical Thinking'],['TARA','Problem Solving']
  ];
  const output=[];
  for (const [exam,module] of modules) {
    const want=limits[exam], chosen=[], seenFamily=new Set(), seenPrompt=new Set();
    const primary=active.filter(q=>q.exam===exam&&q.module===module);
    const reserve=foundation.filter(q=>q.exam===exam&&q.module===module);
    for (const q of [...primary,...reserve]) {
      const family=q.family||`original-${q.id}`;
      const signature=q.prompt.replace(/<[^>]+>/g,'').replace(/[−-]?\d+(?:\.\d+)?/g,'#').replace(/\s+/g,' ').trim();
      if(seenFamily.has(family)||seenPrompt.has(signature)) continue;
      seenFamily.add(family);seenPrompt.add(signature);
      chosen.push({...q,family:`paper-${exam}-${module}-${chosen.length+1}`,difficulty:q.difficulty||'Paper standard'});
      if(chosen.length===want) break;
    }
    output.push(...chosen);
  }
  UATUK.questions=output;
})();
