/* Jõudude (ja teiste vektorite) joonestamise harjutus.
   scene = {
     w, h,                 // SVG mõõdud
     bg,                   // taustajoonis SVG-tekstina (pind, plokk, niit jne)
     bodies: [{id, x, y, w, h, rot, label, shape}],   // x,y = keskpunkt; rot kraadides (vastupäeva)
     forces: ['mg','N',...],   // palett
     dirs: [{k, a, l}],    // lubatud suunad: a = nurk kraadides (0 = paremale, 90 = üles)
     ans: {bodyId: {forceKey: dirKey | [dirKey, ...]}},
     why: {forceKey: 'miks seda jõudu pole'},
     dirWhy: {forceKey: 'miks suund on selline'}
   }
*/
(function () {
  const VEC = {
    mg: { l: 'mg', name: 'raskusjõud mg' },
    N: { l: 'N', name: 'toereaktsioon N' },
    T: { l: 'T', name: 'niidi (trossi) tõmbejõud T' },
    T1: { l: 'T₁', name: 'tõmbejõud T₁' },
    T2: { l: 'T₂', name: 'tõmbejõud T₂' },
    Fh: { l: 'Fₕ', name: 'hõõrdejõud Fₕ' },
    F: { l: 'F', name: 'rakendatud jõud F' },
    Fv: { l: 'Fᵥ', name: 'veojõud Fᵥ' },
    Ft: { l: 'Fₜ', name: 'tõstejõud Fₜ' },
    Fk: { l: 'Fₖ', name: 'takistusjõud Fₖ' },
    Mg: { l: 'Mg', name: 'raskusjõud Mg' },
    v: { l: 'v', name: 'kiirus v' },
    vx: { l: 'vₓ', name: 'kiiruse x-komponent vₓ' },
    vz: { l: 'v_z', name: 'kiiruse z-komponent v_z' },
    a: { l: 'a', name: 'kiirendus a' },
    at: { l: 'aₜ', name: 'tangentsiaalkiirendus aₜ' },
    an: { l: 'aₙ', name: 'normaalkiirendus aₙ' },
    p1: { l: 'p₁', name: 'esimese killu impulss p₁' },
    p2: { l: 'p₂', name: 'teise killu impulss p₂' },
    p3: { l: 'p₃', name: 'kolmanda killu impulss p₃' }
  };
  window.VEC = VEC;

  const DEFAULT_DIRS = [
    { k: 'up', a: 90, l: '↑ üles' },
    { k: 'down', a: 270, l: '↓ alla' },
    { k: 'right', a: 0, l: '→ paremale' },
    { k: 'left', a: 180, l: '← vasakule' }
  ];

  const NS = 'http://www.w3.org/2000/svg';
  let uid = 0;

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function create(container, scene, onChange) {
    const id = 'fs' + (++uid);
    const dirs = scene.dirs || DEFAULT_DIRS;
    const bodies = scene.bodies;
    let selected = bodies.length === 1 ? bodies[0].id : null;
    let items = []; // {body, key, dir, len}
    let locked = false;

    container.innerHTML = '';
    container.classList.add('forces');

    const help = document.createElement('div');
    help.className = 'fhelp small muted';
    help.innerHTML = bodies.length > 1
      ? 'Puuduta keha, et see valida. Siis lisa jõud ja vali suund (või lohista noole otsa).'
      : 'Lisa jõud nupust ja vali suund (või lohista noole otsa).';
    container.appendChild(help);

    const wrap = document.createElement('div');
    wrap.className = 'fsvgwrap';
    container.appendChild(wrap);

    const svg = el('svg', { viewBox: `0 0 ${scene.w} ${scene.h}`, class: 'fsvg', role: 'img' });
    wrap.appendChild(svg);
    const defs = el('defs', {}, svg);
    const mk = el('marker', { id: id + 'ah', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'ahead' }, mk);
    ['good', 'bad'].forEach(c => {
      const m = el('marker', { id: id + 'ah' + c, viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' }, defs);
      el('path', { d: 'M0,0 L10,5 L0,10 z', class: 'ahead ' + c }, m);
    });

    const gbg = el('g', { class: 'fbg' }, svg);
    gbg.innerHTML = scene.bg || '';
    const gbodies = el('g', {}, svg);
    const garrows = el('g', {}, svg);

    const palette = document.createElement('div');
    palette.className = 'fpalette';
    container.appendChild(palette);

    const list = document.createElement('div');
    list.className = 'flist';
    container.appendChild(list);

    function bodyById(b) { return bodies.find(x => x.id === b); }

    function drawBodies() {
      gbodies.innerHTML = '';
      bodies.forEach(b => {
        const g = el('g', { class: 'fbody' + (selected === b.id ? ' sel' : ''), transform: `translate(${b.x},${b.y}) rotate(${-(b.rot || 0)})`, tabindex: '0' }, gbodies);
        if (b.shape === 'circle') el('circle', { cx: 0, cy: 0, r: b.w / 2 }, g);
        else el('rect', { x: -b.w / 2, y: -b.h / 2, width: b.w, height: b.h, rx: 3 }, g);
        const t = el('text', { x: 0, y: 5, 'text-anchor': 'middle', transform: `rotate(${b.rot || 0})` }, g);
        t.textContent = b.label || b.id;
        g.addEventListener('click', () => { if (locked) return; selected = b.id; drawBodies(); drawPalette(); });
        g.addEventListener('keydown', e => { if (e.key === 'Enter') { selected = b.id; drawBodies(); drawPalette(); } });
      });
    }

    function dirAngle(k) { const d = dirs.find(x => x.k === k); return d ? d.a : null; }

    function drawArrows() {
      garrows.innerHTML = '';
      const counts = {};
      items.forEach((it, idx) => {
        if (!it.dir) return;
        const b = bodyById(it.body);
        const a = dirAngle(it.dir) * Math.PI / 180;
        const key = it.body + it.dir;
        const off = counts[key] = (counts[key] || 0) + 1;
        const L = it.len || 58;
        const shift = (off - 1) * 9;
        const ox = b.x + shift * Math.sin(a), oy = b.y + shift * Math.cos(a);
        const x2 = ox + L * Math.cos(a), y2 = oy - L * Math.sin(a);
        const g = el('g', { class: 'farrow' + (it.state ? ' ' + it.state : '') }, garrows);
        el('line', { x1: ox, y1: oy, x2, y2, 'marker-end': `url(#${id}ah${it.state || ''})` }, g);
        const lx = x2 + 13 * Math.cos(a) + (Math.abs(Math.cos(a)) < 0.3 ? 12 : 0);
        const ly = y2 - 13 * Math.sin(a) + 5;
        const tx = el('text', { x: lx, y: ly, 'text-anchor': 'middle', class: 'flabel' }, g);
        tx.textContent = VEC[it.key] ? VEC[it.key].l : it.key;
        const h = el('circle', { cx: x2, cy: y2, r: 13, class: 'fhandle' }, g);
        h.addEventListener('pointerdown', e => startDrag(e, idx, ox, oy));
      });
    }

    function svgPoint(e) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }

    function startDrag(e, idx, ox, oy) {
      if (locked) return;
      e.preventDefault();
      const move = ev => {
        const p = svgPoint(ev);
        const dx = p.x - ox, dy = oy - p.y;
        let ang = Math.atan2(dy, dx) * 180 / Math.PI;
        if (ang < 0) ang += 360;
        let best = null, bd = 1e9;
        dirs.forEach(d => {
          let diff = Math.abs(((ang - d.a) % 360 + 540) % 360 - 180);
          if (diff < bd) { bd = diff; best = d; }
        });
        items[idx].dir = best.k;
        items[idx].len = Math.max(30, Math.min(120, Math.hypot(dx, dy)));
        items[idx].state = '';
        drawArrows();
        drawList();
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        changed();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    }

    function drawPalette() {
      palette.innerHTML = '';
      const lab = document.createElement('span');
      lab.className = 'small muted';
      const b = selected ? bodyById(selected) : null;
      lab.textContent = b ? `Lisa kehale ${b.label || b.id}:` : 'Vali enne keha joonisel.';
      palette.appendChild(lab);
      scene.forces.forEach(k => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.type = 'button';
        btn.textContent = '+ ' + (VEC[k] ? VEC[k].l : k);
        btn.dataset.k = k;
        btn.title = VEC[k] ? VEC[k].name : k;
        btn.disabled = !selected || locked;
        btn.addEventListener('click', () => {
          items.push({ body: selected, key: k, dir: null, len: 58 });
          drawList(); drawArrows(); changed();
        });
        palette.appendChild(btn);
      });
    }

    function drawList() {
      list.innerHTML = '';
      if (!items.length) {
        list.innerHTML = '<div class="small muted">Jõude pole veel lisatud.</div>';
        return;
      }
      items.forEach((it, idx) => {
        const row = document.createElement('div');
        row.className = 'frow' + (it.state ? ' ' + it.state : '');
        const name = document.createElement('span');
        name.className = 'fname';
        const b = bodyById(it.body);
        name.textContent = (VEC[it.key] ? VEC[it.key].l : it.key) + (bodies.length > 1 ? ` (${b.label || b.id})` : '');
        row.appendChild(name);
        const sel = document.createElement('select');
        sel.disabled = locked;
        sel.innerHTML = '<option value="">vali suund…</option>' + dirs.map(d => `<option value="${d.k}" ${it.dir === d.k ? 'selected' : ''}>${d.l}</option>`).join('');
        sel.addEventListener('change', () => { it.dir = sel.value || null; it.state = ''; drawArrows(); changed(); });
        row.appendChild(sel);
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'iconbtn small';
        del.textContent = '✕';
        del.title = 'Eemalda';
        del.disabled = locked;
        del.addEventListener('click', () => { items.splice(idx, 1); drawList(); drawArrows(); changed(); });
        row.appendChild(del);
        list.appendChild(row);
      });
    }

    function changed() { if (onChange) onChange(); }

    function nm(k) { return VEC[k] ? VEC[k].name : k; }

    function check() {
      const msgs = [];
      let ok = true;
      items.forEach(it => it.state = '');
      const seen = {};
      items.forEach(it => {
        const exp = (scene.ans[it.body] || {})[it.key];
        const tag = it.body + '.' + it.key;
        const b = bodyById(it.body);
        const bl = bodies.length > 1 ? ` kehale ${b.label || b.id}` : '';
        if (seen[tag]) { ok = false; it.state = 'bad'; msgs.push(`Jõud ${nm(it.key)} on${bl} lisatud mitu korda.`); return; }
        seen[tag] = true;
        if (exp === undefined) {
          ok = false; it.state = 'bad';
          const w = (scene.why && (scene.why[tag] || scene.why[it.key])) || '';
          msgs.push(`Sellist jõudu (${nm(it.key)}) siin${bl} ei mõju. ${w}`);
          return;
        }
        if (!it.dir) { ok = false; it.state = 'bad'; msgs.push(`Vali suund: ${nm(it.key)}.`); return; }
        const okDirs = Array.isArray(exp) ? exp : [exp];
        if (!okDirs.includes(it.dir)) {
          ok = false; it.state = 'bad';
          const w = (scene.dirWhy && (scene.dirWhy[tag] || scene.dirWhy[it.key])) || '';
          msgs.push(`Jõu ${nm(it.key)} suund on vale. ${w}`);
          return;
        }
        it.state = 'good';
      });
      const missing = [];
      Object.keys(scene.ans).forEach(bid => {
        Object.keys(scene.ans[bid]).forEach(k => { if (!seen[bid + '.' + k]) missing.push([bid, k]); });
      });
      if (missing.length) {
        ok = false;
        if (missing.length <= 2) {
          missing.forEach(([bid, k]) => { const b = bodyById(bid); msgs.push(`Puudu: ${nm(k)}` + (bodies.length > 1 ? ` (keha ${b.label || b.id})` : '') + '.'); });
        } else if (bodies.length > 1) {
          const per = {};
          missing.forEach(([bid]) => { per[bid] = (per[bid] || 0) + 1; });
          msgs.push('Jõude on veel puudu: ' + Object.keys(per).map(bid => `keha ${bodyById(bid).label || bid} – ${per[bid]}`).join(', ') + '. Mõtle iga keha juures: mis teda tõmbab, mis teda toetab, mis takistab liikumist?');
        } else {
          msgs.push(`Puudu on veel ${missing.length} jõudu. Mõtle: mis keha tõmbab, mis teda toetab, mis takistab liikumist?`);
        }
      }
      drawArrows(); drawList();
      return { ok, msgs };
    }

    function showAnswer() {
      items = [];
      Object.keys(scene.ans).forEach(bid => {
        Object.keys(scene.ans[bid]).forEach(k => {
          const d = scene.ans[bid][k];
          items.push({ body: bid, key: k, dir: Array.isArray(d) ? d[0] : d, len: 58, state: 'good' });
        });
      });
      lock();
    }

    function lock() {
      locked = true;
      drawArrows(); drawList(); drawPalette();
    }

    function count() { return items.length; }

    drawBodies(); drawPalette(); drawList(); drawArrows();
    return { check, showAnswer, lock, count };
  }

  window.Forces = { create };
})();
