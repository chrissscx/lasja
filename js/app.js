(function () {
  'use strict';

  const STORE_KEY = 'fkt-progress-v1';
  const FILTER_KEY = 'fkt-filters-v1';
  const $ = s => document.querySelector(s);

  /* ---------- Salvestus ---------- */
  function load(key, def) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* privaatne aken vms */ }
  }

  let progress = load(STORE_KEY, {});
  // progress[id] = {done, steps: {i: {first: bool, tries: n, revealed: bool, done: bool}}, sol: bool, mistakes: n}
  function pr(id) {
    if (!progress[id]) progress[id] = { done: false, steps: {}, sol: false, mistakes: 0 };
    return progress[id];
  }
  function persist() { save(STORE_KEY, progress); renderStats(); renderList(); }

  const filters = Object.assign({ blocks: [1, 2, 3, 4, 5, 6, 7], kinds: ['T', 'K', 'S'], status: 'all', random: true }, load(FILTER_KEY, {}));

  /* ---------- Andmed ---------- */
  const ALL = window.PROBLEMS;
  const byId = {};
  ALL.forEach(p => { byId[p.id] = p; });

  function numKey(p) { const m = /^(\d+)(?:\((\d)\))?/.exec(p.id); return m ? (+m[1]) * 10 + (+(m[2] || 0)) : 0; }

  function filtered() {
    return ALL.filter(p => {
      if (!filters.blocks.includes(p.b)) return false;
      if (!filters.kinds.includes(p.k)) return false;
      const s = progress[p.id];
      if (filters.status === 'todo' && s && s.done) return false;
      if (filters.status === 'wrong' && !(s && s.mistakes > 0)) return false;
      return true;
    }).sort((a, b) => numKey(a) - numKey(b));
  }

  let queue = [];
  let currentId = null;

  function rebuildQueue() {
    const f = filtered().map(p => p.id);
    queue = filters.random ? shuffle(f) : f;
  }

  function nextId() {
    if (!queue.length) rebuildQueue();
    if (!queue.length) return null;
    const i = queue.indexOf(currentId);
    // eelista lahendamata ülesandeid
    for (let k = 1; k <= queue.length; k++) {
      const id = queue[(i + k) % queue.length];
      if (id !== currentId && !(progress[id] && progress[id].done)) return id;
    }
    const id = queue[(i + 1) % queue.length];
    if (id === currentId && filters.random) { rebuildQueue(); return queue[0]; }
    return id;
  }

  /* ---------- Statistika ---------- */
  function computeStats(list) {
    let done = 0, first = 0, att = 0;
    list.forEach(p => {
      const s = progress[p.id];
      if (!s) return;
      if (s.done) done++;
      Object.values(s.steps).forEach(st => { if (st.tries > 0 || st.revealed) { att++; if (st.first) first++; } });
    });
    return { done, total: list.length, first, att, pct: att ? Math.round(100 * first / att) : null };
  }

  function renderStats() {
    const s = computeStats(ALL);
    $('#stats').innerHTML =
      `<span class="stat"><b>${s.done}</b>/${s.total} lahendatud</span>` +
      `<span class="stat">${s.pct === null ? '–' : s.pct + '%'} samme esimesel katsel õigesti</span>`;
  }

  /* ---------- Külgriba ---------- */
  function chip(label, active, onClick, title) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (active ? ' on' : '');
    b.textContent = label;
    if (title) b.title = title;
    b.addEventListener('click', onClick);
    return b;
  }

  function renderFilters() {
    const fb = $('#fBlocks'); fb.innerHTML = '';
    Object.keys(BLOCKS).forEach(k => {
      const n = +k;
      fb.appendChild(chip(n + '. ' + BLOCKS[k], filters.blocks.includes(n), () => {
        toggle(filters.blocks, n); onFilter();
      }));
    });
    const fk = $('#fKinds'); fk.innerHTML = '';
    Object.keys(KINDS).forEach(k => {
      fk.appendChild(chip(KINDS[k], filters.kinds.includes(k), () => { toggle(filters.kinds, k); onFilter(); },
        k === 'S' ? 'Kogust leitud sarnased ülesanded (lisaharjutus)' : ''));
    });
    const fs = $('#fStatus'); fs.innerHTML = '';
    [['all', 'Kõik'], ['todo', 'Lahendamata'], ['wrong', 'Kus eksisin']].forEach(([k, l]) => {
      fs.appendChild(chip(l, filters.status === k, () => { filters.status = k; onFilter(); }));
    });
    $('#fRandom').checked = filters.random;
  }
  function toggle(arr, v) {
    const i = arr.indexOf(v);
    if (i >= 0) { if (arr.length > 1) arr.splice(i, 1); } else arr.push(v);
  }
  function onFilter() {
    save(FILTER_KEY, filters);
    renderFilters(); rebuildQueue(); renderList();
  }

  function renderList() {
    const ol = $('#plist'); ol.innerHTML = '';
    const list = filtered();
    $('#listLabel').textContent = `Ülesanded (${list.length})`;
    let lastB = null;
    list.forEach(p => {
      if (p.b !== lastB) {
        lastB = p.b;
        const h = document.createElement('li');
        h.className = 'plist-head';
        h.textContent = p.b + '. ' + BLOCKS[p.b];
        ol.appendChild(h);
      }
      const li = document.createElement('li');
      const s = progress[p.id];
      const st = s && s.done ? (s.mistakes ? 'part' : 'ok') : (s && Object.keys(s.steps).length ? 'started' : '');
      li.innerHTML = `<button type="button" class="pitem ${p.id === currentId ? 'cur' : ''}">
        <span class="dot ${st}"></span><span class="pnr">${p.id}</span>
        <span class="pk k${p.k}">${KINDS[p.k]}</span></button>`;
      li.firstChild.addEventListener('click', () => { openProblem(p.id); closeSidebar(); });
      ol.appendChild(li);
    });
  }

  /* ---------- Avaleht ---------- */
  function renderHome() {
    currentId = null;
    const main = $('#main');
    const rows = Object.keys(BLOCKS).map(k => {
      const list = ALL.filter(p => p.b === +k);
      const s = computeStats(list);
      const pct = Math.round(100 * s.done / list.length);
      return `<div class="trow"><span>${k}. ${BLOCKS[k]}</span>
        <span class="bar"><span style="width:${pct}%"></span></span><span class="small muted">${s.done}/${list.length}</span></div>`;
    }).join('');
    main.innerHTML = `<section class="card home">
      <h1>Kontrolltöö kordamine</h1>
      <p>Siin on kõik tunnis ja kodus lahendatud ülesanded kogust „Füüs. ül. kogu I“ ning lisaks samast kogust leitud sarnased ülesanded.
      Iga ülesanne on jaotatud sammudeks: vali valem, avalda suurus, arvuta vahetulemus, joonesta jõud. Vihje saad igal sammul, terve lahendus avaneb alles siis, kui ise küsid.</p>
      <ul class="howto">
        <li>Arvu võid kirjutada komaga või punktiga, astmega kujul <code>4,2e5</code> või <code>4,2*10^5</code>. Võid ka arvutuse sisse kirjutada, nt <code>2*9,8*3</code>.</li>
        <li>Vastust aktsepteeritakse umbes 3% täpsusega, seega ümardamine ja g = 9,8 või 9,81 ei lähe arvesse.</li>
        <li>Tulemused jäävad selle brauseri mällu.</li>
      </ul>
      <div class="topics">${rows}</div>
      <div class="actions"><button class="btn primary" id="btnStart">Alusta (${filtered().length} ülesannet)</button></div>
    </section>`;
    $('#btnStart').addEventListener('click', () => { rebuildQueue(); const id = nextId() || queue[0]; if (id) openProblem(id); });
    renderList();
  }

  /* ---------- Ülesanne ---------- */
  let view = null; // {p, stepIdx, solTry}

  function openProblem(id) {
    const p = byId[id];
    if (!p) return;
    currentId = id;
    if (!queue.includes(id)) rebuildQueue();
    view = { p, stepIdx: 0, solArmed: false, anyTry: false };
    const main = $('#main');
    const s = progress[id];
    const doneBadge = s && s.done ? `<span class="badge ok">lahendatud${s.mistakes ? '' : ' vigadeta'}</span>` : '';
    main.innerHTML = `<article class="card pcard">
      <div class="phead">
        <span class="pnum">Ülesanne ${p.id}</span>
        <span class="pk k${p.k}">${KINDS[p.k]}</span>
        <span class="tag">${BLOCKS[p.b]}</span>
        ${doneBadge}
      </div>
      <div class="ptext">${md(p.text)}</div>
      ${p.fig ? `<div class="pfig">${p.fig}</div>` : ''}
      ${p.note ? `<div class="note">${md(p.note)}</div>` : ''}
      ${p.given ? `<details class="given"><summary>Andmed ja mida leida</summary><div>${md(p.given)}</div></details>` : ''}
      <div class="steps" id="steps"></div>
      <div class="pactions">
        <button class="btn ghost" id="btnSol">Näita täielikku lahendust</button>
        <button class="btn ghost" id="btnRetry">Proovi uuesti</button>
        <button class="btn primary" id="btnNext">Järgmine ülesanne →</button>
      </div>
      <div class="solution" id="solution" hidden></div>
    </article>`;
    $('#btnNext').addEventListener('click', () => { const n = nextId(); if (n) openProblem(n); });
    $('#btnRetry').addEventListener('click', () => openProblem(id));
    $('#btnSol').addEventListener('click', onSolution);
    renderStep(0);
    renderList();
    window.scrollTo({ top: 0 });
    main.focus && main.focus();
  }

  function onSolution() {
    const btn = $('#btnSol');
    if (!view.anyTry && !view.solArmed) {
      view.solArmed = true;
      btn.textContent = 'Sa pole veel proovinud. Vajuta uuesti, kui tahad ikka näha.';
      btn.classList.add('warn');
      return;
    }
    const sol = $('#solution');
    sol.hidden = false;
    sol.innerHTML = `<h3>Lahenduskäik</h3>${md(view.p.sol)}${view.p.ans ? `<div class="answer"><b>Vastus.</b> ${md(view.p.ans)}</div>` : ''}${view.p.after ? `<div class="note">${md(view.p.after)}</div>` : ''}`;
    btn.hidden = true;
    const s = pr(view.p.id); s.sol = true; persist();
    sol.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const TYPE_LABEL = { mc: 'Vali', num: 'Arvuta', order: 'Järjesta', match: 'Sobita', forces: 'Joonis' };

  function renderStep(i) {
    const p = view.p;
    const steps = p.steps;
    const box = $('#steps');
    if (i >= steps.length) { finish(); return; }
    const st = steps[i];
    const card = document.createElement('section');
    card.className = 'step';
    card.innerHTML = `<div class="shead"><span class="snum">Samm ${i + 1}/${steps.length}</span><span class="stype">${TYPE_LABEL[st.type] || ''}</span></div>
      <div class="sq">${md(st.q)}</div>
      <div class="sbody"></div>
      <div class="sbtns">
        <button class="btn primary sm" data-a="check">Kontrolli</button>
        ${st.hint ? '<button class="btn ghost sm" data-a="hint">Vihje</button>' : ''}
        <button class="btn ghost sm" data-a="reveal">Näita vastust</button>
      </div>
      <div class="shint" hidden></div>
      <div class="sfb" aria-live="polite"></div>`;
    box.appendChild(card);
    const body = card.querySelector('.sbody');
    const fb = card.querySelector('.sfb');
    const ctl = STEP[st.type].render(body, st);
    const rec = pr(p.id).steps[i] || { first: false, tries: 0, revealed: false, done: false };
    const local = { tries: 0, done: false };

    function complete(okFirst, revealed) {
      local.done = true;
      const s = pr(p.id);
      const r = s.steps[i] = s.steps[i] || {};
      r.tries = local.tries;
      r.first = okFirst;
      r.revealed = revealed;
      r.done = true;
      if (!okFirst) s.mistakes = (s.mistakes || 0) + 1;
      persist();
      card.classList.add('done');
      card.querySelectorAll('.sbtns button').forEach(b => b.disabled = true);
      const rbtn = card.querySelector('[data-a="reveal"]');
      rbtn.textContent = 'Näita vastust'; rbtn.classList.remove('warn');
      const nb = document.createElement('button');
      nb.className = 'btn primary sm nextstep';
      nb.textContent = i + 1 < steps.length ? 'Edasi →' : 'Lõpeta ülesanne';
      nb.addEventListener('click', () => { nb.remove(); renderStep(i + 1); });
      card.appendChild(nb);
      nb.focus({ preventScroll: true });
    }

    card.querySelector('[data-a="check"]').addEventListener('click', () => {
      if (local.done) return;
      const res = ctl.check();
      if (res.empty) { fb.className = 'sfb info'; fb.innerHTML = res.msg; return; }
      local.tries++;
      view.anyTry = true;
      if (res.ok) {
        fb.className = 'sfb good';
        fb.innerHTML = `<b>${res.msg || 'Õige!'}</b>${st.ex ? '<div class="ex">' + md(st.ex) + '</div>' : ''}`;
        ctl.lock && ctl.lock();
        complete(local.tries === 1, false);
      } else {
        fb.className = 'sfb bad';
        fb.innerHTML = `<b>Pole veel õige.</b> ${res.msg || ''}<div class="small muted">Proovi uuesti${st.hint ? ', vaata vihjet' : ''} või ava vastus.</div>`;
        const s = pr(p.id);
        s.steps[i] = Object.assign(s.steps[i] || {}, { tries: local.tries, first: false });
        persist();
      }
    });
    const hb = card.querySelector('[data-a="hint"]');
    if (hb) hb.addEventListener('click', () => {
      const h = card.querySelector('.shint');
      h.hidden = false; h.innerHTML = '💡 ' + md(st.hint);
      hb.disabled = true;
    });
    card.querySelector('[data-a="reveal"]').addEventListener('click', e => {
      if (local.done) return;
      const rb = e.currentTarget;
      if (local.tries === 0 && !rb.dataset.armed) {
        rb.dataset.armed = '1';
        rb.textContent = 'Proovi enne ise! Vajuta uuesti, kui tahad vastust näha.';
        rb.classList.add('warn');
        return;
      }
      view.anyTry = true;
      ctl.reveal();
      fb.className = 'sfb info';
      fb.innerHTML = `<b>Õige vastus:</b> ${ctl.answerText ? md(ctl.answerText()) : ''}${st.ex ? '<div class="ex">' + md(st.ex) + '</div>' : ''}`;
      complete(false, true);
    });
    if (i > 0) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function finish() {
    const p = view.p;
    const s = pr(p.id);
    s.done = true;
    s.when = Date.now();
    persist();
    const steps = p.steps.length;
    const first = Object.values(s.steps).filter(x => x.first).length;
    const box = $('#steps');
    const d = document.createElement('div');
    d.className = 'finish';
    d.innerHTML = `<b>Ülesanne tehtud.</b> Esimesel katsel õigesti ${first}/${steps} sammu.
      ${p.ans ? `<div class="answer">${md(p.ans)}</div>` : ''}${p.after ? `<div class="note">${md(p.after)}</div>` : ''}`;
    box.appendChild(d);
    d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    $('#btnNext').focus({ preventScroll: true });
  }

  /* ---------- Sammu tüübid ---------- */
  const STEP = {};

  STEP.mc = {
    render(body, st) {
      const multi = st.options.filter(o => o.correct).length > 1 || st.multi;
      const order = st.keep ? st.options.map((o, i) => i) : shuffle(st.options.map((o, i) => i));
      const wrap = document.createElement('div');
      wrap.className = 'opts' + (st.wide ? ' wide' : '');
      const chosen = new Set();
      const btns = [];
      if (multi) {
        const n = document.createElement('div');
        n.className = 'small muted';
        n.textContent = 'Õigeid vastuseid võib olla mitu.';
        body.appendChild(n);
      }
      order.forEach(oi => {
        const o = st.options[oi];
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt';
        b.dataset.oi = oi;
        b.innerHTML = md(o.t);
        b.addEventListener('click', () => {
          if (b.disabled) return;
          if (multi) { chosen.has(oi) ? chosen.delete(oi) : chosen.add(oi); }
          else { chosen.clear(); chosen.add(oi); }
          btns.forEach(([bb, ii]) => { bb.classList.toggle('sel', chosen.has(ii)); bb.classList.remove('good', 'bad'); });
        });
        btns.push([b, oi]);
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      return {
        check() {
          if (!chosen.size) return { empty: true, msg: 'Vali vastus.' };
          const correct = new Set(st.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0));
          let ok = chosen.size === correct.size && [...chosen].every(i => correct.has(i));
          const whys = [];
          btns.forEach(([b, i]) => {
            if (chosen.has(i)) {
              b.classList.add(st.options[i].correct ? 'good' : 'bad');
              if (!st.options[i].correct && st.options[i].why) whys.push(md(st.options[i].why));
            }
          });
          let msg = whys.join('<br>');
          if (!ok && multi && !whys.length) msg = 'Mõni õige variant on veel valimata.';
          return { ok, msg: ok ? '' : msg };
        },
        reveal() {
          btns.forEach(([b, i]) => { b.disabled = true; b.classList.remove('bad', 'sel'); if (st.options[i].correct) b.classList.add('good'); });
        },
        lock() { btns.forEach(([b]) => b.disabled = true); },
        answerText() { return st.options.filter(o => o.correct).map(o => o.t).join('; '); }
      };
    }
  };

  STEP.num = {
    render(body, st) {
      const row = document.createElement('div');
      row.className = 'numrow';
      const lab = st.label ? `<span class="nlabel">${renderTex(st.label, false)} =</span>` : '';
      row.innerHTML = `${lab}<input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="vastus" class="ninput">`;
      const input = row.querySelector('input');
      const units = st.units || unitOptions(st.u);
      let sel = null;
      if (units.length > 1) {
        sel = document.createElement('select');
        sel.className = 'nunit';
        const must = st.final;
        sel.innerHTML = (must ? '<option value="">ühik…</option>' : '') +
          units.map(([n, f]) => `<option value="${f}" ${!must && n === st.u ? 'selected' : ''}>${n}</option>`).join('');
        row.appendChild(sel);
      } else if (units.length === 1) {
        const sp = document.createElement('span');
        sp.className = 'nunit-fixed';
        sp.textContent = units[0][0];
        row.appendChild(sp);
      }
      body.appendChild(row);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') body.parentElement.querySelector('[data-a="check"]').click(); });
      const tol = st.tol != null ? st.tol : 0.03;
      function close(x, y) {
        if (st.abs != null) return Math.abs(x - y) <= st.abs;
        if (y === 0) return Math.abs(x) < 1e-9;
        return Math.abs(x - y) / Math.abs(y) <= tol;
      }
      return {
        check() {
          const v = parseNumber(input.value);
          if (isNaN(v)) return { empty: true, msg: 'Ei saanud arvust aru. Kirjuta näiteks <code>4,2</code>, <code>4,2e5</code> või <code>4,2*10^5</code>.' };
          if (sel && sel.value === '') return { empty: true, msg: 'Vali ka ühik.' };
          const f = sel ? parseFloat(sel.value) : 1;
          const val = v * f;
          const a = st.a;
          if (close(val, a)) {
            input.classList.add('good');
            return { ok: true, msg: 'Õige!' };
          }
          input.classList.remove('good'); input.classList.add('bad');
          // levinud vead
          if (st.alts) {
            for (const alt of st.alts) if (close(val, alt.a)) return { ok: false, msg: md(alt.msg) };
          }
          if (a !== 0 && close(-val, a)) return { ok: false, msg: 'Arv on õige, aga märk on vale. Mõtle, mis suund on positiivne.' };
          if (sel) {
            for (const [n, ff] of units) {
              if (ff !== f && close(v * ff, a)) return { ok: false, msg: `Arv ise sobib, aga ühik on vale. Kontrolli ühikut (kas mitte ${n}?).` };
            }
          }
          if (a !== 0 && val !== 0) {
            const r = Math.log10(Math.abs(val / a));
            const k = Math.round(r);
            if (k !== 0 && Math.abs(r - k) < 0.02) return { ok: false, msg: `Suurusjärk on vale (${Math.pow(10, Math.abs(k))} korda ${k > 0 ? 'liiga suur' : 'liiga väike'}). Kontrolli ühikute teisendamist SI-süsteemi.` };
            const rel = Math.abs(val - a) / Math.abs(a);
            if (rel < 0.12) return { ok: false, msg: 'Päris lähedal. Kontrolli ümardamist või vahetulemusi (ära ümarda vahepeal liiga palju).' };
          }
          return { ok: false, msg: '' };
        },
        reveal() {
          input.value = fmt(st.a, 3);
          input.disabled = true;
          if (sel) { const opt = [...sel.options].find(o => o.textContent === st.u); if (opt) sel.value = opt.value; sel.disabled = true; }
        },
        lock() { input.disabled = true; if (sel) sel.disabled = true; },
        answerText() { return (st.label ? renderTex(st.label, false) + ' = ' : '') + fmt(st.a, 3) + (st.u ? ' ' + st.u : ''); }
      };
    }
  };

  STEP.order = {
    render(body, st) {
      let cur = shuffle(st.items.map((t, i) => i));
      if (cur.every((v, i) => v === i) && cur.length > 1) cur.reverse();
      const ul = document.createElement('ol');
      ul.className = 'olist';
      body.appendChild(ul);
      let locked = false;
      function draw(marks) {
        ul.innerHTML = '';
        cur.forEach((ii, pos) => {
          const li = document.createElement('li');
          li.className = 'oitem' + (marks ? (marks[pos] ? ' good' : ' bad') : '');
          li.dataset.ii = ii;
          li.innerHTML = `<span class="otext">${md(st.items[ii])}</span>
            <span class="obtns"><button type="button" class="iconbtn small" ${pos === 0 || locked ? 'disabled' : ''} aria-label="Üles">▲</button>
            <button type="button" class="iconbtn small" ${pos === cur.length - 1 || locked ? 'disabled' : ''} aria-label="Alla">▼</button></span>`;
          const [up, dn] = li.querySelectorAll('button');
          up.addEventListener('click', () => { [cur[pos - 1], cur[pos]] = [cur[pos], cur[pos - 1]]; draw(); });
          dn.addEventListener('click', () => { [cur[pos + 1], cur[pos]] = [cur[pos], cur[pos + 1]]; draw(); });
          ul.appendChild(li);
        });
      }
      draw();
      return {
        check() {
          const marks = cur.map((v, i) => v === i);
          draw(marks);
          const nOk = marks.filter(Boolean).length;
          const ok = nOk === cur.length;
          return { ok, msg: ok ? '' : `Õigel kohal on ${nOk}/${cur.length}. Rohelised on paigas.` };
        },
        reveal() { cur = st.items.map((t, i) => i); locked = true; draw(cur.map(() => true)); },
        lock() { locked = true; draw(cur.map(() => true)); },
        answerText() { return 'järjekord on näidatud ülal.'; }
      };
    }
  };

  STEP.match = {
    render(body, st) {
      const rights = shuffle(st.pairs.map((p, i) => i));
      const tbl = document.createElement('div');
      tbl.className = 'mtable';
      const sels = [];
      st.pairs.forEach((pair, i) => {
        const row = document.createElement('div');
        row.className = 'mrow';
        row.innerHTML = `<span class="mleft">${md(pair[0])}</span>`;
        const sel = document.createElement('div');
        sel.className = 'mchoices';
        let val = null;
        const bs = rights.map(ri => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'opt small'; b.dataset.ri = ri; b.innerHTML = md(st.pairs[ri][1]);
          b.addEventListener('click', () => { if (b.disabled) return; val = ri; bs.forEach(x => x.classList.remove('sel', 'good', 'bad')); b.classList.add('sel'); });
          sel.appendChild(b);
          return b;
        });
        row.appendChild(sel);
        tbl.appendChild(row);
        sels.push({ get: () => val, bs, ri: rights, set: v => { val = v; } });
      });
      body.appendChild(tbl);
      return {
        check() {
          if (sels.some(s => s.get() === null)) return { empty: true, msg: 'Tee valik igas reas.' };
          let ok = true, n = 0;
          sels.forEach((s, i) => {
            const good = s.get() === i;
            if (good) n++; else ok = false;
            s.bs.forEach((b, k) => { if (s.ri[k] === s.get()) b.classList.add(good ? 'good' : 'bad'); });
          });
          return { ok, msg: ok ? '' : `Õigesti ${n}/${sels.length}.` };
        },
        reveal() { sels.forEach((s, i) => { s.set(i); s.bs.forEach((b, k) => { b.disabled = true; b.classList.remove('sel', 'bad'); if (s.ri[k] === i) b.classList.add('good'); }); }); },
        lock() { sels.forEach(s => s.bs.forEach(b => b.disabled = true)); },
        answerText() { return 'õiged paarid on näidatud.'; }
      };
    }
  };

  STEP.forces = {
    render(body, st) {
      const host = document.createElement('div');
      body.appendChild(host);
      const fc = Forces.create(host, st.scene);
      return {
        check() {
          if (!fc.count()) return { empty: true, msg: 'Lisa joonisele vähemalt üks jõud.' };
          const r = fc.check();
          return { ok: r.ok, msg: md(r.msgs.join('<br>')) };
        },
        reveal() { fc.showAnswer(); },
        lock() { fc.lock(); },
        answerText() { return 'õiged jõud on joonisel.'; }
      };
    }
  };

  /* ---------- Valemite sahtel ---------- */
  function openDrawer(b) {
    const d = $('#drawer');
    d.hidden = false;
    const tabs = $('#drawerTabs');
    tabs.innerHTML = '';
    const cur = b || (view ? view.p.b : 1);
    Object.keys(BLOCKS).forEach(k => {
      tabs.appendChild(chip(k + '. ' + BLOCKS[k], +k === cur, () => openDrawer(+k)));
    });
    $('#drawerBody').innerHTML = md((window.FORMULAS || {})[cur] || '');
  }

  function closeSidebar() { document.body.classList.remove('side-open'); }

  /* ---------- Käivitus ---------- */
  function init() {
    renderFilters();
    rebuildQueue();
    renderStats();
    $('#fRandom').addEventListener('change', e => { filters.random = e.target.checked; onFilter(); });
    $('#btnFormulas').addEventListener('click', () => openDrawer());
    $('#btnCloseDrawer').addEventListener('click', () => { $('#drawer').hidden = true; });
    $('#drawer').addEventListener('click', e => { if (e.target.id === 'drawer') $('#drawer').hidden = true; });
    $('#btnList').addEventListener('click', () => document.body.classList.toggle('side-open'));
    document.querySelector('.brand').addEventListener('click', renderHome);
    const rb = $('#btnReset');
    rb.addEventListener('click', () => {
      if (rb.dataset.armed) { progress = {}; persist(); delete rb.dataset.armed; rb.textContent = 'Kustuta kõik tulemused'; renderHome(); }
      else { rb.dataset.armed = '1'; rb.textContent = 'Kindel? Vajuta uuesti, et kustutada.'; }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#drawer').hidden = true; closeSidebar(); } });
    const h = location.hash.replace('#', '');
    if (h && byId[decodeURIComponent(h)]) openProblem(decodeURIComponent(h)); else renderHome();
  }

  window.addEventListener('hashchange', () => {
    const h = decodeURIComponent(location.hash.replace('#', ''));
    if (byId[h] && h !== currentId) openProblem(h);
  });

  init();
})();
