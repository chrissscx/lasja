/* 7. Impulss, energia jäävus, põrge. Tunnis: 256, 265, 267, 273, 275, 284. Kodus: 255, 257, 266, 274, 286, 263.
   NB! Konspektis selle teema ülesannete lahendusi ei ole, ainult teooria (ptk 7). */
(function () {
const R = String.raw;
const NOTE = R`Selle teema ülesannete lahendusi konspektis ei ole. Lahenduskäik on tehtud konspekti teooriaosa valemitega ja kontrollitud raamatu vastusega.`;

function pendScene() {
  return {
    w: 360, h: 230, bg: SC.ceiling(130, 230, 20) + SC.rope([[180, 20], [180, 165]]) + `<line class="dash" x1="180" y1="20" x2="260" y2="140"/><path class="dash" d="M260,140 Q225,175 180,185"/>`,
    bodies: [{ id: 'K', x: 180, y: 185, w: 34, h: 34, shape: 'circle', label: '' }],
    forces: ['mg', 'T', 'F', 'N'], dirs: SC.DIR4,
    ans: { K: { mg: 'down', T: 'up' } },
    why: { F: 'Peale raskusjõu ja nööri tõmbe muid jõude ei ole. Kesktõmbejõud on nende resultant.', N: 'Keha ripub nööri otsas, toetuspinda pole.' },
    dirWhy: { T: 'Nöör tõmbab keha riputuspunkti poole (üles).' }
  };
}

P({ id: '256', b: 7, k: 'T',
  text: R`Mingi paigalseisev ese lõhkeb kolmeks killuks massiga 100 g, 200 g ja 50 g. Esimene lendab x-telje suunas kiirusega 5,0 m/s, teine y-telje suunas kiirusega 2,5 m/s. Milline on kolmanda killu kiirus?`,
  given: R`<b>Andmed:</b> $m_1 = 0.1\ \text{kg}$, $v_1 = 5\ \text{m/s}$ (x), $m_2 = 0.2\ \text{kg}$, $v_2 = 2.5\ \text{m/s}$ (y), $m_3 = 0.05\ \text{kg}$.<br><b>Leida:</b> $v_3$ ja suund.`,
  note: NOTE,
  steps: [
    mc(R`Ese oli enne paigal. Mida ütleb impulsi jäävuse seadus?`, [R`*$\vec p_1 + \vec p_2 + \vec p_3 = 0$`, R`$p_1 + p_2 + p_3 = 0$ arvudena||Impulsid on vektorid ja suunatud eri suundadesse, liita tuleb vektoritena.`, R`$\vec p_1 + \vec p_2 = \vec p_3$||Märk on vale: kolmas kild peab ülejäänud kahe impulsi tasakaalustama.`]),
    num(R`Esimese killu impulss:`, 0.5, 'kg·m/s', { label: R`p_1` }),
    num(R`Teise killu impulss:`, 0.5, 'kg·m/s', { label: R`p_2` }),
    frc(R`Joonesta kõigi kolme killu impulsivektorid.`, {
      w: 300, h: 260, bg: `<line class="dash" x1="20" y1="130" x2="280" y2="130"/><line class="dash" x1="150" y1="240" x2="150" y2="20"/><text x="268" y="122">x</text><text x="156" y="30">y</text>`,
      bodies: [{ id: 'O', x: 150, y: 130, w: 14, h: 14, shape: 'circle', label: '' }],
      forces: ['p1', 'p2', 'p3'], dirs: SC.DIR8,
      ans: { O: { p1: 'right', p2: 'up', p3: 'dl' } },
      dirWhy: { p1: 'Esimene kild lendab x-telje suunas.', p2: 'Teine kild lendab y-telje suunas.', p3: 'Kolmanda killu impulss peab olema $-(\\vec p_1 + \\vec p_2)$, s.t. alla vasakule.' }
    }),
    num(R`Kolmanda killu impulsi moodul:`, 0.7071, 'kg·m/s', { label: R`p_3`, hint: R`$p_3 = \sqrt{p_1^2 + p_2^2}$` }),
    num(R`Kolmanda killu kiirus:`, 14.14, 'm/s', { final: true, label: R`v_3` }),
    num(R`Nurk esimese killu kiirusega:`, 135, '°', { final: true, label: R`\beta` })
  ],
  sol: R`$\vec p_1 + \vec p_2 + \vec p_3 = 0$. $p_1 = 0.5$, $p_2 = 0.5\ \text{kg·m/s}$ (ristuvad),
$$p_3 = \sqrt{p_1^2 + p_2^2} = 0.71\ \text{kg·m/s}, \quad v_3 = \frac{p_3}{m_3} = 14\ \text{m/s}$$
Suund on $\vec p_1 + \vec p_2$ vastas: $135°$ esimese killu kiirusega.`,
  ans: R`14 m/s, 135° esimese killu kiirusega.`
});

P({ id: '265', b: 7, k: 'T',
  text: R`Uisutaja massiga 70 kg seisab jääl ja viskab horisontaalsuunas kivi 3 kg kiirusega 8 m/s. Kui kaugele libiseb uisutaja, kui hõõrdetegur uiskude libisemisel jääl on 0,02?`,
  note: NOTE,
  steps: [
    ord(R`Pane lahenduse sammud õigesse järjekorda.`, [
      R`Impulsi jäävus viskel: $0 = mv - MV$`,
      R`Uisutaja kiirus: $V = \frac{mv}{M}$`,
      R`Hõõrdejõu töö peatab uisutaja: $\frac{MV^2}{2} = \mu Mgs$`,
      R`Libisemise teepikkus: $s = \frac{V^2}{2\mu g}$`
    ]),
    num(R`Uisutaja kiirus pärast viset:`, 0.3429, 'm/s', { label: R`V` }),
    num(R`Libisemise teepikkus:`, 0.3, 'm', { final: true, label: R`s`, tol: 0.03 })
  ],
  sol: R`$MV = mv \Rightarrow V = \frac{3\cdot 8}{70} = 0.34\ \text{m/s}$. $\frac{MV^2}{2} = \mu Mgs \Rightarrow s = \frac{V^2}{2\mu g} = 0.30\ \text{m}$.`,
  ans: R`0,3 m`
});

P({ id: '267', b: 7, k: 'T',
  text: R`Kuul tabab 1,0 m pikkuse paela otsas rippuvat keha massiga 1,0 kg ning tungib sellesse. Põrke tagajärjel kaldub pael 45° nurga võrra vertikaalsihist kõrvale. Arvutada kuuli kiirus, kui tema mass on 10 g.`,
  given: R`<b>Andmed:</b> $l = 1\ \text{m}$, $M = 1\ \text{kg}$, $\alpha = 45°$, $m = 0.01\ \text{kg}$.<br><b>Leida:</b> $v$.`,
  note: NOTE,
  steps: [
    ord(R`Pane lahenduse sammud õigesse järjekorda.`, [
      R`Tõusu kõrgus: $h = l(1 - \cos\alpha)$`,
      R`Energia jäävus tõusul: $\frac{(m + M)u^2}{2} = (m + M)gh$, millest $u$`,
      R`Impulsi jäävus põrkel: $mv = (m + M)u$, millest $v$`
    ], R`Arvutame „tagantpoolt“: teame nurka, leiame kõrguse, siis kiiruse pärast põrget ja lõpuks kuuli kiiruse.`),
    mc(R`Miks ei saa kogu protsessile kasutada mehaanilise energia jäävust ($\frac{mv^2}{2} = (m + M)gh$)?`, [R`*Kuul tungib kehasse, põrge on mitteelastne ja osa energiast muutub soojuseks`, R`Saab küll||Siis saaksid liiga väikese kiiruse. Mitteelastsel põrkel energia ei säili, säilib ainult impulss.`]),
    num(R`Tõusu kõrgus:`, 0.2929, 'm', { label: R`h` }),
    num(R`Kiirus vahetult pärast põrget:`, 2.396, 'm/s', { label: R`u` }),
    num(R`Kuuli kiirus:`, 242, 'm/s', { final: true, label: R`v` })
  ],
  sol: R`$h = l(1 - \cos 45°) = 0.29\ \text{m}$, $u = \sqrt{2gh} = 2.40\ \text{m/s}$, $v = \frac{(m + M)u}{m} = 101\cdot 2.40 = 0.24\ \text{km/s}$.`,
  ans: R`0,24 km/s`
});

P({ id: '273', b: 7, k: 'T',
  text: R`Nööri otsa riputatud kaaluviht „1 kg“ kallutatakse kõrvale nii, et nöör moodustab vertikaaliga nurga 60°, ja lastakse lahti. Kui suur on nööri pingutav jõud momendil, millal kaaluviht läbib trajektoori madalaimat punkti?`,
  note: NOTE,
  steps: [
    frc(R`Joonesta vihile mõjuvad jõud madalaimas punktis.`, pendScene()),
    mc(R`Madalaimas punktis:`, [R`*$T - mg = \frac{mv^2}{l}$`, R`$T = mg$||Viht liigub mööda ringjoont, vaja on kesktõmbejõudu.`, R`$T + mg = \frac{mv^2}{l}$||All on raskusjõud keskpunktist eemale.`]),
    mc(R`Kiiruse ruut madalaimas punktis (energia jäävus):`, [R`*$v^2 = 2gl(1 - \cos 60°) = gl$`, R`$v^2 = 2gl$||Kõrguste vahe on $l(1 - \cos\alpha)$, mitte $l$.`]),
    num(R`Nööri tõmme:`, 19.6, 'N', { final: true, label: R`T`, ex: R`$T = mg + \frac{mgl}{l} = 2mg = 19.6 \approx 20\ \text{N}$` })
  ],
  sol: R`$v^2 = 2gl(1 - \cos 60°) = gl$. $T - mg = \frac{mv^2}{l} = mg \Rightarrow T = 2mg = 20\ \text{N}$.`,
  ans: R`20 N`
});

P({ id: '275', b: 7, k: 'T',
  text: R`Kaldpinnalt alla sõitev jalgrattur peab sooritama surmasõlme raadiusega 8,0 m. Kui suur peab olema kaldpinna minimaalne kõrgus, et jalgrattur ei kukuks ringi lagipunktist alla? Hõõrdumist, õhutakistust ja pöörlemistele kuluvat energiat mitte arvestada.`,
  note: NOTE,
  steps: [
    frc(R`Joonesta jalgratturile mõjuvad jõud ringi lagipunktis.`, {
      w: 300, h: 260, bg: `<circle cx="150" cy="140" r="95"/><circle cx="150" cy="140" r="3" class="fill"/>`,
      bodies: [{ id: 'J', x: 150, y: 62, w: 34, h: 26, label: '' }],
      forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.DIR4,
      ans: { J: { mg: 'down', N: 'down' } },
      why: { Fh: 'Hõõrdumist ei arvestata.', F: 'Muid jõude pole.' },
      dirWhy: { N: 'Lagipunktis on rada jalgratturi kohal ja surub teda alla, keskpunkti poole.' }
    }),
    mc(R`Minimaalse kiiruse korral lagipunktis on toereaktsioon null. Siis:`, [R`*$mg = \frac{mv^2}{R}$, s.t. $v^2 = gR$`, R`$v = 0$||Siis kukuks jalgrattur alla.`]),
    mc(R`Energia jäävus kaldpinna tipust lagipunktini:`, [R`*$mgh = mg\cdot 2R + \frac{mv^2}{2}$`, R`$mgh = \frac{mv^2}{2}$||Lagipunkt on kõrgusel $2R$.`, R`$mgh = mgR + \frac{mv^2}{2}$||Lagipunkt on ringi tipus, kõrgusel $2R$.`]),
    num(R`Minimaalne kõrgus:`, 20, 'm', { final: true, label: R`h`, ex: R`$h = 2R + \frac{R}{2} = 2.5R = 20\ \text{m}$` })
  ],
  sol: R`Lagipunktis $mg = \frac{mv^2}{R}$. Energia: $mgh = 2mgR + \frac{mgR}{2} \Rightarrow h = 2.5R = 20\ \text{m}$.`,
  ans: R`20 m`
});

P({ id: '284', b: 7, k: 'T',
  text: R`Kaks mitteelastset keha massiga 5 ja 7 kg liiguvad kiirusega vastavalt 4 ja 2 m/s. Kui suur on kehade kiirus pärast nende kokkupõrget, kui 1) kergem keha jõudis järele raskemale, 2) kehad liikusid teineteisele vastu?`,
  note: NOTE,
  steps: [
    mc(R`Mitteelastsel põrkel:`, [R`*kehad liiguvad edasi koos: $m_1v_1 + m_2v_2 = (m_1 + m_2)v$`, R`kehtib ka mehaanilise energia jäävus||Mitteelastsel põrkel muutub osa energiast soojuseks.`]),
    num(R`1) Kiirus pärast põrget (sama suund):`, 2.833, 'm/s', { final: true, label: R`v_1`, tol: 0.07, ex: R`$v = \frac{5\cdot 4 + 7\cdot 2}{12} = 2.8\ \text{m/s}$ (raamatus ümardatud 3 m/s)` }),
    mc(R`2) Kehad liiguvad vastu. Kuidas arvestada suunda?`, [R`*Ühe keha kiirus on negatiivne: $5\cdot 4 + 7\cdot(-2)$`, R`Liita mõlemad positiivsetena||Vastassuunalised impulsid tuleb lahutada.`]),
    num(R`2) Kiirus pärast põrget:`, 0.5, 'm/s', { final: true, label: R`v_2`, ex: R`$v = \frac{20 - 14}{12} = 0.5\ \text{m/s}$, 5 kg keha liikumise suunas.` })
  ],
  sol: R`1) $v = \frac{5\cdot 4 + 7\cdot 2}{12} = 2.8 \approx 3\ \text{m/s}$. 2) $v = \frac{5\cdot 4 - 7\cdot 2}{12} = 0.5\ \text{m/s}$.`,
  ans: R`1) ≈ 3 m/s; 2) 0,5 m/s`
});

/* ---- Kodused ---- */

P({ id: '255', b: 7, k: 'K',
  text: R`Libeda jää pinnal liiguvad kaks lumepalli teineteisega ristuvas sihis. Esimese mass on 100 g ja kiirus 45 cm/s, teisel – 200 g ja 15 cm/s. Lumepallid põrkuvad ja moodustavad ühe lumepalli massiga 300 g. Millise kiirusega jätkab see liikumist?`,
  note: NOTE,
  steps: [
    num(R`Esimese palli impulss:`, 0.045, 'kg·m/s', { label: R`p_1` }),
    num(R`Teise palli impulss:`, 0.03, 'kg·m/s', { label: R`p_2` }),
    mc(R`Impulsid on risti. Koguimpulss:`, [R`*$p = \sqrt{p_1^2 + p_2^2}$`, R`$p = p_1 + p_2$||Ristuvaid vektoreid ei saa lihtsalt liita.`]),
    num(R`Kiirus pärast põrget:`, 0.1803, 'm/s', { final: true, label: R`v` })
  ],
  sol: R`$p_1 = 0.045$, $p_2 = 0.03\ \text{kg·m/s}$, $p = 0.054\ \text{kg·m/s}$, $v = \frac{p}{0.3} = 0.18\ \text{m/s} = 18\ \text{cm/s}$.`,
  ans: R`18 cm/s`
});

P({ id: '257', b: 7, k: 'K',
  text: R`Kiirusega 7,20 km/h liikuvalt laevalt massiga 600 t tulistati kahurist laeva liikumisele vastupidises suunas 30,0° nurga all horisondi suhtes. Kui kiiresti hakkas laev liikuma, kui mürsk massiga 60,0 kg lendas kahuritorust välja kiirusega 1000 m/s?`,
  note: NOTE,
  steps: [
    mc(R`Mis suunas säilib impulss?`, [R`*Horisontaalsihis (vertikaalis mõjuvad raskusjõud ja vee üleslükkejõud)`, R`Kõigis suundades||Vertikaalsihis ei ole süsteem suletud.`]),
    num(R`Mürsu kiiruse horisontaalkomponent:`, 866, 'm/s', { label: R`u_x` }),
    mc(R`Impulsi jäävus horisontaalsihis (laeva suund positiivne):`, [R`*$Mv_0 = (M - m)V - mu\cos\alpha$`, R`$Mv_0 = (M - m)V + mu\cos\alpha$||Mürsk lendab tagasi, seega tema impulss on miinusega.`]),
    num(R`Laeva kiirus:`, 2.087, 'm/s', { final: true, label: R`V`, tol: 0.003, ex: R`$V = 2.087\ \text{m/s} = 7.51\ \text{km/h}$` })
  ],
  sol: R`$v_0 = 2\ \text{m/s}$. $Mv_0 = (M - m)V - mu\cos 30°$:
$$V = \frac{600000\cdot 2 + 60\cdot 866}{599940} = 2.087\ \text{m/s} = 7.51\ \text{km/h}$$`,
  ans: R`7,51 km/h`
});

P({ id: '266', b: 7, k: 'K',
  text: R`Püssikuul massiga 20 g lendab horisontaalselt kiirusega 400 m/s ja tabab 4,0 m pikkuse paela otsas rippuvat kera massiga 5,0 kg ning tungib sellesse. Määrata nurk, mille võrra pael kaldub vertikaalasendist kõrvale.`,
  note: NOTE,
  steps: [
    num(R`Kiirus vahetult pärast põrget:`, 1.594, 'm/s', { label: R`u`, hint: R`$mv = (m + M)u$` }),
    num(R`Tõusu kõrgus:`, 0.1296, 'm', { label: R`h`, hint: R`$h = \frac{u^2}{2g}$` }),
    num(R`Nurk:`, 14.6, '°', { final: true, label: R`\alpha`, tol: 0.04, hint: R`$\cos\alpha = 1 - \frac{h}{l}$` })
  ],
  sol: R`$u = \frac{0.02\cdot 400}{5.02} = 1.59\ \text{m/s}$, $h = \frac{u^2}{2g} = 0.13\ \text{m}$, $\cos\alpha = 1 - \frac{0.13}{4} \Rightarrow \alpha = 15°$.`,
  ans: R`15°`
});

P({ id: '274', b: 7, k: 'K',
  text: R`Trossi otsa on riputatud 100 kg massiga keha. Millise maksimaalse nurga võrra võib trossi kallutada vertikaalasendist, et see ei katkeks edasisel liikumisel pärast vabakslaskmist? Tross katkeb jõu 1470 N mõjul.`,
  note: NOTE,
  steps: [
    frc(R`Joonesta kehale mõjuvad jõud madalaimas punktis (seal on tõmme suurim).`, pendScene()),
    mc(R`Madalaimas punktis $T - mg = \frac{mv^2}{l}$, kus $v^2 = 2gl(1 - \cos\alpha)$. Seega:`, [R`*$T = mg(3 - 2\cos\alpha)$`, R`$T = mg(1 + 2\cos\alpha)$||Asenda hoolikalt: $mg + 2mg(1 - \cos\alpha)$.`]),
    num(R`$\cos\alpha$:`, 0.75, '', { label: R`\cos\alpha` }),
    num(R`Maksimaalne nurk:`, 41.4, '°', { final: true, label: R`\alpha`, tol: 0.01 })
  ],
  sol: R`$T = mg(3 - 2\cos\alpha) = 1470 \Rightarrow 3 - 2\cos\alpha = 1.5 \Rightarrow \cos\alpha = 0.75$, $\alpha = 41°$.`,
  ans: R`41,3°`
});

P({ id: '286', b: 7, k: 'K',
  text: R`Keha massiga 3,0 kg liigub kiirusega 4,0 m/s ja põrkub mitteelastselt tsentraalselt teise samasuguse paigaloleva kehaga. Leida põrkel eraldunud soojus.`,
  note: NOTE,
  steps: [
    num(R`Kiirus pärast põrget:`, 2, 'm/s', { label: R`v` }),
    mc(R`Soojus on`, [R`*kineetiliste energiate vahe: $Q = \frac{m_1v_1^2}{2} - \frac{(m_1 + m_2)v^2}{2}$`, R`$Q = 0$||Mitteelastsel põrkel energia ei säili.`]),
    num(R`Eraldunud soojus:`, 12, 'J', { final: true, label: R`Q` })
  ],
  sol: R`$v = \frac{3\cdot 4}{6} = 2\ \text{m/s}$, $Q = \frac{3\cdot 16}{2} - \frac{6\cdot 4}{2} = 24 - 12 = 12\ \text{J}$.`,
  ans: R`12 J`
});

P({ id: '263', b: 7, k: 'K',
  text: R`Kivi massiga 50 g visati 20 m kõrguselt vertikaalselt alla algkiirusega 18 m/s. Maapinnale langes ta kiirusega 24 m/s. Kui palju energiat kulus õhu takistuse ületamiseks?`,
  note: NOTE,
  steps: [
    num(R`Algne mehaaniline energia:`, 17.9, 'J', { label: R`E_0`, hint: R`$E_0 = mgh + \frac{mv_0^2}{2}$` }),
    num(R`Lõppenergia:`, 14.4, 'J', { label: R`E` }),
    num(R`Takistuse ületamiseks kulunud energia:`, 3.5, 'J', { final: true, label: R`\Delta E` })
  ],
  sol: R`$E_0 = 0.05\cdot 9.8\cdot 20 + \frac{0.05\cdot 324}{2} = 9.8 + 8.1 = 17.9\ \text{J}$, $E = \frac{0.05\cdot 576}{2} = 14.4\ \text{J}$, $\Delta E = 3.5\ \text{J}$.`,
  ans: R`3,5 J`
});

/* ---- Sarnased ---- */

P({ id: '248', b: 7, k: 'S',
  text: R`Kiirusega 10 m/s liikuv granaat jagunes lõhkemisel kaheks killuks. Suurem kild, mille mass on 0,60 granaadi massist, jätkas liikumist samas suunas. Selle kiirus kasvas 25 m/s võrra. Leida väiksema killu kiirus.`,
  steps: [num(R`Väiksema killu kiirus:`, -27.5, 'm/s', { final: true, label: R`v_2`, tol: 0.03, hint: R`$M\cdot 10 = 0.6M\cdot 35 + 0.4Mv_2$` })],
  sol: R`$10 = 0.6\cdot 35 + 0.4v_2 \Rightarrow v_2 = -27.5\ \text{m/s}$ (vastassuunas).`,
  ans: R`−28 m/s`
});

P({ id: '249', b: 7, k: 'S',
  text: R`Mürsk massiga 20 kg väljub relvast, mille mass on 1,0 t, kiirusega 800 m/s. Määrata relva kiirus tagasilöögil lasu momendil.`,
  steps: [num(R`Relva kiirus:`, 16, 'm/s', { final: true, label: R`V` })],
  sol: R`$mv = MV \Rightarrow V = \frac{20\cdot 800}{1000} = 16\ \text{m/s}$.`,
  ans: R`16 m/s`
});

P({ id: '250', b: 7, k: 'S',
  text: R`Vagun massiga 60 t läheneb liikumatule platvormile kiirusega 0,20 m/s. Pärast lööki vastu puhvreid hakkab platvorm liikuma kiirusega 0,25 m/s. Kui suur on platvormi mass, kui vaguni kiirus vähenes väärtuseni 0,10 m/s?`,
  steps: [num(R`Platvormi mass:`, 24000, 'kg', { final: true, label: R`m` })],
  sol: R`$60\cdot 0.2 = 60\cdot 0.1 + m\cdot 0.25 \Rightarrow m = 24\ \text{t}$.`,
  ans: R`24 t`
});

P({ id: '251', b: 7, k: 'S',
  text: R`Horisontaalsel teel kiirusega 0,20 m/s liikuvale 800 kg massiga vagonetile langes vertikaalsihis 200 kg killustikku. Kuidas muutus vagoneti kiirus?`,
  steps: [
    mc(R`Mis säilib?`, [R`*Impulsi horisontaalkomponent`, R`Kiirus||Mass kasvas, seega kiirus muutub.`]),
    num(R`Uus kiirus:`, 0.16, 'm/s', { final: true, label: R`v` })
  ],
  sol: R`$800\cdot 0.2 = 1000v \Rightarrow v = 0.16\ \text{m/s}$, vähenes 0,04 m/s võrra.`,
  ans: R`vähenes 0,04 m/s võrra`
});

P({ id: '261', b: 7, k: 'S',
  text: R`Kivi kaaluga 19,6 N langes vabalt 1,43 s jooksul. Leida kivi kineetiline ja potentsiaalne energia tee keskpunktis.`,
  steps: [
    num(R`Langemise kõrgus:`, 10.02, 'm', { label: R`h` }),
    num(R`Potentsiaalne energia keskpunktis:`, 98.2, 'J', { final: true, label: R`E_p` }),
    num(R`Kineetiline energia keskpunktis:`, 98.2, 'J', { final: true, label: R`E_k` })
  ],
  sol: R`$h = \frac{gt^2}{2} = 10\ \text{m}$, keskel $E_p = mg\frac{h}{2} = 98\ \text{J}$, $E_k = mgh - E_p = 98\ \text{J}$.`,
  ans: R`98,3 J; 98,3 J`
});

P({ id: '262', b: 7, k: 'S',
  text: R`Kivi massiga 100 kg langeb vabalt. 150 m kõrgusel on ta kiirus 15,0 m/s. Arvutada kineetiline ja potentsiaalne energia sellel momendil ja 2 s hiljem ning näidata, et energiate summa ei muutunud.`,
  steps: [
    num(R`Kineetiline energia alguses:`, 11250, 'J', { label: R`E_{k1}` }),
    num(R`Potentsiaalne energia alguses:`, 147000, 'J', { label: R`E_{p1}` }),
    num(R`Kineetiline energia 2 s hiljem:`, 59858, 'J', { label: R`E_{k2}`, hint: R`$v = 15 + 9.8\cdot 2$` }),
    num(R`Potentsiaalne energia 2 s hiljem:`, 98392, 'J', { final: true, label: R`E_{p2}`, hint: R`Langes $15\cdot 2 + 4.9\cdot 4 = 49.6\ \text{m}$` })
  ],
  sol: R`$E_{k1} = 11.3\ \text{kJ}$, $E_{p1} = 147\ \text{kJ}$; 2 s hiljem $v = 34.6\ \text{m/s}$, $h = 100.4\ \text{m}$: $E_{k2} = 59.9\ \text{kJ}$, $E_{p2} = 98.4\ \text{kJ}$. Summa on mõlemal juhul 158 kJ.`,
  ans: R`11,3 kJ; 147 kJ; 59,9 kJ; 98,5 kJ`
});

P({ id: '264', b: 7, k: 'S',
  text: R`Kivi massiga 400 g visati 50 m kõrgusest tornist horisontaalse algkiirusega 20 m/s. Milline on kivi potentsiaalne ja kineetiline energia 2,0 s pärast viset?`,
  steps: [
    num(R`Potentsiaalne energia:`, 119.2, 'J', { final: true, label: R`E_p`, hint: R`2 s jooksul langeb kivi 19,6 m` }),
    num(R`Kineetiline energia:`, 156.8, 'J', { final: true, label: R`E_k` })
  ],
  sol: R`$h = 50 - 19.6 = 30.4\ \text{m}$, $E_p = 119\ \text{J}$; $v^2 = 400 + 19.6^2 = 784$, $E_k = 157\ \text{J}$.`,
  ans: R`0,12 kJ; 0,16 kJ`
});

P({ id: '272', b: 7, k: 'S',
  text: R`Kelk libiseb alla 1,6 m kõrguselt nõlvakult ja peatub pärast 80 m pikkuse horisontaalse teeosa läbimist. Leida hõõrdetegur horisontaalsel teeosal eeldusel, et nõlvakul võib hõõrdumist mitte arvestada.`,
  steps: [
    mc(R`Energia jäävus:`, [R`*$mgh = \mu mgs$`, R`$mgh = \frac{mv^2}{2}$ ja rohkem polegi vaja||Küsitakse hõõrdetegurit: kogu energia kulub hõõrdetööle.`]),
    num(R`Hõõrdetegur:`, 0.02, '', { final: true, label: R`\mu` })
  ],
  sol: R`$mgh = \mu mgs \Rightarrow \mu = \frac{h}{s} = 0.020$.`,
  ans: R`0,020`
});

P({ id: '276', b: 7, k: 'S',
  text: R`Mootorrattur sõidab horisontaalset teed mööda. Milline peab olema minimaalne kiirus, et ta saaks väljalülitatud mootoriga teha surmasõlme raadiusega 4,0 m? Hõõrdumist, õhutakistust ja pöörlemistele kuluvat energiat mitte arvestada.`,
  steps: [num(R`Minimaalne kiirus:`, 14, 'm/s', { final: true, label: R`v`, hint: R`$\frac{mv^2}{2} = 2mgR + \frac{mgR}{2}$` })],
  sol: R`$v^2 = 5gR = 196 \Rightarrow v = 14\ \text{m/s}$.`,
  ans: R`14 m/s`
});

P({ id: '280', b: 7, k: 'S',
  text: R`Milline on minimaalne kiirus, mille peab andma kehale maapinnal, et see lahkuks Maa gravitatsioonilise mõju piirkonnast. Õhu takistust mitte arvestada.`,
  steps: [num(R`Teine kosmiline kiirus ($R = 6400\ \text{km}$):`, 11200, 'm/s', { final: true, label: R`v_2`, hint: R`$v_2 = \sqrt{2gR}$` })],
  sol: R`$v_2 = \sqrt{2gR} = \sqrt{2\cdot 9.8\cdot 6.4\cdot 10^6} = 11.2\ \text{km/s}$.`,
  ans: R`11,1 km/s`
});

P({ id: '285', b: 7, k: 'S',
  text: R`Kaks kerakujulist kuuli massiga 4 ja 3 kg liiguvad teineteisele vastu kiirusega 5 ja 2 m/s. Kui palju energiat kulub kuulide deformeerimiseks nende absoluutselt mitteelastsel tsentraalsel põrkel?`,
  steps: [
    num(R`Ühine kiirus pärast põrget:`, 2, 'm/s', { label: R`v` }),
    num(R`Deformeerimiseks kulunud energia:`, 42, 'J', { final: true, label: R`Q` })
  ],
  sol: R`$v = \frac{20 - 6}{7} = 2\ \text{m/s}$, $Q = 50 + 6 - 14 = 42\ \text{J}$.`,
  ans: R`0,04 kJ`
});

})();
