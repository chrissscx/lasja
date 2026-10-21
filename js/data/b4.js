/* 4. Jõud ja hõõrdejõud. Tunnis: 95, 96, 101, 122, 124(1), 126(1). Kodus: 94, 97, 100, 118, 120, 124(2), 126(2). */
(function () {
const R = String.raw;

/* --- Joonis 4: keha A laual, niit üle ploki, keha B ripub --- */
function joon4(la, lb) {
  return `<svg viewBox="0 0 340 260" width="340" style="max-width:100%">
  <g fill="none" stroke="currentColor" stroke-width="2">
    <line x1="20" y1="110" x2="265" y2="110"/><line x1="20" y1="122" x2="265" y2="122"/>
    <line x1="150" y1="122" x2="150" y2="245"/><line x1="172" y1="122" x2="172" y2="245"/>
    <rect x="90" y="72" width="80" height="38"/>
    <circle cx="275" cy="96" r="14"/><line x1="262" y1="110" x2="275" y2="96"/>
    <line x1="170" y1="82" x2="275" y2="82"/><line x1="289" y1="96" x2="289" y2="165"/>
    <rect x="272" y="165" width="34" height="46"/>
  </g>
  <text x="130" y="97" font-size="18" text-anchor="middle" fill="currentColor">${la}</text>
  <text x="289" y="194" font-size="18" text-anchor="middle" fill="currentColor">${lb}</text>
  <text x="20" y="250" font-size="13" fill="currentColor">Joon. 4</text></svg>`;
}
function scene124() {
  return {
    w: 360, h: 300,
    bg: `<line x1="10" y1="120" x2="268" y2="120"/>` + SC.pulley(280, 106, 13) + `<line x1="265" y1="120" x2="280" y2="106"/>` +
      SC.rope([[200, 92], [280, 93]]) + SC.rope([[293, 106], [293, 150]]) +
      `<line x1="150" y1="120" x2="150" y2="290"/><line x1="170" y1="120" x2="170" y2="290"/>`,
    bodies: [{ id: 'A', x: 160, y: 100, w: 80, h: 40, label: 'A' }, { id: 'B', x: 293, y: 172, w: 36, h: 44, label: 'B' }],
    forces: ['mg', 'N', 'T', 'Fh', 'F'], dirs: SC.DIR4,
    ans: { A: { mg: 'down', N: 'up', T: 'right', Fh: 'left' }, B: { mg: 'down', T: 'up' } },
    why: { 'B.N': 'B ripub õhus, ta ei toetu ühelegi pinnale.', 'B.Fh': 'B ei puutu ühtegi pinda, hõõrdejõudu pole.', F: 'Kedagi, kes kehasid lükkaks, ei ole. Süsteemi paneb liikuma B raskusjõud.' },
    dirWhy: { mg: 'Raskusjõud on alati alla.', N: 'Laud surub keha ülespoole.', 'A.T': 'Niit tõmbab A-d ploki poole (paremale).', 'B.T': 'Niit hoiab B-d ülevalt.', Fh: 'A liigub paremale, hõõrdejõud on liikumisele vastu.' }
  };
}

/* --- Joonis 5: m1 kaldpinnal, plokk tipus, m2 ripub --- */
const J5 = { x0: 30, y0: 215, base: 250, a: 30 };
function joon5() {
  const top = J5.y0 - J5.base * Math.tan(Math.PI / 6);
  const p = SC.onIncline(J5.x0, J5.y0, J5.base, 30, 0.45, 30);
  return `<svg viewBox="0 0 360 250" width="360" style="max-width:100%"><g class="fbg" fill="none" stroke="currentColor" stroke-width="2">` +
    SC.incline(J5.x0, J5.y0, J5.base, 30) + SC.pulley(J5.x0 + J5.base + 2, top - 10, 12) +
    SC.rope([[p.x + 28, p.y - 16], [J5.x0 + J5.base - 6, top - 21]]) + SC.rope([[J5.x0 + J5.base + 14, top - 10], [J5.x0 + J5.base + 14, 130]]) +
    `<g transform="translate(${p.x},${p.y}) rotate(-30)"><rect x="-29" y="-15" width="58" height="30"/></g>` +
    `<rect x="${J5.x0 + J5.base}" y="130" width="28" height="50"/></g>` +
    `<text x="${p.x - 10}" y="${p.y - 22}" font-size="15" fill="currentColor">m₁</text>` +
    `<text x="${J5.x0 + J5.base + 34}" y="160" font-size="15" fill="currentColor">m₂</text>` +
    `<text x="20" y="245" font-size="13" fill="currentColor">Joon. 5</text></svg>`;
}
function scene126(m1dir) {
  const p = SC.onIncline(J5.x0, J5.y0, J5.base, 30, 0.45, 30);
  const top = J5.y0 - J5.base * Math.tan(Math.PI / 6);
  return {
    w: 360, h: 250,
    bg: SC.incline(J5.x0, J5.y0, J5.base, 30) + SC.pulley(J5.x0 + J5.base + 2, top - 10, 12) +
      SC.rope([[p.x + 28, p.y - 16], [J5.x0 + J5.base - 6, top - 21]]) + SC.rope([[J5.x0 + J5.base + 14, top - 10], [J5.x0 + J5.base + 14, 130]]),
    bodies: [{ id: 'm1', x: p.x, y: p.y, w: 58, h: 30, rot: 30, label: 'm₁' }, { id: 'm2', x: J5.x0 + J5.base + 14, y: 155, w: 30, h: 50, label: 'm₂' }],
    forces: ['mg', 'N', 'T', 'Fh'], dirs: SC.inclineDirs(30),
    ans: { m1: { mg: 'down', N: 'normal', T: 'upslope', Fh: m1dir === 'up' ? 'downslope' : 'upslope' }, m2: { mg: 'down', T: 'up' } },
    why: { 'm2.N': 'm₂ ripub vabalt, tal pole toetuspinda.', 'm2.Fh': 'm₂ ei puutu pinda.' },
    dirWhy: { mg: 'Raskusjõud on alati vertikaalselt alla.', N: 'Toereaktsioon on risti kaldpinnaga.', 'm1.T': 'Niit tõmbab m₁ ploki poole, s.t. piki kaldpinda üles.', 'm2.T': 'Niit hoiab m₂ ülevalt.',
      Fh: m1dir === 'up' ? 'm₁ liigub kaldpinda mööda üles, hõõrdejõud on liikumisele vastu (alla).' : 'm₁ libiseb alla, hõõrdejõud on suunatud üles.' }
  };
}

P({ id: '95', b: 4, k: 'T',
  text: R`Kahuri kaliiber on 75 mm, toru pikkus 2,5 m, mürsu mass 10 kg ja mürsu kiirus torust väljumisel 1450 m/s. Kui suur jõud mõjub mürsule ja kui suur on keskmine rõhk torus?`,
  given: R`<b>Andmed:</b> $d = 75\ \text{mm}$, $s = 2.5\ \text{m}$, $m = 10\ \text{kg}$, $v = 1450\ \text{m/s}$, $v_0 = 0$.<br><b>Leida:</b> $F$, $p$.`,
  steps: [
    mc(R`Mürsu kiirendus torus on konstantne. Aega me ei tea. Milline valem annab kiirenduse?`, [R`*$a = \frac{v^2}{2s}$`, R`$a = \frac{v}{t}$||Aeg pole antud.`, R`$a = \frac{v^2}{s}$||$s = \frac{at^2}{2}$ ja $v = at$ annavad $v^2 = 2as$.`]),
    num(R`Kiirendus:`, 420500, 'm/s²', { label: R`a` }),
    num(R`Mürsule mõjuv jõud:`, 4.205e6, 'N', { final: true, label: R`F`, hint: R`$F = ma$` }),
    mc(R`Rõhk on jõud pinnaühiku kohta. Mis on toru ristlõike pindala?`, [R`*$S = \frac{\pi d^2}{4}$`, R`$S = \pi d^2$||$d$ on läbimõõt, raadius on $d/2$.`, R`$S = \pi d$||See on ümbermõõt.`]),
    num(R`Keskmine rõhk torus:`, 9.52e8, 'Pa', { final: true, label: R`p`, alts: [{ a: 9.52e8 / 4, msg: 'Pindala arvutamisel kasuta $\\frac{\\pi d^2}{4}$, mitte $\\pi d^2$.' }], ex: R`$p = \frac{4F}{\pi d^2} = \frac{4\cdot 4.2\cdot 10^6}{\pi\cdot 0.075^2} \approx 0.95\ \text{GPa}$` })
  ],
  sol: R`$v^2 = 2as \Rightarrow a = \frac{v^2}{2s} = 4.2\cdot 10^5\ \text{m/s}^2$, $F = ma = 4.2\ \text{MN}$.
$$p = \frac{F}{S} = \frac{4F}{\pi d^2} = 0.95\ \text{GPa}$$`,
  ans: R`4,2 MN; 0,95 GPa`
});

P({ id: '96', b: 4, k: 'T',
  text: R`Kehad massiga 2 kg ja 4 kg on ühendatud niidiga ning asetatud siledale horisontaalsele lauale. Niit kannatab tõmmet kuni 2 N. Millise jõu peab rakendama ühele kehale, et niit katkeks?`,
  given: R`<b>Andmed:</b> $m_1 = 2\ \text{kg}$, $m_2 = 4\ \text{kg}$, $T = 2\ \text{N}$, hõõrdumist pole.<br><b>Leida:</b> $F$ (kaks juhtu: tõmmatakse kergemat või raskemat keha).`,
  note: R`Konspektis on arvutatud niidi tugevusega 4 N ja ainult juht, kus tõmmatakse raskemat keha. Siin on raamatu andmed (2 N) ja mõlemad juhud, nagu raamatu vastuses.`,
  steps: [
    frc(R`Jõud $F$ rakendatakse 4 kg kehale (paremale). Joonesta mõlemale kehale mõjuvad jõud.`, {
      w: 360, h: 200, bg: SC.ground(10, 350, 150) + SC.rope([[125, 128], [215, 128]]),
      bodies: [{ id: 'k2', x: 95, y: 128, w: 60, h: 44, label: '2 kg' }, { id: 'k4', x: 250, y: 125, w: 70, h: 50, label: '4 kg' }],
      forces: ['mg', 'N', 'T', 'F', 'Fh'], dirs: SC.DIR4,
      ans: { k2: { mg: 'down', N: 'up', T: 'right' }, k4: { mg: 'down', N: 'up', T: 'left', F: 'right' } },
      why: { Fh: 'Laud on sile, hõõrdumist pole.', 'k2.F': 'Jõud F rakendatakse ainult 4 kg kehale.' },
      dirWhy: { 'k2.T': 'Niit veab 2 kg keha 4 kg keha poole.', 'k4.T': 'Niit hoiab 4 kg keha tagasi (vasakule).', F: 'F tõmbab paremale.' }
    }, R`Horisontaalsihis: 2 kg kehale mõjub ainult niit, 4 kg kehale $F$ ja niit vastassuunas.`),
    mc(R`Niit katkeb, kui $T = 2\ \text{N}$. Milline võrrand annab kiirenduse, kui $F$ on rakendatud 4 kg kehale?`, [R`*$T = m_1a$, sest 2 kg keha veab ainult niit`, R`$T = m_2a$||4 kg kehale mõjub ka $F$. Lihtsam on vaadata keha, millele mõjub ainult niit.`, R`$F = T$||Siis poleks resultantjõudu ja kehad ei kiireneks.`]),
    num(R`Kiirendus, kui tõmmatakse 4 kg keha:`, 1, 'm/s²', { label: R`a` }),
    num(R`Vajalik jõud, kui tõmmatakse 4 kg keha:`, 6, 'N', { final: true, label: R`F`, hint: R`Kogu süsteem: $F = (m_1 + m_2)a$` }),
    num(R`Vajalik jõud, kui tõmmatakse hoopis 2 kg keha:`, 3, 'N', { final: true, label: R`F'`, hint: R`Nüüd veab niit 4 kg keha: $T = m_2a'$, $a' = 0.5\ \text{m/s}^2$`, ex: R`$a' = \frac{2}{4} = 0.5$, $F' = 6\cdot 0.5 = 3\ \text{N}$` })
  ],
  sol: R`Tõmmates 4 kg keha: 2 kg keha kiirendab ainult niit, $T = m_1a \Rightarrow a = 1\ \text{m/s}^2$, $F = (m_1 + m_2)a = 6\ \text{N}$.<br>
Tõmmates 2 kg keha: $T = m_2a' \Rightarrow a' = 0.5\ \text{m/s}^2$, $F' = (m_1 + m_2)a' = 3\ \text{N}$.`,
  ans: R`3 N (kui tõmmata 2 kg keha) või 6 N (kui tõmmata 4 kg keha).`
});

P({ id: '101', b: 4, k: 'T',
  text: R`Üle liikumatu ploki ripub nöör. Ühel ja samal hetkel haaravad nööri otstest kinni kaks ahvi massiga 20 kg ja 25 kg. Kergem ahv jääb nööri otsa rippuma, teine aga hakkab mööda nööri üles ronima nii, et ta püsib kogu aeg samal kõrgusel. Millise aja jooksul tõuseb väiksem ahv 19,6 m võrra kõrgemale?`,
  given: R`<b>Andmed:</b> $m_1 = 20\ \text{kg}$, $m_2 = 25\ \text{kg}$, $s_1 = 19.6\ \text{m}$.<br><b>Leida:</b> $t$.`,
  steps: [
    frc(R`Joonesta mõlemale ahvile mõjuvad jõud.`, {
      w: 360, h: 230, bg: SC.ceiling(120, 240, 20) + `<line x1="180" y1="20" x2="180" y2="45"/>` + SC.pulley(180, 60, 22) + SC.rope([[158, 60], [158, 150]]) + SC.rope([[202, 60], [202, 120]]),
      bodies: [{ id: 'a1', x: 158, y: 172, w: 40, h: 44, label: '20' }, { id: 'a2', x: 202, y: 142, w: 44, h: 48, label: '25' }],
      forces: ['mg', 'T', 'N', 'F'], dirs: SC.DIR4,
      ans: { a1: { mg: 'down', T: 'up' }, a2: { mg: 'down', T: 'up' } },
      why: { N: 'Ahvid ei seisa pinnal.', F: 'Ahvile mõjub ainult nööri tõmme ja raskusjõud. Ronimine tähendab, et ahv tõmbab nööri, nöör tõmbab teda üles.' },
      dirWhy: { T: 'Nöör tõmbab ahvi üles.' }
    }),
    mc(R`Raskem ahv püsib samal kõrgusel. Mida see tähendab tema jaoks?`, [R`*Tema kiirendus on null, seega $T = m_2g$`, R`$T = m_1g$||Kergem ahv ei ole tasakaalus, ta tõuseb kiirendusega.`, R`$T = (m_1 + m_2)g$||Iga nööriotsa tõmme on üks ja sama $T$.`]),
    num(R`Nööri tõmme:`, 245, 'N', { label: R`T` }),
    num(R`Kergema ahvi kiirendus:`, 2.45, 'm/s²', { label: R`a_1`, hint: R`$m_1a_1 = T - m_1g$` }),
    num(R`Aeg, mille jooksul kergem ahv tõuseb 19,6 m:`, 4, 's', { final: true, label: R`t`, hint: R`$s_1 = \frac{a_1t^2}{2}$` })
  ],
  sol: R`Raskem ahv on paigal: $T = m_2g$. Kergemale ahvile: $m_1a_1 = T - m_1g = (m_2 - m_1)g$,
$$a_1 = \left(\frac{m_2}{m_1} - 1\right)g = 2.45\ \text{m/s}^2, \qquad t = \sqrt{\frac{2s_1}{a_1}} = 4\ \text{s}$$`,
  ans: R`4,0 s`
});

P({ id: '122', b: 4, k: 'T',
  text: R`Kui suure jõuga peab mõjuma vagunile, et ta hakkaks liikuma ühtlaselt kiirenevalt ja läbiks horisontaalsel teel 30 s jooksul 11 m? Vaguni mass on 16 t. Liikumise ajal mõjub vagunile hõõrdejõud, mis moodustab 5,0 % vaguni kaalust.`,
  given: R`<b>Andmed:</b> $t = 30\ \text{s}$, $s = 11\ \text{m}$, $m = 16\ \text{t}$, $F_h = 0.05\,mg$ (s.t. $\mu = 0.05$).<br><b>Leida:</b> $F_v$.`,
  steps: [
    frc(R`Joonesta vagunile mõjuvad jõud. Vagun liigub paremale.`, {
      w: 360, h: 190, bg: SC.ground(10, 350, 150),
      bodies: [{ id: 'V', x: 180, y: 118, w: 120, h: 60, label: 'vagun' }],
      forces: ['mg', 'N', 'Fv', 'Fh', 'T'], dirs: SC.DIR4,
      ans: { V: { mg: 'down', N: 'up', Fv: 'right', Fh: 'left' } },
      why: { T: 'Niiti ega trossi pole mainitud, vagunile mõjub veojõud.' },
      dirWhy: { Fh: 'Hõõrdejõud on liikumisele vastu.', Fv: 'Veojõud on liikumise suunas.' }
    }),
    mc(R`Milline on Newtoni II seadus liikumise suunas?`, [R`*$ma = F_v - F_h$`, R`$ma = F_v + F_h$||Hõõrdejõud on liikumisele vastu, seega miinusega.`, R`$F_v = F_h$||See oleks ühtlane liikumine, aga vagun kiireneb.`]),
    num(R`Kiirendus:`, 0.02444, 'm/s²', { label: R`a`, hint: R`$s = \frac{at^2}{2}$` }),
    num(R`Hõõrdejõud:`, 7840, 'N', { label: R`F_h`, hint: R`$F_h = \mu mg$, $m = 16000\ \text{kg}$` }),
    num(R`Vajalik jõud:`, 8231, 'N', { final: true, label: R`F_v` })
  ],
  sol: R`$a = \frac{2s}{t^2} = 0.024\ \text{m/s}^2$. $ma = F_v - F_h$, $F_h = \mu mg$:
$$F_v = m(a + \mu g) = 16000(0.024 + 0.49) = 8.2\ \text{kN}$$`,
  ans: R`8,2 kN`,
  note: R`„5 % vaguni kaalust“ tähendab $F_h = 0.05\cdot mg$, s.t. hõõrdetegur $\mu = 0.05$ (nii ka konspektis).`
});

P({ id: '124(1)', b: 4, k: 'T',
  text: R`Joonisel 4 kujutatud süsteemis on keha A mass 200 g, keha B mass 300 g, hõõrdetegur laua ja keha vahel 0,25. Määrake niidi tõmme, jättes ploki inertsi ja hõõrdumise plokis arvestamata. Milline on vastus, kui kehad A ja B ära vahetada? Leidke mõlemal juhul ploki teljele mõjuv jõud.<br><i>Osa 1: kehad joonisel näidatud kohtadel.</i>`,
  fig: joon4('A', 'B'),
  given: R`<b>Andmed:</b> $m_A = 0.2\ \text{kg}$ (laual), $m_B = 0.3\ \text{kg}$ (ripub), $\mu = 0.25$.<br><b>Leida:</b> $T$, ploki teljele mõjuv jõud $F$.`,
  note: R`NB! Konspekti lahenduses on selle ülesande niidi tõmbe arvutuses viga. Pärast lahendamist näed, milles see seisneb.`,
  after: R`Konspektis on tõmme arvutatud valemiga $T = m_B(a + g) = 4.4\ \text{N}$. See on viga: B liigub alla, seega $m_Ba = m_Bg - T$ ja $T = m_B(g - a) = 1.5\ \text{N}$, mis klapib raamatu vastusega.`,
  steps: [
    frc(R`Joonesta kehadele A ja B mõjuvad jõud.`, scene124()),
    mc(R`Kirjuta Newtoni II seadus mõlemale kehale (positiivne suund on liikumise suund).`, [
      R`*A: $m_Aa = T - \mu m_Ag$; B: $m_Ba = m_Bg - T$`,
      R`A: $m_Aa = T + \mu m_Ag$; B: $m_Ba = m_Bg - T$||Hõõrdejõud takistab A liikumist, seega miinusega.`,
      R`A: $m_Aa = T - \mu m_Ag$; B: $m_Ba = T - m_Bg$||B liigub alla, liikumise suunas on raskusjõud, niit on vastu.`
    ], '', '', { wide: true }),
    mc(R`Liida võrrandid, et $T$ kaoks. Kiirendus on:`, [R`*$a = \frac{(m_B - \mu m_A)g}{m_A + m_B}$`, R`$a = \frac{m_Bg}{m_A + m_B}$||Hõõrdejõud on puudu.`, R`$a = \frac{(m_B - \mu m_A)g}{m_B}$||Kiirendatakse mõlemat keha, nimetajas on kogumass.`]),
    num(R`Kiirendus:`, 4.9, 'm/s²', { label: R`a` }),
    num(R`Niidi tõmme:`, 1.47, 'N', { final: true, label: R`T`, alts: [{ a: 4.41, msg: 'See on konspektis olev viga: $T = m_B(g - a)$, mitte $m_B(g + a)$, sest B liigub alla.' }] }),
    mc(R`Plokki tõmbab niit kahes suunas: vasakule (horisontaalne osa) ja alla (vertikaalne osa). Kui suur on teljele mõjuv jõud?`, [R`*$F = T\sqrt2$, sest kaks võrdset ristuvat jõudu`, R`$F = 2T$||Jõud on risti, mitte samas suunas.`, R`$F = T$||Plokki tõmbavad niidi mõlemad pooled.`]),
    num(R`Ploki teljele mõjuv jõud:`, 2.08, 'N', { final: true, label: R`F` })
  ],
  sol: R`A: $m_Aa = T - \mu m_Ag$, B: $m_Ba = m_Bg - T$. Liites:
$$a = \frac{(m_B - \mu m_A)g}{m_A + m_B} = \frac{(0.3 - 0.05)\cdot 9.8}{0.5} = 4.9\ \text{m/s}^2$$
$$T = m_B(g - a) = 0.3\cdot 4.9 = 1.5\ \text{N}, \qquad F = T\sqrt2 = 2.1\ \text{N}$$`,
  ans: R`$T = 1.5\ \text{N}$, teljele $2.1\ \text{N}$.`
});

P({ id: '126(1)', b: 4, k: 'T',
  text: R`Leidke joonisel 5 näidatud süsteemi jaoks tingimus, mille korral keha massiga $m_2$ hakkab: 1) laskuma, 2) tõusma. Hõõrdetegur keha $m_1$ ja kaldpinna vahel on $\mu$. Niidi ja ploki mass ning hõõrdumine plokis jätke arvestamata.<br><i>Osa 1: $m_2$ laskub.</i>`,
  fig: joon5(),
  steps: [
    frc(R`$m_2$ laskub, seega $m_1$ liigub mööda kaldpinda üles. Joonesta mõlemale kehale mõjuvad jõud.`, scene126('up')),
    match(R`Jaota $m_1$ raskusjõud komponentideks. Sobita.`, [[R`Piki kaldpinda (alla)`, R`$m_1g\sin\alpha$`], [R`Risti kaldpinnaga`, R`$m_1g\cos\alpha$`], [R`Hõõrdejõud`, R`$\mu m_1g\cos\alpha$`]]),
    mc(R`Kirjuta Newtoni II seadus süsteemile (positiivne suund: $m_2$ alla, $m_1$ üles).`, [
      R`*$(m_1 + m_2)a = m_2g - m_1g\sin\alpha - \mu m_1g\cos\alpha$`,
      R`$(m_1 + m_2)a = m_2g - m_1g\sin\alpha + \mu m_1g\cos\alpha$||Hõõrdejõud takistab liikumist, see tuleb lahutada.`,
      R`$(m_1 + m_2)a = m_2g - m_1g\cos\alpha - \mu m_1g\sin\alpha$||Siinus ja koosinus on vahetuses.`
    ], '', '', { wide: true }),
    mc(R`$m_2$ hakkab laskuma, kui $a > 0$. Tingimus:`, [R`*$m_2 > m_1(\sin\alpha + \mu\cos\alpha)$`, R`$m_2 > m_1(\sin\alpha - \mu\cos\alpha)$||See on tingimus, et $m_1$ hakkaks alla libisema (osa 2).`, R`$m_2 > m_1$||Kaldpind ja hõõrdumine muudavad tingimust.`])
  ],
  sol: R`$m_2$ liigub alla, $m_1$ üles. $m_1$-le mõjub piki kaldpinda alla $m_1g\sin\alpha$ ja hõõrdejõud $\mu m_1g\cos\alpha$, üles niidi tõmme $T$. $m_2$-le alla $m_2g$, üles $T$.
$$(m_1 + m_2)a = m_2g - m_1g(\sin\alpha + \mu\cos\alpha)$$
$a > 0$, kui $m_2 > m_1(\sin\alpha + \mu\cos\alpha)$.`,
  ans: R`$m_2 > m_1(\sin\alpha + \mu\cos\alpha)$`
});

/* ---- Kodused ---- */

P({ id: '94', b: 4, k: 'K',
  text: R`Kuul massiga 12 g väljub püssirauast kiirusega 400 m/s. Kuuli liikumise aeg püssirauas on 5,1 ms. Määrake kuulile mõjuv jõud.`,
  steps: [
    num(R`Kiirendus püssirauas:`, 78430, 'm/s²', { label: R`a`, hint: R`$a = \frac{v}{t}$, $t = 0.0051\ \text{s}$` }),
    num(R`Kuulile mõjuv jõud:`, 941, 'N', { final: true, label: R`F`, alts: [{ a: 941e3, msg: 'Mass tuleb võtta kilogrammides (0,012 kg).' }] })
  ],
  sol: R`$a = \frac{v}{t} = 7.8\cdot 10^4\ \text{m/s}^2$, $F = ma = 0.012\cdot 7.8\cdot 10^4 = 0.94\ \text{kN}$.`,
  ans: R`0,94 kN`
});

P({ id: '97', b: 4, k: 'K',
  text: R`Üle liikumatu ploki on pandud nöör, mille otste külge riputatakse kehad massiga 500 g ja 600 g. Kui suure kiirendusega hakkavad kehad liikuma?`,
  steps: [
    frc(R`Joonesta kehadele mõjuvad jõud.`, {
      w: 360, h: 230, bg: SC.ceiling(120, 240, 20) + `<line x1="180" y1="20" x2="180" y2="45"/>` + SC.pulley(180, 60, 22) + SC.rope([[158, 60], [158, 120]]) + SC.rope([[202, 60], [202, 150]]),
      bodies: [{ id: 'm1', x: 158, y: 142, w: 38, h: 44, label: '500' }, { id: 'm2', x: 202, y: 175, w: 42, h: 50, label: '600' }],
      forces: ['mg', 'T', 'N'], dirs: SC.DIR4,
      ans: { m1: { mg: 'down', T: 'up' }, m2: { mg: 'down', T: 'up' } },
      why: { N: 'Kehad ripuvad, toetuspinda pole.' }
    }),
    mc(R`Raskem keha liigub alla. Kiirendus on:`, [R`*$a = \frac{(m_2 - m_1)g}{m_1 + m_2}$`, R`$a = \frac{(m_2 - m_1)g}{m_2}$||Kiirendatakse mõlemat keha.`, R`$a = g$||Teine keha takistab kukkumist.`]),
    num(R`Kiirendus:`, 0.891, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`$m_2a = m_2g - T$, $m_1a = T - m_1g$. Liites: $a = \frac{(m_2 - m_1)g}{m_1 + m_2} = \frac{0.1\cdot 9.8}{1.1} = 0.89\ \text{m/s}^2$.`,
  ans: R`0,89 m/s²`
});

P({ id: '100', b: 4, k: 'K',
  text: R`Üle liikumatu ploki asetatud paela otste külge on kinnitatud kehad massiga 2,00 kg ja 3,00 kg. Milline on paelale mõjuv tõmbejõud süsteemi vabal liikumisel? Kui suur jõud mõjub seejuures ploki teljele? Ploki mass jätke arvestamata.`,
  steps: [
    num(R`Kiirendus:`, 1.96, 'm/s²', { label: R`a`, hint: R`$a = \frac{(m_2 - m_1)g}{m_1 + m_2}$` }),
    mc(R`Kuidas leida tõmbejõud?`, [R`*$T = m_1(g + a)$ (kergem keha tõuseb)`, R`$T = m_1(g - a)$||Kergem keha liigub üles, niit peab teda tõmbama rohkem kui $m_1g$.`, R`$T = m_2g$||Raskem keha ei ole tasakaalus.`]),
    num(R`Tõmbejõud:`, 23.52, 'N', { final: true, label: R`T` }),
    mc(R`Ploki teljele mõjuv jõud:`, [R`*$2T$, sest mõlemad pooled tõmbavad plokki alla`, R`$T$||Pael tõmbab plokki mõlemalt poolt.`, R`$(m_1 + m_2)g$||Süsteem liigub kiirendusega, seega mitte.`]),
    num(R`Jõud teljele:`, 47.04, 'N', { final: true, label: R`F` })
  ],
  sol: R`$a = \frac{(m_2 - m_1)g}{m_1 + m_2} = 1.96\ \text{m/s}^2$, $T = m_1(g + a) = \frac{2m_1m_2g}{m_1 + m_2} = 23.5\ \text{N}$, teljele $2T = 47.1\ \text{N}$.`,
  ans: R`23,5 N; 47,1 N`
});

P({ id: '118', b: 4, k: 'K',
  text: R`Auto massiga 2,0 t alustab liikumist ühtlaselt kiirenevalt ja saavutab 5,0 s pärast kiiruse 10 m/s. Leidke mootori veojõud, kui liikumise ajal mõjub autole konstantne hõõrdejõud 980 N.`,
  steps: [
    frc(R`Joonesta autole mõjuvad jõud. Auto liigub paremale.`, {
      w: 360, h: 190, bg: SC.ground(10, 350, 150),
      bodies: [{ id: 'A', x: 180, y: 122, w: 100, h: 52, label: 'auto' }],
      forces: ['mg', 'N', 'Fv', 'Fh'], dirs: SC.DIR4,
      ans: { A: { mg: 'down', N: 'up', Fv: 'right', Fh: 'left' } },
      dirWhy: { Fh: 'Hõõrdejõud on liikumisele vastu.', Fv: 'Veojõud on liikumise suunas.' }
    }),
    num(R`Kiirendus:`, 2, 'm/s²', { label: R`a` }),
    num(R`Veojõud:`, 4980, 'N', { final: true, label: R`F_v`, hint: R`$F_v = ma + F_h$`, alts: [{ a: 3020, msg: 'Hõõrdejõud tuleb juurde liita, mitte lahutada: veojõud peab ületama ka hõõrdumise.' }] })
  ],
  sol: R`$a = \frac{v}{t} = 2\ \text{m/s}^2$, $ma = F_v - F_h \Rightarrow F_v = 4000 + 980 = 5.0\ \text{kN}$.`,
  ans: R`5,0 kN`
});

P({ id: '120', b: 4, k: 'K',
  text: R`Keha liikus ühtlaselt aeglustuvalt horisontaalsel teel. Läbinud 40 s jooksul tee 100 m, ta peatus. Leidke hõõrdetegur.`,
  steps: [
    frc(R`Keha liigub paremale ja aeglustub. Joonesta jõud.`, {
      w: 360, h: 180, bg: SC.ground(10, 350, 140),
      bodies: [{ id: 'K', x: 180, y: 115, w: 70, h: 50, label: '' }],
      forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.DIR4,
      ans: { K: { mg: 'down', N: 'up', Fh: 'left' } },
      why: { F: 'Keha liigub inertsist, keegi teda ei lükka.' }
    }),
    mc(R`Peatuval kehal on liikumine „tagurpidi“ sama mis paigalt kiirenemine. Kiirendus on:`, [R`*$a = \frac{2s}{t^2}$`, R`$a = \frac{s}{t^2}$||$s = \frac{at^2}{2}$.`]),
    num(R`Kiirenduse moodul:`, 0.125, 'm/s²', { label: R`a` }),
    num(R`Hõõrdetegur:`, 0.01276, '', { final: true, label: R`\mu`, hint: R`$\mu mg = ma$` })
  ],
  sol: R`$a = \frac{2s}{t^2} = 0.125\ \text{m/s}^2$; $\mu mg = ma \Rightarrow \mu = \frac{a}{g} = 0.013$.`,
  ans: R`0,013`
});

P({ id: '124(2)', b: 4, k: 'K',
  text: R`Joonisel 4 kujutatud süsteemis on keha A mass 200 g, keha B mass 300 g, hõõrdetegur laua ja keha vahel 0,25. Määrake niidi tõmme, jättes ploki inertsi ja hõõrdumise plokis arvestamata. Milline on vastus, kui kehad A ja B ära vahetada? Leidke mõlemal juhul ploki teljele mõjuv jõud.<br><i>Osa 2: kehad on vahetatud (laual on 300 g, ripub 200 g).</i>`,
  fig: joon4('B', 'A'),
  steps: [
    num(R`Kiirendus:`, 2.45, 'm/s²', { label: R`a`, hint: R`$a = \frac{(m_{ripub} - \mu m_{laual})g}{m_A + m_B}$` }),
    num(R`Niidi tõmme:`, 1.47, 'N', { final: true, label: R`T`, hint: R`$T = m_{ripub}(g - a)$` }),
    num(R`Ploki teljele mõjuv jõud:`, 2.08, 'N', { final: true, label: R`F` })
  ],
  sol: R`$a = \frac{(0.2 - 0.25\cdot 0.3)\cdot 9.8}{0.5} = 2.45\ \text{m/s}^2$, $T = 0.2(9.8 - 2.45) = 1.5\ \text{N}$, $F = T\sqrt2 = 2.1\ \text{N}$.`,
  ans: R`$T = 1.5\ \text{N}$, teljele $2.1\ \text{N}$.`
});

P({ id: '126(2)', b: 4, k: 'K',
  text: R`Leidke joonisel 5 näidatud süsteemi jaoks tingimus, mille korral keha massiga $m_2$ hakkab: 1) laskuma, 2) tõusma. Hõõrdetegur keha $m_1$ ja kaldpinna vahel on $\mu$. Niidi ja ploki mass ning hõõrdumine plokis jätke arvestamata.<br><i>Osa 2: $m_2$ tõuseb.</i>`,
  fig: joon5(),
  steps: [
    frc(R`$m_2$ tõuseb, seega $m_1$ libiseb mööda kaldpinda alla. Joonesta jõud.`, scene126('down')),
    mc(R`Newtoni II seadus (positiivne suund: $m_1$ alla, $m_2$ üles):`, [
      R`*$(m_1 + m_2)a = m_1g\sin\alpha - \mu m_1g\cos\alpha - m_2g$`,
      R`$(m_1 + m_2)a = m_1g\sin\alpha + \mu m_1g\cos\alpha - m_2g$||Hõõrdejõud on nüüd suunatud üles, liikumisele vastu.`
    ], '', '', { wide: true }),
    mc(R`Tingimus:`, [R`*$m_2 < m_1(\sin\alpha - \mu\cos\alpha)$`, R`$m_2 < m_1(\sin\alpha + \mu\cos\alpha)$||Siis võib süsteem ka paigale jääda: hõõrdumine töötab alati liikumise vastu.`])
  ],
  sol: R`$m_1$ libiseb alla: $(m_1 + m_2)a = m_1g\sin\alpha - \mu m_1g\cos\alpha - m_2g$. $a > 0$, kui $m_2 < m_1(\sin\alpha - \mu\cos\alpha)$.`,
  ans: R`$m_2 < m_1(\sin\alpha - \mu\cos\alpha)$`
});

/* ---- Sarnased ---- */

P({ id: '93', b: 4, k: 'S',
  text: R`Tramm massiga 9,0 t sõidab kiirusega 12 km/h. Trammi pidurdamiseks kulub 5,0 s. Kui suur on pidurdav jõud?`,
  steps: [
    num(R`Kiirus SI-ühikutes:`, 3.333, 'm/s', { label: R`v` }),
    num(R`Pidurdav jõud:`, 6000, 'N', { final: true, label: R`F` })
  ],
  sol: R`$a = \frac{3.33}{5} = 0.667\ \text{m/s}^2$, $F = ma = 6.0\ \text{kN}$.`,
  ans: R`6,0 kN`
});

P({ id: '98', b: 4, k: 'S',
  text: R`Üle liikumatu ploki pandud niidi otste külge kinnitatakse kehad massiga 100 g ja 120 g. Kui suure kiirendusega hakkavad kehad liikuma?`,
  steps: [num(R`Kiirendus:`, 0.891, 'm/s²', { final: true, label: R`a`, hint: R`$a = \frac{(m_2 - m_1)g}{m_1 + m_2}$` })],
  sol: R`$a = \frac{0.02\cdot 9.8}{0.22} = 0.89\ \text{m/s}^2$.`,
  ans: R`0,89 m/s²`
});

P({ id: '99', b: 4, k: 'S',
  text: R`Üle liikumatu ploki rippuva paela ühe otsa külge on kinnitatud keha massiga 800 g. Millise kiirendusega hakkab see keha liikuma, kui 1) paela teisest otsast tõmmata jõuga 9,81 N, 2) paela teise otsa riputada keha massiga 1,00 kg?`,
  steps: [
    mc(R`Mis vahe on neil kahel juhul?`, [R`*Teisel juhul tuleb kiirendada ka 1 kg keha, seega kiirendus on väiksem`, R`Vahet pole, mõlemal juhul tõmbab 9,81 N||Rippuv keha ei tõmba paela jõuga $mg$, kui ta ise kiirendusega liigub.`]),
    num(R`1) Kiirendus:`, 2.46, 'm/s²', { final: true, label: R`a_1`, hint: R`$m a_1 = F - mg$` }),
    num(R`2) Kiirendus:`, 1.09, 'm/s²', { final: true, label: R`a_2` })
  ],
  sol: R`1) $a = \frac{9.81 - 7.84}{0.8} = 2.45\ \text{m/s}^2$. 2) $a = \frac{(1 - 0.8)g}{1.8} = 1.09\ \text{m/s}^2$.`,
  ans: R`2,45 m/s²; 1,09 m/s²`
});

P({ id: '119', b: 4, k: 'S',
  text: R`Vagun massiga 12 t hakkas tõuke mõjul liikuma kiirusega 5 m/s, kuid hõõrdejõu tõttu peatus 1 min pärast. Leidke hõõrdejõud.`,
  steps: [num(R`Hõõrdejõud:`, 1000, 'N', { final: true, label: R`F_h`, hint: R`$F_h = m\frac{v}{t}$, $t = 60\ \text{s}$` })],
  sol: R`$a = \frac{5}{60}$, $F_h = 12000\cdot\frac{5}{60} = 1\ \text{kN}$.`,
  ans: R`1 kN`
});

P({ id: '121', b: 4, k: 'S',
  text: R`Pidurdamisel on hõõrdetegur auto rataste ja tee sillutise vahel 0,25. Kui pika tee läbib kiirusega 36 km/h sõitev auto pidurdamise algusest peatumiseni?`,
  steps: [
    num(R`Pidurduskiirendus:`, 2.45, 'm/s²', { label: R`a`, hint: R`$ma = \mu mg$` }),
    num(R`Pidurdustee:`, 20.4, 'm', { final: true, label: R`s`, hint: R`$s = \frac{v^2}{2a}$, $v = 10\ \text{m/s}$` })
  ],
  sol: R`$a = \mu g = 2.45$, $s = \frac{v^2}{2a} = \frac{100}{4.9} = 20\ \text{m}$.`,
  ans: R`20 m`
});

P({ id: '125', b: 4, k: 'S',
  text: R`Kui suure kiirendusega libiseb keha mööda kaldpinda alla, kui pinna kaldenurk on 30° ja hõõrdetegur 0,10?`,
  steps: [
    frc(R`Joonesta kehale mõjuvad jõud.`, (function () {
      const p = SC.onIncline(40, 200, 280, 30, 0.5, 30);
      return { w: 360, h: 230, bg: SC.incline(40, 200, 280, 30),
        bodies: [{ id: 'K', x: p.x, y: p.y, w: 54, h: 30, rot: 30, label: '' }],
        forces: ['mg', 'N', 'Fh'], dirs: SC.inclineDirs(30),
        ans: { K: { mg: 'down', N: 'normal', Fh: 'upslope' } },
        dirWhy: { Fh: 'Keha libiseb alla, hõõrdejõud on suunatud üles.' } };
    })()),
    mc(R`Kiirendus:`, [R`*$a = g(\sin\alpha - \mu\cos\alpha)$`, R`$a = g(\sin\alpha + \mu\cos\alpha)$||Hõõrdumine vähendab kiirendust.`, R`$a = g(\cos\alpha - \mu\sin\alpha)$||Siinus ja koosinus on vahetuses.`]),
    num(R`Arvuta:`, 4.05, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`$ma = mg\sin\alpha - \mu mg\cos\alpha \Rightarrow a = 9.8(0.5 - 0.0866) = 4.1\ \text{m/s}^2$.`,
  ans: R`4,1 m/s²`
});

})();
