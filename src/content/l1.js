LMS.addLevel({
  id: 'l1', code: 'L1', name: 'HR Foundations',
  audience: 'Fresh graduates · HR assistants & coordinators · 0–2 years',
  blurb: 'How HR works, the employee lifecycle, hiring and onboarding basics, records, payroll and the legal ground rules every HR professional must know.',
  modules: [
    {
      id: 'm1', title: 'The HR Function & Your Role',
      summary: 'What modern HR does, how it is organised, and the ethics that come with the job.',
      lessons: [
        {
          id: '1', t: 'What HR does in 2026', mins: 12,
          obj: ['Explain the purpose of HR in business terms', 'Describe the three-pillar HR operating model', 'Identify where entry-level roles fit'],
          body: `HR exists to help the organisation get the right people, in the right roles, performing and growing, at a sustainable cost and within the law. Everything else is a means to that end.

## The three-pillar model
Most mid-size and large organisations organise HR around the model popularised by Dave Ulrich:

- **HR Business Partners (HRBPs)** sit with business leaders and translate business goals into people priorities.
- **Centres of Excellence (CoEs)** hold deep expertise: talent acquisition, reward, learning, organisation development, employee relations, people analytics.
- **HR Shared Services / People Operations** deliver transactional work at scale: onboarding paperwork, payroll inputs, data changes, employee queries, often through a portal or chatbot.

In 2026 a fourth layer is common: **HR technology and AI**, which owns the HRIS, self-service, automation and AI assistants that handle routine questions.

## Where you fit
Entry roles (HR Assistant, Coordinator, People Ops Associate, Recruitment Coordinator) usually sit in shared services or support a CoE. Your work is the foundation: if data is wrong or an offer letter is late, the strategy above you fails.

> Credibility in HR is built on accuracy and follow-through first, and on ideas second.

## Four outcomes HR is judged on
| Outcome | Example measure |
|---|---|
| Talent supply | Time to fill, quality of hire |
| Performance & capability | Goal attainment, skills coverage |
| Engagement & retention | eNPS, regretted attrition |
| Cost & compliance | HR cost per employee, audit findings |`,
          take: ['HR serves business outcomes, not process for its own sake', 'Know the HRBP / CoE / shared services split in your company', 'Accuracy and responsiveness are your early-career reputation'],
          act: 'Draw your organisation’s HR structure. Mark who owns recruitment, payroll, learning and employee relations, and where your role sits.'
        },
        {
          id: '2', t: 'The employee lifecycle', mins: 10,
          obj: ['Name the stages of the employee lifecycle', 'Link HR processes to each stage', 'Recognise moments that matter to employees'],
          body: `The employee lifecycle is the journey from first hearing about an employer to becoming an alumnus. Mapping it helps you see how each HR process connects.

## The seven stages
1. **Attract** – employer brand, careers site, referrals.
2. **Recruit** – requisition, sourcing, screening, interviews, offer.
3. **Onboard** – pre-boarding, day one, first 90 days.
4. **Develop** – learning, coaching, career moves.
5. **Perform** – goals, feedback, reviews, recognition.
6. **Retain** – reward, engagement, wellbeing, internal mobility.
7. **Separate** – resignation or termination, exit interview, offboarding, alumni.

## Moments that matter
Employees do not experience "processes"; they experience moments: the first payslip, the first one-to-one with a manager, a promotion conversation, a parental leave return, a bereavement. Getting these moments right matters more than any policy document.

> Practical rule: for every process you own, ask "what does the employee see, feel and need to do at this step?"

## Data follows the lifecycle
Every stage creates records: application data, contracts, emergency contacts, performance ratings, leaver reasons. Good HR keeps this data accurate, secure and retained only as long as legally required.`,
          take: ['The lifecycle runs from attraction to alumni', 'Design around employee moments, not internal handoffs', 'Each stage creates data you must protect'],
          act: 'Pick one lifecycle stage. List three moments that matter to employees in that stage and one improvement for each.'
        },
        {
          id: '3', t: 'Ethics, confidentiality & data privacy', mins: 12,
          obj: ['Apply confidentiality rules to everyday HR work', 'Explain core data protection principles', 'Handle ethical dilemmas with a simple framework'],
          body: `HR holds the most sensitive information in the company: salaries, health conditions, disciplinary records, investigations, home addresses. Trust is your licence to operate.

## Core data protection principles
Most privacy laws (GDPR in Europe, DPDP Act in India, CCPA/CPRA in California, PDPA in Singapore) share the same ideas:

- **Lawful purpose** – collect data only for a clear, legitimate reason.
- **Minimisation** – collect no more than you need.
- **Accuracy** – keep it correct and up to date.
- **Storage limitation** – delete it when the retention period ends.
- **Security** – restrict access; never email unprotected spreadsheets of personal data.
- **Rights** – employees can usually access and correct their data.

## Everyday confidentiality
- Discuss individual cases only with people who need to know.
- Lock your screen. Do not leave printouts on the printer.
- Never paste employee personal data into public AI tools. Use only company-approved tools.
- If a colleague asks "is X being fired?", the answer is "I can’t discuss other employees."

## An ethical decision check
When something feels wrong, ask:
1. Is it legal and in line with policy?
2. Would I be comfortable if this appeared in the news or in front of the employee?
3. Is it fair and consistent with how others were treated?
4. Who should I escalate to?

> When in doubt, pause and escalate. Speed never justifies a breach of trust.`,
          take: ['Treat all people data as confidential by default', 'Minimise, secure and delete data on schedule', 'Never put personal data into unapproved AI tools'],
          act: 'Find your company’s data retention schedule. Note how long it keeps candidate data, payroll records and disciplinary files.'
        }
      ],
      quiz: [
        { q: 'In the three-pillar HR model, who typically handles high-volume transactions like data changes and employee queries?', o: ['HR Business Partners', 'Centres of Excellence', 'Shared Services / People Operations', 'The board'], a: 2, e: 'Shared services deliver transactional work at scale, often through portals and chatbots.' },
        { q: 'Which stage of the employee lifecycle includes the first 90 days?', o: ['Attract', 'Onboard', 'Perform', 'Separate'], a: 1, e: 'Onboarding covers pre-boarding, day one and the first 90 days.' },
        { q: 'A manager asks you to email a spreadsheet of all salaries to their personal Gmail. What should you do?', o: ['Send it password-protected', 'Send it, managers have access rights', 'Decline and explain data security policy, offer a secure company channel if access is authorised', 'Send only half the data'], a: 2, e: 'Personal accounts are outside company security controls. Use approved, secure channels only, and only if access is authorised.' },
        { q: 'The data protection principle "collect no more than you need" is called:', o: ['Accuracy', 'Minimisation', 'Storage limitation', 'Portability'], a: 1, e: 'Data minimisation limits collection to what is necessary for the purpose.' },
        { q: 'What is the best first answer to a colleague asking whether another employee is being dismissed?', o: ['Share what you know off the record', 'Say you can’t discuss other employees', 'Ignore the question', 'Ask the manager to answer'], a: 1, e: 'Confidentiality applies to all individual cases; a clear, polite refusal protects everyone.' }
      ]
    },
    {
      id: 'm2', title: 'Recruitment & Onboarding Essentials',
      summary: 'Write job descriptions, screen fairly, run structured interviews and onboard new hires well.',
      lessons: [
        {
          id: '1', t: 'Job descriptions & sourcing', mins: 12,
          obj: ['Write a clear, inclusive job description', 'Separate must-have from nice-to-have requirements', 'Choose sourcing channels for different roles'],
          body: `A good hire starts with a clear definition of the job. Vague job descriptions attract the wrong applicants and make fair selection impossible.

## Anatomy of a job description
- **Job title** – use the market-standard title people actually search for.
- **Purpose** – one or two sentences on why the role exists.
- **Key responsibilities** – 5–8 outcome-focused bullets ("Reduce invoice errors by…", not "Responsible for invoices").
- **Requirements** – split into *must-have* (3–5 items) and *nice-to-have*.
- **Skills over credentials** – ask "does this role truly need a degree?" Skills-based hiring widens the talent pool.
- **Pay range and location / hybrid policy** – increasingly required by law (many US states, the EU Pay Transparency Directive from 2026).

## Inclusive language
Avoid gender-coded words ("rockstar", "aggressive", "ninja"), unnecessary years-of-experience thresholds and physical requirements that are not essential. Long must-have lists discourage qualified candidates, especially women, from applying.

## Sourcing channels
| Channel | Best for |
|---|---|
| Employee referrals | Fast, high-retention hires |
| Job boards & LinkedIn | Volume and mid-level roles |
| Campus & internships | Graduate pipelines |
| Direct sourcing / search | Scarce skills and senior roles |
| Internal mobility | Retention and speed |

> Always post internally first where policy allows. Internal hires ramp faster and signal career paths.`,
          take: ['Write outcomes, not duties', 'Keep must-haves short and genuine', 'Match the sourcing channel to the role'],
          act: 'Rewrite one existing job description: cut must-haves to five, add a pay range, and remove any gender-coded words.'
        },
        {
          id: '2', t: 'Screening & structured interviews', mins: 14,
          obj: ['Screen applications consistently', 'Design a structured interview with a scorecard', 'Avoid common interview biases'],
          body: `Unstructured "chat" interviews are poor predictors of job performance. Structured interviews, where every candidate gets the same questions scored against the same criteria, are among the most valid selection methods.

## Screening
Screen against the must-have criteria only. Use a simple yes / no / maybe grid and record reasons. If AI screening tools are used, HR must know what criteria they apply and check for bias.

## Building a structured interview
1. Identify 4–6 competencies from the job description.
2. Write 1–2 questions per competency.
3. Define what a poor, good and excellent answer looks like (a behaviourally anchored rating scale).
4. Each interviewer scores independently **before** discussing.

## Question types
- **Behavioural:** "Tell me about a time you had to deliver bad news to a customer. What did you do?" Use the **STAR** structure to probe: Situation, Task, Action, Result.
- **Situational:** "If two managers gave you conflicting urgent tasks, what would you do?"
- **Technical / work sample:** a short, realistic task.

## Biases to watch
| Bias | What happens |
|---|---|
| Halo / horns | One trait colours the whole judgement |
| Affinity | Favouring people like us |
| First impression | Deciding in the first minutes |
| Contrast | Rating relative to the previous candidate |

> Never ask about age, marital status, pregnancy, religion, health or family plans. Ask only what relates to the job.`,
          take: ['Same questions, same scorecard, independent scoring', 'Use STAR to probe for evidence', 'Name biases out loud in debriefs'],
          act: 'Create a one-page interview scorecard for a role you know, with four competencies and anchored ratings 1–4.'
        },
        {
          id: '3', t: 'Onboarding that sticks', mins: 10,
          obj: ['Plan pre-boarding, day one and the first 90 days', 'Explain the business case for onboarding', 'Build a manager onboarding checklist'],
          body: `Many new hires decide within their first weeks whether they will stay. Strong onboarding improves retention and time to productivity.

## Four Cs of onboarding
- **Compliance** – contracts, right-to-work checks, policies, payroll set-up.
- **Clarification** – role expectations, goals, how success is measured.
- **Culture** – values, norms, "how we really work here".
- **Connection** – manager, buddy, team and stakeholder relationships.

## Timeline
**Pre-boarding (offer to day one):** send a welcome message, complete paperwork digitally, ship equipment, share the first-week agenda.

**Day one:** working laptop and access, manager welcome, team lunch or virtual coffee, buddy introduction. Paperwork should already be done.

**First 30 / 60 / 90 days:** clear goals for each period, weekly one-to-ones, a 30-day check-in by HR, a 90-day review against goals.

## Remote and hybrid onboarding
Schedule deliberate connection time, record key sessions, and give the new hire a list of "people to meet" with short intros.

> The manager makes or breaks onboarding. HR designs the system; managers deliver the experience.`,
          take: ['Cover compliance, clarification, culture and connection', 'Finish paperwork before day one', 'Equip managers with a 30-60-90 checklist'],
          act: 'Draft a 30-60-90 day plan for a new HR Assistant joining your team.'
        }
      ],
      quiz: [
        { q: 'Which interview method is consistently among the strongest predictors of job performance?', o: ['Unstructured conversation', 'Structured interview with a scorecard', 'Gut feel of the hiring manager', 'Handwriting analysis'], a: 1, e: 'Structured interviews with defined criteria and independent scoring are far more valid than unstructured ones.' },
        { q: 'STAR stands for:', o: ['Skills, Talent, Ability, Result', 'Situation, Task, Action, Result', 'Strategy, Tactics, Analysis, Review', 'Start, Test, Assess, Rate'], a: 1, e: 'STAR structures behavioural answers around Situation, Task, Action and Result.' },
        { q: 'Which question is appropriate in an interview?', o: ['Do you plan to have children?', 'How old are you?', 'Describe a time you resolved a conflict with a colleague.', 'What religion do you practise?'], a: 2, e: 'Only job-related questions are appropriate; the others invite discrimination claims.' },
        { q: 'Rating a candidate highly on everything because they went to a prestigious university is an example of:', o: ['Contrast bias', 'Halo effect', 'Recency bias', 'Central tendency'], a: 1, e: 'The halo effect lets one positive trait colour the overall judgement.' },
        { q: 'Who has the biggest influence on a new hire’s onboarding experience?', o: ['The CEO', 'Payroll', 'The direct manager', 'IT'], a: 2, e: 'HR designs the process, but the manager delivers the daily experience.' }
      ]
    },
    {
      id: 'm3', title: 'Records, Payroll & Employment Law Basics',
      summary: 'HRIS and records, how payroll works, and the legal fundamentals of employment.',
      lessons: [
        {
          id: '1', t: 'HRIS & employee records', mins: 10,
          obj: ['Describe what an HRIS does', 'Maintain accurate employee master data', 'Understand self-service and audit trails'],
          body: `The Human Resources Information System (HRIS) is the system of record for employee data. Examples include Workday, SAP SuccessFactors, Oracle HCM, Darwinbox, HiBob, BambooHR and Personio.

## Core employee data
- Personal details: legal name, date of birth, address, emergency contact.
- Job data: position, grade, department, manager, location, FTE, contract type.
- Pay data: salary, allowances, bank details, tax identifiers.
- Lifecycle events: hire, transfer, promotion, leave, termination, each with an **effective date**.

## Why effective dates matter
A promotion entered with the wrong effective date causes wrong pay, wrong reports and wrong history. Always check effective date, reason code and approval before saving.

## Self-service
Employees update their own address or bank details; managers approve leave and initiate changes. HR’s role shifts to checking quality and fixing exceptions.

## Data quality habits
- Use dropdowns and standard codes, never free text, for fields used in reporting.
- Run a monthly audit: missing managers, employees without a cost centre, leavers still active.
- Keep a change log; most systems keep an audit trail of who changed what and when.

> Bad data in the HRIS becomes bad decisions in the boardroom.`,
          take: ['The HRIS is the single source of truth', 'Effective dates and reason codes drive accuracy', 'Run regular data quality audits'],
          act: 'Design a five-item monthly data quality checklist for your HRIS.'
        },
        {
          id: '2', t: 'Payroll & benefits basics', mins: 12,
          obj: ['Explain gross-to-net pay', 'Describe the payroll cycle and cut-off', 'Name common benefits'],
          body: `Payroll is the HR process employees notice most. Errors hurt trust immediately.

## Gross to net
**Gross pay** = base salary + allowances + overtime + bonuses.
**Deductions** = income tax withheld + social security or provident fund contributions + pension or retirement contributions + other deductions (loans, benefits).
**Net pay** = gross pay − deductions.

Employers also pay **employer contributions** (social security, pension, insurance) that do not appear in net pay but are part of employment cost.

## The payroll cycle
1. **Inputs** – new hires, leavers, changes, overtime, leave without pay.
2. **Cut-off date** – changes after this go to next month.
3. **Processing and validation** – variance check against last month.
4. **Approval** – finance and HR sign-off.
5. **Payment and payslips.**
6. **Statutory filings** – tax and contribution returns to authorities.

## Variance checks
Compare this month to last month. Investigate any employee whose net pay changed by more than about 10% without a known reason.

## Common benefits
Health insurance, retirement plans, life and disability cover, paid leave, meal or transport allowances, wellbeing programmes, learning budgets, and flexible benefits where employees choose from a menu.

> Never promise an employee a payroll change "this month" until you have checked the cut-off.`,
          take: ['Net = gross − deductions', 'Respect cut-off dates and validate variances', 'Employer contributions are a hidden but real cost'],
          act: 'Take a sample payslip (yours or a template) and label every line as earning, deduction or employer contribution.'
        },
        {
          id: '3', t: 'Employment law fundamentals', mins: 15,
          obj: ['Identify the main areas of employment law', 'Recognise protected characteristics', 'Know when to seek legal advice'],
          body: `Employment law varies by country and even by state, but the same themes appear almost everywhere. Always confirm details against local law and your legal team.

## The main areas
- **Employment contracts** – written terms covering role, pay, hours, notice, probation, confidentiality.
- **Working time** – maximum hours, rest breaks, overtime pay, night work.
- **Minimum wage** – statutory floors that change annually.
- **Leave** – annual leave, sick leave, maternity, paternity and parental leave, public holidays.
- **Anti-discrimination** – equal treatment in hiring, pay, promotion and dismissal.
- **Health and safety** – a duty of care for physical and psychological safety.
- **Termination** – notice, fair reasons, due process, severance.
- **Data privacy** – lawful processing of employee data.

## Protected characteristics
Commonly protected: sex, gender identity, race, ethnicity, colour, religion, age, disability, sexual orientation, pregnancy and maternity, marital status, national origin. Some jurisdictions add caste, genetic information or political opinion.

## Employee vs contractor
Misclassifying employees as contractors exposes the company to back pay, tax and penalties. Tests usually look at control, integration, financial dependency and who provides the tools.

## Harassment
Most jurisdictions require employers to prevent and respond to harassment, including sexual harassment. Some require a formal internal committee (for example India’s POSH Act).

> Your job is not to be a lawyer. Your job is to spot legal risk early and escalate.`,
          take: ['Know the eight main areas of employment law', 'Treat protected characteristics with zero tolerance for discrimination', 'Escalate legal risk early'],
          act: 'List the statutory leave entitlements (annual, sick, maternity, paternity) in your country and their current durations.'
        }
      ],
      quiz: [
        { q: 'A promotion was entered with an effective date three months too early. The most likely consequence is:', o: ['No impact', 'Incorrect back pay and historical reporting', 'The employee gets a new manager', 'The HRIS deletes the record'], a: 1, e: 'Effective dates drive pay calculations and history, so errors flow into payroll and reports.' },
        { q: 'Net pay equals:', o: ['Gross pay plus employer contributions', 'Gross pay minus deductions', 'Base salary only', 'Base salary minus bonus'], a: 1, e: 'Net pay is what remains after taxes and other deductions are taken from gross pay.' },
        { q: 'An employee submits an overtime claim one day after payroll cut-off. What should you tell them?', o: ['It will be paid this month', 'It will be paid in the next payroll cycle', 'Overtime cannot be paid', 'They must resubmit next year'], a: 1, e: 'Changes received after cut-off normally go into the next cycle.' },
        { q: 'Which is typically NOT a protected characteristic?', o: ['Age', 'Disability', 'Favourite sports team', 'Religion'], a: 2, e: 'Protected characteristics relate to identity attributes defined in law, not personal preferences like sports teams.' },
        { q: 'Which factor suggests a worker is an employee rather than a contractor?', o: ['They set their own hours and methods', 'They invoice multiple clients', 'The company controls how, when and where work is done', 'They provide their own tools'], a: 2, e: 'A high degree of control by the company points towards employment status.' }
      ]
    },
    {
      id: 'm4', title: 'Employee Support & Business Basics',
      summary: 'Handle employee queries, apply policies, and use basic HR numbers with confidence.',
      lessons: [
        {
          id: '1', t: 'Handling employee queries & cases', mins: 10,
          obj: ['Manage queries with a case approach', 'Communicate clearly and empathetically', 'Know what to escalate'],
          body: `HR receives a steady stream of questions: leave balances, payslips, policies, letters, personal issues. How you handle them shapes how employees see HR.

## Tiered service model
- **Tier 0 – self-service:** portal, knowledge base, AI assistant.
- **Tier 1 – HR service desk:** standard questions answered within service level agreements.
- **Tier 2 – specialists:** payroll, benefits, immigration, employee relations.
- **Tier 3 – CoE / legal:** complex or high-risk cases.

## The case approach
1. **Log** every query with a reference number.
2. **Classify** by category and urgency.
3. **Respond** with a clear answer, or an acknowledgement and an expected date.
4. **Resolve and confirm** the employee is satisfied.
5. **Learn** – if the same question comes up often, fix the knowledge article or the process.

## Writing good responses
- Start with the answer, then the explanation.
- Use plain language and link to the policy.
- Show empathy when the issue is personal: "I’m sorry to hear about your father. Here’s how bereavement leave works…"

## Always escalate
Allegations of harassment, discrimination, fraud or safety risk; mentions of self-harm; legal threats; requests from lawyers or authorities; anything involving a senior leader.

> Speed matters, but accuracy matters more. A wrong fast answer creates two problems.`,
          take: ['Log, classify, respond, resolve, learn', 'Lead with the answer and show empathy', 'Escalate high-risk issues immediately'],
          act: 'Write an empathetic, clear response to: "Why is my payslip lower this month?"'
        },
        {
          id: '2', t: 'Policies & the employee handbook', mins: 10,
          obj: ['Explain the purpose of HR policies', 'Apply policies consistently', 'Recognise when discretion is appropriate'],
          body: `Policies turn the law and company values into clear rules people can follow. They protect employees and the company by making treatment consistent.

## Core policies most companies have
- Code of conduct and ethics
- Equal opportunity, anti-harassment and anti-bullying
- Leave and attendance
- Working hours, remote and hybrid work
- Grievance and disciplinary procedures
- Data protection and IT acceptable use, including generative AI use
- Expenses and travel
- Whistleblowing and speak-up
- Health, safety and wellbeing

## Writing policies people read
- Short sections, plain language, real examples.
- Say who it applies to, what the rule is, how to get help.
- Version control: date, owner and review cycle (usually annual).

## Consistency vs discretion
Apply the policy the same way to everyone in the same situation. Where the policy gives discretion (for example compassionate leave), document the reason for your decision so you can apply it the same way next time.

> Inconsistency is the most common root cause of discrimination claims. If you made an exception for one employee, you may have created a precedent for all.`,
          take: ['Policies make treatment fair and predictable', 'Keep them short, clear and reviewed annually', 'Document every discretionary decision'],
          act: 'Pick one company policy and rewrite its key rule in three plain-language sentences.'
        },
        {
          id: '3', t: 'HR numbers every beginner should know', mins: 14,
          obj: ['Calculate headcount, attrition and absence rates', 'Use spreadsheets for simple HR analysis', 'Present numbers clearly'],
          body: `Numbers give HR credibility with business leaders. Start with a handful of core metrics and calculate them correctly.

## Core formulas
| Metric | Formula |
|---|---|
| Headcount | Number of employees on a given date |
| FTE | Sum of contracted hours ÷ standard full-time hours |
| Attrition rate (annual) | Leavers in 12 months ÷ average headcount × 100 |
| Voluntary attrition | Resignations ÷ average headcount × 100 |
| Absence rate | Days absent ÷ total scheduled working days × 100 |
| Time to fill | Days from requisition approval to offer acceptance |
| Offer acceptance rate | Offers accepted ÷ offers made × 100 |

**Average headcount** = (headcount at start + headcount at end) ÷ 2, or the average of monthly figures for more accuracy.

## Worked example
Start of year: 480 employees. End of year: 520. Leavers during year: 75.
Average headcount = (480 + 520) ÷ 2 = 500. Attrition = 75 ÷ 500 × 100 = **15%**.

## Spreadsheet skills to build
- Filters, sorting and pivot tables
- XLOOKUP / VLOOKUP to join data
- COUNTIFS and SUMIFS for metrics by department
- Simple charts: one message per chart

> Always state the period, the population and the definition. "15% voluntary attrition, last 12 months, permanent staff only" is a usable number. "15% turnover" is not.`,
          take: ['Learn the seven core HR formulas', 'Average headcount is the usual denominator', 'Always state period, population and definition'],
          act: 'Use the Toolkit’s attrition calculator to compute attrition for your team or a sample dataset.'
        }
      ],
      quiz: [
        { q: 'An employee mentions they have been harassed by their manager while asking about leave. What should you do?', o: ['Answer the leave question only', 'Escalate the allegation according to policy', 'Tell them to talk to their manager', 'Wait to see if they mention it again'], a: 1, e: 'Harassment allegations must always be escalated, regardless of how they come up.' },
        { q: 'Start headcount 200, end headcount 300, 50 leavers in the year. Annual attrition is:', o: ['16.7%', '20%', '25%', '50%'], a: 1, e: 'Average headcount is 250, and 50 ÷ 250 = 20%.' },
        { q: 'What is the most common root cause of discrimination claims linked to policies?', o: ['Policies that are too long', 'Inconsistent application', 'Policies written in plain language', 'Annual reviews'], a: 1, e: 'Treating similar cases differently creates the basis for discrimination claims.' },
        { q: 'Which belongs in Tier 0 of an HR service model?', o: ['Employee relations investigation', 'Self-service portal and AI assistant', 'Legal counsel', 'HR Director'], a: 1, e: 'Tier 0 is self-service: portals, knowledge bases and chatbots.' },
        { q: 'Two part-time employees each work 20 hours where full-time is 40. Their combined FTE is:', o: ['0.5', '1.0', '2.0', '40'], a: 1, e: '40 contracted hours ÷ 40 standard hours = 1.0 FTE.' }
      ]
    }
  ]
});
