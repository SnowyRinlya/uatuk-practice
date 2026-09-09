// Original stretch question bank: deliberately harder than routine ENGAA/TMUA practice.
// Questions stay within the published UAT-UK subject scope but require multi-step reasoning.
(function () {
  const UATUK = (window.UATUK = window.UATUK || {});
  const Q = (id, exam, module, topic, prompt, options, answer, explanation) =>
    ({ id, exam, module, topic, prompt, options, answer, explanation, difficulty: 'Stretch' });
  const bank = [];
  const add = (...args) => bank.push(Q(...args));
  const rotate = (correct, distractors, seed) => {
    const values = [...new Set([String(correct), ...distractors.map(String)])];
    const fallbacks = ['Cannot be determined from the information given', 'No real value', 'None of the other values'];
    for (const fallback of fallbacks) if (values.length < 4 && !values.includes(fallback)) values.push(fallback);
    values.length = 4;
    const shift = seed % 4;
    const options = values.map((_, i) => values[(i + shift) % 4]);
    return [options, options.indexOf(String(correct))];
  };
  const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
  const frac = (n,d) => { const g=gcd(n,d); n/=g; d/=g; return d===1?String(n):`${n}/${d}`; };
  const clean = n => Number(n.toFixed(4));

  // ESAT Mathematics 1 — algebraic structure, number theory and chained geometry.
  for (let i=0;i<27;i++) {
    const t=i%5;
    if(t===0){
      const s=7+(i%4),p=10+(i%3)*3,k=s*s-2*p;
      const [o,a]=rotate(k,[k+2*p,s*s-p,k-p],i);
      add(`xm1-${i}`,'ESAT','Mathematics 1','Algebra',`The non-zero numbers x and y satisfy x+y=${s} and xy=${p}. What is x²+y²?`,o,a,`x²+y²=(x+y)²−2xy=${s}²−2(${p})=${k}.`);
    }else if(t===1){
      const n=5+(i%4),r=2+(i%3),value=(r**(n+1)-r)/(r-1),mod=7+(i%2)*2,ans=value%mod;
      const [o,a]=rotate(ans,[(ans+1)%mod,(ans+2)%mod,(ans+mod-1)%mod],i);
      add(`xm1-${i}`,'ESAT','Mathematics 1','Number',`What is the remainder when ${r}+${r}²+⋯+${r}^${n} is divided by ${mod}?`,o,a,`The sum is ${r}(${r}^${n}−1)/(${r}−1)=${value}, whose remainder modulo ${mod} is ${ans}.`);
    }else if(t===2){
      const a0=2+(i%3),d=3+(i%4),n=8+(i%5),sum=n*(2*a0+(n-1)*d)/2,removed=a0+(2+(i%4))*d,mean=(sum-removed)/(n-1);
      const [o,a]=rotate(frac(sum-removed,n-1),[frac(sum,n),String(removed),frac(sum-removed,n)],i);
      add(`xm1-${i}`,'ESAT','Mathematics 1','Sequences',`An arithmetic sequence has first term ${a0}, common difference ${d}, and ${n} terms. Its ${3+(i%4)}rd term is removed. What is the mean of the remaining terms?`,o,a,`The original sum is ${sum}; the removed term is ${removed}. The required mean is (${sum}−${removed})/${n-1}=${frac(sum-removed,n-1)}.`);
    }else if(t===3){
      const r=3+(i%3),h=2*r,slant=Math.sqrt(r*r+h*h),area=Math.PI*r*(r+slant);
      const correct=`${r}π(${r}+√${r*r+h*h})`;
      const [o,a]=rotate(correct,[`${r*r+h*h}π`,`${r}π√${r*r+h*h}`,`${2*r}π(${r}+√${r*r+h*h})`],i);
      add(`xm1-${i}`,'ESAT','Mathematics 1','Geometry',`A right circular cone has radius ${r} and vertical height ${h}. Which expression is its total surface area?`,o,a,`The slant height is √(${r}²+${h}²)=√${r*r+h*h}. Total area is πr²+πrl=${correct}.`);
    }else{
      const m=2+(i%3),c=3+(i%4),R=5+(i%2),disc=R*R*(m*m+1)-c*c;
      const ans=disc>0?'Two':disc===0?'One':'None';
      const [o,a]=rotate(ans,['One','None','Infinitely many'].filter(x=>x!==ans).slice(0,3),i);
      while(o.length<4)o.push('Cannot be determined');
      add(`xm1-${i}`,'ESAT','Mathematics 1','Functions',`How many points of intersection are there between y=${m}x+${c} and x²+y²=${R*R}?`,o,a,`Substitution gives a quadratic with discriminant proportional to ${disc}. Since this is ${disc>0?'positive':'non-positive'}, there are ${ans.toLowerCase()} real intersection points.`);
    }
  }

  // ESAT Mathematics 2 — parameter calculus, vectors, series and exact trig.
  for (let i=0;i<27;i++) {
    const t=i%5;
    if(t===0){
      const p=2+(i%4),q=3+(i%3),x=1+(i%3),ans=3*x*x-2*p*x+q;
      const [o,a]=rotate(ans,[ans+2*p,ans-q,3*x*x-p*x+q],i);
      add(`xm2-${i}`,'ESAT','Mathematics 2','Calculus',`For f(x)=x³−${p}x²+${q}x, the tangent at x=${x} meets the y-axis at B. What is the gradient of the line through B parallel to the tangent?`,o,a,`Any parallel line has the tangent gradient. f′(x)=3x²−${2*p}x+${q}, giving ${ans}.`);
    }else if(t===1){
      const a0=3+(i%3),r=2+(i%2),n=5+(i%3),Sn=a0*(r**n-1)/(r-1),ans=a0*r**n;
      const [o,a]=rotate(ans,[Sn,ans-a0,ans*r],i);
      add(`xm2-${i}`,'ESAT','Mathematics 2','Sequences',`A geometric sequence has first term ${a0} and common ratio ${r}. The sum of its first ${n} terms is ${Sn}. By how much does the sum increase when one further term is included?`,o,a,`The increase is exactly term ${n+1}: ${a0}×${r}^${n}=${ans}.`);
    }else if(t===2){
      const k=2+(i%4),ans=`${k}/√${k*k+1}`;
      const [o,a]=rotate(ans,[`1/√${k*k+1}`,`${k*k}/√${k*k+1}`,`1/${k*k+1}`],i);
      add(`xm2-${i}`,'ESAT','Mathematics 2','Trigonometry',`An acute angle θ satisfies tan θ=${k}. What is sin θ?`,o,a,`Use a right triangle with opposite ${k}, adjacent 1 and hypotenuse √${k*k+1}; hence sinθ=${ans}.`);
    }else if(t===3){
      const p=2+(i%3),q=3+(i%4),r=1+(i%3),dot=p*r+q*(-p),mag1=p*p+q*q,mag2=r*r+p*p;
      const ans=dot===0?'0':`${dot}/√${mag1*mag2}`;
      const [o,a]=rotate(ans,[`${Math.abs(dot)}/√${mag1*mag2}`,`${dot}/${mag1*mag2}`,`${p*r+q*p}/√${mag1*mag2}`],i);
      add(`xm2-${i}`,'ESAT','Mathematics 2','Vectors',`Vectors a=(${p},${q}) and b=(${r},−${p}). Which expression equals cos of the angle from a to b?`,o,a,`a·b=${dot}; |a|²=${mag1} and |b|²=${mag2}, so cosθ=${ans}.`);
    }else{
      const h=1+(i%3),A=2+(i%4),ans=frac(4*A*h,3);
      const [o,a]=rotate(ans,[String(2*A*h),frac(2*A*h,3),String(4*A*h)],i);
      add(`xm2-${i}`,'ESAT','Mathematics 2','Calculus',`The curve y=${A}−${A}/(${h*h})x² lies above the x-axis between x=−${h} and x=${h}. What is the exact enclosed area?`,o,a,`Integrating symmetrically gives 2[${A}x−${A}x³/(3×${h*h})]₀^${h}=${ans}.`);
    }
  }

  // ESAT Physics — each item combines at least two relations.
  for(let i=0;i<27;i++){
    const t=i%5;
    if(t===0){
      const m=2+(i%3),u=3+(i%4),h=2+(i%3),v2=u*u+20*h,ans=m*(v2-u*u)/2;
      const [o,a]=rotate(`${ans} J`,[`${m*v2/2} J`,`${m*10*h/2} J`,`${ans+m*u*u/2} J`],i);
      add(`xph-${i}`,'ESAT','Physics','Mechanics',`A ${m} kg trolley moving at ${u} m s⁻¹ descends a frictionless vertical height of ${h} m. Take g=10 m s⁻². What is its increase in kinetic energy?`,o,a,`Energy conservation gives ΔEk=mgh=${m}×10×${h}=${ans} J; the initial speed is irrelevant to the increase.`);
    }else if(t===1){
      const R=3+(i%3),V=12+6*(i%3),parallel=R/2,total=parallel+2*R,I=V/total,P=I*I*2*R;
      const [o,a]=rotate(`${clean(P)} W`,[`${clean(V*I)} W`,`${clean(I*I*R)} W`,`${clean(V*V/(2*R))} W`],i);
      add(`xph-${i}`,'ESAT','Physics','Electricity',`Two ${R} Ω resistors in parallel are connected in series with a ${2*R} Ω resistor across ${V} V. What power is dissipated in the series resistor?`,o,a,`The parallel pair is ${parallel} Ω, total resistance ${total} Ω and current ${I} A. Thus P=I²R=${P} W.`);
    }else if(t===2){
      const L=1.2+(i%3)*0.3,n=3+(i%3),f=n*150/(2*L),ans=150/f;
      const fmt=x=>Number(x.toFixed(3));
      const [o,a]=rotate(`${fmt(ans)} m`,[`${fmt(2*L/n)} m`,`${fmt(L/n)} m`,`${fmt(150*n)} m`],i);
      add(`xph-${i}`,'ESAT','Physics','Waves',`A string of length ${L.toFixed(1)} m fixed at both ends supports its ${n}rd harmonic. Wave speed is 150 m s⁻¹. What is the wavelength?`,o,a,`For the nth harmonic, L=nλ/2, hence λ=2L/n=${fmt(2*L/n)} m.`);
    }else if(t===3){
      const m=2+(i%3),c=400+100*(i%3),P=600+200*(i%3),eff=0.75,dt=10+(i%3)*5,ans=P*eff*dt/(m*c);
      const [o,a]=rotate(`${clean(ans)} K`,[`${clean(P*dt/(m*c))} K`,`${clean(P*(1-eff)*dt/(m*c))} K`,`${clean(P*eff*dt/c)} K`],i);
      add(`xph-${i}`,'ESAT','Physics','Thermal',`A ${P} W heater, ${eff*100}% efficient, heats a ${m} kg block of specific heat capacity ${c} J kg⁻¹ K⁻¹ for ${dt} s. Neglect losses other than the stated inefficiency. What is the temperature rise?`,o,a,`Useful energy=${P}×${eff}×${dt}; dividing by mc gives ΔT=${ans} K.`);
    }else{
      const half=4+(i%3),time=half*(2+(i%3)),remaining=100/(2**(time/half));
      const [o,a]=rotate(`${clean(remaining)}%`,[`${clean(100-remaining)}%`,`${clean(100/(time/half))}%`,`${clean(50/(time/half))}%`],i);
      add(`xph-${i}`,'ESAT','Physics','Nuclear',`A sample has half-life ${half} hours. After ${time} hours, what percentage of the original undecayed nuclei remains?`,o,a,`${time/half} half-lives pass, so the remaining fraction is (1/2)^${time/half}=${remaining}%.`);
    }
  }

  // ESAT Chemistry — linked stoichiometry, energetics, equilibria and structure.
  for(let i=0;i<27;i++){
    const t=i%5;
    if(t===0){
      const mass=20+5*(i%4),purity=80-5*(i%3),Mr=40+(i%3)*10,ratio=2,ans=mass*purity/100/Mr*ratio;
      const [o,a]=rotate(`${clean(ans)} mol`,[`${clean(mass/Mr)} mol`,`${clean(mass*purity/100/Mr)} mol`,`${clean(mass/Mr*ratio)} mol`],i);
      add(`xch-${i}`,'ESAT','Chemistry','Stoichiometry',`A ${mass} g impure solid is ${purity}% by mass compound X (Mᵣ=${Mr}). Each mole of X forms ${ratio} mol of gas. What amount of gas is formed at complete conversion?`,o,a,`Pure X mass=${mass*purity/100} g, so n(X)=${mass*purity/100}/${Mr}; multiplying by ${ratio} gives ${ans} mol.`);
    }else if(t===1){
      const broken=350+(i%3)*20,formed=430+(i%3)*10,ans=broken-formed;
      const [o,a]=rotate(`${ans} kJ mol⁻¹`,[`${formed-broken} kJ mol⁻¹`,`${broken+formed} kJ mol⁻¹`,`${-broken} kJ mol⁻¹`],i);
      add(`xch-${i}`,'ESAT','Chemistry','Energetics',`For a reaction, ${broken} kJ mol⁻¹ is required to break reactant bonds and ${formed} kJ mol⁻¹ is released when product bonds form. What is ΔH?`,o,a,`ΔH=energy in−energy out=${broken}−${formed}=${ans} kJ mol⁻¹.`);
    }else if(t===2){
      const c=1+(i%3),v=20+5*(i%3),dil=4+(i%2),aliquot=10,ans=c*v/(v*dil)*aliquot/1000;
      const [o,a]=rotate(`${ans} mol`,[`${c*aliquot/1000} mol`,`${c*v/1000} mol`,`${c*v*dil/1000} mol`],i);
      add(`xch-${i}`,'ESAT','Chemistry','Solutions',`${v} cm³ of ${c} mol dm⁻³ solution is diluted to ${v*dil} cm³. How many moles of solute are present in a ${aliquot} cm³ aliquot of the diluted solution?`,o,a,`Diluted concentration=${c}/${dil} mol dm⁻³; amount in ${aliquot} cm³ is (${c}/${dil})×${aliquot}/1000=${ans} mol.`);
    }else if(t===3){
      add(`xch-${i}`,'ESAT','Chemistry','Equilibrium',`For the exothermic equilibrium 2A(g) ⇌ B(g), which change increases the equilibrium yield of B while also increasing the initial forward rate?`,['Lower temperature and lower pressure','Higher temperature and higher pressure','Lower temperature and higher pressure','Higher temperature and lower pressure'],2,'Lower temperature favours the exothermic direction; higher pressure favours the side with fewer gas molecules and also raises collision frequency.');
    }else{
      const z=12+(i%5),a=z+12+(i%4),electrons=z-2,ans=a-z;
      const [o,k]=rotate(ans,[z,electrons,a],i);
      add(`xch-${i}`,'ESAT','Chemistry','Atomic structure',`An ion X²⁺ has ${electrons} electrons and mass number ${a}. How many neutrons are in its nucleus?`,o,k,`X²⁺ has two fewer electrons than protons, so Z=${z}. Neutrons=${a}−${z}=${ans}.`);
    }
  }

  // ESAT Biology — interpretation and experimental reasoning rather than recall.
  const bio = [
    ['Genetics','A test cross of an organism with a dominant phenotype produces 121 dominant and 119 recessive offspring. Which conclusion is best supported?',['The tested parent is heterozygous','The tested parent is homozygous dominant','The allele is mitochondrial','The trait is polygenic'],0,'A near 1:1 ratio is expected from Aa×aa, supporting a heterozygous tested parent.'],
    ['Enzymes','An inhibitor lowers reaction rate at low substrate concentration, but the same maximum rate is reached at very high substrate concentration. What is the best explanation?',['Competitive inhibition','Non-competitive inhibition','Irreversible denaturation','Substrate exhaustion'],0,'A competitive inhibitor can be outcompeted, so Vmax is unchanged although more substrate is needed.'],
    ['Transport','A plant cell has water potential −350 kPa and is placed in a solution at −700 kPa. What is the initial net movement of water?',['Out of the cell by osmosis','Into the cell by active transport','Into the cell by osmosis','No net movement'],0,'Water moves from higher water potential (−350 kPa) to lower water potential (−700 kPa).'],
    ['Ecology','After predators are removed, prey numbers rise and then fall below their original level although predators remain absent. Which explanation is most plausible?',['The prey overshot the carrying capacity and depleted resources','Predators were the prey’s food','Mutation immediately reduced reproduction','Energy transfer became 100% efficient'],0,'Release from predation can cause an overshoot followed by a resource-driven crash.'],
    ['Respiration','During intense exercise, oxygen uptake plateaus while ATP demand continues to rise. Which change is most likely?',['A larger fraction of ATP is supplied anaerobically','Oxidative phosphorylation accelerates without oxygen','Glucose ceases to be used','Lactate production stops'],0,'Anaerobic pathways supply more ATP when aerobic supply cannot meet increasing demand.'],
    ['Immunity','A vaccinated person produces antibodies much faster after later exposure to the pathogen. Which cells most directly explain this response?',['Memory lymphocytes','Red blood cells','Platelets','Epithelial cells'],0,'Memory lymphocytes formed during the primary response rapidly divide and differentiate after re-exposure.'],
    ['Photosynthesis','Light intensity is increased but the rate of photosynthesis does not change until carbon dioxide concentration is raised. What was limiting initially?',['Carbon dioxide concentration','Light intensity','Chlorophyll colour','Oxygen concentration'],0,'The response to added carbon dioxide shows that CO₂, not light, was the limiting factor.'],
    ['Homeostasis','After a carbohydrate-rich meal, blood glucose falls more slowly in person X than in a healthy control. Which single defect best explains this?',['Reduced insulin secretion or response','Excess glucagon suppression','Faster glucose uptake','Increased glycogen synthesis'],0,'Reduced insulin action delays removal of glucose from blood and its storage as glycogen.'],
    ['Evolution','A bacterial population becomes mostly antibiotic-resistant after treatment. Which explanation is correct?',['Resistant variants were selected and left more descendants','The antibiotic caused every bacterium to mutate adaptively','Individual bacteria learned resistance','Resistance arose because the population needed it'],0,'Selection increases the frequency of pre-existing or newly arisen heritable resistant variants.']
  ];
  for(let i=0;i<27;i++){
    const b=bio[i%bio.length],shift=i%4,opts=b[2].map((_,j)=>b[2][(j+shift)%4]);
    add(`xbi-${i}`,'ESAT','Biology',b[0],b[1],opts,opts.indexOf(b[2][b[3]]),b[4]);
  }

  // TMUA Paper 1 — compact but deliberately non-routine mathematical chains.
  for(let i=0;i<20;i++){
    const t=i%5;
    if(t===0){
      const s=5+(i%4),p=4+(i%3),ans=s**3-3*p*s;
      const [o,a]=rotate(ans,[s**3-p*s,s**3-2*p*s,ans+3*p],i);
      add(`xt1-${i}`,'TMUA','Paper 1','Algebra',`The roots α and β of a quadratic satisfy α+β=${s} and αβ=${p}. What is α³+β³?`,o,a,`α³+β³=(α+β)³−3αβ(α+β)=${s}³−3(${p})(${s})=${ans}.`);
    }else if(t===1){
      const n=4+(i%4),ans=n*(n+1)*(2*n+1)/6;
      const [o,a]=rotate(ans,[n*(n+1)/2,ans+n*n,ans-n*n],i);
      add(`xt1-${i}`,'TMUA','Paper 1','Sequences',`A sequence has u₁=1 and uₙ₊₁=uₙ+2n+1. What is u_${n+1}?`,o,a,`The recurrence generates uₙ=n², so u_${n+1}=(${n+1})²=${(n+1)**2}.`,);
      bank[bank.length-1].options=rotate((n+1)**2,[n*n,(n+1)*(n+2),n*n+2*n],i)[0];bank[bank.length-1].answer=bank[bank.length-1].options.indexOf(String((n+1)**2));
    }else if(t===2){
      const k=2+(i%3),ans=2;
      add(`xt1-${i}`,'TMUA','Paper 1','Functions',`How many real solutions does |x²−${k*k}|=${k}|x| have?`,['0','2','3','4'],3,`Let y=|x|≥0. Then |y²−${k*k}|=${k}y gives two positive y-values, and each produces ±x, so there are four solutions.`);
    }else if(t===3){
      const red=3+(i%3),blue=4+(i%4),num=red*(red-1)+blue*(blue-1),den=(red+blue)*(red+blue-1),ans=frac(num,den);
      const [o,a]=rotate(ans,[frac(red,red+blue),frac(2*red*blue,den),frac(num,2*den)],i);
      add(`xt1-${i}`,'TMUA','Paper 1','Probability',`A bag contains ${red} red and ${blue} blue counters. Two are drawn without replacement. What is the probability that they have the same colour?`,o,a,`Add RR and BB: [${red}(${red-1})+${blue}(${blue-1})]/[${red+blue}(${red+blue-1})]=${ans}.`);
    }else{
      const a0=2+(i%3),b=3+(i%4),x=b,ans=a0*b*b;
      const [o,a]=rotate(ans,[2*a0*b,a0*b,2*a0*b*b],i);
      add(`xt1-${i}`,'TMUA','Paper 1','Calculus',`The curve y=${a0}x² and the line y=mx touch at x=${b}. What is m?`,o,a,`Tangency requires m=dy/dx=2(${a0})(${b})=${2*a0*b}; substituting into y=mx also shows a line through the origin cannot touch there. Therefore no such m exists.`,);
      bank[bank.length-1].prompt=`The tangent to y=${a0}x² at x=${b} meets the y-axis at c. What is c?`;
      const c=-a0*b*b; const pack=rotate(c,[a0*b*b,2*a0*b, -2*a0*b*b],i);bank[bank.length-1].options=pack[0];bank[bank.length-1].answer=pack[1];bank[bank.length-1].explanation=`The tangent gradient is ${2*a0*b}. Using y−${a0*b*b}=${2*a0*b}(x−${b}), at x=0 gives c=${c}.`;
    }
  }

  // TMUA Paper 2 — proof, quantifiers, necessary/sufficient conditions and counterexamples.
  const logic=[
    ['Logic','For every real x, P(x) implies Q(x). It is not true that Q(a). What must follow?',['P(a) is false','P(a) is true','P(x) is false for every x','Nothing follows'],0,'The contrapositive of P(a)→Q(a) is ¬Q(a)→¬P(a).'],
    ['Proof','A proof of “if n² is divisible by 3 then n is divisible by 3” begins by assuming 3∤n. What should be shown next?',['n² is not divisible by 3','n² is divisible by 9','n is even','n² is prime'],0,'This is contraposition: show 3∤n implies 3∤n².'],
    ['Logic','S is sufficient but not necessary for T. Which situation must be possible?',['T true and S false','S true and T false','Both always false','T always implies S'],0,'Sufficient gives S→T; “not necessary” means T can occur without S.'],
    ['Proof','Which observation disproves the claim “n²−n+41 is prime for every positive integer n”?',['At n=41 the value is divisible by 41','The value is prime at n=1','The expression is quadratic','Many early values are prime'],0,'One valid composite value is enough to refute a universal statement.'],
    ['Logic','What is the negation of “For every x there exists y such that y>x”?',['There exists x such that every y satisfies y≤x','For every x, every y satisfies y≤x','There exists y greater than every x','No x is greater than itself'],0,'Negating swaps ∀x∃y and negates y>x, giving ∃x∀y(y≤x).'],
    ['Proof','A proposed induction proves P(1), then assumes P(k) and proves P(k+2). What has actually been established?',['At most the odd-indexed cases starting at 1','All positive integer cases','Only P(1) and P(3)','No cases beyond P(1)'],0,'A step of two from the base case 1 reaches 1,3,5,… but not the even cases.'],
    ['Reasoning','Exactly one of P and Q is true, and Q implies R. If R is false, what follows?',['P is true and Q is false','P is false and Q is true','Both P and Q are false','Nothing definite'],0,'¬R and Q→R give ¬Q; exactly one of P,Q then forces P.'],
    ['Proof','To prove that √6 is irrational using √6=a/b in lowest terms, which consequence creates the key contradiction?',['Both a and b must be divisible by 2 or 3','a must equal b','a²+b² is odd','6 must be prime'],0,'From a²=6b², divisibility forces a and then b to share a prime factor, contradicting lowest terms.'],
    ['Logic','If A is necessary for B and B is sufficient for C, which implication is guaranteed?',['B→A and B→C','A→B and C→B','C→A only','A↔C'],0,'Necessary for B means B→A; sufficient for C means B→C.'],
    ['Proof','A function f is increasing on all real numbers. Which statement is necessarily true?',['f(x)=0 has at most one solution if f is strictly increasing','f has a positive root','f is differentiable','f(x)>x'],0,'Strict increase prevents two distinct inputs from having the same output, including zero.']
  ];
  for(let i=0;i<20;i++){
    const b=logic[i%logic.length],shift=(i*3)%4,opts=b[2].map((_,j)=>b[2][(j+shift)%4]);
    add(`xt2-${i}`,'TMUA','Paper 2',b[0],b[1],opts,opts.indexOf(b[2][b[3]]),b[4]);
  }

  // TARA Critical Thinking — denser evidence and competing explanations.
  const critical=[
    ['Assumptions','A city reports that commuters using a new rail line make fewer car journeys than other residents. It concludes that extending the line will reduce congestion citywide. Which assumption is required?',['A substantial number of future passengers would otherwise travel by car','Every resident lives near a station','Rail journeys are always cheaper than car journeys','Congestion occurs only at commuting times'],0,'Without displacement of car journeys, more rail use need not reduce road congestion.'],
    ['Weakening arguments','Hospitals introducing an electronic reminder system recorded fewer missed appointments. Which fact most weakens the claim that the reminders caused the improvement?',['Those hospitals also began charging for missed appointments','The reminders were sent by text message','Most patients owned mobile phones','Staff preferred the new system'],0,'A simultaneous financial penalty is a strong alternative cause.'],
    ['Flaws','A survey finds graduates who studied philosophy report high job satisfaction; therefore studying philosophy makes graduates happier at work. What is the main flaw?',['Self-selection and career differences may explain the association','Job satisfaction cannot be measured','All philosophy graduates have identical careers','The survey contains too many graduates'],0,'The groups may differ before study or enter different careers, so causation is not established.'],
    ['Conclusions','Every proposal approved by committee X was reviewed by a lawyer. Some lawyer-reviewed proposals were rejected. Which conclusion follows?',['Approval by X implies legal review','Legal review implies approval by X','No rejected proposal was reviewed','Committee X approved every legal proposal'],0,'Only the first statement directly follows from the universal premise.'],
    ['Strengthening arguments','A school claims that later start times improved attainment because grades rose after the change. Which finding most strengthens the causal claim?',['Comparable schools with unchanged start times showed no similar rise','Students said they liked sleeping later','Teachers also preferred the change','The school published the results'],0,'A comparison group without the intervention helps exclude a general trend.'],
    ['Principles','A policy is justified only if it prevents serious harm and no less restrictive alternative works. Which fact would be most important before applying the policy?',['Whether an effective less restrictive measure exists','Whether the policy is popular','Whether it is easy to explain','Whether similar policies have memorable names'],0,'The stated principle explicitly requires the absence of an effective less restrictive alternative.'],
    ['Assumptions','An online course has a higher completion rate than a classroom course, so moving all teaching online will increase completion. Which assumption is necessary?',['Differences in who selected each course do not explain the rate gap','Online teaching costs less','Every student owns two computers','Classroom teachers dislike technology'],0,'If the groups self-selected differently, the observed comparison need not predict the effect of moving everyone online.'],
    ['Weakening arguments','A company’s output rose after employees moved to a four-day week. Which evidence most weakens the claim that fewer days caused the rise?',['New automated equipment began operating in the same week','Most employees supported the change','Output was measured monthly','The company sells several products'],0,'The new equipment could independently explain the productivity increase.'],
    ['Flaws','A columnist argues that because no study has proved a food additive dangerous, it must be completely safe. What is the flaw?',['Absence of proof of harm is treated as proof of safety','The conclusion is too cautious','Studies can never investigate safety','All additives are dangerous'],0,'Not having established harm does not establish complete safety.'],
    ['Conclusions','No efficient process is wasteful. Some automated processes are wasteful. What follows?',['Some automated processes are not efficient','No automated process is efficient','All non-efficient processes are automated','Some efficient processes are automated'],0,'The wasteful automated processes cannot be efficient, though other automated processes might be.'],
    ['Strengthening arguments','A town says protected cycle lanes reduced cyclist injuries. Which evidence best strengthens the claim?',['Injury rates fell on treated roads but not on similar untreated roads','Cycling became more popular nationally','The lanes are brightly coloured','Residents remember the construction'],0,'A matched untreated comparison makes alternative time trends less plausible.']
  ];
  for(let i=0;i<22;i++){
    const b=critical[i%critical.length],shift=(i*2+1)%4,opts=b[2].map((_,j)=>b[2][(j+shift)%4]);
    add(`xct-${i}`,'TARA','Critical Thinking',b[0],b[1],opts,opts.indexOf(b[2][b[3]]),b[4]);
  }

  // TARA Problem Solving — multi-constraint schedules, rates and conditional data.
  for(let i=0;i<22;i++){
    const t=i%4;
    if(t===0){
      const a=4+(i%3),b=6+(i%4),hours=3+(i%3),total=a*b*hours,less=a-1,time=total/(less*b);
      const [o,k]=rotate(`${clean(time)} hours`,[`${hours+1} hours`,`${clean(total/a)} hours`,`${clean(hours*a/(a+1))} hours`],i);
      add(`xps-${i}`,'TARA','Problem Solving','Rates',`${a} identical machines, each producing ${b} units per hour, complete an order in ${hours} hours. After one machine fails before work begins, how long will the same order take?`,o,k,`Order size=${a}×${b}×${hours}=${total}. New hourly output=${less*b}, so time=${time} hours.`);
    }else if(t===1){
      const total=80+10*(i%4),A=45+5*(i%3),B=40+5*(i%2),both=20+(i%3)*5,neither=total-(A+B-both);
      const [o,k]=rotate(neither,[total-A,total-B,A+B-total],i);
      add(`xps-${i}`,'TARA','Problem Solving','Sets',`Of ${total} applicants, ${A} passed test A, ${B} passed test B and ${both} passed both. How many passed neither?`,o,k,`Passed at least one=${A}+${B}−${both}=${A+B-both}; subtracting from ${total} gives ${neither}.`);
    }else if(t===2){
      const price=80+20*(i%3),down=20+(i%3)*5,up=25,final=price*(100-down)/100*(100+up)/100;
      const [o,k]=rotate(`£${final}`,[`£${price}`,`£${price*(100-down+up)/100}`,`£${price*(100-down)/100}`],i);
      add(`xps-${i}`,'TARA','Problem Solving','Percentages',`An item priced at £${price} is reduced by ${down}%, then the reduced price is increased by ${up}%. What is the final price?`,o,k,`Successive percentage changes multiply: ${price}×${(100-down)/100}×1.25=${final}.`);
    }else{
      const slots=5,ans=['E','D','B','A'][i%4];
      const scenarios=[
        ['A is earlier than B; C is immediately before D; E is later than B. If C is first and A is third, who must be fifth?','E'],
        ['A is immediately before B; C is later than D; E is first. If A is third, who must be second?','D'],
        ['A is earlier than C; D is immediately after E; B is not first. If E is second and C is fifth, who can be fourth?','B'],
        ['B is immediately after C; D is earlier than A; E is last. If C is second and D is first, who is fourth?','A']
      ];
      const s=scenarios[i%4],options=['A','B','D','E'],correct=s[1],rot=rotate(correct,options.filter(x=>x!==correct).slice(0,3),i);
      add(`xps-${i}`,'TARA','Problem Solving','Ordering',`Five tasks A–E occupy positions 1–5. ${s[0]}`,rot[0],rot[1],`Placing the fixed and adjacent items, then applying the remaining inequalities, forces ${correct} in the requested position.`);
    }
  }

  UATUK.questions = bank;
})();
