LMS.addLevel({
  id: 'l3', code: 'L3', name: 'HR Business Partner & Manager',
  audience: 'HRBPs · HR managers · CoE specialists · 5–10 years',
  blurb: 'Partner with business leaders, design organisations, build talent pipelines, lead change and use people analytics to drive decisions.',
  modules: [
    {
      id: 'm1', title: 'The Strategic HR Business Partner',
      summary: 'Consulting skills, business acumen and the influence to change leaders’ minds.',
      lessons: [
        {
          id: '1', t: 'Consulting skills for HRBPs', mins: 14,
          obj: ['Use a consulting cycle with business clients', 'Diagnose the real problem behind a request', 'Contract clearly on outcomes'],
          body: `Leaders often bring HR a solution ("I need a team-building day", "Hire me two more people"). A great HRBP finds the problem first.

## The consulting cycle
1. **Entry and contracting** – understand the request, agree roles and outcomes.
2. **Diagnosis** – gather data, interview stakeholders, test hypotheses.
3. **Feedback** – share findings honestly, including uncomfortable ones.
4. **Intervention** – co-design and implement solutions.
5. **Evaluation and exit** – measure results and hand over ownership.

## Diagnose before prescribing
Ask "what would be different if this worked?" and "what have you already tried?" Use the **5 Whys** to get to the root cause.

Example: "My team needs time-management training."
- Why? They miss deadlines.
- Why? They are working on too many priorities.
- Why? Three directors assign work directly.
- Root cause: unclear prioritisation and governance, not individual skills.

## Contracting
Agree in writing (even an email):
- The business outcome and how success will be measured
- Scope and what is out of scope
- Roles: what the leader does, what HR does
- Timeline and check-in points

## The HRBP mindset
- Think in business outcomes, not HR programmes.
- Bring data and a point of view to every meeting.
- Say no, or "not yet", to work that will not move the needle.

> Your value is measured by the quality of the leader’s decisions, not the number of HR initiatives you launch.`,
          take: ['Diagnose before you prescribe', 'Use 5 Whys to find root causes', 'Contract on outcomes, scope and roles'],
          act: 'Take a recent request from a leader. Apply 5 Whys and write the contract email you should have sent.'
        },
        {
          id: '2', t: 'Business acumen: speaking the language of the P&L', mins: 15,
          obj: ['Read a profit and loss statement', 'Link people costs to business performance', 'Build a simple business case'],
          body: `To influence leaders you must understand how the business makes money and where people costs fit.

## The P&L in plain terms
| Line | Meaning |
|---|---|
| Revenue | Money from sales |
| Cost of goods sold (COGS) | Direct cost of producing what is sold |
| Gross profit | Revenue − COGS |
| Operating expenses (OpEx) | Salaries, rent, marketing, technology |
| EBITDA | Earnings before interest, tax, depreciation and amortisation |
| Net profit | What remains after all costs |

People costs often represent 30–70% of operating costs, depending on the industry. In services and technology, they are usually the largest cost.

## Useful people–finance metrics
- **Revenue per employee** = revenue ÷ FTE.
- **Profit per employee** = operating profit ÷ FTE.
- **Labour cost as % of revenue.**
- **Human capital ROI** = (revenue − (operating expenses − people costs)) ÷ people costs.

## A simple business case
1. **Problem** – quantify it. "Regretted attrition among 120 engineers is 22%, costing about $1.6m a year."
2. **Option** – what you propose and alternatives considered.
3. **Cost** – one-off and running.
4. **Benefit** – quantified, with assumptions stated.
5. **Risk and measures** – what could go wrong, how you will track success.

## Cost of attrition (rule of thumb)
Replacing an employee often costs between half and twice their annual salary, including recruitment, onboarding, lost productivity and manager time. Use your own data where possible.

> Learn your company’s top three strategic priorities and its biggest cost lines. Mention them in every proposal.`,
          take: ['Know your P&L and where people costs sit', 'Quantify problems in money and risk', 'Structure proposals as business cases'],
          act: 'Find your company’s revenue and headcount. Calculate revenue per employee and compare it with two competitors.'
        },
        {
          id: '3', t: 'Influencing senior stakeholders', mins: 12,
          obj: ['Map stakeholders by influence and interest', 'Use evidence and narrative to persuade', 'Handle resistance and challenge leaders'],
          body: `Influence is the HRBP’s core currency. You rarely have authority, so you must earn it.

## Stakeholder mapping
Plot stakeholders on a 2×2 grid of **influence** and **interest**:
- High influence, high interest → manage closely
- High influence, low interest → keep satisfied
- Low influence, high interest → keep informed
- Low influence, low interest → monitor

## Sources of influence
- **Expertise** – data, law, best practice.
- **Relationships** – trust built over time.
- **Reciprocity** – helping others with their priorities.
- **Framing** – positioning your proposal in their language and goals.

## Structure your message
Use the **pyramid principle**: lead with the recommendation, then three supporting arguments, then the data. Executives want the answer first.

"I recommend we delay the restructure by six weeks. Three reasons: legal consultation requirements, the risk of losing two key clients, and the Q4 delivery peak. Here’s the data…"

## Challenging a senior leader
- Do it privately and early.
- Use questions: "What would our customers see if we did this?"
- Name the risk factually: "This decision exposes us to a discrimination claim because…"
- Offer an alternative.
- If it is an ethical or legal issue, escalate when needed. That is part of the job.

> Leaders respect HRBPs who disagree well. They ignore those who always agree.`,
          take: ['Map stakeholders by influence and interest', 'Lead with the answer (pyramid principle)', 'Challenge privately, factually and with alternatives'],
          act: 'Build a stakeholder map for a current HR initiative and plan one action for each quadrant.'
        }
      ],
      quiz: [
        { q: 'A leader asks for "communication training". What should the HRBP do first?', o: ['Book the training', 'Diagnose the underlying problem', 'Refuse the request', 'Send an e-learning link'], a: 1, e: 'Diagnose first; the real issue may be structure, priorities or leadership.' },
        { q: 'Gross profit equals:', o: ['Revenue − COGS', 'Revenue − all costs', 'EBITDA − tax', 'Revenue ÷ FTE'], a: 0, e: 'Gross profit is revenue minus cost of goods sold.' },
        { q: 'The pyramid principle advises you to:', o: ['Start with the data', 'Start with the recommendation', 'Save the conclusion for the end', 'Avoid recommendations'], a: 1, e: 'Lead with the answer, then support it.' },
        { q: 'A stakeholder with high influence but low interest should be:', o: ['Managed closely', 'Kept satisfied', 'Kept informed', 'Ignored'], a: 1, e: 'Keep them satisfied so their influence does not turn against you.' },
        { q: 'Revenue $50m and 250 FTE. Revenue per employee is:', o: ['$20,000', '$200,000', '$2m', '$125,000'], a: 1, e: '$50,000,000 ÷ 250 = $200,000.' }
      ]
    },
    {
      id: 'm2', title: 'Organisation Design & Workforce Planning',
      summary: 'Design structures that fit strategy, plan the workforce and build a skills-based organisation.',
      lessons: [
        {
          id: '1', t: 'Organisation design principles', mins: 15,
          obj: ['Apply the Star Model to design choices', 'Analyse spans and layers', 'Compare structural options'],
          body: `Structure follows strategy. An organisation chart is the visible part of design, but processes, decision rights and incentives matter just as much.

## Galbraith’s Star Model
Five design levers that must align:
1. **Strategy** – direction and competitive advantage.
2. **Structure** – where power and decisions sit.
3. **Processes** – how information and decisions flow.
4. **Rewards** – how behaviour is motivated.
5. **People** – skills, mindsets, talent practices.

Change one point of the star without the others and the design fails.

## Structural options
| Structure | Strength | Watch out for |
|---|---|---|
| Functional | Deep expertise, efficiency | Silos, slow cross-functional work |
| Divisional (product, region, customer) | Market focus, accountability | Duplication, cost |
| Matrix | Balances two dimensions | Conflicting priorities, slow decisions |
| Network / team-of-teams | Speed, adaptability | Needs strong culture and clarity |

## Spans and layers
- **Span of control** – direct reports per manager. Narrow spans (2–4) add cost and slow decisions; wide spans (8–15) suit standardised work.
- **Layers** – levels between CEO and frontline. Fewer layers speed up decisions.

A span of control analysis often finds many managers with one or two reports. That is a sign of title inflation or unnecessary hierarchy.

## Decision rights
Use a **RACI** (Responsible, Accountable, Consulted, Informed) or **RAPID** (Recommend, Agree, Perform, Input, Decide) for key decisions. Unclear decision rights are the hidden cause of many "structure" problems.

> Start with design criteria: what must this organisation be great at? Then evaluate options against those criteria.`,
          take: ['Align strategy, structure, process, rewards and people', 'Analyse spans and layers for cost and speed', 'Clarify decision rights with RACI or RAPID'],
          act: 'Analyse spans of control in one department. How many managers have fewer than four direct reports?'
        },
        {
          id: '2', t: 'Strategic workforce planning', mins: 15,
          obj: ['Run a workforce planning cycle', 'Model supply and demand scenarios', 'Choose build, buy, borrow, bot or redeploy'],
          body: `Strategic workforce planning (SWP) makes sure the organisation has the right capabilities, in the right numbers, in the right places, at the right cost, over the next 1–5 years.

## The SWP cycle
1. **Understand strategy** – growth plans, new markets, products, automation.
2. **Segment roles** – focus on critical roles that drive strategy or are hard to fill.
3. **Analyse supply** – current headcount, skills, age profile, attrition, internal pipeline. Project forward.
4. **Forecast demand** – what roles and skills are needed under different scenarios.
5. **Gap analysis** – demand minus projected supply.
6. **Action plan** – close the gaps.
7. **Monitor** – review quarterly.

## Scenarios
Model at least three: base case, high growth, downturn. Include the impact of AI and automation, which may remove tasks rather than whole jobs.

## The 5 Bs for closing gaps
- **Build** – develop internal talent.
- **Buy** – hire externally.
- **Borrow** – contractors, gig workers, partners.
- **Bot** – automate with AI and technology.
- **Bridge / redeploy** – move people from declining roles to growing ones.

## Example
A bank expects 30% fewer branch roles and 40 additional data analysts in three years. Options: reskill 25 branch staff with analytical aptitude (build/bridge), hire 15 externally (buy), automate routine reporting (bot).

> Workforce planning is a business planning conversation, not an HR spreadsheet. Get finance and business leaders in the room.`,
          take: ['Focus on critical roles first', 'Plan across multiple scenarios', 'Use the 5 Bs to close gaps'],
          act: 'For one critical role family, estimate supply and demand in three years and propose a 5B mix.'
        },
        {
          id: '3', t: 'Building a skills-based organisation', mins: 13,
          obj: ['Explain the shift from jobs to skills', 'Build a skills taxonomy', 'Apply skills to hiring, mobility and learning'],
          body: `Jobs change faster than job descriptions. A skills-based organisation treats skills, not jobs, as the core unit of talent decisions.

## Why it matters
- Widens talent pools by hiring for skills rather than degrees.
- Speeds up internal mobility: people can move to work that needs their skills.
- Makes learning investment targeted.
- Helps redeploy people as AI changes the task mix.

## Building blocks
1. **Skills taxonomy** – a structured list of skills, grouped into clusters (technical, business, leadership, human skills). Start with 150–300 skills, not 5,000.
2. **Proficiency levels** – for example 1 Awareness, 2 Working, 3 Practitioner, 4 Expert.
3. **Skills profiles** – which skills each role or work type requires.
4. **Skills data on people** – self-assessment, manager validation, inferred from work and learning (AI-assisted).
5. **Talent marketplace** – matching people to projects, gigs, mentors and roles.

## Using skills data
- **Hiring** – skills-based job ads and assessments.
- **Mobility** – recommend internal moves and gigs.
- **Learning** – personalised learning paths to close gaps.
- **Workforce planning** – forecast skill supply and demand.
- **Reward** – some firms pay premiums for critical skills.

## Pitfalls
Over-engineered taxonomies, unvalidated self-ratings, and treating it as a technology project. Start with one critical job family and prove value.

> Ask "what work needs doing and what skills does it need?" before asking "what job title should we hire?"`,
          take: ['Skills are becoming the core unit of talent decisions', 'Start with a lean taxonomy and one job family', 'Use skills data across hiring, mobility and learning'],
          act: 'List the top 10 skills for one role in your organisation, with the proficiency level needed for each.'
        }
      ],
      quiz: [
        { q: 'Which is NOT a point on Galbraith’s Star Model?', o: ['Strategy', 'Rewards', 'Marketing', 'Processes'], a: 2, e: 'The five points are strategy, structure, processes, rewards and people.' },
        { q: 'Many managers with only one or two direct reports usually indicates:', o: ['Efficient design', 'Excess layers or title inflation', 'Matrix structure', 'Fast decision-making'], a: 1, e: 'Very narrow spans add cost and hierarchy.' },
        { q: 'Using AI to automate routine reports to close a capability gap is which "B"?', o: ['Build', 'Buy', 'Borrow', 'Bot'], a: 3, e: '"Bot" refers to automation and technology.' },
        { q: 'A recommended starting size for a skills taxonomy is:', o: ['10 skills', '150–300 skills', '5,000 skills', 'Every possible skill'], a: 1, e: 'A lean taxonomy is usable; huge ones collapse under maintenance.' },
        { q: 'In RAPID, who has the final say?', o: ['R – Recommend', 'A – Agree', 'D – Decide', 'I – Input'], a: 2, e: 'D is the single decision-maker.' }
      ]
    },
    {
      id: 'm3', title: 'Talent Management & Leadership Pipeline',
      summary: 'Talent reviews, the 9-box, succession planning and keeping the people you cannot afford to lose.',
      lessons: [
        {
          id: '1', t: 'Talent reviews & the 9-box', mins: 14,
          obj: ['Facilitate a talent review', 'Distinguish performance from potential', 'Turn reviews into development actions'],
          body: `A talent review is a structured conversation where leaders discuss their people’s performance, potential and next steps.

## The 9-box grid
Performance (horizontal) against potential (vertical), each rated low, medium or high.

| | Low performance | Medium performance | High performance |
|---|---|---|---|
| **High potential** | Enigma / rough diamond | Growth employee | Future leader / star |
| **Medium potential** | Inconsistent | Core player | High performer |
| **Low potential** | Underperformer | Effective | Trusted professional |

## Defining potential
Potential is the likelihood of succeeding in bigger, more complex roles. Useful indicators:
- **Aspiration** – do they want more responsibility?
- **Ability** – learning agility, cognitive capacity, judgement.
- **Engagement** – commitment to the organisation.

Avoid confusing potential with performance, visibility, confidence or similarity to current leaders.

## Running the session
- Pre-work: managers propose placements with evidence.
- Discuss by group, starting with the high-potential and at-risk groups.
- Challenge with questions: "What evidence of learning agility have we seen?"
- Check distribution by gender, ethnicity and location.
- **Agree actions** for every person discussed: stretch assignment, coaching, move, retention plan or performance plan.

## After the review
Tell individuals about their development plans. Many companies avoid sharing labels like "high potential" but discuss growth opportunities openly.

> A talent review without development actions is just labelling.`,
          take: ['Separate performance from potential', 'Potential = aspiration + ability + engagement', 'Every placement needs a development action'],
          act: 'Place ten anonymised team members on a 9-box and write one action per box.'
        },
        {
          id: '2', t: 'Succession planning', mins: 13,
          obj: ['Identify critical roles for succession', 'Assess successor readiness', 'Build a bench strength report'],
          body: `Succession planning makes sure the organisation can fill critical roles quickly and well when people leave or move.

## Which roles?
Not just the top team. Critical roles are those where a vacancy would cause significant business disruption: key leaders, scarce technical experts, roles holding key client relationships or regulatory licences.

## Readiness categories
- **Ready now** – could step in within 0–12 months.
- **Ready in 1–2 years.**
- **Ready in 3–5 years.**
- **Emergency cover** – could act temporarily.

Aim for at least two named successors per critical role, ideally including one diverse successor and one from outside the immediate team.

## Bench strength metrics
- % of critical roles with at least one ready-now successor
- Successor-to-role ratio
- % of critical roles filled internally
- Diversity of successor pools
- Successor retention rate

## Developing successors
Use experiences more than courses: acting assignments, cross-functional projects, international moves, board or committee exposure, mentoring by the incumbent, and leadership programmes linked to real work.

## Common failures
- Plans made once a year and never used
- Successors who are the same age as the incumbent
- "Mini-me" choices that reduce diversity of thought
- No external benchmarking when the internal bench is weak

> Test the plan: if this person left tomorrow, what would actually happen?`,
          take: ['Cover all critical roles, not just executives', 'Track readiness and bench strength metrics', 'Develop successors through experiences'],
          act: 'Pick three critical roles and list successors with readiness ratings. Calculate your ready-now coverage.'
        },
        {
          id: '3', t: 'Engagement & retention strategies', mins: 13,
          obj: ['Explain drivers of engagement', 'Use surveys effectively', 'Design targeted retention actions'],
          body: `Engagement is the emotional commitment people have to their work and organisation. Engaged employees put in discretionary effort and stay longer.

## What drives engagement?
Research from Gallup, Qualtrics and others consistently points to:
- A good manager who cares and gives regular feedback
- Clear expectations and the tools to do the job
- Opportunities to grow
- Recognition
- Meaningful work and connection to purpose
- Fair pay and treatment
- Flexibility and reasonable workload
- Psychological safety: feeling able to speak up without fear

## Using surveys well
- Combine an annual census survey with short pulse surveys.
- Measure **eNPS**: "How likely are you to recommend this company as a place to work?" (0–10). eNPS = % promoters (9–10) − % detractors (0–6).
- Report at team level (minimum 5–7 responses to protect anonymity).
- **Act and communicate**: "You said, we did." Survey fatigue comes from inaction, not frequency.

## Targeted retention
Not all attrition is bad. Focus on **regretted attrition**: high performers, critical skills, diverse talent.

- **Flight-risk signals**: no promotion for a long time, low compa-ratio, manager change, low engagement, recent life events.
- **Stay interviews**: "What keeps you here? What might tempt you away?"
- **Actions**: career conversations, pay corrections, internal moves, flexible work, recognition.

## Worked example: eNPS
200 responses: 90 promoters, 70 passives, 40 detractors. eNPS = 45% − 20% = **+25**.

> People join companies and leave managers. Invest in manager capability first.`,
          take: ['Managers are the biggest driver of engagement', 'eNPS = % promoters − % detractors', 'Focus on regretted attrition with targeted actions'],
          act: 'Run a stay interview with one high performer using five questions you prepare.'
        }
      ],
      quiz: [
        { q: 'On a 9-box, an employee with high performance and high potential is typically labelled:', o: ['Core player', 'Future leader / star', 'Enigma', 'Trusted professional'], a: 1, e: 'High–high is the top-right "star" box.' },
        { q: 'Which is the best indicator of potential?', o: ['Seniority', 'Learning agility and aspiration', 'Confidence in meetings', 'Similarity to the CEO'], a: 1, e: 'Learning agility, aspiration and engagement are core indicators.' },
        { q: '100 responses: 50 promoters, 30 passives, 20 detractors. eNPS is:', o: ['+20', '+30', '+50', '+70'], a: 1, e: '50% − 20% = +30.' },
        { q: 'A good succession plan aims for at least:', o: ['Zero successors to avoid conflict', 'Two named successors per critical role', 'Only one successor, the deputy', 'External hires only'], a: 1, e: 'Two or more successors reduce risk.' },
        { q: 'Survey fatigue is mainly caused by:', o: ['Too many questions', 'Lack of visible action on results', 'Anonymous surveys', 'Pulse surveys'], a: 1, e: 'People stop responding when nothing changes.' }
      ]
    },
    {
      id: 'm4', title: 'Change, Culture & People Analytics',
      summary: 'Lead change, read and shape culture, and use analytics to predict and prescribe.',
      lessons: [
        {
          id: '1', t: 'Leading change', mins: 14,
          obj: ['Apply Kotter and ADKAR', 'Plan change communications', 'Manage resistance'],
          body: `Most change efforts underdeliver, and the most commonly cited reason is the people side. HR’s job is to make change stick.

## Kotter’s 8 steps
1. Create urgency
2. Build a guiding coalition
3. Form a strategic vision
4. Enlist a volunteer army
5. Remove barriers
6. Generate short-term wins
7. Sustain acceleration
8. Institute change in the culture

## ADKAR (Prosci) – individual change
- **Awareness** of the need for change
- **Desire** to support it
- **Knowledge** of how to change
- **Ability** to implement new skills and behaviours
- **Reinforcement** to sustain it

Diagnose where people are stuck. Training (knowledge) will not help someone without desire.

## Change impact assessment
For each stakeholder group: what changes (process, tools, roles, location, reporting line), how big is the impact, and what support do they need?

## Communication
- Explain the **why** before the what.
- Managers are the preferred source of change messages. Equip them with briefing packs and FAQs.
- Repeat key messages through several channels.
- Create two-way channels: Q&A sessions, pulse checks.

## Resistance
Resistance is information. Common causes: fear of loss (status, job, competence), lack of trust, poor timing, change fatigue. Listen, involve people in design, and address concerns honestly.

> Change happens one person at a time. Plan for the organisation, but support individuals.`,
          take: ['Use Kotter for organisations, ADKAR for individuals', 'Equip managers as change leaders', 'Treat resistance as useful information'],
          act: 'Do an ADKAR assessment for one team affected by a current change. Where are they stuck?'
        },
        {
          id: '2', t: 'Diagnosing & shaping culture', mins: 13,
          obj: ['Define culture in observable terms', 'Diagnose culture with multiple methods', 'Use HR levers to shape behaviour'],
          body: `Culture is "how things really get done around here": the shared beliefs and behaviours that shape decisions when no one is watching.

## Schein’s three levels
1. **Artefacts** – visible: office layout, dress, rituals, language.
2. **Espoused values** – what the company says it values.
3. **Basic assumptions** – deep, unspoken beliefs that actually drive behaviour.

Problems arise when espoused values ("we value collaboration") contradict assumptions ("individual heroes get promoted").

## Diagnosis methods
- Engagement and culture survey data
- Focus groups and interviews: "What gets you promoted here? What gets you in trouble?"
- Analysis of who gets promoted, rewarded and exited, and why
- Organisational network analysis of how collaboration actually flows
- Glassdoor and exit interview themes

## Shaping culture through HR levers
| Lever | Example |
|---|---|
| Hiring | Assess for values-in-action, not "culture fit" |
| Onboarding | Teach norms explicitly |
| Performance | Rate the "how" alongside the "what" |
| Reward & promotion | Promote role models of desired behaviour |
| Leadership | Leaders model behaviours visibly |
| Exits | Act on toxic high performers |
| Rituals & symbols | Recognition, storytelling, meeting norms |

## Culture add, not culture fit
"Culture fit" often means hiring people like us. "Culture add" asks: does this person share our core values and bring something we lack?

> Culture is shaped by the worst behaviour a leader tolerates.`,
          take: ['Culture lives in assumptions, not posters', 'Diagnose using data on who gets rewarded', 'Use every HR lever consistently'],
          act: 'Ask five colleagues: "What really gets you promoted here?" Compare answers to your stated values.'
        },
        {
          id: '3', t: 'People analytics: from reports to predictions', mins: 15,
          obj: ['Describe the analytics maturity model', 'Frame good analytics questions', 'Apply ethical guardrails'],
          body: `People analytics uses data about people and work to improve decisions. It moves from describing what happened to predicting and shaping what will happen.

## Maturity levels
1. **Operational reporting** – headcount, turnover reports.
2. **Advanced reporting** – dashboards, benchmarking, trends.
3. **Diagnostic analytics** – why did it happen? Segmentation, correlation.
4. **Predictive analytics** – what will happen? Attrition risk models, hiring success prediction.
5. **Prescriptive** – what should we do? Recommendations, scenario modelling, AI-driven nudges.

## Start with a business question
Weak: "What can our data tell us?"
Strong: "Which factors predict whether a new sales hire reaches quota within 12 months?"

## A simple project approach
1. Define the question and decision with the business owner.
2. Form hypotheses.
3. Gather and clean data (HRIS, ATS, LMS, survey, performance, sales).
4. Analyse: start simple (cross-tabs, regression) before machine learning.
5. Tell the story: insight, impact, recommendation.
6. Act and measure.

## Correlation is not causation
Employees who attend more training have lower attrition. Does training reduce attrition, or do engaged people attend more training? Use control groups and pilots where possible.

## Ethics and trust
- Transparency: tell employees what data is used and why.
- Aggregate wherever possible; protect individuals.
- Do not use predictive scores to make automated decisions about individuals without human review.
- Check models for bias against protected groups.
- Comply with privacy laws and the EU AI Act where relevant.

> Analytics earns its place when a leader makes a better decision because of it.`,
          take: ['Move from reporting to diagnosis to prediction', 'Start with a business question and a decision', 'Build ethics and transparency in from the start'],
          act: 'Write one strong people analytics question for your business, with three hypotheses and the data you would need.'
        }
      ],
      quiz: [
        { q: 'In ADKAR, an employee understands why change is needed but does not want it. They are stuck at:', o: ['Awareness', 'Desire', 'Knowledge', 'Ability'], a: 1, e: 'They have awareness but lack desire.' },
        { q: 'Schein’s deepest level of culture is:', o: ['Artefacts', 'Espoused values', 'Basic assumptions', 'Policies'], a: 2, e: 'Basic assumptions are unspoken beliefs that drive behaviour.' },
        { q: 'An attrition risk model is an example of which analytics level?', o: ['Operational reporting', 'Descriptive', 'Predictive', 'Artefact'], a: 2, e: 'It predicts future outcomes.' },
        { q: 'What is the preferred source of change messages for most employees?', o: ['Posters', 'Their direct manager', 'External media', 'The intranet'], a: 1, e: 'Employees want to hear about change from their manager.' },
        { q: 'Which is an ethical guardrail for people analytics?', o: ['Fully automated dismissal decisions', 'Human review of model-driven decisions about individuals', 'Hiding data use from employees', 'Ignoring bias'], a: 1, e: 'Human oversight protects fairness and is required by many regulations.' }
      ]
    }
  ]
});
