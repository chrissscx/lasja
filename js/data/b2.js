/* 2. Kõverjooneline liikumine. Tunnis: 43, 46, 50, 60. Kodus: 41, 42, 51, 58. */
(function () {
const R = String.raw;

// väike graafik valikvariandi jaoks
function plot(fn, x0, x1, label) {
  const W = 150, H = 110, pad = 14;
  const pts = [];
  let ymin = 1e9, ymax = -1e9;
  for (let i = 0; i <= 40; i++) { const x = x0 + (x1 - x0) * i / 40; const y = fn(x); pts.push([x, y]); ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }
  ymin = Math.min(ymin, 0); ymax = Math.max(ymax, 0);
  const sx = x => pad + (x - x0) / (x1 - x0) * (W - 2 * pad);
  const sy = y => H - pad - (y - ymin) / (ymax - ymin || 1) * (H - 2 * pad);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" width="150" height="110" style="display:block">
    <line x1="${sx(x0)}" y1="${sy(0)}" x2="${W - 4}" y2="${sy(0)}" stroke="currentColor" opacity=".5"/>
    <line x1="${sx(Math.max(x0, 0))}" y1="${H - 4}" x2="${sx(Math.max(x0, 0))}" y2="4" stroke="currentColor" opacity=".5"/>
    <path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <text x="${W - 10}" y="${sy(0) - 4}" font-size="10" fill="currentColor">x</text>
    <text x="${sx(Math.max(x0, 0)) + 4}" y="12" font-size="10" fill="currentColor">y</text>
    ${label ? `<text x="${W / 2}" y="${H - 1}" font-size="9" text-anchor="middle" fill="currentColor">${label}</text>` : ''}</svg>`;
}

P({ id: '43', b: 2, k: 'T',
  text: R`Punktmassi kohavektori sõltuvus ajast on $\vec r = 5.0t\,\vec i + (2.0t^2 - 2.0)\,\vec j$ (SI ühikud). Leida: a) punktmassi nihe ja tema moodul ajavahemikul 5,0 s kuni 8,0 s; b) trajektoori võrrand ja joonesta selle graafik; c) kiirus ja kiirendus, samuti nende moodulid ajahetkel 5,0 s ning punktis koordinaatidega (5; 0).`,
  given: R`<b>Andmed:</b> $\vec r = 5t\,\vec i + (2t^2 - 2)\vec j$, $t_1 = 5\ \text{s}$, $t_2 = 8\ \text{s}$.<br><b>Leida:</b> $\Delta\vec r$, $|\Delta\vec r|$; $y(x)$; $\vec v$, $\vec a$, $v$, $a$.`,
  steps: [
    mc(R`Kuidas leida nihkevektor?`, [R`*$\Delta\vec r = \vec r(t_2) - \vec r(t_1)$`, R`$\Delta\vec r = \int \vec r\,dt$||Kohavektorit ei integreerita, nihe on lõpp- ja alguspunkti kohavektorite vahe.`, R`$\Delta\vec r = \dot{\vec r}$||See on kiirus.`]),
    num(R`Nihke x-komponent:`, 15, 'm', { label: R`\Delta x`, hint: R`$5\cdot 8 - 5\cdot 5$` }),
    num(R`Nihke y-komponent:`, 78, 'm', { label: R`\Delta y`, hint: R`$(2\cdot 64 - 2) - (2\cdot 25 - 2)$` }),
    num(R`Nihke moodul:`, 79.4, 'm', { final: true, label: R`|\Delta\vec r|`, ex: R`$\sqrt{15^2 + 78^2} \approx 79\ \text{m}$` }),
    mc(R`b) Trajektoori võrrandi saamiseks avalda $x = 5t$ põhjal $t$ ja asenda $y$-i. Mis tuleb?`, [R`*$y = 0.08x^2 - 2$`, R`$y = 0.4x^2 - 2$||$t = x/5$, seega $t^2 = x^2/25$ ja $2t^2 = 0.08x^2$.`, R`$y = 2x^2 - 2$||Unustasid $t$ avaldada.`]),
    mc(R`Milline graafik kujutab trajektoori $y = 0.08x^2 - 2$ (punktmass liigub $t \geq 0$, seega $x \geq 0$)?`, [
      '*' + plot(x => 0.08 * x * x - 2, 0, 10, 'parabooli parem haru'),
      plot(x => -0.08 * x * x + 2, 0, 10) + '||Parabool avaneb üles, sest $x^2$ kordaja on positiivne.',
      plot(x => 0.8 * x - 2, 0, 10) + '||See on sirge. Trajektoor on parabool.'
    ], R`Algpunkt ($t = 0$) on $(0; -2)$, $x$-teljega lõikub parabool kohal $x = 5$.`),
    mc(R`c) Kiirusvektor on $\vec v = \dot{\vec r} = ?$`, [R`*$\vec v = 5\vec i + 4t\,\vec j$`, R`$\vec v = 5\vec i + 2t\,\vec j$||$\frac{d}{dt}(2t^2) = 4t$.`, R`$\vec v = 5t\vec i + 4t\vec j$||Tuletis $5t$-st on 5.`]),
    num(R`Kiiruse moodul ajahetkel 5 s:`, 20.6, 'm/s', { final: true, label: R`v`, ex: R`$\vec v = 5\vec i + 20\vec j$, $v = \sqrt{25 + 400} \approx 21\ \text{m/s}$` }),
    num(R`Kiirenduse moodul:`, 4, 'm/s²', { final: true, label: R`a`, ex: R`$\vec a = \dot{\vec v} = 4\vec j$, $a = 4\ \text{m/s}^2$ (ei sõltu ajast).` }),
    num(R`Mis ajahetkel on punktmass punktis (5; 0)?`, 1, 's', { label: R`t`, hint: R`$5t = 5$` }),
    num(R`Kiiruse moodul punktis (5; 0):`, 6.4, 'm/s', { final: true, label: R`v`, ex: R`$\vec v = 5\vec i + 4\vec j$, $v = \sqrt{41} \approx 6.4\ \text{m/s}$; kiirendus on ikka $4\ \text{m/s}^2$.` })
  ],
  sol: R`<b>a) Nihe.</b> Konspektist $\Delta\vec r = \vec r(t_2) - \vec r(t_1)$. Arvutame kohavektori mõlemal ajahetkel:
