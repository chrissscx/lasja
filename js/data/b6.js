/* 6. Töö, võimsus, energia. Tunnis: 210, 212, 213, 224, 229, 231. Kodus: 208, 211, 220, 223, 227.
   NB! Konspektis selle teema ülesannete lahendusi ei ole, ainult teooria (lk 5.1–5.5). */
(function () {
const R = String.raw;
const NOTE = R`Selle teema ülesannete lahendusi konspektis ei ole. Lahenduskäik on tehtud konspekti teooriaosa valemitega ja kontrollitud raamatu vastusega.`;

P({ id: '210', b: 6, k: 'T',
  text: R`Kui palju tööd tuleb teha, et tõsta 100 kg massiga keha 400 cm kõrgusele 2,00 s kestel? Tõstmine toimub ühtlaselt kiirenevalt.`,
  given: R`<b>Andmed:</b> $m = 100\ \text{kg}$, $h = 4\ \text{m}$, $t = 2\ \text{s}$, $v_0 = 0$.<br><b>Leida:</b> $A$.`,
  note: NOTE,
  steps: [
    num(R`Kiirendus:`, 2, 'm/s²', { label: R`a`, hint: R`$h = \frac{at^2}{2}$` }),
    frc(R`Joonesta kehale mõjuvad jõud tõstmise ajal.`, {
      w: 360, h: 200, bg: SC.rope([[180, 10], [180, 80]]),
      bodies: [{ id: 'K', x: 180, y: 120, w: 70, h: 70, label: '100 kg' }],
      forces: ['mg', 'F', 'N'], dirs: SC.DIR4,
      ans: { K: { mg: 'down', F: 'up' } },
      why: { N: 'Keha on õhus, toetuspinda pole.' }
    }),
    mc(R`Tõstev jõud on`, [R`*$F = m(g + a)$`, R`$F = mg$||Keha kiireneb üles, seega tõstev jõud on suurem kui raskusjõud.`, R`$F = ma$||Ka raskusjõud tuleb ületada.`]),
    num(R`Tõstev jõud:`, 1180, 'N', { label: R`F` }),
    mc(R`Töö on`, [R`*$A = Fh$ (jõud ja nihe samas suunas, $\cos 0° = 1$)`, R`$A = mgh$||See on ainult potentsiaalse energia muut. Keha saab ka kiiruse ehk kineetilise energia.`]),
    num(R`Tehtud töö:`, 4720, 'J', { final: true, label: R`A`, ex: R`Kontroll energiaga: $mgh + \frac{mv^2}{2} = 3920 + 800 = 4720\ \text{J}$.` })
  ],
  sol: R`$a = \frac{2h}{t^2} = 2\ \text{m/s}^2$, $F = m(g + a) = 1180\ \text{N}$, $A = Fh = 4720\ \text{J}$.<br>Kontroll: $v = at = 4\ \text{m/s}$, $mgh + \frac{mv^2}{2} = 3920 + 800 = 4720\ \text{J}$.`,
  ans: R`4,72 kJ`
});

P({ id: '212', b: 6, k: 'T',
  text: R`Kui palju tööd tuleb teha, et venitada 1,0 mm võrra pikemaks terasvarb, mille pikkus on 1,0 m ning ristlõike pindala 1,0 cm²?`,
  note: R`Terase elastsusmoodulit $E$ ülesandes ei anta, see on kogu lisa tabelis (lisa failis polnud). Kasuta $E = 2.2\cdot 10^{11}\ \text{Pa}$. ` + NOTE,
  after: R`$E = 2.2\cdot 10^{11}\ \text{Pa}$ on valitud nii, et see klapiks raamatu vastusega 11 J.`,
  steps: [
    mc(R`Venitamisel elastsusjõud kasvab: $F = kx$, kus $k = \frac{ES}{l}$. Töö on`, [R`*$A = \frac{kx^2}{2} = \frac{ES(\Delta l)^2}{2l}$`, R`$A = kx^2$||Jõud kasvab nullist, keskmine jõud on pool lõppjõust.`, R`$A = F\Delta l$, kus $F = ES$||Jõud ei ole kogu aeg maksimaalne.`]),
    num(R`Ristlõike pindala SI-ühikutes:`, 1e-4, 'm²', { label: R`S` }),
    num(R`Töö ($E = 2.2\cdot 10^{11}\ \text{Pa}$):`, 11, 'J', { final: true, label: R`A`, tol: 0.06 })
  ],
  sol: R`$A = \frac{ES(\Delta l)^2}{2l} = \frac{2.2\cdot 10^{11}\cdot 10^{-4}\cdot 10^{-6}}{2\cdot 1} = 11\ \text{J}$.`,
  ans: R`11 J`
});

P({ id: '213', b: 6, k: 'T',
  text: R`Keha massiga 100 kg tõstetakse kaldpinna abil, mille pikkus on 2,0 m ja nurk horisondiga 30°. Arvutada seejuures tehtud töö, kui liikumine toimub kiirendusega 1,0 m/s² ja hõõrdetegur on 0,10.`,
  given: R`<b>Andmed:</b> $m = 100\ \text{kg}$, $l = 2\ \text{m}$, $\alpha = 30°$, $a = 1\ \text{m/s}^2$, $\mu = 0.1$.<br><b>Leida:</b> $A$.`,
  note: NOTE + ' Eeldame, et keha veetakse jõuga piki kaldpinda.',
  steps: [
    frc(R`Keha veetakse piki kaldpinda üles. Joonesta jõud.`, (function () {
      const p = SC.onIncline(40, 200, 280, 30, 0.5, 30);
      return { w: 360, h: 230, bg: SC.incline(40, 200, 280, 30),
        bodies: [{ id: 'K', x: p.x, y: p.y, w: 54, h: 30, rot: 30, label: '' }],
        forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.inclineDirs(30),
        ans: { K: { mg: 'down', N: 'normal', Fh: 'downslope', F: 'upslope' } },
        dirWhy: { Fh: 'Keha liigub üles, hõõrdejõud on alla.', F: 'Veojõud on liikumise suunas, piki kaldpinda üles.' } };
    })()),
    mc(R`Newtoni II seadus piki kaldpinda:`, [R`*$ma = F - mg\sin\alpha - \mu mg\cos\alpha$`, R`$ma = F - mg\cos\alpha - \mu mg\sin\alpha$||Piki kaldpinda on $mg\sin\alpha$.`, R`$ma = F + mg\sin\alpha - \mu mg\cos\alpha$||Raskusjõu komponent on liikumisele vastu.`], '', '', { wide: true }),
    num(R`Vajalik jõud:`, 674.9, 'N', { label: R`F` }),
    num(R`Tehtud töö:`, 1350, 'J', { final: true, label: R`A`, hint: R`$A = Fl$` })
  ],
  sol: R`$F = m(a + g\sin\alpha + \mu g\cos\alpha) = 100(1 + 4.9 + 0.85) = 675\ \text{N}$, $A = Fl = 1350\ \text{J} \approx 1.4\ \text{kJ}$.`,
  ans: R`1,4 kJ`
});

P({ id: '224', b: 6, k: 'T',
  text: R`Mingi algkiiruse saanud vagun massiga 12 t hakkab hõõrdumise tõttu liikuma ühtlaselt aeglustuvalt ning jääb seisma 30 s jooksul, olles läbinud seejuures 18 m pikkuse tee. Määrata vaguni algkiirus, hõõrdejõud ja hõõrdetegur.`,
  note: NOTE,
  steps: [
    mc(R`Ühtlaselt aeglustuval liikumisel seisuni:`, [R`*$s = \frac{v_0}{2}t$`, R`$s = v_0t$||Kiirus väheneb nullini, keskmine kiirus on $\frac{v_0}{2}$.`]),
    num(R`Algkiirus:`, 1.2, 'm/s', { final: true, label: R`v_0` }),
    num(R`Kiirenduse moodul:`, 0.04, 'm/s²', { label: R`a` }),
    num(R`Hõõrdejõud:`, 480, 'N', { final: true, label: R`F_h` }),
    num(R`Hõõrdetegur:`, 0.00408, '', { final: true, label: R`\mu`, hint: R`$\mu = \frac{F_h}{mg}$` })
  ],
  sol: R`$v_0 = \frac{2s}{t} = 1.2\ \text{m/s}$, $a = \frac{v_0}{t} = 0.04\ \text{m/s}^2$, $F_h = ma = 480\ \text{N}$, $\mu = \frac{a}{g} = 0.0041$.<br>Energia kaudu: $\frac{mv_0^2}{2} = F_hs$ annab sama tulemuse.`,
  ans: R`1,2 m/s; 0,48 kN; 0,0041`
});

P({ id: '229', b: 6, k: 'T',
  text: R`Püssikuul massiga 10 g liigub kiirusega 200 m/s ja tungib laudseina 40 mm sügavusele. Pidades seda liikumist ühtlaselt aeglustuvaks määrata laua keskmine vastupanujõud ja kuuli liikumise kestus lauas. Mis sünnib samades tingimustes, kui laua paksus on ainult 20 mm?`,
  note: NOTE,
  steps: [
    mc(R`Kuuli kineetiline energia kulub tööle takistusjõu vastu:`, [R`*$\frac{mv^2}{2} = Fd$`, R`$mv = Fd$||Vasakul on impulss, mitte energia.`, R`$\frac{mv^2}{2} = \frac{F}{d}$||Töö on jõud korda teepikkus.`]),
    num(R`Keskmine vastupanujõud:`, 5000, 'N', { final: true, label: R`F`, alts: [{ a: 5, msg: 'Kasuta SI-ühikuid: 10 g = 0,01 kg, 40 mm = 0,04 m.' }] }),
    num(R`Liikumise kestus lauas:`, 4e-4, 's', { final: true, label: R`t`, hint: R`$d = \frac{v}{2}t$` }),
    mc(R`Kui laud on 20 mm paks, siis kuul`, [R`*läbib laua ja väljub kiirusega $v' = \sqrt{v^2 - \frac{2Fd'}{m}}$`, R`jääb lauda kinni||Kuul jõuab 40 mm sügavusele, 20 mm on vähem.`]),
    num(R`Väljumiskiirus:`, 141.4, 'm/s', { final: true, label: R`v'` })
  ],
  sol: R`$F = \frac{mv^2}{2d} = \frac{0.01\cdot 40000}{0.08} = 5.0\ \text{kN}$, $t = \frac{2d}{v} = 0.40\ \text{ms}$.<br>
$d' = 20\ \text{mm}$: $\frac{mv'^2}{2} = \frac{mv^2}{2} - Fd' \Rightarrow v' = \sqrt{40000 - 20000} = 141\ \text{m/s}$, kuul läbib laua.`,
  ans: R`5,0 kN; 0,40 ms; 20 mm laua läbib kuul kiirusega 0,14 km/s.`
});

P({ id: '231', b: 6, k: 'T',
  text: R`Millise minimaalse kiiruse peaks andma raketile Kuu pinnal, et see jäädavalt lahkuks Kuult?`,
  note: R`Kuu massi ja raadiust ülesandes ei anta (need on kogu lisas). Kasutame $M_K = 7.35\cdot 10^{22}\ \text{kg}$, $R_K = 1.74\cdot 10^6\ \text{m}$, mis klapivad raamatu vastusega. ` + NOTE,
  steps: [
    mc(R`Rakett lahkub jäädavalt, kui kineetilisest energiast piisab gravitatsiooni ületamiseks:`, [R`*$\frac{mv^2}{2} = \gamma\frac{Mm}{R}$`, R`$\frac{mv^2}{2} = mgR$||Kuul on teine $g$. Kasuta gravitatsiooniseadust otse.`, R`$\frac{mv^2}{R} = \gamma\frac{Mm}{R^2}$||See annab orbiidikiiruse (esimene kosmiline kiirus).`]),
    mc(R`Kiirus avaldub:`, [R`*$v = \sqrt{\frac{2\gamma M}{R}}$`, R`$v = \sqrt{\frac{\gamma M}{R}}$||Kordaja 2 on puudu.`]),
    num(R`Minimaalne kiirus:`, 2374, 'm/s', { final: true, label: R`v_2` })
  ],
  sol: R`$v_2 = \sqrt{\frac{2\gamma M_K}{R_K}} = \sqrt{\frac{2\cdot 6.67\cdot 10^{-11}\cdot 7.35\cdot 10^{22}}{1.74\cdot 10^6}} = 2.37\ \text{km/s}$.`,
  ans: R`2,37 km/s`
});

/* ---- Kodused ---- */

P({ id: '208', b: 6, k: 'K',
  text: R`Nööri otsas rippuvat 4,9 N raskust kaaluvihti tõsteti kiirendusega 2,0 m/s². Kui suur on seejuures tehtud töö, kui vihti tõsteti 1,0 m võrra?`,
  note: NOTE,
  steps: [
    num(R`Vihi mass:`, 0.5, 'kg', { label: R`m` }),
    num(R`Nööri tõmbejõud:`, 5.9, 'N', { label: R`F`, hint: R`$F = m(g + a)$` }),
    num(R`Tehtud töö:`, 5.9, 'J', { final: true, label: R`A` })
  ],
  sol: R`$m = 0.5\ \text{kg}$, $F = m(g + a) = 5.9\ \text{N}$, $A = Fh = 5.9\ \text{J}$.`,
  ans: R`5,9 J`
});

P({ id: '211', b: 6, k: 'K',
  text: R`Kui palju tööd tuleb teha, et viia 1,00 kg massiga keha Maa pinnalt lõpmatusse?`,
  note: NOTE,
  steps: [
    mc(R`Töö gravitatsioonijõu vastu Maa pinnalt lõpmatusse:`, [R`*$A = \gamma\frac{Mm}{R} = mgR$`, R`$A = mgh$, $h = \infty$||$mgh$ kehtib ainult Maa lähedal, kus $g$ on konstantne.`]),
    num(R`Töö ($R = 6400\ \text{km}$):`, 6.27e7, 'J', { final: true, label: R`A` })
  ],
  sol: R`$A = \gamma\frac{Mm}{R} = mgR = 1\cdot 9.8\cdot 6.4\cdot 10^6 = 63\ \text{MJ}$ (raamatus 62,4 MJ).`,
  ans: R`≈ 62 MJ`
});

P({ id: '220', b: 6, k: 'K',
  text: R`Auto kiirus muutub ühtlaselt kiireneval möödasõidul 6,0 s jooksul 90 km/h kuni 108 km/h. Auto mass on 1400 kg. Õhutakistuse ja hõõrdejõu mõju on 700 N. Milline on veojõu maksimaalne võimsus? 70 % mootori võimsusest antakse üle ratastele. Milline on sellisel juhul mootori maksimaalne võimsus?`,
  note: NOTE,
  steps: [
    num(R`Kiirendus:`, 0.8333, 'm/s²', { label: R`a`, hint: R`90 km/h = 25 m/s, 108 km/h = 30 m/s` }),
    num(R`Veojõud:`, 1867, 'N', { label: R`F_v` }),
    mc(R`Võimsus on $N = F_vv$. Millal on see suurim?`, [R`*Möödasõidu lõpus, kui $v = 30\ \text{m/s}$`, R`Alguses||Veojõud on konstantne, kiirus kasvab.`]),
    num(R`Veojõu maksimaalne võimsus:`, 56000, 'W', { final: true, label: R`N_v` }),
    num(R`Mootori maksimaalne võimsus:`, 80000, 'W', { final: true, label: R`N_m`, alts: [{ a: 39200, msg: 'Ratastele jõuab 70 % mootori võimsusest, seega mootori võimsus on suurem: jaga 0,7-ga.' }] })
  ],
  sol: R`$a = \frac{30 - 25}{6} = 0.83\ \text{m/s}^2$, $F_v = ma + F_h = 1867\ \text{N}$, $N_v = F_vv_{max} = 56\ \text{kW}$, $N_m = \frac{N_v}{0.7} = 80\ \text{kW}$.`,
  ans: R`56 kW; 80 kW`
});

P({ id: '223', b: 6, k: 'K',
  text: R`Vagonett liikus jääva jõu mõjul 5 m ning saavutas kiiruse 2 m/s. Arvutada töö, mida tegi see jõud, kui vagoneti mass on 400 kg ning hõõrdetegur on 0,01.`,
  note: NOTE,
  steps: [
    mc(R`Jõu töö läheb`, [R`*kineetiliseks energiaks ja hõõrdejõu ületamiseks: $A = \frac{mv^2}{2} + \mu mgs$`, R`ainult kineetiliseks energiaks||Hõõrdumist ei saa unustada.`]),
    num(R`Kineetiline energia:`, 800, 'J', { label: R`E_k` }),
    num(R`Hõõrdejõu töö:`, 196, 'J', { label: R`A_h` }),
    num(R`Jõu töö:`, 996, 'J', { final: true, label: R`A` })
  ],
  sol: R`$A = \frac{mv^2}{2} + \mu mgs = 800 + 196 \approx 1\ \text{kJ}$.`,
  ans: R`1 kJ`
});

P({ id: '227', b: 6, k: 'K',
  text: R`Uisutaja sõidab horisontaalsel teel ühtlaselt, kuid lakkab siis hoogu andmast ja libiseb ühtlaselt aeglustuvalt 25 s jooksul 60 m ja peatub. Uisutaja mass on 50 kg. Leida hõõrdetegur ja uisutaja võimsus ühtlase kiirusega sõidul.`,
  note: NOTE,
  steps: [
    num(R`Kiirus enne libisemist:`, 4.8, 'm/s', { label: R`v`, hint: R`$s = \frac{v}{2}t$` }),
    num(R`Hõõrdetegur:`, 0.0196, '', { final: true, label: R`\mu`, hint: R`$a = \frac{v}{t}$, $\mu = \frac{a}{g}$` }),
    mc(R`Ühtlasel sõidul on uisutaja jõud võrdne hõõrdejõuga. Võimsus on`, [R`*$N = F_hv = \mu mgv$`, R`$N = \frac{mv^2}{2t}$||See oleks keskmine võimsus kiirendamisel.`]),
    num(R`Võimsus:`, 46.1, 'W', { final: true, label: R`N` })
  ],
  sol: R`$v = \frac{2s}{t} = 4.8\ \text{m/s}$, $a = \frac{v}{t} = 0.192$, $\mu = \frac{a}{g} = 0.020$, $N = \mu mgv = 46\ \text{W}$.`,
  ans: R`0,020; 46 W`
});

/* ---- Sarnased ---- */

P({ id: '206', b: 6, k: 'S',
  text: R`Poiss pingutas kelgu vedamisel nööri 49 N suuruse jõuga. Nöör moodustas kelgu liikumise suunaga nurga 60°. Kui palju tööd tegi poiss, kui ta vedas kelku 0,50 km?`,
  steps: [num(R`Töö:`, 12250, 'J', { final: true, label: R`A`, hint: R`$A = Fs\cos\alpha$` })],
  sol: R`$A = 49\cdot 500\cdot\cos 60° = 12\ \text{kJ}$.`,
  ans: R`12 kJ`
});

P({ id: '209', b: 6, k: 'S',
  text: R`Keha vertikaalsel tõstmisel 1,0 m kõrgusele jääva jõu mõjul tehti tööd 78,4 J. Millise kiirendusega tõsteti keha, kui selle mass oli 2,0 kg?`,
  steps: [num(R`Kiirendus:`, 29.4, 'm/s²', { final: true, label: R`a`, hint: R`$A = m(g + a)h$` })],
  sol: R`$a = \frac{A}{mh} - g = 39.2 - 9.8 = 29\ \text{m/s}^2$.`,
  ans: R`29 m/s²`
});

P({ id: '221', b: 6, k: 'S',
  text: R`Kui palju tööd tuleb teha, et 1) suurendada rongi kiirust 36 kuni 54 km/h ja 2) peatada see rong, kui kiirus on 72 km/h? Rongi massiks võtta 800 t.`,
  steps: [
    num(R`1) Töö:`, 5e7, 'J', { final: true, label: R`A_1`, hint: R`$A = \frac{m(v_2^2 - v_1^2)}{2}$, $v_1 = 10$, $v_2 = 15$ m/s` }),
    num(R`2) Töö:`, 1.6e8, 'J', { final: true, label: R`A_2` })
  ],
  sol: R`$A_1 = \frac{8\cdot 10^5(225 - 100)}{2} = 50\ \text{MJ}$, $A_2 = \frac{8\cdot 10^5\cdot 400}{2} = 0.16\ \text{GJ}$.`,
  ans: R`50 MJ; 0,16 GJ`
});

P({ id: '222', b: 6, k: 'S',
  text: R`Kui palju tööd tuleb teha, et 1,0 kg massiga keha kiirus 10 m pikkusel teel suureneks 2,0 kuni 6,0 m/s? Kogu teel mõjub hõõrdejõud 2,0 N.`,
  steps: [num(R`Töö:`, 36, 'J', { final: true, label: R`A`, hint: R`$A = \Delta E_k + F_hs$` })],
  sol: R`$A = \frac{1(36 - 4)}{2} + 2\cdot 10 = 16 + 20 = 36\ \text{J}$.`,
  ans: R`36 J`
});

P({ id: '226', b: 6, k: 'S',
  text: R`Naela lüüakse puusse haamriga, mille mass on 1,47 kg. Naelaga kokkupuutumise momendil on haamri kiirus 6,00 m/s. Iga löögi mõjul tungib nael puusse 20,0 mm. Kui suur on naelale mõjuva jõu keskmine väärtus?`,
  steps: [num(R`Keskmine jõud:`, 1323, 'N', { final: true, label: R`F`, hint: R`$Fd = \frac{mv^2}{2}$` })],
  sol: R`$F = \frac{mv^2}{2d} = \frac{1.47\cdot 36}{0.04} = 1.32\ \text{kN}$.`,
  ans: R`1,32 kN`
});

P({ id: '228', b: 6, k: 'S',
  text: R`Kuul, mis kaalus 0,1 N ja lendas kiirusega 800 m/s, lõi läbi 5 cm paksuse laua. Kui suur oli löögi jõud, kui kuul kaotas laua takistuse tõttu 3/4 oma kiirusest?`,
  steps: [
    num(R`Kuuli mass:`, 0.0102, 'kg', { label: R`m` }),
    num(R`Kiirus pärast lauda:`, 200, 'm/s', { label: R`v'` }),
    num(R`Löögi jõud:`, 61220, 'N', { final: true, label: R`F`, tol: 0.05 })
  ],
  sol: R`$m = 0.0102\ \text{kg}$, $v' = 200\ \text{m/s}$, $F = \frac{m(v^2 - v'^2)}{2d} = 6\cdot 10^4\ \text{N}$.`,
  ans: R`0,06 MN`
});

})();
