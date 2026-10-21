/* 3. Pöörlemine ja ringliikumine. Tunnis: 75, 76, 86, 90, 65. Kodus: 73, 77, 87, 89, 66. */
(function () {
const R = String.raw;

P({ id: '75', b: 3, k: 'T',
  text: R`Paigalolev osake hakkab liikuma ringjoont mööda raadiusega 1,30 m. Nurkkiirendus avaldub kujul: $\varepsilon = At^2 - Bt + C$ ($A = 120\ \text{rad·s}^{-4}$, $B = 48.0\ \text{rad·s}^{-3}$, $C = 10.0\ \text{rad·s}^{-2}$). Arvutada nurkkiiruse, pöördenurga ning kiirenduse tangentsiaal- ja normaalkomponendi väärtus ajahetkel 0,5 s.`,
  given: R`<b>Andmed:</b> $\omega_0 = 0$, $\varphi_0 = 0$, $r = 1.3\ \text{m}$, $t = 0.5\ \text{s}$.<br><b>Leida:</b> $\omega$, $\varphi$, $a_t$, $a_n$.`,
  steps: [
    mc(R`Kuidas saada nurkkiirus, kui nurkkiirendus on aja funktsioon?`, [R`*$\omega = \int\varepsilon\,dt = \frac{At^3}{3} - \frac{Bt^2}{2} + Ct + \omega_0$`, R`$\omega = \dot\varepsilon = 2At - B$||Tuletis viiks vastupidises suunas. $\varepsilon = \dot\omega$, seega $\omega = \int\varepsilon\,dt$.`, R`$\omega = \varepsilon t$||See kehtiks ainult jääva $\varepsilon$ korral ja nullist alates.`], '', '', { wide: true }),
    num(R`Nurkkiirus ajahetkel 0,5 s ($\omega_0 = 0$):`, 4, 'rad/s', { final: true, label: R`\omega`, hint: R`$40\cdot 0.125 - 24\cdot 0.25 + 10\cdot 0.5$` }),
    mc(R`Pöördenurk on $\varphi = \int\omega\,dt = ?$`, [R`*$\frac{At^4}{12} - \frac{Bt^3}{6} + \frac{Ct^2}{2}$`, R`$\frac{At^4}{4} - \frac{Bt^3}{3} + \frac{Ct^2}{2}$||Integreeri $\omega$ avaldist, kus kordajad on juba $\frac{1}{3}$ ja $\frac12$.`]),
    num(R`Pöördenurk ajahetkel 0,5 s:`, 0.875, 'rad', { final: true, label: R`\varphi`, ex: R`$10\cdot 0.0625 - 8\cdot 0.125 + 5\cdot 0.25 = 0.875 \approx 0.9\ \text{rad}$` }),
    num(R`Nurkkiirendus ajahetkel 0,5 s:`, 16, 'rad/s²', { label: R`\varepsilon`, hint: R`$120\cdot 0.25 - 48\cdot 0.5 + 10$` }),
    mc(R`Millised valemid annavad kiirenduse komponendid?`, [R`*$a_t = \varepsilon r$, $a_n = \omega^2 r$`, R`$a_t = \omega r$, $a_n = \varepsilon r$||$\omega r$ on joonkiirus, mitte kiirendus.`, R`$a_t = \omega^2 r$, $a_n = \varepsilon r$||Komponendid on vahetuses: normaalkiirendus tuleb kiiruse suuna muutumisest ($\omega^2r$).`]),
    num(R`Tangentsiaalkiirendus:`, 20.8, 'm/s²', { final: true, label: R`a_t`, tol: 0.05 }),
    num(R`Normaalkiirendus:`, 20.8, 'm/s²', { final: true, label: R`a_n`, tol: 0.05, ex: R`$a_n = 4^2\cdot 1.3 = 20.8\ \text{m/s}^2$ (raamatus ümardatud 20 m/s²). Konspektis on arvutatud ka kogukiirendus $a = \sqrt{a_t^2 + a_n^2} \approx 29\ \text{m/s}^2$.` })
  ],
  sol: R`$$\omega = \int(At^2 - Bt + C)\,dt = \frac{At^3}{3} - \frac{Bt^2}{2} + Ct = 5 - 6 + 5 = 4\ \text{rad/s}$$
$$\varphi = \int\omega\,dt = \frac{At^4}{12} - \frac{Bt^3}{6} + \frac{Ct^2}{2} = 0.9\ \text{rad}$$
$\varepsilon(0.5) = 30 - 24 + 10 = 16\ \text{rad/s}^2$,
$a_t = \varepsilon r = 21\ \text{m/s}^2$, $a_n = \omega^2 r = 21\ \text{m/s}^2$, $a = \sqrt{a_t^2 + a_n^2} = 29.7\ \text{m/s}^2$.`,
  ans: R`$\omega = 4\ \text{rad/s}$; $\varphi = 0.9\ \text{rad}$; $a_t \approx a_n \approx 2\cdot 10\ \text{m/s}^2$.`
});

P({ id: '76', b: 3, k: 'T',
  text: R`Pidurdamise alghetkel oli ratta nurkkiirus 300 rad·s⁻¹. Mitu pööret tegi ratas pidurdamise ajal, kui ta jäi seisma 10,0 s pärast ning liikumine oli ühtlaselt aeglustuv.`,
  given: R`<b>Andmed:</b> $\omega_0 = 300\ \text{rad/s}$, $\omega = 0$, $t = 10\ \text{s}$.<br><b>Leida:</b> $N$.`,
  steps: [
    num(R`Nurkkiirendus:`, -30, 'rad/s²', { label: R`\varepsilon`, hint: R`$\omega = \omega_0 + \varepsilon t = 0$`, alts: [{ a: 30, msg: 'Pidurdamisel on nurkkiirendus negatiivne.' }] }),
    mc(R`Kuidas leida pöördenurk?`, [R`*$\varphi = \omega_0t + \frac{\varepsilon t^2}{2}$`, R`$\varphi = \omega_0t$||See eeldab, et ratas pöörleb kogu aeg algkiirusega.`, R`$\varphi = \frac{\varepsilon t^2}{2}$||Algnurkkiirus on puudu.`]),
    num(R`Pöördenurk:`, 1500, 'rad', { label: R`\varphi` }),
    mc(R`Kuidas pöördenurgast saada pöörete arv?`, [R`*$N = \frac{\varphi}{2\pi}$`, R`$N = 2\pi\varphi$||Üks pööre on $2\pi$ radiaani, seega tuleb jagada.`, R`$N = \frac{\varphi}{360}$||Nurk on radiaanides, mitte kraadides.`]),
    num(R`Pöörete arv:`, 238.7, 'p', { final: true, label: R`N`, tol: 0.01 })
  ],
  sol: R`$\varepsilon = \frac{\omega - \omega_0}{t} = -30\ \text{rad/s}^2$,
$$\varphi = \omega_0t + \frac{\varepsilon t^2}{2} = 3000 - 1500 = 1500\ \text{rad}, \qquad N = \frac{\varphi}{2\pi} = 239$$`,
  ans: R`239 pööret`
});

P({ id: '86', b: 3, k: 'T',
  text: R`Hooratas hakkab pöörlema. Teinud 20 pööret, saavutab sageduse 10 p·s⁻¹. Määrata hooratta nurkkiirendus ning kiireneva pöörlemise kestus.`,
  given: R`<b>Andmed:</b> $\omega_0 = 0$, $N = 20$, $\upsilon = 10\ \text{p/s}$.<br><b>Leida:</b> $\varepsilon$, $t$.`,
  steps: [
    match(R`Teisenda andmed nurksuurusteks. Sobita.`, [[R`Pöördenurk $\varphi$`, R`$2\pi N$`], [R`Nurkkiirus $\omega$`, R`$2\pi\upsilon$`], [R`Üks pööre`, R`$2\pi$ rad`]]),
    mc(R`Paigalt alustades $\varphi = \frac{\varepsilon t^2}{2}$ ja $\omega = \varepsilon t$. Aja kõrvaldamisel saame:`, [R`*$\varepsilon = \frac{\omega^2}{2\varphi} = \frac{\pi\upsilon^2}{N}$`, R`$\varepsilon = \frac{\omega}{\varphi}$||Ühikud ei klapi (1/s, aga vaja 1/s²).`, R`$\varepsilon = \frac{2\varphi}{\omega^2}$||Murd on ümberpööratud.`]),
    num(R`Nurkkiirendus:`, 15.71, 'rad/s²', { final: true, label: R`\varepsilon`, tol: 0.04, ex: R`$\varepsilon = \frac{\pi\cdot 100}{20} = 15.7 \approx 16\ \text{rad/s}^2$` }),
    num(R`Kiireneva pöörlemise kestus:`, 4, 's', { final: true, label: R`t`, hint: R`$t = \frac{\omega}{\varepsilon} = \frac{2\pi\upsilon}{\varepsilon}$`, ex: R`$t = \frac{2N}{\upsilon} = 4.0\ \text{s}$ (konspektis ümardatud $\varepsilon$-ga 3,9 s)` })
  ],
  sol: R`$\varphi = 2\pi N$, $\omega = 2\pi\upsilon$. Paigalt alustades $\varphi = \frac{\varepsilon t^2}{2}$, $\omega = \varepsilon t$, millest
$$\varepsilon = \frac{\omega^2}{2\varphi} = \frac{\pi\upsilon^2}{N} = 16\ \text{rad/s}^2, \qquad t = \frac{\omega}{\varepsilon} = 4.0\ \text{s}$$`,
  ans: R`$16\ \text{rad/s}^2$; 4,0 s`
});

P({ id: '90', b: 3, k: 'T',
  text: R`Kaks hooratast jäeti inertsi mõjul pöörlema. Esimene pöörles algul sagedusega 240 p·min⁻¹ ning peatus 10,0 s jooksul. Teine pöörles algul sagedusega 360 p·min⁻¹ ning tegi peatumiseni 20,0 pööret. Kumb hooratas pöörles kauem? Kumb hooratas tegi peatumiseni rohkem pöördeid? Kumb hooratas pöörles suurema nurkkiirendusega?`,
  given: R`<b>Andmed:</b> $\upsilon_{01} = 240\ \text{p/min}$, $t_1 = 10\ \text{s}$; $\upsilon_{02} = 360\ \text{p/min}$, $N_2 = 20$.`,
  steps: [
    num(R`Teisenda: $240\ \text{p/min}$ = ? p/s`, 4, 'p/s', { label: R`\upsilon_{01}` }),
    num(R`Esimese hooratta nurkkiirendus:`, -2.513, 'rad/s²', { label: R`\varepsilon_1`, hint: R`$\varepsilon_1 = \frac{0 - 2\pi\upsilon_{01}}{t_1}$`, alts: [{ a: 2.513, msg: 'Peatuval hoorattal on nurkkiirendus negatiivne.' }] }),
    num(R`Esimese hooratta pöörete arv:`, 20, 'p', { label: R`N_1`, hint: R`Ühtlaselt aeglustuval liikumisel $N = \frac{\upsilon_0 t}{2}$` }),
    num(R`Teise hooratta nurkkiirendus:`, -5.655, 'rad/s²', { label: R`\varepsilon_2`, hint: R`$\varepsilon_2 = -\frac{\omega_{02}^2}{2\varphi_2} = -\frac{\pi\upsilon_{02}^2}{N_2}$` }),
    num(R`Teise hooratta pöörlemise aeg:`, 6.67, 's', { label: R`t_2`, hint: R`$t_2 = \frac{-\omega_{02}}{\varepsilon_2}$` }),
    mc(R`Vali kõik õiged järeldused.`, [R`*Esimene pöörles kauem ($t_1 > t_2$)`, R`*Mõlemad tegid sama arvu pöördeid ($N_1 = N_2$)`, R`*Teise nurkkiirendus on suurem ($|\varepsilon_2| > |\varepsilon_1|$)`, R`Teine pöörles kauem||$t_2 = 6.7\ \text{s} < 10\ \text{s}$.`, R`Esimene tegi rohkem pöördeid||Mõlemad tegid 20 pööret.`])
  ],
  sol: R`Esimene: $\varepsilon_1 = -\frac{2\pi\upsilon_{01}}{t_1} = -2.5\ \text{rad/s}^2$, $N_1 = \upsilon_{01}t_1 + \frac{\varepsilon_1t_1^2}{4\pi} = 20$.<br>
Teine: $\varepsilon_2 = -\frac{\pi\upsilon_{02}^2}{N_2} = -5.7\ \text{rad/s}^2$, $t_2 = -\frac{2\pi\upsilon_{02}}{\varepsilon_2} = 6.7\ \text{s}$.<br>
Seega $t_1 > t_2$, $N_1 = N_2$, $|\varepsilon_2| > |\varepsilon_1|$.`,
  ans: R`$t_1 > t_2$; $N_1 = N_2$; $\varepsilon_2 > \varepsilon_1$ (moodulilt).`
});

P({ id: '65', b: 3, k: 'T',
  text: R`Auto hakkab liikuma ühtlaselt kiirenevalt teed mööda, mille kõverusraadius on 300 m, ning saavutab 25 m pikkusel teel kiiruse 18 km·h⁻¹. Määrata auto tangentsiaal-, normaal- ja kogukiirendus 20. sekundi lõpul, arvates liikumise algusest.`,
  given: R`<b>Andmed:</b> $v_0 = 0$, $r = 300\ \text{m}$, $s_1 = 25\ \text{m}$, $v_1 = 18\ \text{km/h}$, $t_2 = 20\ \text{s}$.<br><b>Leida:</b> $a_t$, $a_{n2}$, $a_2$.`,
  steps: [
    num(R`Teisenda kiirus SI-ühikutesse: 18 km/h =`, 5, 'm/s', { label: R`v_1`, alts: [{ a: 18, msg: 'Jaga 3,6-ga: km/h → m/s.' }] }),
    mc(R`Tangentsiaalkiirendus on konstantne. Milline valem seob kiiruse ja teepikkuse, kui aega ei tea?`, [R`*$v_1^2 = 2a_ts_1$`, R`$s_1 = \frac{a_tt^2}{2}$||Aega me ei tea.`, R`$a_t = \frac{v_1^2}{r}$||See on normaalkiirenduse valem.`]),
    num(R`Tangentsiaalkiirendus:`, 0.5, 'm/s²', { final: true, label: R`a_t` }),
    num(R`Kiirus 20. sekundi lõpul:`, 10, 'm/s', { label: R`v_2`, hint: R`$v_2 = a_tt_2$` }),
    num(R`Normaalkiirendus sel hetkel:`, 0.333, 'm/s²', { final: true, label: R`a_n`, hint: R`$a_n = \frac{v_2^2}{r}$` }),
    frc(R`Joonesta kiirenduse komponendid. Auto sõidab kurvi kõrgeimas punktis paremale, kurvi keskpunkt on all.`, {
      w: 360, h: 230, bg: `<path d="M40,190 Q180,-10 320,190" class="dash"/><circle cx="180" cy="200" r="3" class="fill"/><text x="188" y="205">kõveruskeskpunkt</text><text x="250" y="40">→ sõidusuund</text>`,
      bodies: [{ id: 'A', x: 180, y: 92, w: 44, h: 24, label: 'auto' }],
      forces: ['at', 'an', 'a', 'v'], dirs: SC.DIR8,
      ans: { A: { at: 'right', an: 'down', a: 'dr' } },
      why: { v: 'Siin joonestame ainult kiirendusi.' },
      dirWhy: { at: 'Auto kiireneb, seega tangentsiaalkiirendus on sõidu suunas.', an: 'Normaalkiirendus on suunatud kõveruskeskpunkti poole.', a: 'Kogukiirendus on komponentide summa: alla paremale.' }
    }, R`Kogukiirendus on vektorite $\vec a_t$ ja $\vec a_n$ summa. Need on teineteisega risti.`),
    num(R`Kogukiirendus:`, 0.601, 'm/s²', { final: true, label: R`a`, hint: R`$a = \sqrt{a_t^2 + a_n^2}$` })
  ],
  sol: R`$v_1 = 5\ \text{m/s}$. Ühtlaselt kiireneval liikumisel $v_1^2 = 2a_ts_1 \Rightarrow a_t = \frac{v_1^2}{2s_1} = 0.5\ \text{m/s}^2$.
$v_2 = a_tt_2 = 10\ \text{m/s}$, $a_n = \frac{v_2^2}{r} = 0.33\ \text{m/s}^2$,
$$a = \sqrt{a_t^2 + a_n^2} = \sqrt{0.25 + 0.11} = 0.6\ \text{m/s}^2$$`,
  ans: R`$a_t = 0.50$, $a_n = 0.33$, $a = 0.60\ \text{m/s}^2$`
});

/* ---- Kodused ---- */

P({ id: '73', b: 3, k: 'K',
  text: R`Ketas raadiusega 30,0 cm pöörleb vastavalt võrrandile $\varphi = A - Bt + Ct^3$ ($A = 3.00\ \text{rad}$, $B = 1.00\ \text{rad·s}^{-1}$, $C = 0.100\ \text{rad·s}^{-3}$). Leida ketta äärepunktide joonkiirus, tangentsiaal-, normaal- ja kogukiirendus ajahetkel $t = 10.0\ \text{s}$.`,
  steps: [
    mc(R`Nurkkiirus ja nurkkiirendus:`, [R`*$\omega = -B + 3Ct^2$, $\varepsilon = 6Ct$`, R`$\omega = A - B + 3Ct^2$, $\varepsilon = 6Ct$||Konstandi $A$ tuletis on null.`, R`$\omega = -B + Ct^2$, $\varepsilon = 2Ct$||$\frac{d}{dt}t^3 = 3t^2$.`]),
    num(R`Nurkkiirus ajahetkel 10 s:`, 29, 'rad/s', { label: R`\omega` }),
    num(R`Joonkiirus:`, 8.7, 'm/s', { final: true, label: R`v`, hint: R`$v = \omega r$, $r = 0.3\ \text{m}$`, alts: [{ a: 870, msg: 'Raadius tuleb võtta meetrites (0,30 m).' }] }),
    num(R`Tangentsiaalkiirendus:`, 1.8, 'm/s²', { final: true, label: R`a_t`, hint: R`$a_t = \varepsilon r$` }),
    num(R`Normaalkiirendus:`, 252.3, 'm/s²', { final: true, label: R`a_n` }),
    num(R`Kogukiirendus:`, 252.3, 'm/s²', { final: true, label: R`a`, ex: R`$a_t$ on $a_n$-iga võrreldes väga väike, seega $a \approx a_n$.` })
  ],
  sol: R`$\omega = -B + 3Ct^2 = 29\ \text{rad/s}$, $\varepsilon = 6Ct = 6\ \text{rad/s}^2$.
$v = \omega r = 8.70\ \text{m/s}$, $a_t = \varepsilon r = 1.80\ \text{m/s}^2$, $a_n = \omega^2 r = 252\ \text{m/s}^2$, $a = \sqrt{a_t^2 + a_n^2} = 252\ \text{m/s}^2$.`,
  ans: R`8,70 m/s; 1,80 m/s²; 252 m/s²; 252 m/s²`
});

P({ id: '77', b: 3, k: 'K',
  text: R`Ühtlaselt aeglustaval pidurdamisel vähenes hooratta pöörlemissagedus 10,0 kuni 6,0 p·s⁻¹. Leida nurkkiirendus ja pidurdamise kestus, kui ratas tegi pidurdamise ajal 50 pööret.`,
  steps: [
    mc(R`Milline valem sobib, kui aega ei tea?`, [R`*$\omega^2 - \omega_0^2 = 2\varepsilon\varphi$`, R`$\omega = \omega_0 + \varepsilon t$||Aeg pole teada.`]),
    num(R`Nurkkiirendus:`, -4.02, 'rad/s²', { final: true, label: R`\varepsilon`, hint: R`$\varepsilon = \frac{(2\pi)^2(\upsilon^2 - \upsilon_0^2)}{2\cdot 2\pi N} = \frac{\pi(\upsilon^2 - \upsilon_0^2)}{N}$`, ex: R`$\varepsilon = \frac{\pi(36 - 100)}{50} = -4.0\ \text{rad/s}^2$` }),
    num(R`Pidurdamise kestus:`, 6.25, 's', { final: true, label: R`t`, hint: R`$t = \frac{\omega - \omega_0}{\varepsilon}$` })
  ],
  sol: R`$\varepsilon = \frac{\omega^2 - \omega_0^2}{2\varphi} = \frac{\pi(\upsilon^2 - \upsilon_0^2)}{N} = -4.0\ \text{rad/s}^2$, $t = \frac{2\pi(\upsilon - \upsilon_0)}{\varepsilon} = 6.3\ \text{s}$.`,
  ans: R`4,0 rad/s² (aeglustuv); 6,3 s`
});

P({ id: '87', b: 3, k: 'K',
  text: R`Ratas hakkas pöörlema ühtlaselt kiirenevalt ning saavutas pärast 10 pööret nurkkiiruse 20 rad·s⁻¹. Leida nurkkiirendus.`,
  steps: [
    num(R`Pöördenurk radiaanides:`, 62.83, 'rad', { label: R`\varphi` }),
    num(R`Nurkkiirendus:`, 3.18, 'rad/s²', { final: true, label: R`\varepsilon`, hint: R`$\varepsilon = \frac{\omega^2}{2\varphi}$` })
  ],
  sol: R`$\varphi = 2\pi\cdot 10 = 62.8\ \text{rad}$, $\varepsilon = \frac{\omega^2}{2\varphi} = \frac{400}{125.7} = 3.2\ \text{rad/s}^2$.`,
  ans: R`3,2 rad/s²`
});

P({ id: '89', b: 3, k: 'K',
  text: R`Ratas, mille pöörlemissagedus oli 1500 p·min⁻¹, hakkas pidurdamisel pöörlema ühtlaselt aeglustuvalt ja peatus 30,0 s pärast. Leida nurkkiirendus ja pöörete arv pidurdumise algusest kuni peatumiseni.`,
  steps: [
    num(R`Algne nurkkiirus:`, 157.1, 'rad/s', { label: R`\omega_0`, hint: R`$1500\ \text{p/min} = 25\ \text{p/s}$, $\omega_0 = 2\pi\upsilon_0$` }),
    num(R`Nurkkiirendus:`, -5.24, 'rad/s²', { final: true, label: R`\varepsilon` }),
    num(R`Pöörete arv:`, 375, 'p', { final: true, label: R`N`, hint: R`$N = \frac{\varphi}{2\pi}$, $\varphi = \omega_0t + \frac{\varepsilon t^2}{2}$` })
  ],
  sol: R`$\omega_0 = 157\ \text{rad/s}$, $\varepsilon = -\frac{\omega_0}{t} = -5.24\ \text{rad/s}^2$, $\varphi = \frac{\omega_0 t}{2} = 2356\ \text{rad}$, $N = 375$.`,
  ans: R`−5,24 rad/s²; 375 p`
});

P({ id: '66', b: 3, k: 'K',
  text: R`Rong sõidab kurvi raadiusega 400 m algkiirusega 36 km·h⁻¹. Määrata rongi normaal- ja kogukiirendus poole minuti pärast, kui rong liigub kurvil tangentsiaalkiirendusega 0,20 m·s⁻².`,
  steps: [
    num(R`Kiirus poole minuti pärast:`, 16, 'm/s', { label: R`v`, hint: R`$v = v_0 + a_tt$, $v_0 = 10\ \text{m/s}$, $t = 30\ \text{s}$` }),
    num(R`Normaalkiirendus:`, 0.64, 'm/s²', { final: true, label: R`a_n` }),
    num(R`Kogukiirendus:`, 0.67, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`$v = 10 + 0.2\cdot 30 = 16\ \text{m/s}$, $a_n = \frac{v^2}{r} = 0.64\ \text{m/s}^2$, $a = \sqrt{0.64^2 + 0.2^2} = 0.67\ \text{m/s}^2$.`,
  ans: R`0,64 m/s²; 0,67 m/s²`
});

/* ---- Sarnased ---- */

P({ id: '64', b: 3, k: 'S',
  text: R`Rong sõidab käänakul, mille kõverusraadius on 400 m, kusjuures tangentsiaalkiirendus on 0,20 m·s⁻². Leida rongi normaal- ja kogukiirendus momendil, kui tema kiirus on 10 m·s⁻¹.`,
  steps: [
    num(R`Normaalkiirendus:`, 0.25, 'm/s²', { final: true, label: R`a_n` }),
    num(R`Kogukiirendus:`, 0.32, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`$a_n = \frac{100}{400} = 0.25\ \text{m/s}^2$, $a = \sqrt{0.25^2 + 0.2^2} = 0.32\ \text{m/s}^2$.`,
  ans: R`0,25 m/s²; 0,32 m/s²`
});

P({ id: '83', b: 3, k: 'S',
  text: R`Ratas pöörleb nurkkiirendusega 0,50 rad·s⁻². Määrata teljest 40 cm kaugusel asuva punkti kogukiirendus 2,0 s pärast liikumise algust.`,
  steps: [
    num(R`Nurkkiirus 2 s pärast:`, 1, 'rad/s', { label: R`\omega` }),
    num(R`Tangentsiaalkiirendus:`, 0.2, 'm/s²', { label: R`a_t` }),
    num(R`Normaalkiirendus:`, 0.4, 'm/s²', { label: R`a_n` }),
    num(R`Kogukiirendus:`, 0.447, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`$\omega = \varepsilon t = 1\ \text{rad/s}$, $a_t = \varepsilon r = 0.2$, $a_n = \omega^2 r = 0.4$, $a = 0.45\ \text{m/s}^2$.`,
  ans: R`0,45 m/s²`
});

P({ id: '88', b: 3, k: 'S',
  text: R`Hooratas pöörles sagedusega 4 p·s⁻¹. Pidurdamisel oli pöörlemine ühtlaselt aeglustuv ja hooratas peatus 3 s jooksul. Mitu pööret tegi hooratas pidurdumisel?`,
  steps: [
    mc(R`Ühtlaselt aeglustuval pöörlemisel nullini on keskmine sagedus:`, [R`*$\frac{\upsilon_0}{2}$`, R`$\upsilon_0$||Sagedus väheneb kogu aeg.`]),
    num(R`Pöörete arv:`, 6, 'p', { final: true, label: R`N` })
  ],
  sol: R`$N = \frac{\upsilon_0 t}{2} = \frac{4\cdot 3}{2} = 6$.`,
  ans: R`6 pööret`
});

})();