$$\vec r(5) = 25\vec i + (50 - 2)\vec j = 25\vec i + 48\vec j, \qquad \vec r(8) = 40\vec i + (128 - 2)\vec j = 40\vec i + 126\vec j$$
$$\Delta\vec r = 15\vec i + 78\vec j, \qquad |\Delta\vec r| = \sqrt{15^2 + 78^2} \approx 79\ \text{m}$$

<b>b) Trajektoor.</b> Avaldame $x = 5t$ põhjal $t = \frac{x}{5}$ ja asendame $y$-isse:
$$y = 2t^2 - 2 = 2\frac{x^2}{25} - 2 = 0.08x^2 - 2 \ (\text{parabool})$$

<b>c) Kiirus ja kiirendus.</b> Konspektist $\vec v = \dot{\vec r}$, $\vec a = \dot{\vec v}$:
$$\vec v = 5\vec i + 4t\,\vec j, \qquad \vec a = 4\vec j$$
Ajahetkel $t = 5\ \text{s}$: $\vec v = 5\vec i + 20\vec j$, $v = \sqrt{25 + 400} \approx 21\ \text{m/s}$, $a = 4\ \text{m/s}^2$.
<br>Punktis $(5; 0)$ on $5t = 5 \Rightarrow t = 1\ \text{s}$: $\vec v = 5\vec i + 4\vec j$, $v = \sqrt{41} \approx 6.4\ \text{m/s}$, $a = 4\ \text{m/s}^2$.`,
  ans: R`$\Delta\vec r = 15\vec i + 78\vec j$, 79 m; $y = 0.080x^2 - 2.0$; $\vec v = 5\vec i + 20\vec j$, 21 m/s, $\vec a = 4\vec j$, 4 m/s²; punktis (5; 0): $\vec v = 5\vec i + 4\vec j$, 6,4 m/s, 4 m/s².`,
  note: R`Konspekti lahenduses on tehtud osad a) ja c) ajahetke 5 s jaoks. Osad b) ja punkt (5; 0) on raamatu tekstist.`
});

P({ id: '46', b: 2, k: 'T',
  text: R`Punktmassi kiirus $v = At^4 + Bt^2 + C$ ($A = 0.150\ \text{m}\cdot\text{s}^{-5}$, $B = 1.00\ \text{m}\cdot\text{s}^{-3}$, $C = 5.00\ \text{m}\cdot\text{s}^{-1}$). Leida ajavahemikus 0 kuni 3,50 s läbitud teepikkus.`,
  steps: [
    mc(R`Teepikkus on $s = \int_0^{t} v\,dt$. Mis on algfunktsioon?`, [R`*$\frac{At^5}{5} + \frac{Bt^3}{3} + Ct$`, R`$4At^3 + 2Bt$||See on tuletis.`, R`$At^5 + Bt^3 + Ct$||Jagamine astendajaga on puudu.`]),
    num(R`Arvuta läbitud teepikkus.`, 47.55, 'm', { final: true, label: R`s`, hint: R`$0.03\cdot 3.5^5 + \frac{3.5^3}{3} + 5\cdot 3.5$`, ex: R`$15.76 + 14.29 + 17.5 = 47.6\ \text{m}$` })
  ],
  sol: R`Konspektist teepikkus $s = \int_{t_1}^{t_2} v\,dt$. Integreerime iga liikme ($\int t^n\,dt = \frac{t^{n+1}}{n+1}$):
