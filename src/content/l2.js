LMS.addLevel({
  id: 'l2', code: 'L2', name: 'HR Practitioner',
  audience: 'HR generalists · HR executives · recruiters · 2–5 years',
  blurb: 'Run talent acquisition, employee relations, performance, learning and reward processes end to end, and start using data to make the case.',
  modules: [
    {
      id: 'm1', title: 'Talent Acquisition Excellence',
      summary: 'Recruitment funnels, employer brand, candidate experience and the science of selection.',
      lessons: [
        {
          id: '1', t: 'The recruitment funnel & hiring metrics', mins: 14,
          obj: ['Map a recruitment funnel with conversion rates', 'Calculate cost per hire and quality of hire', 'Diagnose funnel bottlenecks'],
          body: `Recruitment is a pipeline. Treat it like one: measure each stage, find the leaks, fix them.

## A typical funnel
| Stage | Example volume | Conversion |
|---|---|---|
| Applicants | 400 | – |
| Screened in | 80 | 20% |
| First interview | 30 | 38% |
| Final interview | 10 | 33% |
| Offers | 4 | 40% |
| Accepted | 3 | 75% |

Working backwards: to make 3 hires, you need roughly 400 applicants. If you need 30 hires next quarter, you can now plan sourcing volume and interviewer time.

## Key metrics
- **Time to fill** – requisition approval to offer accepted.
- **Time to hire** – candidate entering the pipeline to accepting.
- **Cost per hire** = (internal recruiting costs + external costs) ÷ number of hires. Internal costs include recruiter salaries and tools; external costs include agency fees, advertising and assessments.
- **Offer acceptance rate** – a low figure often signals pay or process problems.
- **Quality of hire** – a composite such as first-year performance rating, hiring manager satisfaction and 12-month retention.
- **Source of hire** – which channels produce hires who stay and perform.

## Diagnosing bottlenecks
- Many applicants, few screened in → job ad is too broad or targeted at the wrong market.
- Many final interviews, few offers → unclear criteria or misaligned hiring managers.
- Offers declined → pay below market, slow process, poor candidate experience.

> Hold a 20-minute intake meeting with the hiring manager for every role. It prevents most downstream problems.`,
          take: ['Measure every stage and work backwards from hires', 'Quality of hire matters more than speed', 'Low acceptance rates usually point to pay or process'],
          act: 'Build a funnel for one recent role and identify the stage with the worst conversion. Propose one fix.'
        },
        {
          id: '2', t: 'Employer brand & candidate experience', mins: 10,
          obj: ['Define an employee value proposition (EVP)', 'Design a positive candidate journey', 'Use feedback to improve'],
          body: `Candidates research you before they apply. Your employer brand is what people say about working for you when you are not in the room.

## Employee value proposition (EVP)
The EVP is the honest answer to "why should a talented person work here rather than elsewhere?" It usually covers five areas:

- **Compensation** – pay, bonus, equity.
- **Benefits** – health, leave, flexibility, wellbeing.
- **Career** – growth, learning, mobility.
- **Work environment** – manager quality, autonomy, tools, hybrid policy.
- **Culture and purpose** – mission, values, impact, inclusion.

Build it from evidence: engagement surveys, exit interviews, focus groups with high performers. An EVP that does not match reality increases early attrition.

## Candidate experience
- Respond to every applicant, even rejections. Automate it kindly.
- Share the process and timeline upfront.
- Keep the process short: three or four stages for most roles.
- Give interviewers the candidate profile in advance so they do not ask repeated questions.
- Offer feedback to final-stage candidates.

## Measure it
Run a short candidate survey after interviews (candidate NPS). Monitor Glassdoor, Indeed and LinkedIn reviews. Track drop-out rates by stage.

> Every rejected candidate is a potential customer, referrer or future hire. Treat them that way.`,
          take: ['An EVP must be true, distinctive and evidence-based', 'Communicate timelines and close the loop with everyone', 'Track candidate NPS and drop-outs'],
          act: 'Interview three recent joiners: why did they accept? Draft a five-point EVP from their answers.'
        },
        {
          id: '3', t: 'Selection science & fair assessment', mins: 14,
          obj: ['Compare the predictive validity of selection methods', 'Combine methods for better decisions', 'Reduce adverse impact'],
          body: `Some selection methods predict job performance much better than others. Decades of research (summarised in meta-analyses such as Schmidt & Hunter, updated by Sackett and colleagues in 2022) give a clear ranking.

## Relative validity (approximate)
| Method | Predictive power |
|---|---|
| Structured interviews | High |
| Job knowledge tests | High |
| Work samples / job simulations | Moderate to high |
| Cognitive ability tests | Moderate (with adverse-impact risk) |
| Integrity / conscientiousness measures | Moderate |
| Unstructured interviews | Low to moderate |
| Years of experience | Low |
| Education level | Low |
| Graphology, astrology | None |

## Combining methods
No single tool is enough. A strong process combines a structured interview with a work sample or job knowledge test, then makes a decision using pre-agreed weightings.

## Adverse impact
A selection step has adverse impact when one group passes at a much lower rate than another. A common check is the **four-fifths rule**: if a group’s selection rate is less than 80% of the highest group’s rate, investigate.

Example: 50% of men pass a test but only 30% of women. 30 ÷ 50 = 60%, below 80%, so investigate.

## AI-assisted assessment
AI screening and video-analysis tools must be validated for job-relatedness and audited for bias. New York City requires bias audits of automated employment decision tools, and under the EU AI Act hiring AI is classed as high-risk.

> Valid and fair are not in tension. Structured, job-related methods tend to be both.`,
          take: ['Use structured interviews and work samples', 'Experience and education are weak predictors', 'Monitor pass rates with the four-fifths rule'],
          act: 'Audit one hiring process: list each step, its validity, and whether you track pass rates by group.'
        }
      ],
      quiz: [
        { q: 'Recruiting costs were $60,000 internal and $90,000 external for 50 hires. Cost per hire is:', o: ['$1,200', '$1,800', '$3,000', '$7,500'], a: 2, e: '($60,000 + $90,000) ÷ 50 = $3,000.' },
        { q: 'Many candidates decline offers. The most likely causes are:', o: ['Too many applicants', 'Below-market pay, slow process or poor experience', 'Too many interviewers trained', 'Strong employer brand'], a: 1, e: 'Offer declines usually trace to pay, speed or candidate experience.' },
        { q: 'Which is the weakest predictor of job performance?', o: ['Structured interview', 'Work sample', 'Years of experience', 'Job knowledge test'], a: 2, e: 'Years of experience has low predictive validity compared with structured methods.' },
        { q: 'Group A selection rate is 40% and Group B is 28%. Under the four-fifths rule:', o: ['No concern, ratio is 70% which is above 50%', 'Investigate, ratio is 70% which is below 80%', 'No concern, both above 25%', 'Stop hiring Group B'], a: 1, e: '28 ÷ 40 = 70%, below the 80% threshold, so adverse impact should be investigated.' },
        { q: 'An EVP that promises more than reality is likely to cause:', o: ['Higher early attrition', 'Lower cost per hire long-term', 'Better quality of hire', 'No effect'], a: 0, e: 'When reality doesn’t match the promise, new hires leave early.' }
      ]
    },
    {
      id: 'm2', title: 'Employee Relations',
      summary: 'Grievances, investigations, discipline, performance improvement and exits done right.',
      lessons: [
        {
          id: '1', t: 'Grievances & workplace investigations', mins: 15,
          obj: ['Run a fair grievance process', 'Plan and conduct an investigation', 'Write an evidence-based investigation report'],
          body: `When an employee raises a concern, how HR responds determines whether trust grows or breaks. Fair process is your best protection, legally and culturally.

## Grievance process
1. **Receive** the complaint in writing or record it accurately.
2. **Acknowledge** quickly and explain next steps and timescales.
3. **Assess** – informal resolution, formal grievance or investigation?
4. **Meet** the employee; they may have the right to be accompanied.
5. **Decide** and communicate the outcome in writing with reasons.
6. **Appeal** – offer a route to someone not previously involved.

## Investigation principles
- **Independence** – the investigator has no conflict of interest.
- **Confidentiality** – shared on a need-to-know basis; no promises of total secrecy.
- **Promptness** – delays damage evidence and wellbeing.
- **No pre-judgement** – gather facts before conclusions.
- **Non-retaliation** – make clear that retaliation is itself misconduct.

## Running interviews
Interview the complainant, the respondent, then witnesses. Use open questions ("What happened next?"), avoid leading ones ("He shouted at you, didn’t he?"). Take careful notes and have them reviewed.

## The report
- Allegations, one by one
- Evidence gathered (interviews, emails, CCTV, system logs)
- Findings on each allegation using the **balance of probabilities** standard (more likely than not)
- Recommendations, not sanctions; the decision-maker decides

> Separate the investigator from the decision-maker wherever possible.`,
          take: ['Acknowledge fast, investigate fairly, decide in writing', 'Use open questions and the balance of probabilities', 'Separate investigation from decision'],
          act: 'Write an investigation plan for a bullying complaint: who to interview, in what order, and what evidence to request.'
        },
        {
          id: '2', t: 'Discipline & performance improvement', mins: 14,
          obj: ['Distinguish misconduct from capability problems', 'Apply progressive discipline fairly', 'Design an effective performance improvement plan'],
          body: `Two different problems need two different processes. **Misconduct** is "won’t" (breaking rules). **Capability or performance** is "can’t" (not meeting the standard despite effort).

## Progressive discipline (misconduct)
1. Informal conversation
2. Verbal warning (recorded)
3. First written warning
4. Final written warning
5. Dismissal

**Gross misconduct** (theft, violence, serious harassment, fraud) can justify skipping steps, but still needs investigation and a hearing.

Every stage needs: a clear allegation in advance, evidence shared, a chance to respond, the right to be accompanied where applicable, a written outcome and a right of appeal.

## Performance improvement plan (PIP)
A PIP should genuinely aim to help someone succeed.

- **The gap** – specific examples of where performance falls short.
- **The standard** – what good looks like, in measurable terms.
- **Support** – training, coaching, more frequent check-ins, resources.
- **Timeline** – typically 30 to 90 days.
- **Review points** – weekly or fortnightly, documented.
- **Consequences** – stated clearly but without threat.

## Check for underlying causes first
Health issues, disability, caring responsibilities, unclear expectations, poor tools or a difficult manager relationship. Consider reasonable adjustments.

> A PIP that surprises the employee is a management failure. Feedback should have come months earlier.`,
          take: ['Misconduct is "won’t"; capability is "can’t"', 'Follow fair process at every step', 'PIPs need specific gaps, support and review points'],
          act: 'Draft a 60-day PIP for a sales coordinator missing order-accuracy targets, including support measures.'
        },
        {
          id: '3', t: 'Terminations & exits done right', mins: 12,
          obj: ['Prepare for a termination meeting', 'Run respectful exits and offboarding', 'Learn from exit data'],
          body: `How people leave says as much about a company as how they join. Remaining employees watch closely.

## Before a termination
- Confirm the legal basis, process followed and documentation with ER or legal.
- Check for protected situations: pregnancy, recent whistleblowing, sick leave, union activity.
- Prepare the letter, final pay calculation, benefits information and any settlement offer.
- Plan logistics: time, private room or video call, IT access removal, how belongings are returned.

## The meeting
- Keep it short: 10–15 minutes.
- The manager delivers the message clearly in the first two minutes. HR covers next steps.
- Do not debate the decision. Acknowledge emotions.
- Give written details: last day, final pay, benefits, references, return of property, support services.

## Offboarding checklist
Revoke system access, recover equipment, process final pay and accrued leave, issue required documents (experience or service letter where customary), update the HRIS, arrange knowledge transfer.

## Exit interviews
Ask for voluntary leavers: why are you leaving, what could have kept you, how was your manager? Analyse themes quarterly, by manager and department. Consider a "stay interview" with current high performers before they leave.

> Treat leavers as future alumni, customers and boomerang hires.`,
          take: ['Check legal risk and protected status first', 'Short, clear, dignified meetings', 'Analyse exit data for patterns by manager'],
          act: 'Create a one-page termination meeting script for a manager, including what to say and what not to say.'
        }
      ],
      quiz: [
        { q: 'What standard of proof is usually used in workplace investigations?', o: ['Beyond reasonable doubt', 'Balance of probabilities', 'Absolute certainty', 'Majority vote'], a: 1, e: 'Workplace findings normally use "more likely than not."' },
        { q: 'An employee repeatedly fails to meet output targets despite trying hard. This is primarily a:', o: ['Misconduct issue', 'Capability / performance issue', 'Gross misconduct issue', 'Grievance'], a: 1, e: 'Not meeting the standard despite effort is a capability issue.' },
        { q: 'Which is a leading question to avoid in an investigation?', o: ['What happened next?', 'Who else was present?', 'She was rude to you, wasn’t she?', 'How did you feel?'], a: 2, e: 'Leading questions suggest the answer and taint the evidence.' },
        { q: 'A good PIP includes:', o: ['Vague goals to allow flexibility', 'Specific gaps, measurable standards, support and review points', 'Only the consequences', 'No timeline'], a: 1, e: 'Effective PIPs are specific, supported and time-bound.' },
        { q: 'In a termination meeting, the decision should be communicated:', o: ['After 30 minutes of small talk', 'Clearly within the first couple of minutes', 'By email afterwards', 'Only if the employee asks'], a: 1, e: 'Delivering the message early and clearly is kinder and avoids confusion.' }
      ]
    },
    {
      id: 'm3', title: 'Performance & Development',
      summary: 'Goal setting, continuous feedback, fair reviews, calibration and learning design.',
      lessons: [
        {
          id: '1', t: 'Goals, OKRs & continuous feedback', mins: 12,
          obj: ['Write SMART goals and OKRs', 'Coach managers on regular check-ins', 'Teach a feedback model'],
          body: `Performance management has moved from an annual form-filling exercise towards continuous conversations. The form matters less than the quality of the conversation.

## SMART goals
Specific, Measurable, Achievable, Relevant, Time-bound.
- Weak: "Improve customer service."
- SMART: "Raise the customer satisfaction score from 78 to 85 by the end of Q3 by introducing a 24-hour response standard."

## OKRs
**Objective** – qualitative and inspiring. **Key results** – 2–4 measurable outcomes.
- Objective: Make onboarding the best first experience in our industry.
- KR1: New-hire 30-day survey score rises from 7.1 to 8.5.
- KR2: 95% of hires have equipment and access on day one.
- KR3: 90-day regretted attrition falls below 3%.

OKRs often aim for 70% achievement and are best kept separate from bonus decisions so people set ambitious goals.

## Check-ins
Fortnightly or monthly 1:1s focused on progress, obstacles, support needed and development. Short, regular and owned by the employee.

## Feedback models
**SBI** – Situation, Behaviour, Impact. "In yesterday’s client call (S), you interrupted the client three times (B). They seemed frustrated and cut the call short (I)." Then ask: "What’s your view?"

Encourage feedback in both directions and recognise good work specifically and quickly.

> The best predictor of team performance is the quality and frequency of manager–employee conversations.`,
          take: ['Use SMART goals or OKRs with measurable results', 'Make check-ins regular and employee-owned', 'SBI keeps feedback factual and actionable'],
          act: 'Write one OKR for your own role this quarter with three key results.'
        },
        {
          id: '2', t: 'Performance reviews & calibration', mins: 13,
          obj: ['Run fair performance reviews', 'Facilitate calibration sessions', 'Reduce rating bias'],
          body: `Reviews summarise performance and inform pay, promotion and development decisions. Because the stakes are high, fairness is essential.

## A good review covers
- **What** was achieved against goals.
- **How** it was achieved, measured against values and competencies.
- **Development** – strengths, growth areas, career aspirations.
- **Evidence** – examples from across the whole period, not just recent weeks.

## Rating scales
Most companies use 3–5 point scales. Forced distribution (fixed quotas per rating) has largely been abandoned because it damages collaboration, but calibration keeps ratings meaningful.

## Calibration
Managers meet, usually facilitated by HR, to compare proposed ratings across teams before finalising them.

HR’s role as facilitator:
- Share the rating distribution by team and demographic group before the session.
- Ask for evidence: "What specific outcomes support an 'exceeds' rating?"
- Challenge outliers: a manager who rates everyone highly, or a group consistently rated lower.
- Keep time and record decisions with reasons.

## Common rating errors
| Error | Description |
|---|---|
| Recency | Overweighting the last few weeks |
| Leniency / severity | Rating everyone too high or too low |
| Central tendency | Rating everyone in the middle |
| Similar-to-me | Favouring people like the rater |
| Proximity | Favouring people seen in the office over remote staff |

> Look at ratings by gender, ethnicity, age, part-time status and work location every cycle. Gaps are a signal to investigate.`,
          take: ['Review the what, the how and development', 'Calibration requires evidence, not opinion', 'Check ratings for demographic and proximity gaps'],
          act: 'Prepare five calibration questions HR could use to challenge an unsupported rating.'
        },
        {
          id: '3', t: 'Designing learning that works', mins: 14,
          obj: ['Apply the ADDIE design model', 'Use 70-20-10 to blend learning', 'Evaluate learning with Kirkpatrick’s four levels'],
          body: `Learning and development (L&D) exists to close capability gaps that matter to the business, not to fill a training calendar.

## Start with a needs analysis
Ask: what business problem are we solving? What do people need to do differently? Is it really a skill gap, or a process, tools, motivation or management problem? Training cannot fix a broken process.

## ADDIE
1. **Analyse** – audience, gap, desired behaviour.
2. **Design** – objectives, format, assessment.
3. **Develop** – content, activities, materials.
4. **Implement** – deliver and support.
5. **Evaluate** – measure impact and improve.

Agile alternatives like SAM (Successive Approximation Model) prototype quickly and iterate.

## The 70-20-10 guideline
- **70%** learning on the job: stretch assignments, projects, rotations.
- **20%** learning from others: coaching, mentoring, feedback.
- **10%** formal learning: courses, e-learning, workshops.

It is a guideline, not a law. The point is that a course alone rarely changes behaviour.

## Kirkpatrick’s four levels of evaluation
| Level | Question |
|---|---|
| 1. Reaction | Did they find it useful? |
| 2. Learning | Did they gain knowledge or skill? |
| 3. Behaviour | Are they applying it on the job? |
| 4. Results | Did business outcomes improve? |

## Learning in 2026
AI tutors, skills-based learning platforms, micro-learning in the flow of work, and learning paths tied to a skills taxonomy.

> Agree the level-4 business metric with the sponsor before you design anything.`,
          take: ['Diagnose before you train', 'Blend on-the-job, social and formal learning', 'Evaluate up to behaviour and results'],
          act: 'Design a 70-20-10 development plan for a new first-line manager.'
        }
      ],
      quiz: [
        { q: 'Which goal is SMART?', o: ['Be a better communicator', 'Reduce invoice errors from 5% to 2% by 31 December', 'Work harder on projects', 'Help the team more'], a: 1, e: 'It is specific, measurable, relevant and time-bound.' },
        { q: 'In SBI feedback, the "I" stands for:', o: ['Improvement', 'Impact', 'Intent', 'Idea'], a: 1, e: 'SBI is Situation, Behaviour, Impact.' },
        { q: 'A manager rates every team member "exceeds expectations." In calibration HR should:', o: ['Accept it', 'Ask for specific evidence for each rating', 'Lower all ratings automatically', 'Remove the manager'], a: 1, e: 'Calibration tests ratings against evidence.' },
        { q: 'Kirkpatrick Level 3 measures:', o: ['Reaction', 'Learning', 'Behaviour change on the job', 'Return on investment'], a: 2, e: 'Level 3 checks whether learning is applied at work.' },
        { q: 'Favouring office-based employees over remote ones in ratings is called:', o: ['Recency bias', 'Proximity bias', 'Central tendency', 'Halo effect'], a: 1, e: 'Proximity bias favours those physically closer to the rater.' }
      ]
    },
    {
      id: 'm4', title: 'Reward Basics & HR Analytics',
      summary: 'Job evaluation, pay ranges, benefits and building your first HR dashboard.',
      lessons: [
        {
          id: '1', t: 'Job evaluation & pay structures', mins: 15,
          obj: ['Explain job evaluation methods', 'Build and read a pay range', 'Calculate compa-ratio and range penetration'],
          body: `Fair pay starts with knowing the relative value of jobs and the market rate for them.

## Job evaluation
- **Ranking** – simple ordering of jobs; fine for small companies.
- **Job classification / grading** – jobs placed into grades by descriptions.
- **Point-factor** – jobs scored on factors such as knowledge, problem-solving, accountability and impact. Proprietary versions include Korn Ferry Hay, Mercer IPE and WTW GGS.

## Market pricing
Match your jobs to salary survey benchmarks (Mercer, WTW, Aon Radford, Korn Ferry, local providers). Use the **median (P50)** as a typical reference point, with P25 and P75 for context.

## Pay ranges
A range has a **minimum**, **midpoint** and **maximum**.
- **Range spread** = (max − min) ÷ min. Typically 30–50% for junior grades and 50–80% for senior grades.
- The midpoint usually reflects your target market position, such as market P50.

## Two key ratios
**Compa-ratio** = salary ÷ range midpoint.
- 0.80–0.90: new to role or underpaid
- 0.95–1.05: fully competent, at market
- above 1.10: very experienced, or a possible red flag

**Range penetration** = (salary − min) ÷ (max − min).

Worked example: range 80,000–120,000 with midpoint 100,000; salary 92,000.
Compa-ratio = 92,000 ÷ 100,000 = **0.92**. Range penetration = 12,000 ÷ 40,000 = **30%**.

## Merit matrix
Annual increases often depend on both performance rating and compa-ratio: high performers low in range get the biggest increases.`,
          take: ['Evaluate jobs internally and price them externally', 'Compa-ratio = salary ÷ midpoint', 'Use a merit matrix to target increases fairly'],
          act: 'Use the Toolkit’s compa-ratio calculator on three sample salaries and explain each result.'
        },
        {
          id: '2', t: 'Benefits & total rewards', mins: 10,
          obj: ['Describe the total rewards model', 'Evaluate benefits by value and cost', 'Communicate total rewards'],
          body: `Total rewards is everything an employee gets from working for you that they value. Pay is only part of it.

## The WorldatWork total rewards model
- **Compensation** – base pay, variable pay, equity.
- **Benefits** – health, retirement, insurance, paid time off.
- **Wellbeing** – physical, mental, financial and social wellbeing support.
- **Development** – learning, career opportunities.
- **Recognition** – formal and informal appreciation.

## Choosing benefits
Ask three questions:
1. **Value** – do employees actually use and value it? Use surveys and utilisation data.
2. **Cost** – what is the cost per employee, and how will it grow?
3. **Market and compliance** – is it a legal requirement or market expectation?

Trends: flexible benefits platforms, mental health support, fertility and family-forming benefits, menopause support, financial wellbeing, lifestyle spending accounts, extended parental leave.

## Communicate it
Employees often underestimate the value of their package by a third or more. A **total rewards statement** showing salary, bonus, employer pension and insurance contributions, and benefit values helps retention.

> A benefit no one knows about is a cost with no return.`,
          take: ['Total rewards goes far beyond pay', 'Judge benefits by usage, value and cost', 'Total rewards statements make the package visible'],
          act: 'Draft a one-page total rewards statement template for your company.'
        },
        {
          id: '3', t: 'Building your first HR dashboard', mins: 13,
          obj: ['Select the right metrics for an audience', 'Design a clear dashboard', 'Turn metrics into insights'],
          body: `A dashboard is a tool for decisions. If no one changes a decision because of it, it is decoration.

## Pick the audience first
- **Executives** – headcount and cost trend, regretted attrition, critical roles open, engagement, diversity representation.
- **Managers** – their team’s absence, overdue reviews, open roles, leave balances.
- **HR team** – SLA performance, case volumes, data quality.

## Lead and lag indicators
- **Lag** – what already happened: attrition, absence.
- **Lead** – what predicts it: engagement scores, internal mobility, overdue 1:1s, time since last promotion.

## Design principles
- One page, five to eight metrics.
- Each metric shows: current value, trend, target and a red/amber/green status.
- Put the most important number top-left.
- Show trends with line charts, comparisons with bar charts. Avoid pie charts with many slices and 3D charts.
- Add a "so what" commentary box: what changed, why, and what action is recommended.

## From metric to insight
Metric: "Attrition rose to 18%."
Insight: "Attrition rose to 18%, driven by engineers with 1–2 years’ tenure in two teams. Exit interviews cite career progression. Recommend a career framework for engineering by Q2."

> Data → information → insight → action. Your value is in the last two steps.`,
          take: ['Design for a specific audience and decision', 'Mix lead and lag indicators', 'Always add the "so what"'],
          act: 'Sketch a one-page executive people dashboard with six metrics and targets.'
        }
      ],
      quiz: [
        { q: 'Salary 110,000, range midpoint 100,000. The compa-ratio is:', o: ['0.91', '1.00', '1.10', '1.21'], a: 2, e: '110,000 ÷ 100,000 = 1.10.' },
        { q: 'Range 50,000–75,000. Range spread is:', o: ['25%', '33%', '50%', '150%'], a: 2, e: '(75,000 − 50,000) ÷ 50,000 = 50%.' },
        { q: 'Which is a leading indicator of attrition?', o: ['Last year’s leavers', 'Falling engagement scores', 'Exit interview count', 'Final pay costs'], a: 1, e: 'Engagement trends predict future attrition.' },
        { q: 'A total rewards statement mainly helps by:', o: ['Reducing pay', 'Making the full value of the package visible', 'Replacing payslips', 'Meeting tax rules'], a: 1, e: 'Employees often underestimate their package; statements make it visible.' },
        { q: 'Which point-factor approach evaluates jobs?', o: ['Scoring factors such as knowledge, problem-solving and accountability', 'Ranking by salary', 'Using job titles only', 'Asking employees to vote'], a: 0, e: 'Point-factor methods score defined compensable factors.' }
      ]
    }
  ]
});
