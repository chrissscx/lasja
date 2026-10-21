/* 1. Sirgjooneline liikumine. Tunnis: 7, 8, 13, 23, 30. Kodus: 4, 9, 14, 28, 31. */
(function () {
const R = String.raw;

P({ id: '7', b: 1, k: 'T',
  text: R`Keha kiiruse projektsioon sirgliikumisel on $v = At^2 - Bt$ ($A = 2.0\ \text{m/s}^3$, $B = 3.0\ \text{m/s}^2$). Leida keha poolt ajavahemikus 2,5 kuni 3,5 s läbitud teepikkus ning kiirendus ajahetkel 4,0 s.`,
  given: R`<b>Andmed:</b> $v = At^2 - Bt$, $A = 2\ \text{m/s}^3$, $B = 3\ \text{m/s}^2$, $t_1 = 2.5\ \text{s}$, $t_2 = 3.5\ \text{s}$, $t_3 = 4\ \text{s}$.<br><b>Leida:</b> $x(t_2) - x(t_1)$, $a(t_3)$.`,
  steps: [
    mc(R`Kiirus on antud aja funktsioonina. Kuidas leida läbitud teepikkus ajavahemikus $t_1 \ldots t_2$?`, [
      R`*Integreerida kiirust aja järgi: $\int_{t_1}^{t_2} v\,dt$`,
      R`Võtta kiirusest tuletis aja järgi||Tuletis annab kiirenduse, mitte teepikkuse.`,
      R`Korrutada: $s = v(t_2)\cdot(t_2 - t_1)$||See kehtiks ainult jääva kiiruse korral, siin kiirus muutub.`,
      R`$s = \frac{at^2}{2}$||Kiirendus pole siin konstantne, sest $v$ sõltub $t^2$-st.`
    ], R`Teepikkus on kiiruse integraal üle aja. Kuna alg- ja lõpphetk on antud, kasutame määratud integraali.`),
    mc(R`Mis on $\int (At^2 - Bt)\,dt$?`, [
      R`*$\frac{At^3}{3} - \frac{Bt^2}{2}$`,
      R`$2At - B$||See on tuletis, mitte integraal.`,
      R`$At^3 - Bt^2$||Unustasid jagada astendajaga: $\int t^n dt = \frac{t^{n+1}}{n+1}$.`,
      R`$\frac{At^3}{3} - Bt^2$||Teise liikme juures unustasid jagada kahega.`
    ], '', R`$\int t^n\,dt = \dfrac{t^{n+1}}{n+1}$`),
    num(R`Arvuta läbitud teepikkus $x(t_2) - x(t_1)$.`, 9.17, 'm', { final: true, label: R`s`,
      hint: R`Asenda: $\frac{A}{3}(3.5^3 - 2.5^3) - \frac{B}{2}(3.5^2 - 2.5^2)$.`,
      ex: R`$\frac{2}{3}(42.875 - 15.625) - \frac{3}{2}(12.25 - 6.25) = 18.17 - 9 \approx 9.2\ \text{m}$. Kiirus on selles vahemikus kogu aeg positiivne, seega teepikkus võrdub nihkega.` }),
    mc(R`Kuidas leida kiirendus?`, [
      R`*$a = \dot v = 2At - B$`,
      R`$a = \frac{v}{t} = At - B$||See oleks keskmine kiirendus nullist, aga meil on vaja hetkkiirendust.`,
      R`$a = \int v\,dt$||Integraal annab teepikkuse.`
    ]),
    num(R`Arvuta kiirendus ajahetkel $t_3 = 4\ \text{s}$.`, 13, 'm/s²', { final: true, label: R`a`,
      hint: R`$a = 2\cdot 2\cdot 4 - 3$`, ex: R`$a = 2\cdot 2\ \frac{\text{m}}{\text{s}^3}\cdot 4\ \text{s} - 3\ \frac{\text{m}}{\text{s}^2} = 13\ \text{m/s}^2$` })
  ],
  sol: R`Teepikkus on kiiruse integraal üle aja:
$$x(t_2)-x(t_1) = \int_{t_1}^{t_2}(At^2 - Bt)\,dt = \left[\frac{At^3}{3} - \frac{Bt^2}{2}\right]_{t_1}^{t_2}$$
$$= \frac{2}{3}(3.5^3 - 2.5^3) - \frac{3}{2}(3.5^2 - 2.5^2) \approx 9.2\ \text{m}$$
Kiirendus on kiiruse tuletis:
$$a = \dot v = 2At - B = 2\cdot 2\cdot 4 - 3 = 13\ \text{m/s}^2$$`,
  ans: R`Läbitud teepikkus on 9,2 m, kiirendus ajahetkel 4 s on 13 m/s².`,
  after: R`Konspektis on teepikkus ümardatud 9,3 m-ks, raamatu vastus on 9,2 m. Mõlemad loetakse õigeks.`
});

P({ id: '8', b: 1, k: 'T',
  text: R`Sirgjooneliselt liikuva osakese kiirendus avaldub kujul: $a = 4 - t^2$ (SI ühikud). Leida osakese kiiruse ja koordinaadi sõltuvus ajast, kui ajahetkel $t = 3\ \text{s}$ on kiirus 2 m/s ja kaugus koordinaatide algpunktist on 9 m.`,
  given: R`<b>Andmed:</b> $a = 4 - t^2$, $t = 3\ \text{s}$, $v(t) = 2\ \text{m/s}$, $x(t) = 9\ \text{m}$.<br><b>Leida:</b> $v(t)$, $x(t)$.`,
  steps: [
    mc(R`Kiirendus on antud aja funktsioonina. Mis on $v = \int a\,dt$?`, [
      R`*$v = 4t - \frac{t^3}{3} + v_0$`,
      R`$v = -2t$||See on tuletis, mitte integraal.`,
      R`$v = 4t - t^3 + v_0$||$\int t^2 dt = \frac{t^3}{3}$, jagamine kolmega on puudu.`,
      R`$v = 4t - \frac{t^3}{3}$||Määramata integraalil on alati integreerimiskonstant ($v_0$). Ilma selleta ei saa tingimust $v(3) = 2$ arvestada.`
    ], R`Integreerimiskonstant $v_0$ on algkiirus. Selle leiame lisatingimusest.`),
    num(R`Kasuta tingimust $v(3\ \text{s}) = 2\ \text{m/s}$ ja leia $v_0$.`, -1, 'm/s', { label: R`v_0`, abs: 0.01,
      hint: R`$2 = 4\cdot 3 - \frac{3^3}{3} + v_0$`,
      ex: R`$2 = 12 - 9 + v_0 \Rightarrow v_0 = -1\ \text{m/s}$` }),
    mc(R`Nüüd $x = \int v\,dt = \int\left(4t - \frac{t^3}{3} - 1\right)dt = ?$`, [
      R`*$x = 2t^2 - \frac{t^4}{12} - t + x_0$`,
      R`$x = 2t^2 - \frac{t^4}{3} - t + x_0$||$\int \frac{t^3}{3}dt = \frac{t^4}{12}$, mitte $\frac{t^4}{3}$.`,
      R`$x = 4 - t^2$||See on kiirendus, mitte koordinaat.`,
      R`$x = 2t^2 - \frac{t^4}{12} - t$||Jälle on integreerimiskonstant puudu.`
    ]),
    num(R`Kasuta tingimust $x(3\ \text{s}) = 9\ \text{m}$ ja leia $x_0$.`, 0.75, 'm', { label: R`x_0`, abs: 0.01,
      hint: R`$9 = 2\cdot 9 - \frac{81}{12} - 3 + x_0$`,
      ex: R`$9 = 18 - 6.75 - 3 + x_0 \Rightarrow x_0 = 0.75\ \text{m}$` }),
    mc(R`Vali õige lõppvastus.`, [
      R`*$v = 4t - \frac{t^3}{3} - 1$, $x = 2t^2 - \frac{t^4}{12} - t + 0.75$`,
      R`$v = 4t - \frac{t^3}{3} + 1$, $x = 2t^2 - \frac{t^4}{12} + t + 0.75$||Kontrolli: $v(3) = 12 - 9 + 1 = 4 \neq 2$.`,
      R`$v = 4t - \frac{t^3}{3} - 1$, $x = 2t^2 - \frac{t^4}{12} - t + 9$||$x_0$ ei ole 9 m: 9 m on koordinaat ajahetkel 3 s, mitte ajahetkel 0.`
    ], '', '', { wide: true })
  ],
  sol: R`$$v = \int a\,dt = \int(4 - t^2)\,dt = 4t - \frac{t^3}{3} + v_0$$
Tingimusest $v(3) = 2$: $2 = 12 - 9 + v_0 \Rightarrow v_0 = -1\ \text{m/s}$.
$$x = \int v\,dt = \int\left(4t - \frac{t^3}{3} - 1\right)dt = 2t^2 - \frac{t^4}{12} - t + x_0$$
Tingimusest $x(3) = 9$: $9 = 18 - 6.75 - 3 + x_0 \Rightarrow x_0 = 0.75\ \text{m}$.`,
  ans: R`$v = 4t - \frac{t^3}{3} - 1$, $x = 2t^2 - \frac{t^4}{12} - t + 0.75$ (SI ühikud).`,
  after: R`Raamatu vastuste lehel paistab kiiruse avaldise vabaliige teise märgiga. Konspekti lahendus ja kontroll $v(3) = 12 - 9 - 1 = 2$ näitavad, et õige on $-1$.`
});

P({ id: '13', b: 1, k: 'T',
  text: R`Elektrirongi esimene vagun möödus vaatlejast (kes rongi liikuma hakkamisel asus selle vaguni eesmise otsa juures) 4,0 s jooksul. Millise aja jooksul möödub vaatlejast seitsmes vagun? Liikumist lugeda ühtlaselt kiirenevaks.`,
  given: R`<b>Andmed:</b> $t_1 = 4\ \text{s}$, $v_0 = 0$, $a = \text{const}$, vaguni pikkus $x_1$.<br><b>Leida:</b> $\Delta t = t_7 - t_6$.`,
  steps: [
    mc(R`Rong hakkab liikuma paigalt. Milline valem seob läbitud teepikkuse ja aja?`, [
      R`*$x = \frac{at^2}{2}$`,
      R`$x = v_0 t + \frac{at^2}{2}$, kus $v_0 = 4\ \text{m/s}$||Algkiirus on null, rong alles hakkab liikuma.`,
      R`$x = vt$||Kiirus ei ole jääv, liikumine on kiirenev.`
    ]),
    mc(R`Vaatlejast on möödunud $n$ vagunit, kui rong on läbinud tee $n x_1$. Kuidas sõltub selleks kuluv aeg $t_n$ esimese vaguni ajast $t_1$?`, [
      R`*$t_n = t_1\sqrt{n}$`,
      R`$t_n = n\,t_1$||See kehtiks jääva kiiruse korral. Kiireneval liikumisel läbitakse iga järgmine vagun kiiremini.`,
      R`$t_n = n^2 t_1$||Vastupidi: $x \sim t^2$, seega $t \sim \sqrt{x}$.`
    ], R`$n x_1 = \frac{a t_n^2}{2}$ ja $x_1 = \frac{a t_1^2}{2}$. Jagades saame $n = \frac{t_n^2}{t_1^2}$ ehk $t_n = t_1\sqrt n$.`),
    num(R`Mis ajahetkel on möödunud 6 vagunit?`, 9.798, 's', { label: R`t_6`, hint: R`$t_6 = 4\sqrt6$` }),
    num(R`Mis ajahetkel on möödunud 7 vagunit?`, 10.583, 's', { label: R`t_7`, hint: R`$t_7 = 4\sqrt7$` }),
    num(R`Kui kaua möödub vaatlejast seitsmes vagun?`, 0.785, 's', { final: true, label: R`\Delta t`,
      hint: R`Seitsmes vagun möödub ajavahemikus $t_6 \ldots t_7$.`,
      ex: R`$\Delta t = t_1(\sqrt7 - \sqrt6) = 4\cdot 0.196 \approx 0.79\ \text{s}$` })
  ],
  sol: R`Paigalt alustades $x = \frac{at^2}{2}$. Esimese vaguni jaoks $x_1 = \frac{at_1^2}{2}$, kuue vaguni jaoks $6x_1 = \frac{at_6^2}{2}$, seitsme jaoks $7x_1 = \frac{at_7^2}{2}$.
Jagades: $t_6 = t_1\sqrt6$, $t_7 = t_1\sqrt7$.
$$\Delta t = t_7 - t_6 = t_1(\sqrt7 - \sqrt6) = 4\ \text{s}\cdot(2.646 - 2.449) \approx 0.79\ \text{s}$$`,
  ans: R`Seitsmes vagun möödub 0,79 s jooksul.`
});

P({ id: '23', b: 1, k: 'T',
  text: R`Pall visati kõrguselt 14,1 m vertikaalselt üles. Määrata palli viskamise kiirus, kui ta langeb maapinnale 3,0 s pärast.`,
  given: R`<b>Andmed:</b> $z_0 = 14.1\ \text{m}$, $t_2 = 3\ \text{s}$, $z_2 = 0$, $g = 9.8\ \text{m/s}^2$.<br><b>Leida:</b> $v_0$ (konspektis lisaks $t_1$, $z_1$, $v_2$).`,
  steps: [
    mc(R`Milline võrrand kirjeldab palli kõrgust ajas?`, [
      R`*$z = z_0 + v_0 t - \frac{gt^2}{2}$`,
      R`$z = v_0 t - \frac{gt^2}{2}$||Pall ei startinud maapinnalt, algkõrgus $z_0 = 14.1$ m on puudu.`,
      R`$z = z_0 - v_0 t - \frac{gt^2}{2}$||Pall visati üles, seega $v_0$ on positiivne ja liige $+v_0 t$.`,
      R`$z = z_0 + v_0 t + \frac{gt^2}{2}$||Raskuskiirendus on suunatud alla, seega liige on miinusega.`
    ]),
    mc(R`Mida teame ajahetkel $t_2 = 3\ \text{s}$?`, [
      R`*$z_2 = 0$ (pall on maapinnal)`,
      R`$v_2 = 0$||Maapinnale kukkudes pall ei ole paigal. Kiirus on null ainult kõrgeimas punktis.`,
      R`$z_2 = z_0$||Algkõrgusele jõuab pall tagasi varem, mitte maapinnal.`
    ]),
    mc(R`Avalda $v_0$ võrrandist $0 = z_0 + v_0 t_2 - \frac{gt_2^2}{2}$.`, [
      R`*$v_0 = \dfrac{\frac{gt_2^2}{2} - z_0}{t_2}$`,
      R`$v_0 = \dfrac{z_0 - \frac{gt_2^2}{2}}{t_2}$||Märgid on vahetuses, saaksid negatiivse kiiruse.`,
      R`$v_0 = \dfrac{gt_2}{2}$||See kehtiks siis, kui pall visataks maapinnalt ($z_0 = 0$).`
    ]),
    num(R`Arvuta viskamise kiirus.`, 10, 'm/s', { final: true, label: R`v_0`,
      hint: R`$v_0 = \frac{4.9\cdot 9 - 14.1}{3}$`, ex: R`$v_0 = \frac{44.1 - 14.1}{3} = 10\ \text{m/s}$` }),
    num(R`Konspekti lisaküsimus: mitu sekundit pärast viset jõuab pall kõrgeimasse punkti?`, 1.02, 's', { label: R`t_1`,
      hint: R`Kõrgeimas punktis $v = v_0 - gt_1 = 0$.`, ex: R`$t_1 = \frac{v_0}{g} = \frac{10}{9.8} = 1.02\ \text{s}$` }),
    num(R`Kui kõrgel on kõrgeim punkt?`, 19.2, 'm', { label: R`z_1`,
      hint: R`$z_1 = z_0 + v_0t_1 - \frac{gt_1^2}{2}$`, ex: R`$z_1 = 14.1 + 10\cdot 1.02 - 4.9\cdot 1.02^2 \approx 19.2\ \text{m}$` }),
    num(R`Milline on palli kiirus maapinnale jõudmisel?`, -19.4, 'm/s', { label: R`v_2`,
      hint: R`$v_2 = v_0 - gt_2$. Märk näitab suunda.`, ex: R`$v_2 = 10 - 9.8\cdot 3 = -19.4\ \text{m/s}$ (miinus tähendab, et pall liigub alla).` })
  ],
  sol: R`$$z = z_0 + v_0 t - \frac{gt^2}{2}$$
Maapinnal $z_2 = 0$:
$$0 = z_0 + v_0 t_2 - \frac{gt_2^2}{2} \Rightarrow v_0 = \frac{\frac{gt_2^2}{2} - z_0}{t_2} = \frac{4.9\cdot 9 - 14.1}{3} = 10\ \text{m/s}$$
Lisaks: $t_1 = \frac{v_0}{g} = 1.02\ \text{s}$, $z_1 = z_0 + v_0t_1 - \frac{gt_1^2}{2} = 19.2\ \text{m}$, $v_2 = v_0 - gt_2 = -19.4\ \text{m/s}$.`,
  ans: R`Viskamise kiirus on 10 m/s.`
});

P({ id: '30', b: 1, k: 'T',
  text: R`Jäämäe kõrgus on 3,0 m ning tema pikkus kaldsihis 20 m. Arvutada mäest alla libisenud kelgu kiirus ja laskumise aeg, hõõrdumist arvestamata.`,
  given: R`<b>Andmed:</b> $h_0 = 3\ \text{m}$, $x = 20\ \text{m}$, $v_0 = 0$, $g = 9.8\ \text{m/s}^2$.<br><b>Leida:</b> $t$, $v$.`,
  steps: [
    frc(R`Joonesta kelgule mõjuvad jõud (hõõrdumist ei ole).`, (function () {
      const p = SC.onIncline(40, 200, 280, 25, 0.55, 30);
      return { w: 360, h: 230, bg: SC.incline(40, 200, 280, 25),
        bodies: [{ id: 'K', x: p.x, y: p.y, w: 54, h: 30, rot: 25, label: 'kelk' }],
        forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.inclineDirs(25),
        ans: { K: { mg: 'down', N: 'normal' } },
        why: { Fh: 'Ülesandes on öeldud: hõõrdumist ei arvestata.', F: 'Keegi ei lükka kelku, ta libiseb ise.' },
        dirWhy: { mg: 'Raskusjõud on alati vertikaalselt alla.', N: 'Toereaktsioon on risti pinnaga, pinnast eemale.' } };
    })(), R`Kelgule mõjuvad ainult raskusjõud $mg$ ja toereaktsioon $N$. Liikumist piki kaldpinda põhjustab raskusjõu komponent $mg\sin\alpha$.`),
    mc(R`Milline on kelgu kiirendus piki kaldpinda?`, [
      R`*$a = g\sin\alpha$`,
      R`$a = g$||See oleks vabal langemisel. Kaldpinnal mõjub liikumise suunas ainult raskusjõu komponent.`,
      R`$a = g\cos\alpha$||$g\cos\alpha$ on risti kaldpinnaga, selle tasakaalustab toereaktsioon.`
    ]),
    num(R`Leia $\sin\alpha$ mäe kõrguse ja pikkuse kaudu.`, 0.15, '', { label: R`\sin\alpha`, hint: R`$\sin\alpha = \frac{h_0}{x}$`, ex: R`$\sin\alpha = \frac{3}{20} = 0.15$` }),
    num(R`Arvuta kiirendus.`, 1.47, 'm/s²', { label: R`a`, ex: R`$a = 9.8\cdot 0.15 = 1.47\ \text{m/s}^2$` }),
    mc(R`Kuidas leida laskumise aeg?`, [
      R`*$x = \frac{at^2}{2} \Rightarrow t = \sqrt{\frac{2x}{a}}$`,
      R`$t = \frac{x}{a}$||Ühikud ei klapi: m / (m/s²) = s², mitte s.`,
      R`$t = \sqrt{\frac{2h_0}{g}}$||See oleks vaba langemise aeg, kelk aga libiseb mööda pikka kallakut.`
    ]),
    num(R`Arvuta laskumise aeg.`, 5.22, 's', { final: true, label: R`t`, ex: R`$t = \sqrt{\frac{2\cdot 20}{1.47}} \approx 5.2\ \text{s}$` }),
    num(R`Arvuta kelgu kiirus mäe all.`, 7.67, 'm/s', { final: true, label: R`v`, hint: R`$v = at$`, ex: R`$v = 1.47\cdot 5.2 \approx 7.7\ \text{m/s}$ (sama tuleb ka valemist $v = \sqrt{2gh_0}$).` })
  ],
  sol: R`Hõõrdumiseta kaldpinnal $a = g\sin\alpha$, kus $\sin\alpha = \frac{h_0}{x} = \frac{3}{20} = 0.15$.
$$a = 9.8\cdot 0.15 = 1.47\ \text{m/s}^2$$
Paigalt alustades $x = \frac{at^2}{2}$:
$$t = \sqrt{\frac{2x}{a}} = \sqrt{\frac{40}{1.47}} = 5.2\ \text{s}$$
$$v = at = 1.47\cdot 5.2 = 7.7\ \text{m/s}$$`,
  ans: R`$t = 5.2\ \text{s}$, $v = 7.7\ \text{m/s}$.`
});

/* ---- Kodused ---- */

P({ id: '4', b: 1, k: 'K',
  text: R`Kaks punktmassi liiguvad x-telje sihis vastavalt võrranditele: $x_1 = A_1 + B_1t - C_1t^2$ ja $x_2 = A_2 + B_2t + C_2t^2$ ($A_1 = 20\ \text{m}$, $B_1 = 20\ \text{m/s}$, $C_1 = 4\ \text{m/s}^2$, $A_2 = 2\ \text{m}$, $B_2 = 2\ \text{m/s}$, $C_2 = 0.5\ \text{m/s}^2$). Millisel ajahetkel on nende kiirused võrdsed? Milline on sel hetkel nende kiirus ja kiirendus?`,
  given: R`<b>Leida:</b> $t$, kus $v_1 = v_2$; $v$; $a_1$, $a_2$.`,
  steps: [
    mc(R`Leia mõlema punkti kiirus aja funktsioonina.`, [
      R`*$v_1 = B_1 - 2C_1t$, $v_2 = B_2 + 2C_2t$`,
      R`$v_1 = B_1 - C_1t$, $v_2 = B_2 + C_2t$||$\frac{d}{dt}(Ct^2) = 2Ct$, kordaja 2 on puudu.`,
      R`$v_1 = A_1 + B_1$, $v_2 = A_2 + B_2$||Kiirus on koordinaadi tuletis aja järgi. Konstandi $A$ tuletis on null.`
    ], '', R`$v = \dot x$`),
    num(R`Millisel ajahetkel on kiirused võrdsed?`, 2, 's', { final: true, label: R`t`, hint: R`$20 - 8t = 2 + t$`, ex: R`$20 - 8t = 2 + t \Rightarrow 9t = 18 \Rightarrow t = 2\ \text{s}$` }),
    num(R`Kui suur on kiirus sel hetkel?`, 4, 'm/s', { final: true, label: R`v`, ex: R`$v = 2 + 2 = 4\ \text{m/s}$` }),
    num(R`Esimese punkti kiirendus:`, -8, 'm/s²', { label: R`a_1`, hint: R`$a_1 = \dot v_1$`, ex: R`$a_1 = -2C_1 = -8\ \text{m/s}^2$ (aeglustub)` }),
    num(R`Teise punkti kiirendus:`, 1, 'm/s²', { label: R`a_2`, ex: R`$a_2 = 2C_2 = 1\ \text{m/s}^2$` })
  ],
  sol: R`$$v_1 = \dot x_1 = B_1 - 2C_1t = 20 - 8t, \qquad v_2 = \dot x_2 = B_2 + 2C_2t = 2 + t$$
$v_1 = v_2$: $20 - 8t = 2 + t \Rightarrow t = 2\ \text{s}$, siis $v = 4\ \text{m/s}$.
$$a_1 = -2C_1 = -8\ \text{m/s}^2, \qquad a_2 = 2C_2 = 1\ \text{m/s}^2$$`,
  ans: R`$t = 2\ \text{s}$; $v = 4\ \text{m/s}$; $a_1 = -8\ \text{m/s}^2$, $a_2 = 1\ \text{m/s}^2$.`
});

P({ id: '9', b: 1, k: 'K',
  text: R`x-telje sihis liikuva osakese kiirendus muutub vastavalt võrrandile $a = 4x - 2$ (SI ühikud). Leida osakese kiiruse sõltuvus asukohast, kui $x_0 = 0$ korral $v_0 = 4\ \text{m/s}$. Arvutada kiirus kohal $x = 2\ \text{m}$.`,
  steps: [
    mc(R`Kiirendus on antud koordinaadi (mitte aja) funktsioonina. Millist seost on mõistlik kasutada?`, [
      R`*$a = \frac{dv}{dt} = \frac{dv}{dx}\frac{dx}{dt} = v\frac{dv}{dx}$, seega $v\,dv = a\,dx$`,
      R`$v = \int a\,dt$||Me ei tea, kuidas $x$ ajast sõltub, seega aja järgi integreerida ei saa.`,
      R`$v = a\cdot x$||Ühikud ei klapi ja see ei ole tuletise seos.`
    ], R`Ahelreegliga saab aja kõrvaldada ja integreerida otse koordinaadi järgi.`),
    mc(R`Integreeri: $\int v\,dv = \int(4x - 2)\,dx$`, [
      R`*$\frac{v^2}{2} = 2x^2 - 2x + C$`,
      R`$v = 2x^2 - 2x + C$||Vasakul pool $\int v\,dv = \frac{v^2}{2}$.`,
      R`$\frac{v^2}{2} = 4x^2 - 2x + C$||$\int 4x\,dx = 2x^2$.`
    ]),
    num(R`Leia konstant $C$ tingimusest $x_0 = 0$, $v_0 = 4\ \text{m/s}$.`, 8, '', { label: R`C`, abs: 0.01, ex: R`$\frac{16}{2} = 0 + C \Rightarrow C = 8$` }),
    mc(R`Vali kiiruse sõltuvus asukohast.`, [
      R`*$v = 2\sqrt{x^2 - x + 4}$`,
      R`$v = \sqrt{2x^2 - 2x + 8}$||Korruta mõlemad pooled kahega: $v^2 = 4x^2 - 4x + 16$.`,
      R`$v = 4x^2 - 4x + 16$||See on $v^2$, mitte $v$.`
    ]),
    num(R`Arvuta kiirus kohal $x = 2\ \text{m}$.`, 4.9, 'm/s', { final: true, label: R`v`, ex: R`$v = 2\sqrt{4 - 2 + 4} = 2\sqrt6 \approx 4.9 \approx 5\ \text{m/s}$` })
  ],
  sol: R`$a = v\frac{dv}{dx} \Rightarrow v\,dv = (4x - 2)\,dx$
$$\frac{v^2}{2} = 2x^2 - 2x + C$$
$x = 0$, $v = 4$: $C = 8$. Seega $v^2 = 4x^2 - 4x + 16$ ehk
$$v = 2\sqrt{x^2 - x + 4}$$
$x = 2\ \text{m}$: $v = 2\sqrt6 \approx 4.9\ \text{m/s}$.`,
  ans: R`$v = 2\sqrt{x^2 - x + 4}$; $v(2\ \text{m}) \approx 5\ \text{m/s}$.`
});

P({ id: '14', b: 1, k: 'K',
  text: R`Punktmass läbis 10 s jooksul 30 m, kusjuures ta kiirus kasvas viiekordseks. Määrata punktmassi kiirendus eeldusel, et see on konstantne.`,
  given: R`<b>Andmed:</b> $t = 10\ \text{s}$, $s = 30\ \text{m}$, $v = 5v_0$.<br><b>Leida:</b> $a$.`,
  steps: [
    mc(R`Algkiirus ei ole null. Milline valem seob teepikkuse, aja ning alg- ja lõppkiiruse?`, [
      R`*$s = \frac{v_0 + v}{2}\,t$`,
      R`$s = \frac{at^2}{2}$||See kehtib ainult paigalt alustades.`,
      R`$s = v\,t$||Kiirus muutub, nii saaksid liiga suure tee.`
    ], R`Ühtlaselt muutuval liikumisel on keskmine kiirus alg- ja lõppkiiruse aritmeetiline keskmine.`),
    num(R`Leia algkiirus $v_0$.`, 1, 'm/s', { label: R`v_0`, hint: R`$30 = \frac{v_0 + 5v_0}{2}\cdot 10 = 30v_0$` }),
    num(R`Arvuta kiirendus.`, 0.4, 'm/s²', { final: true, label: R`a`, hint: R`$a = \frac{v - v_0}{t}$`, ex: R`$a = \frac{5 - 1}{10} = 0.40\ \text{m/s}^2$` })
  ],
  sol: R`$$s = \frac{v_0 + v}{2}t = \frac{v_0 + 5v_0}{2}t = 3v_0t \Rightarrow v_0 = \frac{s}{3t} = 1\ \text{m/s}$$
$$a = \frac{v - v_0}{t} = \frac{4v_0}{t} = 0.40\ \text{m/s}^2$$`,
  ans: R`$a = 0.40\ \text{m/s}^2$.`
});

P({ id: '28', b: 1, k: 'K',
  text: R`300 m kõrgusel olevast aerostaadist langes kivi. Millise ajaga jõuab kivi maapinnale, kui aerostaat 1) tõuseb kiirusega 5,0 m·s⁻¹, 2) laskub kiirusega 5,0 m·s⁻¹, 3) seisab paigal?`,
  steps: [
    mc(R`Milline on kivi algkiirus hetkel, kui ta aerostaadist lahti pääseb?`, [
      R`*Sama mis aerostaadil (suurus ja suund)`,
      R`Null, sest kivi „kukub“||Kivi liikus enne koos aerostaadiga, inertsi tõttu jääb see kiirus alguses alles.`,
      R`Alati 5 m/s alla||Tõusva aerostaadi puhul liigub kivi alguses üles.`
    ]),
    mc(R`Milline võrrand annab maapinnale jõudmise aja?`, [
      R`*$0 = z_0 + v_0t - \frac{gt^2}{2}$`,
      R`$0 = z_0 - \frac{gt^2}{2}$ kõigil juhtudel||Algkiirus ei ole alati null.`,
      R`$z_0 = v_0t$||Raskuskiirendust ei saa unustada.`
    ], '', R`Ruutvõrrand: $\frac{g}{2}t^2 - v_0t - z_0 = 0$, $t = \frac{v_0 + \sqrt{v_0^2 + 2gz_0}}{g}$`),
    num(R`1) Aerostaat tõuseb ($v_0 = +5\ \text{m/s}$).`, 8.35, 's', { final: true, label: R`t_1`, ex: R`$t = \frac{5 + \sqrt{25 + 5880}}{9.8} \approx 8.4\ \text{s}$` }),
    num(R`2) Aerostaat laskub ($v_0 = -5\ \text{m/s}$).`, 7.33, 's', { final: true, label: R`t_2`, ex: R`$t = \frac{-5 + \sqrt{25 + 5880}}{9.8} \approx 7.3\ \text{s}$` }),
    num(R`3) Aerostaat seisab paigal.`, 7.82, 's', { final: true, label: R`t_3`, ex: R`$t = \sqrt{\frac{2z_0}{g}} = \sqrt{\frac{600}{9.8}} \approx 7.8\ \text{s}$` })
  ],
  sol: R`Kivi algkiirus on sama mis aerostaadil. $0 = z_0 + v_0t - \frac{gt^2}{2}$:
$$t = \frac{v_0 + \sqrt{v_0^2 + 2gz_0}}{g}$$
1) $v_0 = 5$: $t = 8.4\ \text{s}$; 2) $v_0 = -5$: $t = 7.3\ \text{s}$; 3) $v_0 = 0$: $t = 7.8\ \text{s}$.`,
  ans: R`1) 8,4 s; 2) 7,3 s; 3) 7,8 s.`
});

P({ id: '31', b: 1, k: 'K',
  text: R`Kaldpinna aluse pikkus on 30 cm. Kui suur peab olema kaldpinna kaldenurk horisondi suhtes, et temal asetsev keha libiseks mööda kaldpinda alla 0,40 s jooksul (hõõrdumine on kaduvväike)?`,
  given: R`<b>Andmed:</b> $b = 0.30\ \text{m}$, $t = 0.40\ \text{s}$.<br><b>Leida:</b> $\alpha$.`,
  steps: [
    mc(R`Kui pikk on kaldpind (keha teepikkus)?`, [
      R`*$l = \frac{b}{\cos\alpha}$`, R`$l = b\cos\alpha$||Kaldpind on täisnurkse kolmnurga hüpotenuus, see on pikem kui alus.`, R`$l = b\tan\alpha$||See on kaldpinna kõrgus.`
    ]),
    mc(R`Kiirendus on $a = g\sin\alpha$. Milline võrrand tuleb kirja panna?`, [
      R`*$\frac{b}{\cos\alpha} = \frac{g\sin\alpha\,t^2}{2}$`, R`$b = \frac{g t^2}{2}$||See oleks vaba langemine.`, R`$\frac{b}{\cos\alpha} = g\sin\alpha\,t$||Paigalt alustades $s = \frac{at^2}{2}$.`
    ]),
    mc(R`Lihtsusta, kasutades $2\sin\alpha\cos\alpha = \sin 2\alpha$.`, [
      R`*$\sin 2\alpha = \frac{4b}{gt^2}$`, R`$\sin 2\alpha = \frac{2b}{gt^2}$||Korruta võrrandi mõlemad pooled $\frac{2\cos\alpha}{gt^2}$-ga ja siis veel kahega.`, R`$\sin\alpha = \frac{2b}{gt^2}$||Siin on kaks tundmatut nurgafunktsiooni, need tuleb ühendada.`
    ]),
    num(R`Arvuta $\sin 2\alpha$.`, 0.765, '', { label: R`\sin 2\alpha`, ex: R`$\sin 2\alpha = \frac{4\cdot 0.3}{9.8\cdot 0.16} = 0.765$` }),
    mc(R`Mitu sobivat nurka $\alpha$ on vahemikus $0\ldots 90°$?`, [
      R`*Kaks: $2\alpha$ võib olla nii $50°$ kui ka $180° - 50° = 130°$`, R`Üks||Siinus on sama nurkadel $x$ ja $180° - x$, seega tuleb kaks lahendit.`
    ]),
    num(R`Väiksem nurk:`, 25, '°', { final: true, label: R`\alpha_1`, tol: 0.03 }),
    num(R`Suurem nurk:`, 65, '°', { final: true, label: R`\alpha_2`, tol: 0.02 })
  ],
  sol: R`Kaldpinna pikkus $l = \frac{b}{\cos\alpha}$, kiirendus $a = g\sin\alpha$, paigalt alustades $l = \frac{at^2}{2}$:
$$\frac{b}{\cos\alpha} = \frac{g\sin\alpha\,t^2}{2} \Rightarrow \sin 2\alpha = \frac{4b}{gt^2} = \frac{1.2}{1.568} = 0.765$$
$2\alpha = 50°$ või $130°$, seega $\alpha = 25°$ või $65°$.`,
  ans: R`$25°$ või $65°$.`
});

/* ---- Sarnased ---- */

P({ id: '15', b: 1, k: 'S',
  text: R`Vabalt langev keha läbis viimased 20 m teest 0,50 s vältel. Määrata keha langemise kõrgus.`,
  steps: [
    mc(R`Olgu kogu langemise aeg $T$. Millised kaks võrrandit kehtivad?`, [
      R`*$h = \frac{gT^2}{2}$ ja $h - 20 = \frac{g(T - 0.5)^2}{2}$`,
      R`$h = \frac{gT^2}{2}$ ja $20 = \frac{g\cdot 0.5^2}{2}$||Viimasel 0,5 s-l ei alusta keha paigalt, tal on juba suur kiirus.`,
      R`$20 = v\cdot 0.5$, kus $v = gT$||See eeldaks, et viimastel sekunditel kiirus ei muutu.`
    ], '', R`Lahuta teine võrrand esimesest, siis $T^2$ kaob.`),
    num(R`Leia kogu langemise aeg $T$.`, 4.33, 's', { label: R`T`, hint: R`$20 = g(0.5T - 0.125)$`, ex: R`$T = \frac{20/9.8 + 0.125}{0.5} = 4.33\ \text{s}$` }),
    num(R`Arvuta langemise kõrgus.`, 91.9, 'm', { final: true, label: R`h`, ex: R`$h = 4.9\cdot 4.33^2 \approx 92\ \text{m}$` })
  ],
  sol: R`$h = \frac{gT^2}{2}$, $h - 20 = \frac{g(T-0.5)^2}{2}$. Lahutades: $20 = g(0.5T - 0.125)$, $T = 4.33\ \text{s}$, $h = 92\ \text{m}$.`,
  ans: R`92 m`
});

P({ id: '17', b: 1, k: 'S',
  text: R`Keha langeb 1960 m kõrguselt. Leida teepikkus, mille keha läbis viimase sekundi jooksul.`,
  steps: [
    num(R`Leia kogu langemise aeg.`, 20, 's', { label: R`T`, hint: R`$T = \sqrt{\frac{2h}{g}}$` }),
    mc(R`Kuidas leida viimase sekundi tee?`, [
      R`*$\Delta h = h - \frac{g(T - 1)^2}{2}$`, R`$\Delta h = \frac{g\cdot 1^2}{2}$||See on esimese sekundi tee.`, R`$\Delta h = \frac{h}{T}$||See on keskmine tee sekundis, aga keha kiireneb.`
    ]),
    num(R`Arvuta viimase sekundi tee.`, 191.1, 'm', { final: true, label: R`\Delta h`, ex: R`$\Delta h = 1960 - 4.9\cdot 19^2 = 1960 - 1768.9 = 191\ \text{m}$` })
  ],
  sol: R`$T = \sqrt{2h/g} = 20\ \text{s}$. $\Delta h = h - \frac{g(T-1)^2}{2} = 1960 - 1769 = 191\ \text{m}$.`,
  ans: R`191 m`
});

P({ id: '20', b: 1, k: 'S',
  text: R`Vertikaalselt ülesvisatud keha langes maapinnale 3,0 s pärast. Leida keha algkiirus ja tõusu kõrgus.`,
  steps: [
    mc(R`Kui kaua keha tõuseb?`, [R`*1,5 s, sest tõus ja langus võtavad võrdselt aega`, R`3 s||3 s on kogu lennuaeg.`, R`1 s||Õhutakistuseta on liikumine sümmeetriline.`]),
    num(R`Leia algkiirus.`, 14.7, 'm/s', { final: true, label: R`v_0`, hint: R`Kõrgeimas punktis $v = v_0 - gt_1 = 0$.`, ex: R`$v_0 = 9.8\cdot 1.5 = 14.7 \approx 15\ \text{m/s}$` }),
    num(R`Leia tõusu kõrgus.`, 11.0, 'm', { final: true, label: R`h`, hint: R`$h = \frac{v_0^2}{2g}$` })
  ],
  sol: R`$t_1 = 1.5\ \text{s}$, $v_0 = gt_1 = 14.7\ \text{m/s}$, $h = \frac{v_0^2}{2g} = 11\ \text{m}$.`,
  ans: R`15 m/s; 11 m`
});

P({ id: '21', b: 1, k: 'S',
  text: R`Vertikaalselt ülesvisatud keha oli kõrgusel 9,8 m kaks korda. Nende kahe ajahetke vahe oli 4,0 s. Määrata algkiirus.`,
  steps: [
    mc(R`Kui kaua liigub keha kõrguselt 9,8 m kõrgeimasse punkti?`, [R`*2,0 s (pool ajavahest)`, R`4,0 s||4 s kulub üles ja tagasi alla sellele kõrgusele.`]),
    num(R`Kui suur on kiirus kõrgusel 9,8 m?`, 19.6, 'm/s', { label: R`v`, hint: R`2 s pärast on kiirus null: $v = g\cdot 2$` }),
    mc(R`Kuidas nüüd leida algkiirus?`, [R`*$v_0^2 = v^2 + 2gh$`, R`$v_0 = v + gh$||Ühikud ei klapi.`, R`$v_0 = v$||Kõrgusel 9,8 m on keha juba aeglustunud.`]),
    num(R`Arvuta algkiirus.`, 24.0, 'm/s', { final: true, label: R`v_0` })
  ],
  sol: R`Kõrgusel 9,8 m kulub tippu 2 s, seal $v = 19.6\ \text{m/s}$. $v_0 = \sqrt{v^2 + 2gh} = \sqrt{384 + 192} = 24\ \text{m/s}$.`,
  ans: R`24 m/s`
});

P({ id: '22', b: 1, k: 'S',
  text: R`Kivi visati vertikaalselt üles algkiirusega 15,0 m·s⁻¹. Kui pika aja pärast on ta kõrgusel 1) $h_1 = 10.0\ \text{m}$, 2) $h_2 = 12.0\ \text{m}$?`,
  steps: [
    mc(R`Milline võrrand tuleb lahendada?`, [R`*$\frac{g}{2}t^2 - v_0t + h = 0$`, R`$h = v_0t$||Raskuskiirendus on puudu.`]),
    num(R`1) Esimene ajahetk kõrgusel 10 m (tõusmisel):`, 0.982, 's', { final: true, label: R`t_1`, ex: R`$t = \frac{15 \mp \sqrt{225 - 196}}{9.8}$` }),
    num(R`1) Teine ajahetk kõrgusel 10 m (langemisel):`, 2.08, 's', { final: true, label: R`t_2` }),
    mc(R`2) Mis juhtub kõrgusega 12 m?`, [R`*Kivi ei jõua nii kõrgele (diskriminant on negatiivne)`, R`Kivi on seal kaks korda||Kontrolli diskriminanti: $225 - 2\cdot 9.8\cdot 12 < 0$.`], R`Maksimaalne kõrgus on $\frac{v_0^2}{2g} = 11.5\ \text{m}$.`)
  ],
  sol: R`$4.9t^2 - 15t + h = 0$. $h = 10$: $t = 0.982\ \text{s}$ ja $2.08\ \text{s}$. $h = 12$: $D < 0$, kivi tõuseb ainult $11.5\ \text{m}$ kõrgusele.`,
  ans: R`1) 0,982 s ja 2,08 s; 2) ei jõua nii kõrgele.`
});

P({ id: '24', b: 1, k: 'S',
  text: R`Millise kiirusega peab viskama keha vertikaalselt alla kõrguselt 40,0 m, et ta jõuaks maapinnale 2,00 s varem kui vaba langemise korral?`,
  steps: [
    num(R`Leia vaba langemise aeg.`, 2.857, 's', { label: R`t_0`, hint: R`$t_0 = \sqrt{\frac{2h}{g}}$` }),
    num(R`Kui kaua tohib kesta allavisatud keha lend?`, 0.857, 's', { label: R`t` }),
    mc(R`Avalda algkiirus valemist $h = v_0t + \frac{gt^2}{2}$ (alla positiivne).`, [R`*$v_0 = \frac{h - \frac{gt^2}{2}}{t}$`, R`$v_0 = \frac{h}{t}$||Raskuskiirenduse panus on puudu.`]),
    num(R`Arvuta viskamise kiirus.`, 42.5, 'm/s', { final: true, label: R`v_0` })
  ],
  sol: R`$t_0 = \sqrt{80/9.8} = 2.857\ \text{s}$, $t = 0.857\ \text{s}$. $v_0 = \frac{40 - 4.9\cdot 0.857^2}{0.857} = 42.5\ \text{m/s}$.`,
  ans: R`42,5 m/s`
});

P({ id: '27', b: 1, k: 'S',
  text: R`Õhupall tõusis vertikaalselt kiirusega 5,0 m·s⁻¹. Temalt langes alla ballast. Kui suur ja millise suunaga vertikaalkiirus on ballastil 0,50 s pärast tema langemise algust?`,
  steps: [
    mc(R`Milline on ballasti algkiirus?`, [R`*5,0 m/s üles`, R`0||Ballast liikus koos õhupalliga üles.`]),
    num(R`Arvuta kiirus 0,50 s pärast (üles positiivne).`, 0.1, 'm/s', { final: true, label: R`v`, abs: 0.008, hint: R`$v = v_0 - gt$`, ex: R`$v = 5 - 9.8\cdot 0.5 = 0.1\ \text{m/s}$ (raamatus $g = 9.81$ korral 0,095 m/s)` }),
    mc(R`Mis suunas ballast sel hetkel liigub?`, [R`*Üles`, R`Alla||Kiirus on veel positiivne, ballast pole jõudnud kõrgeimasse punkti.`])
  ],
  sol: R`$v = v_0 - gt = 5 - 4.9 = 0.1\ \text{m/s}$ ülespoole.`,
  ans: R`≈ 0,1 m/s ülespoole`
});

P({ id: '32', b: 1, k: 'S',
  text: R`Arvutada kaldpinna kaldenurk, kui keha hõõrdumisvabaks allalibisemiseks kulub kaks korda rohkem aega kui vabal langemisel samalt kõrguselt?`,
  steps: [
    mc(R`Kaldpinna pikkus on $l = \frac{h}{\sin\alpha}$, kiirendus $g\sin\alpha$. Milline on libisemise aeg?`, [R`*$t = \frac{1}{\sin\alpha}\sqrt{\frac{2h}{g}}$`, R`$t = \sqrt{\frac{2h}{g}}$||See on vaba langemise aeg.`, R`$t = \sin\alpha\sqrt{\frac{2h}{g}}$||Kaldpinnal kulub rohkem aega, mitte vähem.`]),
    num(R`Kui $t = 2t_0$, siis milline on kaldenurk?`, 30, '°', { final: true, label: R`\alpha`, hint: R`$\sin\alpha = \frac12$` })
  ],
  sol: R`$t = \sqrt{\frac{2l}{g\sin\alpha}} = \frac{1}{\sin\alpha}\sqrt{\frac{2h}{g}} = \frac{t_0}{\sin\alpha}$. $t = 2t_0 \Rightarrow \sin\alpha = 0.5$, $\alpha = 30°$.`,
  ans: R`30°`
});

})();