$$s = \int_0^{3.5}(At^4 + Bt^2 + C)\,dt = \frac{At^5}{5} + \frac{Bt^3}{3} + Ct$$
Asendame $A = 0.15$, $B = 1$, $C = 5$ ja $t = 3.5\ \text{s}$ (algpiir 0 annab nulli):
$$s = 0.03\cdot 3.5^5 + \frac{3.5^3}{3} + 5\cdot 3.5 = 15.76 + 14.29 + 17.5 \approx 47.6\ \text{m}$$`,
  ans: R`47,6 m`
});

P({ id: '50', b: 2, k: 'T',
  text: R`2,0 m kõrguselt horisontaalsuunas visatud kivi kukkus 7,0 m kaugusele horisontaalsihis. Leida kivi alg- ja lõppkiirus.`,
  given: R`<b>Andmed:</b> $z_0 = 2\ \text{m}$, $x = 7\ \text{m}$, $\alpha = 0$.<br><b>Leida:</b> $v_0$, $v$ (konspektis ka nurk $\beta$ lõppkiiruse ja maapinna vahel).`,
  steps: [
    mc(R`Horisontaalsel viskel ($\alpha = 0$) on liikumisvõrrandid:`, [R`*$x = v_0t$, $z = z_0 - \frac{gt^2}{2}$, $v_x = v_0$, $v_z = -gt$`, R`$x = v_0t - \frac{gt^2}{2}$||Horisontaalsihis kiirendust pole.`, R`$z = z_0 + v_0t - \frac{gt^2}{2}$||Vertikaalne algkiirus on null, sest visati horisontaalselt.`], '', '', { wide: true }),
    num(R`Leia lennuaeg (kivi jõuab maapinnale, $z = 0$).`, 0.639, 's', { label: R`t`, hint: R`$t = \sqrt{\frac{2z_0}{g}}$` }),
    num(R`Leia algkiirus.`, 10.96, 'm/s', { final: true, label: R`v_0`, hint: R`$v_0 = \frac{x}{t}$` }),
    num(R`Kiiruse vertikaalkomponendi moodul maapinnal:`, 6.26, 'm/s', { label: R`|v_z|`, hint: R`$|v_z| = gt$` }),
    frc(R`Joonesta kivi kiirus maapinnale jõudmisel: komponendid $v_x$, $v_z$ ja summaarne kiirus $v$.`, {
      w: 360, h: 220, bg: SC.ground(10, 350, 190) + `<path class="dash" d="M30,40 Q150,45 200,170"/><text x="20" y="34">vise</text>`,
      bodies: [{ id: 'K', x: 200, y: 172, w: 18, h: 18, shape: 'circle', label: '' }],
      forces: ['vx', 'vz', 'v', 'a'], dirs: SC.DIR8,
      ans: { K: { vx: 'right', vz: 'down', v: 'dr' } },
      why: { a: 'Siin küsitakse kiirust. (Kiirendus g oleks küll alla, aga seda pole vaja joonestada.)' },
      dirWhy: { vx: 'Horisontaalne komponent jääb kogu lennu ajal samaks, kivi visati paremale.', vz: 'Langedes kasvab vertikaalkiirus allapoole.', v: 'Summaarne kiirus on puutuja trajektoorile: alla paremale.' }
    }, R`$v = \sqrt{v_x^2 + v_z^2}$ ja nurk maapinnaga $\tan\beta = \frac{|v_z|}{v_x}$.`),
    num(R`Arvuta lõppkiirus.`, 12.6, 'm/s', { final: true, label: R`v`, tol: 0.04, ex: R`$v = \sqrt{10.96^2 + 6.26^2} \approx 12.6\ \text{m/s}$ (raamatus ümardatud 13 m/s)` }),
    num(R`Konspekti lisaküsimus: nurk lõppkiiruse ja maapinna vahel.`, 29.7, '°', { label: R`\beta`, ex: R`$\tan\beta = \frac{6.26}{10.96} \Rightarrow \beta \approx 30°$` })
  ],
  sol: R`Horisontaalne vise ($\alpha = 0$), konspektist $x = v_0t$, $z = z_0 - \frac{gt^2}{2}$, $v_x = v_0$, $v_z = -gt$.

