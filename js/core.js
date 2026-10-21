/* Ühised andmestruktuurid ja abifunktsioonid.
   Ülesannete failid (js/data/b*.js) kasutavad funktsioone P, mc, num, ord, match, frc. */

window.PROBLEMS = [];

window.BLOCKS = {
  1: 'Sirgjooneline liikumine',
  2: 'Kõverjooneline liikumine',
  3: 'Pöörlemine ja ringliikumine',
  4: 'Jõud ja hõõrdejõud',
  5: 'Kaal, kesktõmme, gravitatsioon',
  6: 'Töö, võimsus, energia',
  7: 'Impulss, jäävusseadused, põrge'
};

window.KINDS = { T: 'Tunnis', K: 'Kodus', S: 'Sarnane' };

/* Ülesanne. o = {id, b, k, text, fig, given, find, steps, sol, ans, note} */
function P(o) {
  if (!o.id) o.id = String(o.n);
  if (!o.n) o.n = o.id;
  window.PROBLEMS.push(o);
}

/* Valikvastus. Õige variant algab tärniga '*'. Variandi järel '||' tuleb selgitus,
   miks see variant vale (või õige) on. */
function mc(q, opts, ex, hint, extra) {
  const options = opts.map(s => {
    let correct = false;
    if (s.startsWith('*')) { correct = true; s = s.slice(1); }
    const [t, why] = s.split('||');
    return { t: t.trim(), correct, why: why ? why.trim() : '' };
  });
  return Object.assign({ type: 'mc', q, options, ex: ex || '', hint: hint || '' }, extra || {});
}

/* Arvvastus. a = õige väärtus põhiühikus u. opt: {tol, hint, ex, final, alts:[{a, msg}], abs, units:[...]} */
function num(q, a, u, opt) {
  return Object.assign({ type: 'num', q, a, u: u || '', tol: 0.03 }, opt || {});
}

/* Järjestamine. items antakse õiges järjekorras, kuvatakse segatult. */
function ord(q, items, ex, hint) {
  return { type: 'order', q, items, ex: ex || '', hint: hint || '' };
}

/* Sobitamine. pairs = [[vasak, parem], ...] */
function match(q, pairs, ex, hint) {
  return { type: 'match', q, pairs, ex: ex || '', hint: hint || '' };
}

/* Jõudude joonis. scene vt js/forces.js */
function frc(q, scene, ex, hint) {
  return { type: 'forces', q, scene, ex: ex || '', hint: hint || '' };
}

/* ---------- Matemaatika kuvamine ---------- */

// TeX-is kirjutame kümnendmurrud punktiga, kuvamisel tehakse neist komad.
function texFix(t) {
  return t.replace(/(\d)\.(\d)/g, '$1{,}$2');
}

function renderTex(t, display) {
  if (window.katex) {
    try {
      return window.katex.renderToString(texFix(t), { displayMode: display, throwOnError: false, strict: false });
    } catch (e) { /* kukub alla */ }
  }
  const esc = t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return display ? '<div class="tex-fallback">' + esc + '</div>' : '<code>' + esc + '</code>';
}

/* Teksti sisse kirjutatud $...$ ja $$...$$ muudetakse valemiteks. Ülejäänud on HTML. */
function md(s) {
  if (s == null) return '';
  s = String(s);
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => renderTex(t, true));
  s = s.replace(/\$([^$\n]+?)\$/g, (m, t) => renderTex(t, false));
  return s;
}

/* ---------- Arvude lugemine ---------- */

// Lubab: 4,2  4.2e5  4,2*10^5  4,2·10^5  2*9,8*3  sqrt(2)  pi  −1,5
function parseNumber(str) {
  if (str == null) return NaN;
  let s = String(str).trim();
  if (!s) return NaN;
  s = s.replace(/\s+/g, '')
       .replace(/[−–]/g, '-')
       .replace(/[·×⋅]/g, '*')
       .replace(/,/g, '.')
       .replace(/\*\*/g, '^')
       .replace(/π/g, 'pi')
       .replace(/√/g, 'sqrt');
  let i = 0;
  function peek() { return s[i]; }
  function eat(c) { if (s[i] === c) { i++; return true; } return false; }
  function expr() {
    let v = term();
    for (;;) {
      if (eat('+')) v += term();
      else if (eat('-')) v -= term();
      else return v;
    }
  }
  function term() {
    let v = power();
    for (;;) {
      if (eat('*')) v *= power();
      else if (eat('/')) v /= power();
      else return v;
    }
  }
  function power() {
    let v = unary();
    if (eat('^')) v = Math.pow(v, power());
    return v;
  }
  function unary() {
    if (eat('-')) return -unary();
    if (eat('+')) return unary();
    return atom();
  }
  function atom() {
    if (eat('(')) { const v = expr(); if (!eat(')')) throw 0; return v; }
    if (s.startsWith('sqrt', i)) { i += 4; if (!eat('(')) throw 0; const v = expr(); if (!eat(')')) throw 0; return Math.sqrt(v); }
    if (s.startsWith('pi', i)) { i += 2; return Math.PI; }
    const m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));
    if (!m) throw 0;
    i += m[0].length;
    return parseFloat(m[0]);
  }
  try {
    const v = expr();
    if (i !== s.length) return NaN;
    return v;
  } catch (e) { return NaN; }
}

