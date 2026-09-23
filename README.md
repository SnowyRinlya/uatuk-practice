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
index.html             page shell; loads data scripts, then app.js
app.js                 UI only — rendering, navigation, scoring, local storage
styles.css             layout
uatuk.css              theme
data/
  exams.js             exam config, official links and writing prompts
question-bank/modules/
  *.json               reviewable question records grouped by module
question-engine/
  schema.js            question normalisation and validation
  profiles.js          target difficulty profiles
  exam-generator.js    balanced random paper generation
db/schema.ts            Drizzle schema for aggregate statistics
drizzle/                immutable D1 schema migrations
worker/runtime.js       static delivery and statistics API
```

Questions are plain `<script>` files, not ES modules, so the site keeps working
when `index.html` is opened directly from disk.

### Adding questions

Add a `Q(id, exam, module, topic, prompt, options, answer, explanation)` entry to
`UATUK.questions` in `data/questions.js`, under the matching module heading.
`answer` is the zero-based index of the correct option. Every question is
hand-written; there are no generators.

The canonical bank currently validates 310 questions. Each question receives a
continuous author difficulty estimate and uncertainty value. The exam generator
selects distinct question families while keeping the paper's mean difficulty
and difficulty distribution stable between sessions.

Question content stays in JSON so every wording, answer and explanation change
is visible in Git history. Anonymous aggregate attempts are stored in D1. Once a
question has enough responses, its calibrated difficulty supplements the author
estimate used by the generator. No account or identifying profile is stored.

## Run locally

Open `index.html` in a browser.

Run `npm install`, then `npm run build && npm run validate`. The generated Worker
is written to `dist/` and is not committed. When the database schema changes,
run `npm run db:generate` and commit the new immutable migration.

## Live site

https://axiom-admissions-practice.hushed-fir-0840.chatgpt.site

## Disclaimer

This is an independent practice platform. It is not affiliated with UAT-UK, Pearson VUE or any university. Practice questions are original.