<b>Lennuaeg.</b> Maapinnal $z = 0$, avaldame aja:
$$0 = z_0 - \frac{gt^2}{2} \Rightarrow t = \sqrt{\frac{2z_0}{g}} = \sqrt{\frac{2\cdot 2}{9.8}} \approx 0.64\ \text{s}$$

<b>Algkiirus</b> horisontaalsuunast $x = v_0t$:
$$v_0 = \frac{x}{t} = \frac{7}{0.64} \approx 11\ \text{m/s}$$

<b>Lõppkiirus.</b> Vertikaalkomponent $|v_z| = gt = 9.8\cdot 0.64 = 6.3\ \text{m/s}$, komponendid on risti:
$$v = \sqrt{v_0^2 + v_z^2} = \sqrt{11^2 + 6.3^2} \approx 12.6 \approx 13\ \text{m/s}, \qquad \tan\beta = \frac{|v_z|}{v_0} = \frac{6.3}{11} \Rightarrow \beta \approx 30°$$`,
  ans: R`$v_0 = 11\ \text{m/s}$, $v = 13\ \text{m/s}$ (nurk maapinnaga ≈ 30°).`
});

P({ id: '60', b: 2, k: 'T',
  text: R`Püssirauast väljus kuul kiirusega 800 m·s⁻¹ ja 30,0° nurga all horisondi suhtes. Määrata kuuli lennu maksimaalne kõrgus. Kui suur on ta kiirus sellel kõrgusel? Kui kaugele lendab kuul?`,
  given: R`<b>Andmed:</b> $v_0 = 800\ \text{m/s}$, $\alpha = 30°$, $z_0 = 0$.<br><b>Leida:</b> $z_1$, $v_1$, $x_2$.`,
  steps: [
    mc(R`Mis on teada trajektoori kõrgeimas punktis?`, [R`*$v_z = 0$, kuul liigub ainult horisontaalselt`, R`$v = 0$||Horisontaalne kiiruse komponent ei kao kunagi.`, R`$v_x = 0$||Horisontaalsihis kiirendust pole, $v_x$ on kogu aeg $v_0\cos\alpha$.`]),
    num(R`Kiirus kõrgeimas punktis:`, 692.8, 'm/s', { final: true, label: R`v_1`, hint: R`$v_1 = v_x = v_0\cos\alpha$` }),
    num(R`Tõusuaeg (kõrgeimasse punkti):`, 40.8, 's', { label: R`t_1`, hint: R`$0 = v_0\sin\alpha - gt_1$` }),
    num(R`Maksimaalne kõrgus:`, 8163, 'm', { final: true, label: R`z_1`, hint: R`$z_1 = v_0t_1\sin\alpha - \frac{gt_1^2}{2}$`, ex: R`$z_1 = 800\cdot 41\cdot 0.5 - 4.9\cdot 41^2 \approx 8200\ \text{m}$` }),
    mc(R`Kogu lennuaja saab võrrandist $0 = v_0t_2\sin\alpha - \frac{gt_2^2}{2}$. Milline lahend sobib?`, [R`*$t_2 = \frac{2v_0\sin\alpha}{g}$`, R`$t_2 = 0$||See on lennu algus (võõrlahend).`, R`$t_2 = \frac{v_0\sin\alpha}{g}$||See on ainult tõusuaeg.`]),
    num(R`Lennukaugus:`, 56560, 'm', { final: true, label: R`x_2`, hint: R`$x_2 = v_0t_2\cos\alpha$`, ex: R`$t_2 = 82\ \text{s}$, $x_2 = 800\cdot 82\cdot\cos 30° \approx 57\ \text{km}$` })
  ],
  sol: R`Konspektist nurga all visatud keha: $v_x = v_0\cos\alpha$, $x = v_0t\cos\alpha$, $v_z = v_0\sin\alpha - gt$, $z = v_0t\sin\alpha - \frac{gt^2}{2}$.

