# UATUK Practice

Independent English-language practice platform for ESAT, TMUA and TARA.

## Features

- Module and topic filters
- Quick drills and timed simulations
- Randomised question sets
- Question navigator and review flags
- Mistake book and progress tracking
- TARA writing practice
- Links to official UAT-UK preparation resources

## Project structure

```
dist/
  index.html          page shell; loads data/ scripts, then app.js
  app.js              UI only — rendering, navigation, scoring, local storage
  styles.css          layout
  uatuk.css           theme
  data/
    exams.js          exam config, official UAT-UK links, writing prompts
    questions.js      the whole question bank
```

Questions are plain `<script>` files, not ES modules, so the site keeps working
when `index.html` is opened directly from disk.

### Adding questions

Add a `Q(id, exam, module, topic, prompt, options, answer, explanation)` entry to
`UATUK.questions` in `data/questions.js`, under the matching module heading.
`answer` is the zero-based index of the correct option. Every question is
hand-written; there are no generators.

The bank holds 219 questions, matching official paper lengths: 27 for each of the
five ESAT modules, 20 per TMUA paper and 22 per TARA multiple-choice module.
Correct answers are spread evenly across the four option positions in every
module, so no position is a better guess than another. Numeric options stay in
ascending or descending order wherever that is compatible with the balance;
where it is not, the option list is left as close to sorted as the balance
allows.

## Run locally

Open `dist/index.html` in a browser.

## Live site

https://axiom-admissions-practice.hushed-fir-0840.chatgpt.site

## Disclaimer

This is an independent practice platform. It is not affiliated with UAT-UK, Pearson VUE or any university. Practice questions are original.
