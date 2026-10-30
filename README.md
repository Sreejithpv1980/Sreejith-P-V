# HR Pathways Academy

A plug-and-play learning management system for HR professionals, from fresh graduates to CHROs. It's a single HTML file with no install, no server, no account and no build tools needed to use it.

## Use it

- **Open the link:** open the published link in any modern browser (Chrome, Edge, Safari, Firefox, mobile or desktop).
- **Run it offline:** download `index.html` and double-click it. Everything runs in the browser. Without internet, fonts fall back to system fonts.
- **Host it yourself:** turn on GitHub Pages for this repo (Settings → Pages → deploy from branch, root folder). `index.html` is the whole app.

Progress, notes, bookmarks and certificates are saved in the browser (localStorage). To move to another device, go to **Settings → Copy backup code** and paste the code into **Restore** on the other device.

## What's inside

| Level | For | Modules |
|---|---|---|
| L1 HR Foundations | Graduates, HR assistants (0–2 yrs) | HR function & ethics · Recruitment & onboarding · Records, payroll & law · Employee support & HR numbers |
| L2 HR Practitioner | Generalists, recruiters (2–5 yrs) | Talent acquisition · Employee relations · Performance & learning · Reward & analytics basics |
| L3 HRBP & Manager | HRBPs, HR managers (5–10 yrs) | Strategic partnering · Org design & workforce planning · Talent & succession · Change, culture & analytics |
| L4 Strategic HR Leader | Heads of HR, HRDs (10–15 yrs) | People strategy & HR operating model · Total rewards & pay equity · HR tech & AI governance · M&A, restructuring, crisis |
| L5 CHRO & Board | CHROs, CPOs (15+ yrs) | CHRO mandate & board · CEO succession, culture & human+AI work · Risk, ISO 30414 & CSRD · Transformation & 100-day plan |

In total there are 60 lessons, 20 module quizzes (100 questions) and a 15-question placement assessment. The app also includes:

- XP, a daily goal and a day streak
- Certificates for each level
- Eight HR calculators: attrition, cost per hire, compa-ratio, eNPS, four-fifths rule, ROI, revenue per employee and absence rate
- Eight copy-ready templates
- Spaced-repetition flashcards and a glossary
- Full-text search, notes, bookmarks and dark mode

The content reflects late-2026 practice, including the EU AI Act, the EU Pay Transparency Directive, CSRD/ESRS S1 and skills-based organisations. It is general education, not legal advice. Check the rules in your own jurisdiction.

## Edit the content

Lessons live in `src/content/l1.js` to `l5.js` as plain objects. The lesson body uses simple Markdown: `##` headings, `-` lists, `|` tables, `>` callouts and `**bold**`. After editing, rebuild:

```
python3 build.py
```

This regenerates `index.html` (standalone) and `dist/artifact.html`.