/* ---------- Ühikud ---------- */
// Iga põhiühiku jaoks valikud [nimi, tegur põhiühikusse].
const UNIT_SETS = {
  'm': [['mm', 1e-3], ['cm', 1e-2], ['m', 1], ['km', 1e3], ['Mm', 1e6], ['Gm', 1e9]],
  's': [['ms', 1e-3], ['s', 1], ['min', 60], ['h', 3600]],
  'm/s': [['cm/s', 1e-2], ['m/s', 1], ['km/h', 1 / 3.6], ['km/s', 1e3]],
  'm/s²': [['cm/s²', 1e-2], ['m/s²', 1]],
  'N': [['mN', 1e-3], ['N', 1], ['kN', 1e3], ['MN', 1e6]],
  'J': [['mJ', 1e-3], ['J', 1], ['kJ', 1e3], ['MJ', 1e6], ['GJ', 1e9]],
  'W': [['W', 1], ['kW', 1e3], ['MW', 1e6]],
  'kg': [['g', 1e-3], ['kg', 1], ['t', 1e3]],
  'Pa': [['Pa', 1], ['kPa', 1e3], ['MPa', 1e6], ['GPa', 1e9]],
  'rad': [['rad', 1]],
  'rad/s': [['rad/s', 1]],
  'rad/s²': [['rad/s²', 1]],
  '°': [['°', 1]],
  'Hz': [['Hz', 1]],
  'p': [['p', 1]],
  'p/s': [['p/s', 1]],
  'kg·m/s': [['kg·m/s', 1]],
  'm²': [['mm²', 1e-6], ['cm²', 1e-4], ['m²', 1]],
  'N·s': [['N·s', 1]]
};

function unitOptions(u) {
  return UNIT_SETS[u] || (u ? [[u, 1]] : []);
}

/* Arvu ilus kuju eesti moodi: 4,2·10⁵ */
function fmt(x, sig) {
  if (!isFinite(x)) return String(x);
  sig = sig || 3;
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e5 || ax < 1e-3) {
    const e = Math.floor(Math.log10(ax));
    let m = x / Math.pow(10, e);
    m = parseFloat(m.toPrecision(sig));
    if (Math.abs(m) >= 10) { m /= 10; }
    return String(m).replace('.', ',') + '·10' + supNum(e);
  }
  let v = parseFloat(x.toPrecision(sig));
  return String(v).replace('.', ',');
}
function supNum(e) {
  const map = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return String(e).split('').map(c => map[c] || c).join('');
}

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Joonise abifunktsioonid ---------- */
const SC = {
  ground(x1, x2, y) {
    let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
    for (let x = x1 + 6; x < x2; x += 14) s += `<line class="hatch" x1="${x}" y1="${y}" x2="${x - 9}" y2="${y + 9}"/>`;
    return s;
  },
  ceiling(x1, x2, y) {
    let s = `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
    for (let x = x1 + 6; x < x2; x += 14) s += `<line class="hatch" x1="${x}" y1="${y}" x2="${x - 9}" y2="${y - 9}"/>`;
    return s;
  },
  // kaldpind tõuseb paremale; nurk alpha vasakul all
  incline(x0, y0, base, alpha) {
    const h = base * Math.tan(alpha * Math.PI / 180);
    const r = 34;
    const ax = x0 + r * Math.cos(alpha * Math.PI / 180), ay = y0 - r * Math.sin(alpha * Math.PI / 180);
    return `<polyline points="${x0},${y0} ${x0 + base},${y0} ${x0 + base},${y0 - h} ${x0},${y0}"/>` +
      `<path d="M${x0 + r},${y0} A${r},${r} 0 0 0 ${ax.toFixed(1)},${ay.toFixed(1)}" stroke-width="1.4"/>` +
      `<text x="${x0 + r + 8}" y="${y0 - 7}">α</text>`;
  },
  // keha keskpunkt kaldpinnal (osa f aluse pikkusest), keha kõrgus bh
  onIncline(x0, y0, base, alpha, f, bh) {
    const a = alpha * Math.PI / 180;
    const px = x0 + f * base, py = y0 - f * base * Math.tan(a);
    return { x: px - Math.sin(a) * bh / 2, y: py - Math.cos(a) * bh / 2 };
  },
  inclineDirs(alpha) {
    return [
      { k: 'upslope', a: alpha, l: '↗ piki kaldpinda üles' },
      { k: 'downslope', a: 180 + alpha, l: '↙ piki kaldpinda alla' },
      { k: 'normal', a: 90 + alpha, l: '⊥ risti kaldpinnaga, pinnast eemale' },
      { k: 'into', a: 270 + alpha, l: '⊥ risti kaldpinnaga, pinna sisse' },
      { k: 'up', a: 90, l: '↑ vertikaalselt üles' },
      { k: 'down', a: 270, l: '↓ vertikaalselt alla' }
    ];
  },
  pulley(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="2.5" class="fill"/>`;
  },
  rope(pts) {
    return `<polyline points="${pts.map(p => p.join(',')).join(' ')}" stroke-width="1.6"/>`;
  },
  circleDirs() {
    return [
      { k: 'up', a: 90, l: '↑ üles' },
      { k: 'down', a: 270, l: '↓ alla' },
      { k: 'right', a: 0, l: '→ paremale' },
      { k: 'left', a: 180, l: '← vasakule' }
    ];
  },
  DIR4: [
    { k: 'up', a: 90, l: '↑ üles' },
    { k: 'down', a: 270, l: '↓ alla' },
    { k: 'right', a: 0, l: '→ paremale' },
    { k: 'left', a: 180, l: '← vasakule' }
  ],
  DIR8: [
    { k: 'up', a: 90, l: '↑ üles' },
    { k: 'down', a: 270, l: '↓ alla' },
    { k: 'right', a: 0, l: '→ paremale' },
    { k: 'left', a: 180, l: '← vasakule' },
    { k: 'ur', a: 45, l: '↗ üles paremale' },
    { k: 'ul', a: 135, l: '↖ üles vasakule' },
    { k: 'dr', a: 315, l: '↘ alla paremale' },
    { k: 'dl', a: 225, l: '↙ alla vasakule' }
  ]
};