<b>Kiirus tipus.</b> Kõrgeimas punktis $v_z = 0$, jääb ainult horisontaalkomponent:
$$v_1 = v_x = v_0\cos\alpha = 800\cos 30° \approx 690\ \text{m/s}$$

<b>Tõusuaeg</b> tingimusest $v_0\sin\alpha - gt_1 = 0$:
$$t_1 = \frac{v_0\sin\alpha}{g} = \frac{800\cdot 0.5}{9.8} \approx 41\ \text{s}$$

<b>Maksimaalne kõrgus:</b>
$$z_1 = v_0t_1\sin\alpha - \frac{gt_1^2}{2} = 800\cdot 41\cdot 0.5 - 4.9\cdot 41^2 \approx 8200\ \text{m}$$

<b>Lennukaugus.</b> Maandumisel $z = 0$ annab kogu lennuaja $t_2 = \frac{2v_0\sin\alpha}{g} = 82\ \text{s}$:
$$x_2 = v_0t_2\cos\alpha = 800\cdot 82\cdot\cos 30° \approx 57\ \text{km}$$`,
  ans: R`$z_1 \approx 8.2\ \text{km}$, $v_1 \approx 690\ \text{m/s}$, $x_2 \approx 57\ \text{km}$.`
});

/* ---- Kodused ---- */

P({ id: '41', b: 2, k: 'K',
  text: R`Keha liikumisvõrrandid on $x = 1.0t^3$, $y = 2.0t$ (SI ühikud). Leida kiirus ja kiirendus ajahetkel $t = 0.80\ \text{s}$.`,
  steps: [
    mc(R`Kiiruse komponendid:`, [R`*$v_x = 3t^2$, $v_y = 2$`, R`$v_x = t^3$, $v_y = 2t$||Need on koordinaadid, kiirus on nende tuletis.`, R`$v_x = 3t$, $v_y = 0$||Kontrolli tuletisi uuesti.`]),
    num(R`Kiiruse moodul ajahetkel 0,80 s:`, 2.77, 'm/s', { final: true, label: R`v`, ex: R`$v_x = 1.92$, $v_y = 2$, $v = \sqrt{1.92^2 + 4} \approx 2.8\ \text{m/s}$` }),
    num(R`Kiirenduse moodul:`, 4.8, 'm/s²', { final: true, label: R`a`, hint: R`$a_x = 6t$, $a_y = 0$` })
  ],
  sol: R`Konspektist $v_x = \dot x$, $v_y = \dot y$ ja moodul $v = \sqrt{v_x^2 + v_y^2}$. Tuletame koordinaadid:
$$v_x = \dot x = 3t^2, \qquad v_y = \dot y = 2$$
Ajahetkel $t = 0.8\ \text{s}$: $v_x = 3\cdot 0.64 = 1.92$, $v_y = 2$, seega
$$v = \sqrt{1.92^2 + 2^2} \approx 2.8\ \text{m/s}$$
Kiirendus (kiiruse tuletis): $a_x = \dot v_x = 6t = 4.8$, $a_y = 0$, seega $a = 4.8\ \text{m/s}^2$.`,
  ans: R`2,8 m/s; 4,8 m/s²`
});

P({ id: '42', b: 2, k: 'K',
  text: R`Punktmassi liikumisvõrrandid on $x = At^2 + B$, $y = Ct^3 + Dt$, $z = Et$ ($A = 0.250\ \text{m}\cdot\text{s}^{-2}$, $B = 0.450\ \text{m}$, $C = 0.565\ \text{m}\cdot\text{s}^{-3}$, $D = 0.120\ \text{m}\cdot\text{s}^{-1}$, $E = 0.350\ \text{m}\cdot\text{s}^{-1}$). Leida kiirus ja kiirendus ajahetkel $t = 3.20\ \text{s}$.`,
  steps: [
    mc(R`Kiiruse komponendid:`, [R`*$v_x = 2At$, $v_y = 3Ct^2 + D$, $v_z = E$`, R`$v_x = 2At + B$, $v_y = 3Ct^2 + D$, $v_z = E$||Konstandi $B$ tuletis on null.`, R`$v_x = At$, $v_y = Ct^2$, $v_z = 0$||Kontrolli tuletisi.`], '', '', { wide: true }),
    num(R`$v_y$ ajahetkel 3,20 s:`, 17.48, 'm/s', { label: R`v_y` }),
    num(R`Kiiruse moodul:`, 17.55, 'm/s', { final: true, label: R`v`, ex: R`$v_x = 1.6$, $v_y = 17.48$, $v_z = 0.35$; $v \approx 17.6\ \text{m/s}$` }),
    mc(R`Kiirenduse komponendid:`, [R`*$a_x = 2A$, $a_y = 6Ct$, $a_z = 0$`, R`$a_x = 2A$, $a_y = 3Ct^2$, $a_z = E$||Võta kiirusest veel kord tuletis.`]),
    num(R`Kiirenduse moodul:`, 10.86, 'm/s²', { final: true, label: R`a`, ex: R`$a_x = 0.5$, $a_y = 10.85$, $a \approx 10.9\ \text{m/s}^2$` })
  ],
  sol: R`Tuletame koordinaadid aja järgi (konstandi $B$ tuletis on null). Ajahetkel $t = 3.2\ \text{s}$:
$$v_x = \dot x = 2At = 1.6, \qquad v_y = \dot y = 3Ct^2 + D = 17.48, \qquad v_z = \dot z = E = 0.35$$
$$v = \sqrt{v_x^2 + v_y^2 + v_z^2} \approx 17.6\ \text{m/s}$$
Kiirendus (kiiruse tuletis):
$$a_x = 2A = 0.5, \qquad a_y = 6Ct = 10.85, \qquad a_z = 0, \qquad a = \sqrt{a_x^2 + a_y^2} \approx 10.9\ \text{m/s}^2$$`,
  ans: R`17,6 m/s; 10,9 m/s²`
});

P({ id: '51', b: 2, k: 'K',
  text: R`1,0 m kõrguselt horisontaalsuunas visatud pall langes maha 5,0 m kaugusel horisontaalsihis. Leida palli algkiirus ja nurk lõppkiiruse ning maapinna vahel.`,
  steps: [
    num(R`Lennuaeg:`, 0.452, 's', { label: R`t`, hint: R`$t = \sqrt{\frac{2z_0}{g}}$` }),
    num(R`Algkiirus:`, 11.07, 'm/s', { final: true, label: R`v_0` }),
    num(R`Vertikaalkiirus maandumisel:`, 4.43, 'm/s', { label: R`|v_z|` }),
    mc(R`Kuidas leida nurk maapinnaga?`, [R`*$\tan\beta = \frac{|v_z|}{v_x}$`, R`$\tan\beta = \frac{v_x}{|v_z|}$||See annaks nurga vertikaaliga.`, R`$\sin\beta = \frac{z_0}{x}$||Pall ei lenda mööda sirget, vaid mööda parabooli.`]),
    num(R`Nurk:`, 21.8, '°', { final: true, label: R`\beta` })
  ],
  sol: R`Horisontaalne vise. Lennuaeg kõrguselt $z_0 = 1\ \text{m}$ ($z = z_0 - \frac{gt^2}{2} = 0$):
