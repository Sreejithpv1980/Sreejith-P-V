(function () {
  'use strict';
  const L = window.LMS;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PASS = 80;
  const LEVEL_COLORS = { l1: 'var(--l1)', l2: 'var(--l2)', l3: 'var(--l3)', l4: 'var(--l4)', l5: 'var(--l5)' };

  /* ---------- storage ---------- */
  const KEY = 'hr-pathways-v1';
  const fresh = () => ({ profile: null, done: {}, quiz: {}, notes: {}, bm: {}, xp: 0, days: {}, placement: null, theme: '', cards: {}, certs: {} });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  const today = () => new Date().toISOString().slice(0, 10);
  const bumpDay = () => { S.days[today()] = (S.days[today()] || 0) + 1; };
  function streak() {
    let n = 0; const d = new Date();
    if (!S.days[today()]) d.setDate(d.getDate() - 1);
    while (S.days[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* ---------- content index ---------- */
  const lessons = []; // flat ordered list
  L.levels.forEach((lv) => lv.modules.forEach((m) => {
    m.lessons.forEach((ls) => lessons.push({ key: `${lv.id}-${m.id}-${ls.id}`, lv, m, ls }));
  }));
  const byKey = Object.fromEntries(lessons.map((x) => [x.key, x]));
  const findLevel = (id) => L.levels.find((l) => l.id === id);

  function levelStats(lv) {
    let total = 0, done = 0, quizzes = 0, passed = 0, mins = 0;
    lv.modules.forEach((m) => {
      m.lessons.forEach((ls) => { total++; mins += ls.mins; if (S.done[`${lv.id}-${m.id}-${ls.id}`]) done++; });
      quizzes++; if ((S.quiz[`${lv.id}-${m.id}`] || 0) >= PASS) passed++;
    });
    const units = total + quizzes, got = done + passed;
    return { total, done, quizzes, passed, mins, pct: Math.round((got / units) * 100), complete: got === units };
  }
  const recommendedLevel = () => (S.placement ? findLevel('l' + S.placement.lvl) : null) || L.levels[0];
  function nextLesson() {
    const start = L.levels.indexOf(recommendedLevel());
    const order = L.levels.slice(start).concat(L.levels.slice(0, start));
    for (const lv of order) for (const x of lessons) if (x.lv === lv && !S.done[x.key]) return x;
    return null;
  }

  /* ---------- markdown-lite ---------- */
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  }
  function md(src) {
    const lines = src.split('\n'); let out = ''; let i = 0;
    while (i < lines.length) {
      const ln = lines[i];
      if (!ln.trim()) { i++; continue; }
      if (ln.startsWith('### ')) { out += `<h3>${inline(ln.slice(4))}</h3>`; i++; continue; }
      if (ln.startsWith('## ')) { out += `<h2>${inline(ln.slice(3))}</h2>`; i++; continue; }
      if (ln.startsWith('> ')) { out += `<blockquote>${inline(ln.slice(2))}</blockquote>`; i++; continue; }
      if (ln.startsWith('|')) {
        const rows = []; while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
        const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const head = cells(rows[0]); const body = rows.slice(2).map(cells);
        out += '<div class="tbl"><table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
          body.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
        continue;
      }
      if (/^- /.test(ln)) {
        let h = '<ul>'; while (i < lines.length && /^- /.test(lines[i])) h += `<li>${inline(lines[i++].slice(2))}</li>`;
        out += h + '</ul>'; continue;
      }
      if (/^\d+\. /.test(ln)) {
        let h = '<ol>'; while (i < lines.length && /^\d+\. /.test(lines[i])) h += `<li>${inline(lines[i++].replace(/^\d+\. /, ''))}</li>`;
        out += h + '</ol>'; continue;
      }
      let p = []; while (i < lines.length && lines[i].trim() && !/^(#|>|\||- |\d+\. )/.test(lines[i])) p.push(lines[i++]);
      out += `<p>${inline(p.join(' '))}</p>`;
    }
    return out;
  }

  /* ---------- ui helpers ---------- */
  const ICON = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    path: '<path d="M4 20h4v-5h4v-5h4V5h4"/>',
    assess: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    tool: '<path d="M14 7l3-3 3 3-3 3M4 20l9-9M15 13l5 5-2 2-5-5"/>',
    cards: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 4h12a2 2 0 0 1 2 2v10"/>',
    book: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h10"/>',
    note: '<path d="M5 3h10l4 4v14H5z"/><path d="M9 12h6M9 16h6"/>',
    cert: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13l-1.5 8 5-3 5 3-1.5-8"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'
  };
  const svg = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  const bar = (pct, c) => `<div class="bar" style="--c:${c || 'var(--accent)'}"><i style="width:${pct}%"></i></div>`;
  function copyText(text, btn) {
    const done = () => toast('Copied to clipboard');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallback());
    } else fallback();
    function fallback() {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('Select the text and copy it manually'); }
      ta.remove();
    }
  }
  const standalone = (() => { try { return window.self === window.top; } catch (e) { return false; } })();

  /* ---------- rail ---------- */
  function renderRail(route) {
    const is = (r) => (route === r ? ' class="on"' : '');
    const lvActive = (id) => route === 'level-' + id || route.startsWith(id + '-') || route.startsWith('quiz-' + id);
    $('#nav').innerHTML = `
      <a href="#home"${is('home')}>${svg('home')}Dashboard</a>
      <a href="#paths"${is('paths')}>${svg('path')}Learning paths</a>
      <a href="#assess"${is('assess')}>${svg('assess')}Skill assessment</a>
      <div class="nav-label">Levels</div>
      ${L.levels.map((lv) => `<a href="#level-${lv.id}"${lvActive(lv.id) ? ' class="on"' : ''}><span class="dot" style="background:${LEVEL_COLORS[lv.id]}"></span>${esc(lv.name)}<span class="pct num">${levelStats(lv).pct}%</span></a>`).join('')}
      <div class="nav-label">Practice</div>
      <a href="#toolkit"${is('toolkit')}>${svg('tool')}HR toolkit</a>
      <a href="#cards"${is('cards')}>${svg('cards')}Flashcards</a>
      <a href="#glossary"${is('glossary')}>${svg('book')}Glossary</a>
      <a href="#notes"${is('notes')}>${svg('note')}My notes</a>
      <a href="#certs"${route.startsWith('cert') ? ' class="on"' : ''}>${svg('cert')}Certificates</a>
      <a href="#prefs"${is('prefs')}>${svg('gear')}Settings</a>`;
    $('#xp').textContent = S.xp;
    $('#streak').textContent = streak();
  }

  /* ---------- views ---------- */
  const V = {};

  V.home = () => {
    const nx = nextLesson();
    const name = S.profile ? S.profile.name.split(' ')[0] : 'there';
    const doneCount = Object.keys(S.done).length;
    const hrs = Math.round(lessons.filter((x) => S.done[x.key]).reduce((a, x) => a + x.ls.mins, 0) / 6) / 10;
    const certCount = L.levels.filter((lv) => levelStats(lv).complete).length;
    const rec = recommendedLevel();
    const recent = Object.entries(S.done).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k]) => byKey[k]).filter(Boolean);
    const bms = Object.keys(S.bm).map((k) => byKey[k]).filter(Boolean);
    const todayCount = S.days[today()] || 0; const goal = (S.profile && S.profile.goal) || 2;
    return `
      <div><div class="eyebrow">${new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</div>
      <h1 class="h1">Welcome back, ${esc(name)}</h1>
      <p class="lede">${S.placement ? `Your assessment placed you at <strong>${esc(rec.code)} · ${esc(rec.name)}</strong>.` : 'Not sure where to start? Take the 5-minute skill assessment to get a recommended level.'}</p></div>
      <div class="hello">
        <div class="panel continue">
          ${nx ? `<div><div class="eyebrow">Continue learning · ${esc(nx.lv.code)} · ${esc(nx.m.title)}</div>
            <h2>${esc(nx.ls.t)}</h2><p style="margin:6px 0 0;opacity:.85">${nx.ls.mins} min · ${esc(nx.ls.obj[0])}</p></div>
            <a class="btn" href="#${nx.key}">Start lesson →</a>`
            : `<div><div class="eyebrow">All lessons complete</div><h2>You’ve finished every lesson.</h2></div><a class="btn" href="#certs">View certificates →</a>`}
        </div>
        <div class="kpis">
          <div class="kpi"><b>${doneCount}<span class="muted" style="font-size:14px"> / ${lessons.length}</span></b><span>Lessons done</span></div>
          <div class="kpi"><b>${hrs}h</b><span>Study time</span></div>
          <div class="kpi"><b>${todayCount}/${goal}</b><span>Today’s goal</span></div>
          <div class="kpi"><b>${certCount}</b><span>Certificates</span></div>
        </div>
      </div>
      <section class="grid" style="gap:12px"><div class="row" style="justify-content:space-between"><h2 class="h2">Your career ladder</h2><a href="#paths" class="small">All paths</a></div>
        ${ladder(rec)}</section>
      <div class="grid g2">
        <div class="panel"><h3>Recently completed</h3>${recent.length ? '<ul class="small" style="padding-left:18px;margin:8px 0 0">' + recent.map((x) => `<li><a href="#${x.key}">${esc(x.ls.t)}</a> <span class="muted">· ${x.lv.code}</span></li>`).join('') + '</ul>' : '<p class="muted small">Lessons you complete will appear here.</p>'}</div>
        <div class="panel"><h3>Bookmarks</h3>${bms.length ? '<ul class="small" style="padding-left:18px;margin:8px 0 0">' + bms.map((x) => `<li><a href="#${x.key}">${esc(x.ls.t)}</a> <span class="muted">· ${x.lv.code}</span></li>`).join('') + '</ul>' : '<p class="muted small">Bookmark lessons to revisit them quickly.</p>'}</div>
      </div>`;
  };

  function ladder(rec) {
    return '<div class="ladder">' + L.levels.slice().reverse().map((lv) => {
      const st = levelStats(lv);
      return `<a class="rung${rec === lv ? ' rec' : ''}" href="#level-${lv.id}" style="--c:${LEVEL_COLORS[lv.id]}">
        <div class="code">${lv.code}</div>
        <div><h3>${esc(lv.name)} ${rec === lv ? '<span class="pill lvl" style="--c:' + LEVEL_COLORS[lv.id] + '">Recommended</span>' : ''} ${st.complete ? '<span class="pill good">Certified</span>' : ''}</h3><p>${esc(lv.audience)}</p></div>
        <div class="prog"><span class="num">${st.pct}% · ${st.done}/${st.total} lessons</span>${bar(st.pct, LEVEL_COLORS[lv.id])}</div></a>`;
    }).join('') + '</div>';
  }

  V.paths = () => `
    <div><div class="eyebrow">Learning paths</div><h1 class="h1">From first HR job to the boardroom</h1>
    <p class="lede">Five levels, ${L.levels.reduce((a, l) => a + l.modules.length, 0)} modules and ${lessons.length} lessons. Each module ends with a quiz; pass every quiz and finish every lesson in a level to earn its certificate.</p></div>
    ${ladder(recommendedLevel())}
    <div class="grid g3">${L.levels.map((lv) => `<div class="panel" style="border-top:4px solid ${LEVEL_COLORS[lv.id]}"><div class="eyebrow">${lv.code}</div><h3>${esc(lv.name)}</h3><p class="small muted">${esc(lv.blurb)}</p><ul class="small" style="padding-left:18px">${lv.modules.map((m) => `<li>${esc(m.title)}</li>`).join('')}</ul></div>`).join('')}</div>`;

  V.level = (id) => {
    const lv = findLevel(id); if (!lv) return V.notfound();
    const st = levelStats(lv); const c = LEVEL_COLORS[lv.id];
    return `
      <div class="level-head" style="--c:${c}"><div class="eyebrow">${lv.code} · ${esc(lv.audience)}</div><h1 class="h1">${esc(lv.name)}</h1>
        <p class="lede">${esc(lv.blurb)}</p>
        <div class="row small muted"><span class="num">${st.done}/${st.total} lessons</span><span>·</span><span class="num">${st.passed}/${st.quizzes} quizzes passed</span><span>·</span><span class="num">${Math.round(st.mins / 6) / 10}h total</span>${st.complete ? `<a class="pill good" href="#cert-${lv.id}">Certificate earned →</a>` : ''}</div>
        <div style="max-width:420px">${bar(st.pct, c)}</div></div>
      ${lv.modules.map((m, mi) => {
        const qk = `${lv.id}-${m.id}`; const best = S.quiz[qk];
        const md = m.lessons.filter((ls) => S.done[`${qk}-${ls.id}`]).length;
        return `<section class="module"><div class="module-head"><div><div class="eyebrow">Module ${mi + 1}</div><h3>${esc(m.title)}</h3><p>${esc(m.summary)}</p></div><span class="pill num">${md}/${m.lessons.length}</span></div>
          ${m.lessons.map((ls) => { const k = `${qk}-${ls.id}`; return `<a class="lesson-row${S.done[k] ? ' done' : ''}" href="#${k}"><span class="tick">✓</span><span class="t">${esc(ls.t)}</span><span class="m">${ls.mins} min</span></a>`; }).join('')}
          <a class="lesson-row quiz${best >= PASS ? ' done' : ''}" href="#quiz-${qk}"><span class="tick">✓</span><span class="t"><strong>Module quiz</strong> · ${m.quiz.length} questions</span><span class="m num">${best != null ? 'Best ' + best + '%' : 'Pass ' + PASS + '%'}</span></a>
        </section>`;
      }).join('')}`;
  };

  V.lesson = (key) => {
    const x = byKey[key]; if (!x) return V.notfound();
    const i = lessons.indexOf(x); const prev = lessons[i - 1]; const next = lessons[i + 1];
    const done = !!S.done[key]; const c = LEVEL_COLORS[x.lv.id];
    const lastInModule = x.m.lessons[x.m.lessons.length - 1] === x.ls;
    return `
      <div class="crumbs"><a href="#level-${x.lv.id}">${x.lv.code} · ${esc(x.lv.name)}</a><span>/</span><span>${esc(x.m.title)}</span></div>
      <div style="border-left:5px solid ${c};padding-left:16px"><div class="eyebrow">Lesson ${x.ls.id} of ${x.m.lessons.length} · ${x.ls.mins} min read</div><h1 class="h1">${esc(x.ls.t)}</h1></div>
      <div class="reader">
        <article class="prose">${md(x.ls.body)}
          <div class="takeaways"><div class="eyebrow">Key takeaways</div><ul>${x.ls.take.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
          <div class="activity" style="margin-top:14px"><div class="eyebrow" style="color:var(--accent)">Apply it at work</div><p style="margin:6px 0 0">${esc(x.ls.act)}</p></div>
        </article>
        <aside class="side">
          <div class="panel"><div class="eyebrow">You will be able to</div><ul>${x.ls.obj.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
          <div class="panel"><label class="eyebrow" for="note">My notes</label><textarea id="note" placeholder="Notes save automatically on this device">${esc(S.notes[key] || '')}</textarea></div>
          <div class="row"><button class="btn ${done ? '' : 'primary'}" id="complete">${done ? '✓ Completed' : 'Mark complete +20 XP'}</button>
          <button class="btn ghost" id="bm">${S.bm[key] ? '★ Bookmarked' : '☆ Bookmark'}</button></div>
        </aside>
      </div>
      <div class="pager">${prev ? `<a class="btn" href="#${prev.key}">← ${esc(prev.ls.t)}</a>` : '<span></span>'}
        ${lastInModule ? `<a class="btn primary" href="#quiz-${x.lv.id}-${x.m.id}">Take module quiz →</a>` : next ? `<a class="btn" href="#${next.key}">${esc(next.ls.t)} →</a>` : ''}</div>`;
  };
  function bindLesson(key) {
    const note = $('#note'); let t;
    note.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { if (note.value.trim()) S.notes[key] = note.value; else delete S.notes[key]; save(); }, 400); });
    $('#complete').addEventListener('click', () => {
      if (S.done[key]) { delete S.done[key]; S.xp = Math.max(0, S.xp - 20); toast('Marked as not complete'); }
      else { S.done[key] = Date.now(); S.xp += 20; bumpDay(); toast('Lesson complete · +20 XP'); }
      save(); render();
    });
    $('#bm').addEventListener('click', () => { if (S.bm[key]) delete S.bm[key]; else S.bm[key] = 1; save(); render(); });
  }

  /* quiz */
  let QZ = null;
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  V.quiz = (qk) => {
    const [lid, mid] = qk.split('-'); const lv = findLevel(lid); const m = lv && lv.modules.find((x) => x.id === mid);
    if (!m) return V.notfound();
    if (!QZ || QZ.key !== qk) QZ = { key: qk, qs: shuffle(m.quiz), ans: {}, submitted: false };
    const best = S.quiz[qk];
    const correct = QZ.qs.filter((q, i) => QZ.ans[i] === q.a).length;
    const pct = Math.round((correct / QZ.qs.length) * 100);
    return `
      <div class="crumbs"><a href="#level-${lv.id}">${lv.code} · ${esc(lv.name)}</a><span>/</span><span>${esc(m.title)}</span></div>
      <div><div class="eyebrow">Module quiz · pass mark ${PASS}%${best != null ? ' · your best ' + best + '%' : ''}</div><h1 class="h1">${esc(m.title)}</h1></div>
      ${QZ.submitted ? `<div class="panel row" style="justify-content:space-between"><div><div class="score" style="color:${pct >= PASS ? 'var(--good)' : 'var(--bad)'}">${pct}%</div><div>${pct >= PASS ? 'Passed. Well done.' : 'Not passed yet. Review the explanations, then try again.'}</div></div>
        <div class="row"><button class="btn" id="retry">Retake quiz</button><a class="btn primary" href="#level-${lv.id}">Back to ${lv.code}</a></div></div>` : ''}
      ${QZ.qs.map((q, i) => `<div class="q"><div class="eyebrow">Question ${i + 1} of ${QZ.qs.length}</div><h3>${esc(q.q)}</h3>
        ${q.o.map((o, j) => {
          let cls = 'opt';
          if (QZ.submitted) { if (j === q.a) cls += ' right'; else if (QZ.ans[i] === j) cls += ' wrong'; }
          else if (QZ.ans[i] === j) cls += ' sel';
          return `<button class="${cls}" data-q="${i}" data-o="${j}" ${QZ.submitted ? 'disabled' : ''}><span class="k">${'ABCD'[j]}</span><span>${esc(o)}</span></button>`;
        }).join('')}
        ${QZ.submitted ? `<div class="explain">${esc(q.e)}</div>` : ''}</div>`).join('')}
      ${QZ.submitted ? '' : `<div class="row"><button class="btn primary" id="submit" ${Object.keys(QZ.ans).length < QZ.qs.length ? 'disabled' : ''}>Submit answers</button><span class="small muted">${Object.keys(QZ.ans).length}/${QZ.qs.length} answered</span></div>`}`;
  };
  function bindQuiz(qk) {
    document.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => { QZ.ans[b.dataset.q] = +b.dataset.o; render(true); }));
    const sub = $('#submit');
    if (sub) sub.addEventListener('click', () => {
      QZ.submitted = true;
      const pct = Math.round((QZ.qs.filter((q, i) => QZ.ans[i] === q.a).length / QZ.qs.length) * 100);
      const prev = S.quiz[qk] || 0;
      if (pct >= PASS && prev < PASS) { S.xp += 50; bumpDay(); toast('Quiz passed · +50 XP'); }
      S.quiz[qk] = Math.max(prev, pct); save();
      const lv = findLevel(qk.split('-')[0]);
      if (levelStats(lv).complete && !S.certs[lv.id]) { S.certs[lv.id] = { date: today(), id: lv.code + '-' + Date.now().toString(36).toUpperCase() }; S.xp += 200; save(); toast('Level complete! Certificate unlocked'); }
      render(); window.scrollTo(0, 0);
    });
    const rt = $('#retry'); if (rt) rt.addEventListener('click', () => { QZ = null; render(); window.scrollTo(0, 0); });
  }

  /* placement */
  let PL = null;
  V.assess = () => {
    if (!PL) PL = { i: 0, ans: [] };
    if (PL.i >= L.placement.length) {
      const r = scorePlacement(); const lv = findLevel('l' + r.lvl);
      return `<div><div class="eyebrow">Skill assessment · result</div><h1 class="h1">Start at ${lv.code}: ${esc(lv.name)}</h1>
        <p class="lede">You answered <strong class="num">${r.correct}/${L.placement.length}</strong> correctly. ${r.lvl > 1 ? 'Earlier levels remain open for revision.' : 'This level builds the foundation for everything that follows.'}</p></div>
        <div class="grid g3">${L.levels.map((l, i) => `<div class="panel"><div class="eyebrow">${l.code}</div><b class="num" style="font-size:22px">${r.by[i + 1]}/3</b><div class="small muted">${esc(l.name)}</div></div>`).join('')}</div>
        <div class="row"><a class="btn primary" href="#level-${lv.id}">Go to ${lv.code}</a><button class="btn" id="redo">Retake assessment</button></div>`;
    }
    const q = L.placement[PL.i];
    return `<div><div class="eyebrow">Skill assessment · question ${PL.i + 1} of ${L.placement.length}</div><h1 class="h1">Find your starting level</h1>
      <p class="lede">15 questions spanning all five levels. Answer honestly; skip guessing with “Not sure”.</p></div>
      <div style="max-width:520px">${bar(Math.round((PL.i / L.placement.length) * 100))}</div>
      <div class="q"><h3>${esc(q.q)}</h3>${q.o.map((o, j) => `<button class="opt" data-o="${j}"><span class="k">${'ABCD'[j]}</span><span>${esc(o)}</span></button>`).join('')}
      <button class="opt" data-o="-1"><span class="k">?</span><span>Not sure</span></button></div>`;
  };
  function scorePlacement() {
    const by = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; let correct = 0;
    L.placement.forEach((q, i) => { if (PL.ans[i] === q.a) { by[q.lvl]++; correct++; } });
    let lvl = 1; for (let k = 1; k <= 4; k++) { if (by[k] >= 2) lvl = k + 1; else break; }
    return { by, correct, lvl };
  }
  function bindAssess() {
    document.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      PL.ans[PL.i] = +b.dataset.o; PL.i++;
      if (PL.i >= L.placement.length) { const r = scorePlacement(); S.placement = { lvl: r.lvl, score: r.correct, date: today() }; save(); }
      render(); window.scrollTo(0, 0);
    }));
    const r = $('#redo'); if (r) r.addEventListener('click', () => { PL = null; render(); });
  }

  /* toolkit */
  const CALCS = [
    { id: 'attr', name: 'Attrition rate', lvl: 'L1', f: [['Leavers in period', 75], ['Headcount at start', 480], ['Headcount at end', 520]],
      run: ([l, s, e]) => { const avg = (s + e) / 2; return [(l / avg * 100).toFixed(1) + '%', `Average headcount ${avg.toFixed(0)}`]; } },
    { id: 'cph', name: 'Cost per hire', lvl: 'L2', f: [['Internal costs', 60000], ['External costs', 90000], ['Number of hires', 50]],
      run: ([a, b, n]) => [((a + b) / n).toLocaleString(undefined, { maximumFractionDigits: 0 }), 'per hire, in your currency'] },
    { id: 'cr', name: 'Compa-ratio & range penetration', lvl: 'L2', f: [['Salary', 92000], ['Range minimum', 80000], ['Range midpoint', 100000], ['Range maximum', 120000]],
      run: ([s, mn, mid, mx]) => { const cr = s / mid; const rp = (s - mn) / (mx - mn) * 100; return [cr.toFixed(2), `Range penetration ${rp.toFixed(0)}% · ${cr < .9 ? 'below market: review' : cr <= 1.05 ? 'at market' : cr <= 1.1 ? 'above midpoint' : 'high in range: check'}`]; } },
    { id: 'enps', name: 'eNPS', lvl: 'L3', f: [['Promoters (9–10)', 90], ['Passives (7–8)', 70], ['Detractors (0–6)', 40]],
      run: ([p, pa, d]) => { const t = p + pa + d; return [(t ? Math.round((p - d) / t * 100) : 0).toString(), `${t} responses`]; } },
    { id: 'ff', name: 'Four-fifths rule (adverse impact)', lvl: 'L2', f: [['Group A applicants', 100], ['Group A selected', 50], ['Group B applicants', 100], ['Group B selected', 30]],
      run: ([aa, as, ba, bs]) => { const ra = as / aa, rb = bs / ba; const ratio = Math.min(ra, rb) / Math.max(ra, rb); return [(ratio * 100).toFixed(0) + '%', ratio < .8 ? 'Below 80%: investigate for adverse impact' : 'At or above 80%: no four-fifths flag']; } },
    { id: 'roi', name: 'HR programme ROI', lvl: 'L4', f: [['Programme cost', 200000], ['Measured benefit', 640000]],
      run: ([c, b]) => [((b - c) / c * 100).toFixed(0) + '%', `Net benefit ${(b - c).toLocaleString()}`] },
    { id: 'rpe', name: 'Revenue per employee', lvl: 'L3', f: [['Annual revenue', 50000000], ['FTE', 250]],
      run: ([r, f]) => [(r / f).toLocaleString(undefined, { maximumFractionDigits: 0 }), 'revenue per FTE'] },
    { id: 'abs', name: 'Absence rate', lvl: 'L1', f: [['Days absent', 340], ['Employees', 120], ['Working days in period', 230]],
      run: ([d, e, w]) => [(d / (e * w) * 100).toFixed(2) + '%', `${(d / e).toFixed(1)} days lost per employee`] }
  ];
  V.toolkit = () => `
    <div><div class="eyebrow">HR toolkit</div><h1 class="h1">Calculators & templates</h1><p class="lede">Worked formulas from the lessons, ready for real numbers, plus templates you can copy into your own documents.</p></div>
    <h2 class="h2">Calculators</h2>
    <div class="grid g2">${CALCS.map((c) => `<div class="panel calc" data-calc="${c.id}"><div class="row" style="justify-content:space-between"><h3>${esc(c.name)}</h3><span class="pill">${c.lvl}</span></div>
      <div class="fields">${c.f.map((f, i) => `<label for="${c.id}-${i}">${esc(f[0])}<input id="${c.id}-${i}" type="number" inputmode="decimal" value="${f[1]}"></label>`).join('')}</div>
      <div class="out" id="${c.id}-out"></div></div>`).join('')}</div>
    <h2 class="h2">Templates</h2>
    <div class="grid g2">${L.templates.map((t) => `<div class="panel"><div class="row" style="justify-content:space-between"><h3>${esc(t.name)}</h3><div class="row"><span class="pill">${t.lvl}</span><button class="btn" data-copy="${t.id}">Copy</button></div></div><pre class="tpl">${esc(t.text)}</pre></div>`).join('')}</div>`;
  function bindToolkit() {
    CALCS.forEach((c) => {
      const el = document.querySelector(`[data-calc="${c.id}"]`);
      const run = () => {
        const v = c.f.map((_, i) => parseFloat($(`#${c.id}-${i}`).value) || 0);
        let r; try { r = c.run(v); } catch (e) { r = ['–', '']; }
        if (r[0].includes('NaN') || r[0].includes('Infinity')) r = ['–', 'Check the inputs'];
        $(`#${c.id}-out`).innerHTML = `${esc(r[0])}<small>${esc(r[1])}</small>`;
      };
      el.addEventListener('input', run); run();
    });
    document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copyText(L.templates.find((t) => t.id === b.dataset.copy).text, b)));
  }

  /* flashcards: simple Leitner boxes over the glossary */
  let FC = { flipped: false };
  function dueCards() {
    const now = Date.now();
    return L.glossary.filter(([t]) => { const c = S.cards[t]; return !c || c.due <= now; });
  }
  V.cards = () => {
    const due = dueCards(); const card = due[0];
    const boxes = [0, 1, 2, 3, 4].map((b) => L.glossary.filter(([t]) => ((S.cards[t] && S.cards[t].box) || 0) === b).length);
    return `<div><div class="eyebrow">Flashcards · spaced repetition</div><h1 class="h1">Key HR terms</h1>
      <p class="lede">Tap the card to reveal the definition. Cards you know come back less often; cards you miss come back tomorrow.</p></div>
      <div class="card-stage">
        ${card ? `<div class="flash" id="flash" role="button" tabindex="0" aria-label="Flip card">${FC.flipped ? `<div><div class="eyebrow">${esc(card[0])}</div><p class="def">${esc(card[1])}</p></div>` : `<div class="term">${esc(card[0])}</div>`}</div>
          <div class="row">${FC.flipped ? '<button class="btn" id="again">Again</button><button class="btn primary" id="know">I knew it</button>' : '<button class="btn primary" id="flip">Show answer</button>'}</div>
          <div class="small muted num">${due.length} card${due.length === 1 ? '' : 's'} due</div>`
        : '<div class="panel empty">All caught up. Come back tomorrow for your next review.</div>'}
        <div class="boxes">${boxes.map((n, i) => `<span class="pill num">Box ${i + 1}: ${n}</span>`).join('')}</div>
      </div>`;
  };
  function bindCards() {
    const due = dueCards(); const card = due[0]; if (!card) return;
    const flip = () => { FC.flipped = true; render(true); };
    const f = $('#flash'); f.addEventListener('click', flip); f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    const fb = $('#flip'); if (fb) fb.addEventListener('click', flip);
    const grade = (ok) => {
      const c = S.cards[card[0]] || { box: 0 };
      c.box = ok ? Math.min(4, c.box + 1) : 0;
      c.due = Date.now() + (ok ? [1, 2, 4, 8, 16][c.box] : 1) * 864e5;
      S.cards[card[0]] = c; if (ok) S.xp += 2; save(); FC.flipped = false; render(true);
    };
    const a = $('#again'); if (a) a.addEventListener('click', () => grade(false));
    const k = $('#know'); if (k) k.addEventListener('click', () => grade(true));
  }

  V.glossary = () => `<div><div class="eyebrow">Glossary</div><h1 class="h1">HR terms A–Z</h1><p class="lede">${L.glossary.length} terms used across the curriculum.</p></div>
    <input class="field" id="gq" placeholder="Filter terms" style="max-width:360px">
    <dl class="gloss" id="gl">${L.glossary.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('')}</dl>`;
  function bindGlossary() {
    $('#gq').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      $('#gl').innerHTML = L.glossary.filter(([t, d]) => (t + d).toLowerCase().includes(q)).map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('') || '<p class="muted">No matching terms.</p>';
    });
  }

  V.notes = () => {
    const items = Object.entries(S.notes).map(([k, v]) => [byKey[k], v]).filter(([x]) => x);
    return `<div><div class="eyebrow">My notes</div><h1 class="h1">Notes from your lessons</h1><p class="lede">Notes are saved in this browser. Use Settings to back them up with your progress.</p></div>
      ${items.length ? `<div class="row"><button class="btn" id="copynotes">Copy all notes</button></div><div class="grid g2">` + items.map(([x, v]) => `<div class="panel"><div class="eyebrow">${x.lv.code} · ${esc(x.m.title)}</div><h3><a href="#${x.key}">${esc(x.ls.t)}</a></h3><p class="small" style="white-space:pre-wrap">${esc(v)}</p></div>`).join('') + '</div>'
        : '<div class="panel empty">No notes yet. Open any lesson and write in the notes panel.</div>'}`;
  };
  function bindNotes() {
    const b = $('#copynotes'); if (!b) return;
    b.addEventListener('click', () => copyText(Object.entries(S.notes).filter(([k]) => byKey[k]).map(([k, v]) => `## ${byKey[k].lv.code} · ${byKey[k].ls.t}\n${v}`).join('\n\n'), b));
  }

  V.certs = () => `<div><div class="eyebrow">Certificates</div><h1 class="h1">Your achievements</h1><p class="lede">Complete every lesson and pass every module quiz in a level to earn its certificate.</p></div>
    <div class="grid g3">${L.levels.map((lv) => { const st = levelStats(lv); return `<div class="panel" style="border-top:4px solid ${LEVEL_COLORS[lv.id]}"><div class="eyebrow">${lv.code}</div><h3>${esc(lv.name)}</h3>
      <div style="margin:10px 0">${bar(st.pct, LEVEL_COLORS[lv.id])}</div><div class="small muted num">${st.done}/${st.total} lessons · ${st.passed}/${st.quizzes} quizzes</div>
      <div style="margin-top:12px">${st.complete ? `<a class="btn primary" href="#cert-${lv.id}">View certificate</a>` : `<a class="btn" href="#level-${lv.id}">Continue ${lv.code}</a>`}</div></div>`; }).join('')}</div>`;

  V.cert = (id) => {
    const lv = findLevel(id); if (!lv) return V.notfound();
    if (!levelStats(lv).complete) return `<div class="panel empty">This certificate unlocks when every lesson and quiz in ${lv.code} is complete. <a href="#level-${lv.id}">Continue ${lv.code}</a></div>`;
    if (!S.certs[id]) { S.certs[id] = { date: today(), id: lv.code + '-' + Date.now().toString(36).toUpperCase() }; save(); }
    const c = S.certs[id]; const name = (S.profile && S.profile.name) || 'Learner';
    const scores = lv.modules.map((m) => S.quiz[`${lv.id}-${m.id}`] || 0); const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return `<div class="cert" style="--c:${LEVEL_COLORS[lv.id]}"><div class="eyebrow">HR Pathways Academy · Certificate of completion</div>
      <div class="muted">This certifies that</div><div class="who">${esc(name)}</div>
      <div class="muted">has completed all ${levelStats(lv).total} lessons and ${lv.modules.length} assessed modules of</div>
      <div class="lv">${lv.code} · ${esc(lv.name)}</div>
      <div class="small muted" style="max-width:52ch">${lv.modules.map((m) => esc(m.title)).join(' · ')}</div>
      <div class="meta"><span>Issued <b class="num">${c.date}</b></span><span>Average quiz score <b class="num">${avg}%</b></span><span>Credential ID <b class="num">${c.id}</b></span></div></div>
      <div class="row no-print">${standalone ? '<button class="btn primary" id="print">Print / save as PDF</button>' : ''}<a class="btn" href="#certs">All certificates</a></div>`;
  };
  function bindCert() { const p = $('#print'); if (p) p.addEventListener('click', () => window.print()); }

  V.prefs = () => `<div><div class="eyebrow">Settings</div><h1 class="h1">Profile & data</h1></div>
    <div class="grid g2">
      <div class="panel" style="display:flex;flex-direction:column;gap:12px"><h3>Profile</h3>
        <label class="small muted" for="p-name">Name on certificates<input class="field" id="p-name" value="${esc((S.profile && S.profile.name) || '')}"></label>
        <label class="small muted" for="p-role">Current role<input class="field" id="p-role" value="${esc((S.profile && S.profile.role) || '')}"></label>
        <label class="small muted" for="p-goal">Daily goal (lessons or quizzes)<select class="field" id="p-goal">${[1, 2, 3, 5].map((n) => `<option ${((S.profile && S.profile.goal) || 2) === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label class="small muted" for="p-theme">Theme<select class="field" id="p-theme"><option value="">Match system</option><option value="light" ${S.theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${S.theme === 'dark' ? 'selected' : ''}>Dark</option></select></label>
        <div><button class="btn primary" id="p-save">Save profile</button></div></div>
      <div class="panel" style="display:flex;flex-direction:column;gap:12px"><h3>Back up & move progress</h3>
        <p class="small muted" style="margin:0">Progress is stored in this browser only. Copy the backup code and paste it into the box on another browser or device to restore.</p>
        <div class="row"><button class="btn" id="exp">Copy backup code</button></div>
        <label class="small muted" for="imp-box">Restore from backup code<textarea class="field" id="imp-box" placeholder="Paste a backup code here"></textarea></label>
        <div class="row"><button class="btn" id="imp">Restore</button></div>
        <hr style="border:0;border-top:1px solid var(--line);width:100%">
        <div class="row" id="reset-row"><button class="btn danger" id="reset">Reset all progress</button></div></div>
    </div>`;
  function bindPrefs() {
    $('#p-save').addEventListener('click', () => {
      S.profile = { name: $('#p-name').value.trim() || 'Learner', role: $('#p-role').value.trim(), goal: +$('#p-goal').value };
      S.theme = $('#p-theme').value; applyTheme(); save(); toast('Profile saved'); render();
    });
    $('#exp').addEventListener('click', (e) => copyText(btoa(unescape(encodeURIComponent(JSON.stringify(S)))), e.target));
    $('#imp').addEventListener('click', () => {
      try { const d = JSON.parse(decodeURIComponent(escape(atob($('#imp-box').value.trim())))); S = Object.assign(fresh(), d); save(); applyTheme(); toast('Progress restored'); render(); }
      catch (e) { toast('That code could not be read. Copy the full code and try again.'); }
    });
    $('#reset').addEventListener('click', () => {
      $('#reset-row').innerHTML = '<span class="small">Delete all progress, notes and certificates?</span><button class="btn danger" id="reset-yes">Yes, reset</button><button class="btn" id="reset-no">Cancel</button>';
      $('#reset-yes').addEventListener('click', () => { const p = S.profile, t = S.theme; S = fresh(); S.profile = p; S.theme = t; save(); toast('Progress reset'); render(); });
      $('#reset-no').addEventListener('click', () => render());
    });
  }

  V.notfound = () => '<div class="panel empty">That page doesn’t exist. <a href="#home">Go to the dashboard</a></div>';

  /* ---------- search ---------- */
  const searchIndex = lessons.map((x) => ({ x, hay: (x.ls.t + ' ' + x.m.title + ' ' + x.ls.body + ' ' + x.ls.take.join(' ')).toLowerCase() }));
  function bindSearch() {
    const inp = $('#q'), box = $('#results'); let hi = -1;
    const close = () => { box.hidden = true; hi = -1; };
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase(); if (q.length < 2) return close();
      const words = q.split(/\s+/);
      const hits = searchIndex.map((s) => ({ s, score: words.reduce((a, w) => a + (s.hay.includes(w) ? 1 : 0) + (s.x.ls.t.toLowerCase().includes(w) ? 2 : 0), 0) }))
        .filter((h) => words.every((w) => h.s.hay.includes(w))).sort((a, b) => b.score - a.score).slice(0, 8);
      const g = L.glossary.filter(([t]) => t.toLowerCase().includes(q)).slice(0, 3);
      box.innerHTML = hits.map((h) => `<a href="#${h.s.x.key}">${esc(h.s.x.ls.t)}<small>${h.s.x.lv.code} · ${esc(h.s.x.m.title)}</small></a>`).join('') +
        g.map(([t, d]) => `<a href="#glossary">${esc(t)}<small>Glossary · ${esc(d)}</small></a>`).join('') || '<a href="#paths">No results<small>Try a different term, e.g. “attrition”, “succession”, “AI Act”</small></a>';
      box.hidden = false; hi = -1;
    });
    inp.addEventListener('keydown', (e) => {
      const links = [...box.querySelectorAll('a')]; if (box.hidden || !links.length) return;
      if (e.key === 'ArrowDown') { hi = Math.min(links.length - 1, hi + 1); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { hi = Math.max(0, hi - 1); e.preventDefault(); }
      else if (e.key === 'Enter') { (links[hi] || links[0]).click(); inp.value = ''; close(); inp.blur(); return; }
      else if (e.key === 'Escape') { close(); return; }
      links.forEach((l, i) => l.classList.toggle('hi', i === hi));
    });
    box.addEventListener('click', () => { inp.value = ''; close(); });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); inp.focus(); } });
  }

  /* ---------- onboarding ---------- */
  function onboarding() {
    const el = document.createElement('div'); el.className = 'scrim';
    el.innerHTML = `<form class="modal" id="ob"><div class="eyebrow">Welcome to HR Pathways Academy</div><h2 class="h2">Set up your learning profile</h2>
      <p class="small muted" style="margin:0">Everything stays in this browser. No account, no sign-in.</p>
      <label for="ob-name">Your name (used on certificates)<input id="ob-name" required placeholder="e.g. Priya Sharma"></label>
      <label for="ob-role">Where are you in your HR career?<select id="ob-role">
        <option value="1">Student or fresh graduate</option><option value="1">HR assistant / coordinator (0–2 yrs)</option>
        <option value="2">HR generalist / executive (2–5 yrs)</option><option value="3">HRBP / HR manager (5–10 yrs)</option>
        <option value="4">Head of HR / HR director (10–15 yrs)</option><option value="5">CHRO / CPO (15+ yrs)</option></select></label>
      <label for="ob-goal">Daily goal<select id="ob-goal"><option value="1">1 lesson a day · light</option><option value="2" selected>2 a day · steady</option><option value="3">3 a day · focused</option></select></label>
      <div class="row"><button class="btn primary" type="submit">Start learning</button><span class="small muted">You can take the skill assessment any time.</span></div></form>`;
    document.body.appendChild(el);
    $('#ob-name').focus();
    $('#ob').addEventListener('submit', (e) => {
      e.preventDefault();
      const sel = $('#ob-role');
      S.profile = { name: $('#ob-name').value.trim() || 'Learner', role: sel.options[sel.selectedIndex].text, goal: +$('#ob-goal').value };
      if (!S.placement) S.placement = { lvl: +sel.value, score: null, date: today(), self: true };
      save(); el.remove(); render();
    });
  }

  /* ---------- router ---------- */
  function applyTheme() { if (S.theme) document.documentElement.setAttribute('data-theme', S.theme); else document.documentElement.removeAttribute('data-theme'); }
  function route() { return (location.hash || '#home').slice(1) || 'home'; }
  function render(keepScroll) {
    const r = route(); const view = $('#view'); let html, bind;
    if (r === 'home') html = V.home();
    else if (r === 'paths') html = V.paths();
    else if (r.startsWith('level-')) html = V.level(r.slice(6));
    else if (/^l\d-m\d-\d+$/.test(r)) { html = V.lesson(r); if (byKey[r]) bind = () => bindLesson(r); }
    else if (r.startsWith('quiz-')) { html = V.quiz(r.slice(5)); bind = () => bindQuiz(r.slice(5)); }
    else if (r === 'assess') { html = V.assess(); bind = bindAssess; }
    else if (r === 'toolkit') { html = V.toolkit(); bind = bindToolkit; }
    else if (r === 'cards') { html = V.cards(); bind = bindCards; }
    else if (r === 'glossary') { html = V.glossary(); bind = bindGlossary; }
    else if (r === 'notes') { html = V.notes(); bind = bindNotes; }
    else if (r === 'certs') html = V.certs();
    else if (r.startsWith('cert-')) { html = V.cert(r.slice(5)); bind = bindCert; }
    else if (r === 'prefs') { html = V.prefs(); bind = bindPrefs; }
    else html = V.notfound();
    const y = window.scrollY;
    view.innerHTML = html; if (bind && view.querySelector('*')) try { bind(); } catch (e) { console.error(e); }
    renderRail(r);
    window.scrollTo(0, keepScroll ? y : 0);
  }
  let lastRoute = null;
  window.addEventListener('hashchange', () => {
    $('#app').classList.remove('open');
    const r = route(); if (r !== lastRoute && !r.startsWith('quiz-')) QZ = null; lastRoute = r;
    render();
  });

  function boot() {
    applyTheme();
    $('#menu').addEventListener('click', () => $('#app').classList.toggle('open'));
    $('#app').addEventListener('click', (e) => { if (e.target === $('#app') && $('#app').classList.contains('open')) $('#app').classList.remove('open'); });
    $('#theme').addEventListener('click', () => {
      const dark = S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      S.theme = dark ? 'light' : 'dark'; applyTheme(); save();
    });
    document.querySelector('.search svg').outerHTML = svg('search');
    $('#menu').innerHTML = svg('menu'); $('#theme').innerHTML = svg('moon');
    bindSearch();
    lastRoute = route();
    render();
    if (!S.profile) onboarding();
  }
  boot();
})();
