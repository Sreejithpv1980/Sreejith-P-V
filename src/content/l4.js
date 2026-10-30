LMS.addLevel({
  id: 'l4', code: 'L4', name: 'Strategic HR Leader',
  audience: 'Heads of HR · HR Directors · CoE leaders · 10–15 years',
  blurb: 'Build the people strategy, design the HR operating model, set reward strategy, govern HR technology and AI, and lead through restructuring and M&A.',
  modules: [
    {
      id: 'm1', title: 'People Strategy & HR Operating Model',
      summary: 'Link people priorities to business strategy, design HR for value, and manage HR’s budget.',
      lessons: [
        {
          id: '1', t: 'Building a people strategy', mins: 15,
          obj: ['Derive people priorities from business strategy', 'Write a one-page people strategy', 'Define measures of success'],
          body: `A people strategy answers one question: what must be true about our people, organisation and culture for the business strategy to succeed?

## Start from the business strategy
Extract the 3–5 strategic priorities (for example: expand into Southeast Asia, launch an AI-enabled product line, improve margin by 4 points). For each, ask:
- What capabilities do we need that we do not have?
- What organisation design changes are needed?
- What culture and behaviours will drive success?
- What are the people risks?

## The one-page people strategy
| Section | Content |
|---|---|
| Ambition | One sentence on the organisation we are building |
| Strategic people priorities | 3–5 priorities, each linked to a business priority |
| Key initiatives | 2–3 major programmes per priority |
| Measures | Outcome metrics with targets |
| Enablers | HR operating model, technology, budget, capability |
| Roadmap | Year 1, 2, 3 milestones |

## Example
Business priority: "Grow digital revenue from 10% to 30% in three years."
People priority: "Build digital and data capability at scale."
Initiatives: digital academy, 120 critical digital hires, skills-based talent marketplace, product-team operating model.
Measures: % of critical digital roles filled, digital skills coverage, time to market.

## Avoid the HR wish list
A strategy is about choices. If it includes every HR process, it is a work plan, not a strategy. Say what you will **stop** doing as well.

> Test it with the CEO: would they recognise their strategy in your people priorities?`,
          take: ['Start from business priorities, not HR processes', 'Fit it on one page with measurable outcomes', 'Strategy means making choices, including what to stop'],
          act: 'Write a one-page people strategy for your organisation using the template.'
        },
        {
          id: '2', t: 'Designing the HR operating model', mins: 14,
          obj: ['Evaluate HR operating model options', 'Apply design criteria to HR', 'Plan the evolution of the model'],
          body: `The HR operating model defines how HR is organised, how work flows, and how value is delivered. The classic three-pillar model is evolving.

## Limits of the classic model
- HRBPs pulled into transactional work
- CoEs designing programmes disconnected from business needs
- Employees bounced between channels
- Handoffs create slow, fragmented experiences

## Emerging models
- **Agile / product-based HR** – cross-functional HR teams own end-to-end experiences (for example "hire to productive") as products with a product owner and backlog.
- **Solution-focused pools** – flexible pools of HR experts deployed to priority projects instead of fixed CoE silos.
- **Employee experience layer** – a single front door (portal, AI assistant, case management) designed around employee journeys.
- **AI-augmented HR** – AI agents handling Tier 0–1 queries, drafting documents, summarising cases and surfacing insights, with HR focused on judgement and relationships.

## Design criteria for HR
- Business alignment and responsiveness
- Employee and manager experience
- Expertise depth
- Cost and scalability
- Compliance and risk control
- Agility to shift resources to priorities

## Key ratios to benchmark
- **HR-to-employee ratio** – commonly 1:60 to 1:100, depending on industry, size and complexity. Highly automated firms run leaner.
- **HR cost per employee.**
- **Self-service and first-contact resolution rates.**

## Transition
Redesigning HR is a change programme in itself. Pilot new ways of working, upskill HR in data, consulting and product skills, and measure experience as well as cost.

> Design HR around the moments that matter to managers and employees, not around HR’s internal specialisms.`,
          take: ['The three-pillar model is evolving to product and AI-augmented models', 'Use explicit design criteria', 'Benchmark ratios but design for your context'],
          act: 'Map one end-to-end employee journey (e.g. internal move) across HR teams. Count the handoffs.'
        },
        {
          id: '3', t: 'HR budgeting & demonstrating ROI', mins: 13,
          obj: ['Build and defend an HR budget', 'Calculate ROI for HR programmes', 'Prioritise investments'],
          body: `HR leaders manage large budgets, both HR’s own operating costs and the people costs of the whole organisation. Financial discipline builds credibility.

## Two budgets
1. **HR function budget** – HR salaries, technology, learning, recruitment, consultants, events.
2. **Enterprise people cost** – salaries, bonuses, benefits, payroll taxes, hiring. Usually owned by business units, but HR often owns the planning process and assumptions (merit budget, headcount plan, benefit inflation).

## ROI formula
**ROI = (benefits − costs) ÷ costs × 100**

Example: a manager development programme costs $200,000. It reduces regretted attrition in participating teams from 15% to 11% across 400 employees. Average replacement cost is $40,000.
Avoided leavers: 4% of 400 = 16. Benefit: 16 × $40,000 = $640,000.
ROI = ($640,000 − $200,000) ÷ $200,000 = **220%**.

Be explicit about assumptions and use control groups where possible. Present a range rather than a single number.

## Prioritising investments
Score options on:
- Strategic alignment
- Expected value (financial and risk reduction)
- Cost and effort
- Time to impact
- Confidence in results

## Cost levers when budgets tighten
Process automation, vendor consolidation, self-service, reducing low-value programmes, shared services location strategy, and renegotiating benefit contracts, before cutting capability-building programmes that drive future value.

> Speak the CFO’s language: cost, value, risk and payback period.`,
          take: ['Manage both the HR budget and enterprise people cost', 'ROI = (benefits − costs) ÷ costs', 'State assumptions and show ranges'],
          act: 'Calculate the ROI of one HR programme you run, listing every assumption.'
        }
      ],
      quiz: [
        { q: 'A people strategy should start from:', o: ['Last year’s HR plan', 'Business strategy and priorities', 'Benchmarking competitors’ HR programmes', 'The HR budget'], a: 1, e: 'People priorities derive from business priorities.' },
        { q: 'A programme costs $100,000 and delivers $250,000 in benefits. ROI is:', o: ['50%', '150%', '250%', '350%'], a: 1, e: '($250,000 − $100,000) ÷ $100,000 = 150%.' },
        { q: 'Which is a characteristic of product-based HR?', o: ['Fixed CoE silos', 'Cross-functional teams owning end-to-end experiences', 'Eliminating HR', 'Annual planning only'], a: 1, e: 'Product HR teams own journeys like "hire to productive."' },
        { q: 'A people strategy that includes every HR process is better described as:', o: ['Highly strategic', 'A work plan, not a strategy', 'A culture deck', 'A budget'], a: 1, e: 'Strategy requires choices.' },
        { q: 'When presenting HR ROI, best practice is to:', o: ['Hide assumptions', 'State assumptions and show a range', 'Use the highest possible number', 'Avoid financial terms'], a: 1, e: 'Transparency builds credibility with finance.' }
      ]
    },
    {
      id: 'm2', title: 'Total Rewards Strategy & Pay Equity',
      summary: 'Reward philosophy, incentive design and pay equity in the era of pay transparency.',
      lessons: [
        {
          id: '1', t: 'Reward philosophy & market positioning', mins: 13,
          obj: ['Write a reward philosophy', 'Choose a market position by role', 'Balance fixed and variable pay'],
          body: `A reward philosophy sets the principles behind every pay decision. Without one, decisions become ad hoc and inconsistent.

## Elements of a reward philosophy
- **Purpose** – what reward should achieve (attract, retain, motivate, align to strategy).
- **Market position** – where we pay against the market (for example median base, upper-quartile total cash for top performers).
- **Comparator market** – who we compete with for talent: industry, geography, company size.
- **Mix** – balance of fixed pay, short-term incentives, long-term incentives and benefits.
- **Performance link** – how strongly pay differentiates by performance.
- **Internal equity and transparency** – how open we are about pay ranges and decisions.

## Differentiated positioning
Not every role needs the same market position. Many firms pay:
- Market median for most roles
- Upper quartile for critical, scarce skills (AI, cybersecurity, specialised engineers)
- Geographic differentials for remote roles, or a single national rate

## Pay mix by level
| Level | Typical fixed : variable |
|---|---|
| Individual contributor | 90 : 10 |
| Manager | 80 : 20 |
| Senior leader | 60 : 40 |
| Executive | 30–40 : 60–70 (including LTI) |
| Sales roles | 50 : 50 to 70 : 30 |

## Affordability
Model the total cost of changes. A 1% merit budget increase may cost millions. Link the reward budget to business performance and the workforce plan.

> A good philosophy lets a line manager explain any pay decision in one sentence.`,
          take: ['A philosophy makes pay decisions consistent', 'Position differently for critical skills', 'Pay mix shifts towards variable at senior levels'],
          act: 'Draft a five-sentence reward philosophy for your organisation.'
        },
        {
          id: '2', t: 'Incentive design: STI & LTI', mins: 15,
          obj: ['Design short-term incentive plans', 'Explain long-term incentive vehicles', 'Avoid incentives that drive bad behaviour'],
          body: `Incentives focus attention. Badly designed incentives focus attention on the wrong things.

## Short-term incentives (STI / annual bonus)
Key design choices:
- **Eligibility and target** – e.g. 10% of salary for managers, 30% for directors.
- **Funding** – company performance creates the pool (e.g. EBITDA vs target).
- **Measures** – a balanced mix of financial (revenue, profit, cash), customer, operational and people/ESG measures. Usually 3–5 measures.
- **Performance curve** – threshold (e.g. 90% of target pays 50%), target (100% pays 100%), stretch (110% pays 200%).
- **Individual modifier** – adjusts payout by individual performance.

## Long-term incentives (LTI)
Align leaders with shareholders over 3+ years.
| Vehicle | How it works |
|---|---|
| Restricted stock units (RSUs) | Shares vest over time; retention focus |
| Performance shares (PSUs) | Vest only if targets met (TSR, EPS, ROIC) |
| Stock options | Right to buy at a fixed price; value only if share price rises |
| Cash LTIP | For private companies or subsidiaries |
| Phantom equity / profit pools | For private companies wanting equity-like alignment |

## Governance
- **Malus and clawback** – reduce or recover awards after misconduct or misstatement.
- **Shareholding requirements** – executives hold shares worth a multiple of salary.
- **Discretion** – boards can adjust outcomes that do not reflect real performance.

## Unintended consequences
Sales incentives on revenue alone can drive discounting and mis-selling. Call-centre targets on call time can hurt customer outcomes. Always ask: "How could someone hit this target while hurting the business?"

> Simple plans that people understand outperform clever plans they don’t.`,
          take: ['Balance financial and non-financial measures', 'LTIs align leaders with long-term value', 'Stress-test every incentive for gaming'],
          act: 'Design an STI scorecard for a regional sales director with four measures, weights and a payout curve.'
        },
        {
          id: '3', t: 'Pay equity & pay transparency', mins: 15,
          obj: ['Run a pay equity analysis', 'Prepare for pay transparency laws', 'Remediate unexplained gaps'],
          body: `Pay transparency is now law in many places. The EU Pay Transparency Directive must be transposed into national law by June 2026, and many US states require pay ranges in job postings.

## Key requirements of the EU Pay Transparency Directive
- Pay range or starting pay disclosed to candidates before interview.
- Ban on asking candidates for their pay history.
- Employees can request information on their pay level and the average pay of colleagues doing the same work or work of equal value, broken down by sex.
- Gender pay gap reporting: annually for employers with 250+ employees, with phased reporting for 100–249.
- If a gap of **5% or more** in any category of workers cannot be justified by objective, gender-neutral factors and is not fixed within six months, a **joint pay assessment** with worker representatives is required.
- The burden of proof shifts to the employer in pay discrimination claims.

## Gender pay gap vs equal pay
- **Pay gap** – difference in average pay between men and women across the organisation. Often driven by representation (fewer women in senior roles).
- **Equal pay** – equal pay for equal work or work of equal value. Unexplained differences here are unlawful.

## Running a pay equity analysis
1. Group jobs by work of equal value (job architecture and evaluation are essential).
2. Gather pay data: base, bonus, allowances, equity.
3. Run regression analysis controlling for legitimate factors: grade, role, location, tenure, performance.
4. Identify unexplained gaps by gender, and by ethnicity where lawful.
5. Investigate outliers individually.
6. Remediate: budget for adjustments, fix root causes (starting pay, promotion, bonus decisions).
7. Repeat annually; analyse under legal privilege where advised.

## Preparing for transparency
Clean job architecture, defensible pay ranges, manager training on pay conversations, and a communication plan.

> Transparency exposes every inconsistency. Fix the system before you open the window.`,
          take: ['Pay gap and equal pay are different problems', 'The EU Directive brings a 5% joint assessment trigger', 'Job architecture is the foundation of pay equity'],
          act: 'Check readiness: do all your roles have defined pay ranges and job levels? List the gaps.'
        }
      ],
      quiz: [
        { q: 'Under the EU Pay Transparency Directive, an unexplained gender pay gap of at least what percentage triggers a joint pay assessment if not remedied?', o: ['1%', '5%', '10%', '20%'], a: 1, e: 'A 5% unjustified gap in a worker category triggers a joint pay assessment if not corrected within six months.' },
        { q: 'Which LTI vehicle vests only if performance targets are met?', o: ['RSUs', 'Performance shares (PSUs)', 'Base salary', 'Sign-on bonus'], a: 1, e: 'PSUs are conditional on performance measures.' },
        { q: 'A gender pay gap driven mainly by fewer women in senior roles is primarily a:', o: ['Representation issue', 'Equal pay breach', 'Payroll error', 'Tax issue'], a: 0, e: 'The overall pay gap often reflects representation across levels.' },
        { q: 'Clawback refers to:', o: ['Recovering incentive pay after misconduct or misstatement', 'Paying bonuses early', 'Salary increases', 'Benefits enrolment'], a: 0, e: 'Clawback recovers awards already paid.' },
        { q: 'Which question helps prevent dysfunctional incentives?', o: ['How can we make the plan more complex?', 'How could someone hit this target while hurting the business?', 'How can we pay less?', 'Which competitor has the biggest bonus?'], a: 1, e: 'Stress-testing for gaming exposes unintended consequences.' }
      ]
    },
    {
      id: 'm3', title: 'HR Technology & AI',
      summary: 'Architect the HR tech stack, govern AI responsibly and drive adoption.',
      lessons: [
        {
          id: '1', t: 'The HR technology stack', mins: 13,
          obj: ['Map the layers of an HR tech stack', 'Decide between suite and best-of-breed', 'Plan integrations and data flows'],
          body: `The HR technology market is large and crowded. A clear architecture prevents an expensive patchwork of disconnected tools.

## Layers of the stack
1. **Core HCM / HRIS** – system of record: Workday, SAP SuccessFactors, Oracle HCM, Darwinbox, HiBob, Personio.
2. **Payroll** – often country-specific providers or global platforms.
3. **Talent applications** – ATS (Greenhouse, Lever, iCIMS, SmartRecruiters), learning (LMS/LXP), performance, compensation, succession.
4. **Employee experience layer** – portals, service management, knowledge base, AI assistants, Microsoft Teams or Slack integrations.
5. **Workforce management** – scheduling, time and attendance for hourly workforces.
6. **Analytics and data** – people analytics platform, data warehouse, BI tools.
7. **AI layer** – generative AI copilots and agents across the stack.

## Suite vs best-of-breed
| | Suite | Best-of-breed |
|---|---|---|
| Strength | One data model, simpler integration | Best functionality per process |
| Risk | Weaker modules in some areas | Integration cost, fragmented data |

Most large organisations run a hybrid: a core suite plus a few specialist tools where differentiation matters.

## Integration and data
- Define the **system of record** for each data element.
- Use APIs and an integration platform rather than flat-file transfers.
- Maintain a data dictionary and governance board.
- Plan single sign-on and role-based access.

## Total cost of ownership
Licences are usually less than half the cost. Include implementation, integration, change management, internal support and upgrades.

> Technology amplifies process. Automating a bad process gives you a fast bad process.`,
          take: ['Know the layers and the system of record', 'Hybrid suite + best-of-breed is common', 'Budget for total cost of ownership, not licences'],
          act: 'Draw your current HR tech stack, showing systems and integrations. Mark pain points in red.'
        },
        {
          id: '2', t: 'AI in HR: use cases & governance', mins: 16,
          obj: ['Identify high-value AI use cases in HR', 'Understand the EU AI Act implications for HR', 'Set up AI governance'],
          body: `Generative and agentic AI are reshaping HR work. The opportunity is large; so is the responsibility, because HR decisions affect people’s livelihoods.

## High-value use cases
- **Employee service** – AI assistants answering policy and payroll questions, 24/7, in many languages.
- **Talent acquisition** – drafting job ads, sourcing, interview scheduling, summarising interviews (with human decisions).
- **Learning** – personalised learning paths, AI tutors, content creation, role-play coaching.
- **Manager support** – drafting feedback, preparing for difficult conversations, summarising team data.
- **HR operations** – document generation, contract review, case summaries, data-quality checks.
- **Analytics** – natural-language queries on people data, survey comment analysis.
- **Workforce planning** – modelling task automation and skills impact.

## EU AI Act and HR
AI systems used for recruitment, selection, promotion, termination, task allocation and performance monitoring are classified as **high-risk**. Core obligations for high-risk systems apply from August 2026, although EU lawmakers have discussed adjusting the timeline, so check the current position. Requirements include:
- Risk management and data governance
- Human oversight
- Transparency to affected workers
- Logging and monitoring
- Informing workers’ representatives before deployment (for employers)

**Prohibited practices** include emotion recognition in the workplace (except for medical or safety reasons). AI literacy obligations already apply.

Other regulations: NYC Local Law 144 (bias audits for automated hiring tools), Colorado’s AI Act, Illinois laws on AI in employment decisions, and evolving guidance elsewhere.

## AI governance in HR
1. **Inventory** every AI tool in use, including those embedded in vendor products.
2. **Risk-classify** each use case.
3. **Principles** – fairness, transparency, human oversight, privacy, accountability.
4. **Vendor due diligence** – bias testing, data use, explainability, audit rights.
5. **Human in the loop** for decisions affecting individuals.
6. **Monitor** outcomes for bias and accuracy.
7. **Upskill** HR and managers in AI literacy.

> Use AI to augment human judgement on people decisions, never to replace accountability.`,
          take: ['AI can transform service, hiring, learning and analytics', 'Employment AI is high-risk under the EU AI Act', 'Inventory, classify, oversee and monitor'],
          act: 'Create an inventory of AI tools used in your HR function and classify each as low, limited or high risk.'
        },
        {
          id: '3', t: 'Vendor selection & digital adoption', mins: 12,
          obj: ['Run a structured vendor selection', 'Plan implementation and adoption', 'Measure the value of HR technology'],
          body: `Many HR technology projects deliver late, over budget or with poor adoption. A disciplined approach improves the odds.

## Vendor selection process
1. **Define requirements** from user journeys and business outcomes, not feature lists.
2. **Market scan** and longlist (analyst reports, peer references).
3. **RFP** with weighted criteria.
4. **Scripted demos** using your real scenarios, not the vendor’s showcase.
5. **Reference calls** with similar customers.
6. **Security, privacy and AI review.**
7. **Commercial negotiation** – price, term, renewal caps, exit terms, data ownership.

## Weighted criteria example
| Criterion | Weight |
|---|---|
| Functional fit to key journeys | 30% |
| User experience & mobile | 20% |
| Integration & data | 15% |
| AI capability & governance | 10% |
| Vendor viability & roadmap | 10% |
| Total cost of ownership | 15% |

## Implementation and adoption
- An executive sponsor and a dedicated product owner
- Process redesign before configuration
- Pilot with a representative group
- Change champions network
- Training in the flow of work: short videos, in-app guidance
- Hypercare period after go-live

## Measure value
Adoption (active users, self-service rate), efficiency (time saved, cases deflected), experience (user satisfaction), and business outcomes (time to hire, data accuracy).

> Go-live is the start, not the finish. Plan budget and people for continuous improvement.`,
          take: ['Select vendors on journeys and scripted demos', 'Negotiate data ownership and exit terms', 'Adoption is the real measure of success'],
          act: 'Draft five scripted demo scenarios for selecting a new learning platform.'
        }
      ],
      quiz: [
        { q: 'Under the EU AI Act, AI used for recruitment and promotion decisions is classified as:', o: ['Minimal risk', 'Limited risk', 'High-risk', 'Not regulated'], a: 2, e: 'Employment-related AI is listed as high-risk.' },
        { q: 'Which AI practice is prohibited in the workplace under the EU AI Act (with narrow exceptions)?', o: ['Chatbots answering policy questions', 'Emotion recognition', 'Scheduling interviews', 'Drafting job adverts'], a: 1, e: 'Emotion recognition at work is prohibited except for medical or safety reasons.' },
        { q: 'The main advantage of an HR suite over best-of-breed is:', o: ['Best functionality in every area', 'A single data model and simpler integration', 'Lowest licence cost always', 'No change management needed'], a: 1, e: 'Suites share one data model.' },
        { q: 'Licence cost is typically what share of HR technology total cost of ownership?', o: ['Nearly all', 'Usually less than half', 'Zero', 'Exactly 50%'], a: 1, e: 'Implementation, integration, change and support add up.' },
        { q: 'In vendor demos, best practice is to:', o: ['Let the vendor show their best features', 'Use scripted scenarios based on your real journeys', 'Skip demos', 'Focus only on price'], a: 1, e: 'Scripted demos test real fit.' }
      ]
    },
    {
      id: 'm4', title: 'Leading Through Complexity',
      summary: 'M&A integration, restructuring with dignity, labour relations and crisis leadership.',
      lessons: [
        {
          id: '1', t: 'M&A: the people workstream', mins: 15,
          obj: ['Identify people risks in due diligence', 'Plan the people integration', 'Retain key talent through a deal'],
          body: `Many mergers fail to deliver expected value, and people and culture issues are among the most cited reasons. HR must be involved from due diligence onward.

## Due diligence: people questions
- Headcount, cost and contracts; change-of-control clauses
- Key talent and retention risk
- Pension and benefit liabilities
- Pending litigation, employee relations issues, union agreements
- Compliance: classification, immigration, pay equity, health and safety
- Culture: leadership style, decision-making, engagement data

## Integration phases
1. **Pre-close** – integration management office, leadership selection approach, Day 1 plan, communication plan.
2. **Day 1** – clear messages to all employees, what changes and what doesn’t, payroll continuity.
3. **First 100 days** – leadership appointments, organisation design, harmonisation plan, culture integration.
4. **Beyond** – systems integration, policy and benefits harmonisation, synergy tracking.

## Leadership selection
Fast, fair and transparent. Decide top levels first so leaders can shape their teams. Use clear criteria and assessments, not just "who you know."

## Retention
Identify critical talent early. Use retention bonuses (paid in instalments, 6–24 months), early clarity on roles, and personal outreach by leaders.

## Legal requirements
Transfer of undertakings rules (for example TUPE in the UK, the EU Acquired Rights Directive) protect employees’ terms when a business transfers. Information and consultation duties may apply.

## Culture integration
Map the two cultures on key dimensions (decision-making, risk, hierarchy, customer focus). Choose the target culture deliberately; don’t default to "the acquirer’s way."

> Uncertainty is the enemy. Communicate early and often, even when the answer is "we don’t know yet, and here’s when we will."`,
          take: ['HR must join from due diligence', 'Decide leadership early and fairly', 'Lock in key talent and manage culture deliberately'],
          act: 'Draft a Day 1 FAQ for employees of an acquired company with ten questions and answers.'
        },
        {
          id: '2', t: 'Restructuring & redundancy with dignity', mins: 14,
          obj: ['Plan a lawful restructuring process', 'Design fair selection criteria', 'Support leavers and survivors'],
          body: `Restructuring is sometimes necessary. How it is done determines legal risk, reputation and the commitment of the people who stay.

## Before deciding
- Is there a clear business rationale? Document it.
- Have alternatives been considered: hiring freeze, reduced hours, redeployment, voluntary programmes?
- What is the full cost, including severance, legal, rehiring and lost productivity?

## Legal process (varies by jurisdiction)
- **Collective consultation** with worker representatives or unions when thresholds are met (for example the EU Collective Redundancies Directive; UK rules at 20+ redundancies; WARN Act in the US for mass layoffs with 60 days’ notice).
- Notification to authorities where required.
- Individual consultation.
- Fair and objective selection.
- Consideration of suitable alternative roles.
- Statutory and contractual severance.

## Selection criteria
Objective, measurable and documented: skills, performance (with reliable records), qualifications, disciplinary record. Avoid criteria that indirectly discriminate. Check the impact on protected groups before finalising.

## Doing it with dignity
- Inform affected people personally, not by mass email.
- Train managers to deliver the news.
- Provide outplacement, career coaching, mental health support and references.
- Be generous where possible. Leavers talk to future candidates and customers.

## Survivors
Survivor syndrome includes reduced trust, anxiety and lower productivity. Explain the future plan, re-set priorities and workload, and have leaders be visible and honest.

> People remember how you made them feel on their last day.`,
          take: ['Document rationale and consider alternatives', 'Follow consultation and objective selection', 'Support both leavers and survivors'],
          act: 'Create a selection criteria matrix for a redundancy and run an adverse-impact check on sample data.'
        },
        {
          id: '3', t: 'Labour relations & crisis leadership', mins: 13,
          obj: ['Build constructive relationships with worker representatives', 'Prepare for collective bargaining', 'Lead the people response in a crisis'],
          body: `Strategic HR leaders manage collective relationships and lead in crises when the organisation is under pressure.

## Labour relations
Trade unions, works councils and employee forums are partners in many countries. In much of Europe, works councils have legal rights to information, consultation and sometimes co-determination.

Principles for a constructive relationship:
- Share information early and honestly.
- Meet regularly, not only during disputes.
- Understand representatives’ pressures and constituents.
- Keep commitments.

## Collective bargaining preparation
- Know the business’s financial position and the cost of each proposal.
- Understand market and peer agreements.
- Define your objectives, opening position and walk-away point.
- Build a negotiating team with clear authority.
- Plan communications to employees throughout.
- Use interest-based bargaining: focus on underlying interests rather than fixed positions.

## Crisis leadership
Crises include pandemics, natural disasters, cyberattacks, workplace violence, executive misconduct and sudden financial shocks.

HR’s role:
1. **Safety first** – locate and support employees; duty of care.
2. **Communicate** – frequent, honest, from leaders; one source of truth.
3. **Continuity** – payroll, critical roles, remote work, succession.
4. **Wellbeing** – employee assistance, trauma support, flexibility.
5. **Policy decisions** – leave, pay, travel, working arrangements, made quickly and consistently.
6. **Learn** – after-action review and updated crisis plans.

> Prepare in peacetime: a crisis playbook, emergency contacts, and decision rights agreed in advance.`,
          take: ['Treat worker representatives as long-term partners', 'Prepare bargaining positions with full costings', 'Lead crises with safety, communication and continuity'],
          act: 'Review your company’s crisis plan. Does it cover employee communication, payroll continuity and wellbeing support?'
        }
      ],
      quiz: [
        { q: 'When should HR be involved in an acquisition?', o: ['After closing', 'From due diligence', 'Only for layoffs', 'Never'], a: 1, e: 'People risks are discovered and priced in due diligence.' },
        { q: 'The US law requiring 60 days’ notice for qualifying mass layoffs is:', o: ['FMLA', 'WARN Act', 'FLSA', 'ADA'], a: 1, e: 'The WARN Act requires 60 days’ notice for covered layoffs.' },
        { q: 'Which redundancy selection criterion is most defensible?', o: ['Manager preference', 'Objective, documented skills and performance measures', 'Age', 'Part-time status'], a: 1, e: 'Objective, documented criteria reduce bias and legal risk.' },
        { q: 'Interest-based bargaining focuses on:', o: ['Fixed positions', 'Underlying interests of both parties', 'Winning at all costs', 'Avoiding negotiation'], a: 1, e: 'It seeks solutions that meet both parties’ underlying interests.' },
        { q: 'In a crisis, HR’s first priority is:', o: ['Cost cutting', 'Employee safety and wellbeing', 'Updating policies', 'Performance reviews'], a: 1, e: 'Duty of care comes first.' }
      ]
    }
  ]
});