$$t = \sqrt{\frac{2z_0}{g}} = \sqrt{\frac{2}{9.8}} \approx 0.45\ \text{s}$$
Algkiirus horisontaalsuunast $x = v_0t$: $v_0 = \frac{x}{t} = \frac{5}{0.45} \approx 11\ \text{m/s}$.
<br>Vertikaalkiirus maandumisel $|v_z| = gt = 9.8\cdot 0.45 \approx 4.4\ \text{m/s}$, nurk maapinnaga:
$$\tan\beta = \frac{|v_z|}{v_x} = \frac{4.4}{11} \Rightarrow \beta \approx 22°$$`,
  ans: R`11 m/s; 22°`
});

P({ id: '58', b: 2, k: 'K',
  text: R`Mürsu algkiirus on 220 m·s⁻¹, nurk horisondiga 40,0°, lennukaugus 4100 m. Kui palju vähendab mürsu lennukaugust õhutakistus?`,
  steps: [
    mc(R`Milline oleks lennukaugus ilma õhutakistuseta?`, [R`*$x = \frac{v_0^2\sin 2\alpha}{g}$`, R`$x = \frac{v_0^2\sin\alpha}{g}$||Lennuaeg $\frac{2v_0\sin\alpha}{g}$ korda $v_0\cos\alpha$ annab $\sin 2\alpha$.`, R`$x = v_0\cos\alpha$||Ühik ei ole meeter.`], '', R`$x = v_0\cos\alpha\cdot t_2$, $t_2 = \frac{2v_0\sin\alpha}{g}$`),
    num(R`Arvuta see lennukaugus.`, 4864, 'm', { label: R`x` }),
    num(R`Kui palju lennukaugus väheneb?`, 764, 'm', { final: true, label: R`\Delta x`, tol: 0.03, ex: R`$4864 - 4100 \approx 760\ \text{m}$ (raamatus 759 m, kui $g = 9.81$)` })
  ],
  sol: R`Õhutakistuseta lennukaugus: lennuaeg $t_2 = \frac{2v_0\sin\alpha}{g}$ korda horisontaalkiirus $v_0\cos\alpha$ annab (kasutades $2\sin\alpha\cos\alpha = \sin 2\alpha$):
$$x = \frac{v_0^2\sin 2\alpha}{g} = \frac{220^2\cdot\sin 80°}{9.8} \approx 4860\ \text{m}$$
Õhutakistus lühendab lendu. Vahe teoreetilise ja tegeliku ($4100\ \text{m}$) vahel:
$$\Delta x = 4860 - 4100 \approx 760\ \text{m}$$`,
  ans: R`≈ 760 m`
});

/* ---- Sarnased ---- */

P({ id: '47', b: 2, k: 'S',
  text: R`Osake liigub kiirusega $v = 1.0t^3 + 4.0t^2 + 2.0$ (SI ühikud). Leida osakese kaugus koordinaatide alguspunktist mööda trajektoori ajahetkel 3,0 s, kui ajahetkel 2,0 s oli ta koordinaat 4,0 m. Milline on osakese kiirendus samal ajahetkel?`,
  steps: [
    mc(R`Kuidas leida koordinaat ajahetkel 3 s?`, [R`*$x(3) = x(2) + \int_2^3 v\,dt$`, R`$x(3) = \int_0^3 v\,dt$||Algkoordinaat hetkel 0 pole teada, teada on $x(2) = 4$ m.`]),
    num(R`Koordinaat ajahetkel 3,0 s:`, 47.58, 'm', { final: true, label: R`x`, ex: R`$\int_2^3 = 16.25 + 25.33 + 2 = 43.6$, $x = 47.6 \approx 48\ \text{m}$` }),
    num(R`Kiirendus ajahetkel 3,0 s:`, 51, 'm/s²', { final: true, label: R`a`, hint: R`$a = 3t^2 + 8t$` })
  ],
  sol: R`Teada on $x(2) = 4\ \text{m}$, seega koordinaat hetkel 3 s = algkoordinaat pluss nihe vahemikus $2\ldots 3\ \text{s}$:
$$x(3) = x(2) + \int_2^3 v\,dt = 4 + \left[\frac{t^4}{4} + \frac{4t^3}{3} + 2t\right]_2^3$$
$$= 4 + (16.25 + 25.33 + 2) \approx 47.6\ \text{m}$$
Kiirendus on kiiruse tuletis: $a = \dot v = 3t^2 + 8t$, kohal $t = 3$: $a = 27 + 24 = 51\ \text{m/s}^2$.`,
  ans: R`48 m; 51 m/s²`
});

P({ id: '52', b: 2, k: 'S',
  text: R`Tornist horisontaalse algkiirusega visatud keha langes maapinnale 2,0 s pärast 40 m kaugusel horisontaalsihis. Määrata selle keha alg- ja lõppkiirus ning nurk lõppkiiruse ja maapinna vahel.`,
  steps: [
    num(R`Algkiirus:`, 20, 'm/s', { final: true, label: R`v_0` }),
    num(R`Vertikaalkiirus maandumisel:`, 19.6, 'm/s', { label: R`|v_z|` }),
    num(R`Lõppkiirus:`, 28.0, 'm/s', { final: true, label: R`v` }),
    num(R`Nurk maapinnaga:`, 44.4, '°', { final: true, label: R`\beta` })
  ],
  sol: R`Horisontaalne vise, lennuaeg $t = 2\ \text{s}$ antud. Algkiirus horisontaalsuunast $x = v_0t$:
$$v_0 = \frac{x}{t} = \frac{40}{2} = 20\ \text{m/s}$$
Vertikaalkiirus maandumisel $|v_z| = gt = 9.8\cdot 2 = 19.6\ \text{m/s}$. Lõppkiirus (komponendid risti):
$$v = \sqrt{v_0^2 + v_z^2} = \sqrt{400 + 384} \approx 28\ \text{m/s}, \qquad \tan\beta = \frac{|v_z|}{v_0} = \frac{19.6}{20} \Rightarrow \beta \approx 44°$$`,
  ans: R`20 m/s; 28 m/s; 44°`
});

P({ id: '53', b: 2, k: 'S',
  text: R`Lennuk lendab horisontaalselt kiirusega 180 km·h⁻¹ 300 m kõrgusel maapinnast. Kui kaugel (horisontaalsihis) pommi vabastamise kohast langeb pomm maapinnale?`,
  steps: [
    num(R`Lennuki kiirus SI-ühikutes:`, 50, 'm/s', { label: R`v_0` }),
    num(R`Langemise aeg:`, 7.82, 's', { label: R`t` }),
    num(R`Kaugus:`, 391, 'm', { final: true, label: R`x` })
  ],
  sol: R`Teisendame kiiruse: $180\ \text{km/h} = \frac{180}{3.6} = 50\ \text{m/s}$. Pomm visatakse horisontaalselt kõrguselt $z_0 = 300\ \text{m}$.
<br>Langemise aeg ($z = z_0 - \frac{gt^2}{2} = 0$):
$$t = \sqrt{\frac{2z_0}{g}} = \sqrt{\frac{600}{9.8}} \approx 7.82\ \text{s}$$
Horisontaalne kaugus: $x = v_0t = 50\cdot 7.82 \approx 391\ \text{m}$.`,
  ans: R`391 m`
});

P({ id: '54', b: 2, k: 'S',
  text: R`Tornist horisontaalsuunas visatud kivi algkiirus on 40 m·s⁻¹. Kui suur on kivi kiirus 3,0 s pärast? Millise nurga moodustab kivi kiirusvektor sel momendil horisondiga?`,
  steps: [
    num(R`Kiirus 3 s pärast:`, 49.6, 'm/s', { final: true, label: R`v`, hint: R`$v = \sqrt{v_0^2 + (gt)^2}$` }),
    num(R`Nurk horisondiga:`, 36.3, '°', { final: true, label: R`\beta` })
  ],
  sol: R`Horisontaalne vise algkiirusega $v_0 = 40\ \text{m/s}$. Vertikaalkiirus 3 s pärast $|v_z| = gt = 9.8\cdot 3 = 29.4\ \text{m/s}$.
<br>Kogukiirus (komponendid risti):
$$v = \sqrt{v_0^2 + v_z^2} = \sqrt{1600 + 864} \approx 50\ \text{m/s}$$
Nurk horisondiga: $\tan\beta = \frac{|v_z|}{v_0} = \frac{29.4}{40} \Rightarrow \beta \approx 36°$.`,
  ans: R`50 m/s; 36°`
});

P({ id: '59', b: 2, k: 'S',
  text: R`Millise algkiirusega peab välja laskma valgustusraketi 45° nurga all horisondi suhtes, et ta süttiks trajektoori kõrgeimas punktis, kui sütiku põlemise aeg on 6,0 s?`,
  steps: [
    mc(R`Mis tingimus kehtib kõrgeimas punktis?`, [R`*$v_z = v_0\sin\alpha - gt = 0$`, R`$z = 0$||See on maandumine.`]),
    num(R`Algkiirus:`, 83.2, 'm/s', { final: true, label: R`v_0`, hint: R`$v_0 = \frac{gt}{\sin 45°}$` })
  ],
  sol: R`Rakett peab süttima trajektoori kõrgeimas punktis, kus $v_z = 0$. Konspektist $v_z = v_0\sin\alpha - gt = 0$, avaldame algkiiruse:
$$v_0 = \frac{gt}{\sin\alpha} = \frac{9.8\cdot 6}{\sin 45°} = \frac{58.8}{0.707} \approx 83\ \text{m/s}$$`,
  ans: R`83 m/s`
});

})();
