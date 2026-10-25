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
  sol: R`Ese oli enne paigal, seega impulsi jäävuse seadusest $\vec p_1 + \vec p_2 + \vec p_3 = 0$, ehk $\vec p_3 = -(\vec p_1 + \vec p_2)$.
<br>Impulsid ($p = mv$): $p_1 = 0.1\cdot 5 = 0.5$ (x-sihis), $p_2 = 0.2\cdot 2.5 = 0.5\ \text{kg}\cdot\text{m/s}$ (y-sihis). Need on risti, seega:
$$p_3 = \sqrt{p_1^2 + p_2^2} = \sqrt{0.5^2 + 0.5^2} \approx 0.71\ \text{kg}\cdot\text{m/s}$$
Kolmanda killu kiirus ($m_3 = 0.05\ \text{kg}$): $v_3 = \frac{p_3}{m_3} = \frac{0.71}{0.05} \approx 14\ \text{m/s}$.
<br>Suund on $\vec p_1 + \vec p_2$ vastas, s.t. $135°$ esimese killu kiirusega.`,
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
  sol: R`Viske hetkel kehtib impulsi jäävus (süsteem algul paigal): $0 = mv - MV$. Avaldame uisutaja kiiruse ($m = 3\ \text{kg}$, $v = 8\ \text{m/s}$, $M = 70\ \text{kg}$):
$$V = \frac{mv}{M} = \frac{3\cdot 8}{70} \approx 0.34\ \text{m/s}$$
Seejärel peatab uisutaja hõõrdejõu töö: $\frac{MV^2}{2} = \mu Mgs$. Mass taandub, avaldame tee:
$$s = \frac{V^2}{2\mu g} = \frac{0.34^2}{2\cdot 0.02\cdot 9.8} \approx 0.30\ \text{m}$$`,
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
  sol: R`Arvutame tagantpoolt. Teame nurka, leiame tõusu kõrguse (konspektist $h = l(1 - \cos\alpha)$):
$$h = l(1 - \cos 45°) = 1\cdot(1 - 0.707) \approx 0.29\ \text{m}$$
Pärast põrget liiguvad kuul ja keha koos; energia jäävusest tõusul $\frac{(m+M)u^2}{2} = (m+M)gh$:
$$u = \sqrt{2gh} = \sqrt{2\cdot 9.8\cdot 0.29} \approx 2.40\ \text{m/s}$$
Põrge ise on mitteelastne (kuul tungib sisse), kehtib impulsi jäävus $mv = (m+M)u$. Avaldame kuuli kiiruse ($m = 0.01\ \text{kg}$, $M = 1\ \text{kg}$):
$$v = \frac{(m + M)u}{m} = \frac{1.01}{0.01}\cdot 2.40 = 101\cdot 2.40 \approx 0.24\ \text{km/s}$$`,
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
  sol: R`Energia jäävusest madalaimas punktis (kõrguste vahe $l(1 - \cos\alpha)$, $v^2 = 2gh$):
$$v^2 = 2gl(1 - \cos 60°) = 2gl\cdot 0.5 = gl$$
Madalaimas punktis annavad tõmme ja raskusjõud kesktõmbe: $T - mg = \frac{mv^2}{l}$. Asendame $v^2 = gl$:
$$T = mg + \frac{m\cdot gl}{l} = 2mg = 2\cdot 1\cdot 9.8 \approx 20\ \text{N}$$`,
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
  sol: R`Lagipunktis on minimaalse kiiruse korral toereaktsioon null ja raskusjõud annab üksi kesktõmbe:
$$mg = \frac{mv^2}{R} \Rightarrow v^2 = gR$$
Energia jäävus kaldpinna tipust (kõrgus $h$) lagipunkti (kõrgus $2R$):
$$mgh = mg\cdot 2R + \frac{mv^2}{2} = 2mgR + \frac{mgR}{2}$$
Mass ja $g$ taanduvad: $h = 2R + \frac{R}{2} = 2.5R = 2.5\cdot 8 = 20\ \text{m}$.`,
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
  sol: R`Mitteelastsel põrkel liiguvad kehad edasi koos, impulsi jäävus $m_1v_1 + m_2v_2 = (m_1 + m_2)v$. Avaldame ühise kiiruse ($m_1 = 5$, $m_2 = 7\ \text{kg}$):
<br><b>1)</b> Sama suund (kergem jõuab järele raskemale):
$$v = \frac{m_1v_1 + m_2v_2}{m_1 + m_2} = \frac{5\cdot 4 + 7\cdot 2}{12} \approx 2.8\ \text{m/s}$$
<b>2)</b> Vastassuunad, 7 kg keha kiirus negatiivne:
$$v = \frac{5\cdot 4 - 7\cdot 2}{12} = \frac{6}{12} = 0.5\ \text{m/s} \ (\text{5 kg keha suunas})$$`,
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
  sol: R`Impulsside arvutus ($p = mv$, teisendame kiirused m/s): $p_1 = 0.1\cdot 0.45 = 0.045$, $p_2 = 0.2\cdot 0.15 = 0.03\ \text{kg}\cdot\text{m/s}$.
<br>Pallid liiguvad ristuvates sihtides, seega koguimpulss:
$$p = \sqrt{p_1^2 + p_2^2} = \sqrt{0.045^2 + 0.03^2} \approx 0.054\ \text{kg}\cdot\text{m/s}$$
Impulsi jäävusest $(m_1 + m_2)v = p$, ühine mass $0.3\ \text{kg}$:
$$v = \frac{p}{0.3} = 0.18\ \text{m/s} = 18\ \text{cm/s}$$`,
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
  sol: R`Impulss säilib horisontaalsihis (vertikaalis mõjuvad raskusjõud ja vee üleslükkejõud). Teisendame laeva kiiruse $7.2\ \text{km/h} = 2\ \text{m/s}$. Mürsu horisontaalkomponent $u\cos 30° = 1000\cdot 0.866 = 866\ \text{m/s}$, suunatud laeva liikumisele vastu.
<br>Impulsi jäävus (laeva suund positiivne, mürsk miinusega):
$$Mv_0 = (M - m)V - mu\cos\alpha$$
Avaldame laeva kiiruse ($M = 600\,000\ \text{kg}$, $m = 60\ \text{kg}$):
$$V = \frac{Mv_0 + mu\cos\alpha}{M - m} = \frac{600000\cdot 2 + 60\cdot 866}{599940} \approx 2.087\ \text{m/s} = 7.51\ \text{km/h}$$`,
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
  sol: R`Põrge on mitteelastne (kuul tungib sisse), impulsi jäävus $mv = (m + M)u$. Kiirus vahetult pärast põrget ($m = 0.02\ \text{kg}$, $v = 400\ \text{m/s}$, $M = 5\ \text{kg}$):
$$u = \frac{mv}{m + M} = \frac{0.02\cdot 400}{5.02} \approx 1.59\ \text{m/s}$$
Energia jäävusest tõusu kõrgus: $h = \frac{u^2}{2g} = \frac{1.59^2}{2\cdot 9.8} \approx 0.13\ \text{m}$.
<br>Nurk (konspektist $h = l(1 - \cos\alpha)$, $l = 4\ \text{m}$):
$$\cos\alpha = 1 - \frac{h}{l} = 1 - \frac{0.13}{4} \Rightarrow \alpha \approx 15°$$`,
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
  sol: R`Tõmme on suurim madalaimas punktis: $T - mg = \frac{mv^2}{l}$, kus energiast $v^2 = 2gl(1 - \cos\alpha)$. Asendame ja koondame:
$$T = mg + 2mg(1 - \cos\alpha) = mg(3 - 2\cos\alpha)$$
Tross katkeb, kui $T = 1470\ \text{N}$ ($mg = 100\cdot 9.8 = 980\ \text{N}$). Avaldame nurga:
$$3 - 2\cos\alpha = \frac{T}{mg} = \frac{1470}{980} = 1.5 \Rightarrow \cos\alpha = 0.75 \Rightarrow \alpha \approx 41°$$`,
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
  sol: R`Mitteelastne põrge paigaloleva kehaga, impulsi jäävus $m_1v_1 = (m_1 + m_2)v$ ($m_1 = m_2 = 3\ \text{kg}$):
$$v = \frac{m_1v_1}{m_1 + m_2} = \frac{3\cdot 4}{6} = 2\ \text{m/s}$$
Eraldunud soojus = kineetiliste energiate vahe:
$$Q = \frac{m_1v_1^2}{2} - \frac{(m_1 + m_2)v^2}{2} = \frac{3\cdot 16}{2} - \frac{6\cdot 4}{2} = 24 - 12 = 12\ \text{J}$$`,
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
  sol: R`Õhutakistuse töö = mehaanilise energia kadu. Algne energia (potentsiaalne + kineetiline, $m = 0.05\ \text{kg}$, $h = 20\ \text{m}$, $v_0 = 18\ \text{m/s}$):
$$E_0 = mgh + \frac{mv_0^2}{2} = 0.05\cdot 9.8\cdot 20 + \frac{0.05\cdot 324}{2} = 9.8 + 8.1 = 17.9\ \text{J}$$
Maapinnal ($h = 0$, $v = 24\ \text{m/s}$): $E = \frac{mv^2}{2} = \frac{0.05\cdot 576}{2} = 14.4\ \text{J}$.
<br>Takistuse ületamiseks kulus $\Delta E = E_0 - E = 17.9 - 14.4 \approx 3.5\ \text{J}$.`,
  ans: R`3,5 J`
});

/* ---- Sarnased ---- */

P({ id: '248', b: 7, k: 'S',
  text: R`Kiirusega 10 m/s liikuv granaat jagunes lõhkemisel kaheks killuks. Suurem kild, mille mass on 0,60 granaadi massist, jätkas liikumist samas suunas. Selle kiirus kasvas 25 m/s võrra. Leida väiksema killu kiirus.`,
  steps: [num(R`Väiksema killu kiirus:`, -27.5, 'm/s', { final: true, label: R`v_2`, tol: 0.03, hint: R`$M\cdot 10 = 0.6M\cdot 35 + 0.4Mv_2$` })],
  sol: R`Impulsi jäävus (granaadi mass $M$ taandub): suurem kild on $0.6M$ kiirusega $10 + 25 = 35\ \text{m/s}$, väiksem $0.4M$:
$$M\cdot 10 = 0.6M\cdot 35 + 0.4M\cdot v_2 \Rightarrow 10 = 21 + 0.4v_2$$
$$v_2 = \frac{10 - 21}{0.4} = -27.5\ \text{m/s} \ (\text{vastassuunas})$$`,
  ans: R`−28 m/s`
});

P({ id: '249', b: 7, k: 'S',
  text: R`Mürsk massiga 20 kg väljub relvast, mille mass on 1,0 t, kiirusega 800 m/s. Määrata relva kiirus tagasilöögil lasu momendil.`,
  steps: [num(R`Relva kiirus:`, 16, 'm/s', { final: true, label: R`V` })],
  sol: R`Enne lasku süsteem paigal, impulsi jäävus $0 = mv - MV$. Avaldame relva tagasilöögikiiruse ($m = 20\ \text{kg}$, $v = 800\ \text{m/s}$, $M = 1\ \text{t} = 1000\ \text{kg}$):
$$V = \frac{mv}{M} = \frac{20\cdot 800}{1000} = 16\ \text{m/s}$$`,
  ans: R`16 m/s`
});

P({ id: '250', b: 7, k: 'S',
  text: R`Vagun massiga 60 t läheneb liikumatule platvormile kiirusega 0,20 m/s. Pärast lööki vastu puhvreid hakkab platvorm liikuma kiirusega 0,25 m/s. Kui suur on platvormi mass, kui vaguni kiirus vähenes väärtuseni 0,10 m/s?`,
  steps: [num(R`Platvormi mass:`, 24000, 'kg', { final: true, label: R`m` })],
  sol: R`Impulsi jäävus: vaguni algimpulss = vaguni lõppimpulss + platvormi impulss ($M = 60\ \text{t}$):
$$Mv_0 = Mv_1 + mV \Rightarrow 60\cdot 0.2 = 60\cdot 0.1 + m\cdot 0.25$$
Avaldame platvormi massi:
$$m = \frac{60(0.2 - 0.1)}{0.25} = \frac{6}{0.25} = 24\ \text{t}$$`,
  ans: R`24 t`
});

P({ id: '251', b: 7, k: 'S',
  text: R`Horisontaalsel teel kiirusega 0,20 m/s liikuvale 800 kg massiga vagonetile langes vertikaalsihis 200 kg killustikku. Kuidas muutus vagoneti kiirus?`,
  steps: [
    mc(R`Mis säilib?`, [R`*Impulsi horisontaalkomponent`, R`Kiirus||Mass kasvas, seega kiirus muutub.`]),
    num(R`Uus kiirus:`, 0.16, 'm/s', { final: true, label: R`v` })
  ],
  sol: R`Killustik langeb vertikaalselt, seega horisontaalsihis säilib impulss. Algmass $800\ \text{kg}$, uus mass $800 + 200 = 1000\ \text{kg}$:
$$800\cdot 0.2 = 1000\cdot v \Rightarrow v = \frac{160}{1000} = 0.16\ \text{m/s}$$
Kiirus vähenes $0.20 - 0.16 = 0.04\ \text{m/s}$ võrra.`,
  ans: R`vähenes 0,04 m/s võrra`
});

P({ id: '261', b: 7, k: 'S',
  text: R`Kivi kaaluga 19,6 N langes vabalt 1,43 s jooksul. Leida kivi kineetiline ja potentsiaalne energia tee keskpunktis.`,
  steps: [
    num(R`Langemise kõrgus:`, 10.02, 'm', { label: R`h` }),
    num(R`Potentsiaalne energia keskpunktis:`, 98.2, 'J', { final: true, label: R`E_p` }),
    num(R`Kineetiline energia keskpunktis:`, 98.2, 'J', { final: true, label: R`E_k` })
  ],
  sol: R`Kivi mass kaalust: $m = \frac{P}{g} = \frac{19.6}{9.8} = 2\ \text{kg}$. Kogu langemise kõrgus ($h = \frac{gt^2}{2}$):
$$h = \frac{9.8\cdot 1.43^2}{2} \approx 10\ \text{m}$$
Tee keskpunktis ($\frac{h}{2} = 5\ \text{m}$) potentsiaalne energia:
$$E_p = mg\frac{h}{2} = 2\cdot 9.8\cdot 5 \approx 98\ \text{J}$$
Energia jäävusest kineetiline energia = algenergia miinus $E_p$: $E_k = mgh - E_p = 196 - 98 = 98\ \text{J}$.`,
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
  sol: R`$m = 100\ \text{kg}$. <b>Alghetkel</b> ($h = 150\ \text{m}$, $v = 15\ \text{m/s}$):
$$E_{k1} = \frac{mv^2}{2} = \frac{100\cdot 225}{2} \approx 11.3\ \text{kJ}, \qquad E_{p1} = mgh = 100\cdot 9.8\cdot 150 = 147\ \text{kJ}$$
<b>2 s hiljem:</b> $v = 15 + 9.8\cdot 2 = 34.6\ \text{m/s}$, langes $15\cdot 2 + 4.9\cdot 4 = 49.6\ \text{m}$, seega $h = 100.4\ \text{m}$:
$$E_{k2} = \frac{100\cdot 34.6^2}{2} \approx 59.9\ \text{kJ}, \qquad E_{p2} = 100\cdot 9.8\cdot 100.4 \approx 98.4\ \text{kJ}$$
Summa mõlemal juhul $\approx 158\ \text{kJ}$ ($11.3 + 147 = 59.9 + 98.4$), energia säilib.`,
  ans: R`11,3 kJ; 147 kJ; 59,9 kJ; 98,5 kJ`
});

P({ id: '264', b: 7, k: 'S',
  text: R`Kivi massiga 400 g visati 50 m kõrgusest tornist horisontaalse algkiirusega 20 m/s. Milline on kivi potentsiaalne ja kineetiline energia 2,0 s pärast viset?`,
  steps: [
    num(R`Potentsiaalne energia:`, 119.2, 'J', { final: true, label: R`E_p`, hint: R`2 s jooksul langeb kivi 19,6 m` }),
    num(R`Kineetiline energia:`, 156.8, 'J', { final: true, label: R`E_k` })
  ],
  sol: R`$m = 0.4\ \text{kg}$. 2 s jooksul langeb kivi $\frac{gt^2}{2} = 4.9\cdot 4 = 19.6\ \text{m}$, seega kõrgus $h = 50 - 19.6 = 30.4\ \text{m}$:
$$E_p = mgh = 0.4\cdot 9.8\cdot 30.4 \approx 119\ \text{J}$$
Kiirus: horisontaalkomponent $v_x = 20\ \text{m/s}$, vertikaalne $v_z = gt = 19.6\ \text{m/s}$, seega $v^2 = 20^2 + 19.6^2 = 784\ \text{m}^2/\text{s}^2$:
$$E_k = \frac{mv^2}{2} = \frac{0.4\cdot 784}{2} \approx 157\ \text{J}$$`,
  ans: R`0,12 kJ; 0,16 kJ`
});

P({ id: '272', b: 7, k: 'S',
  text: R`Kelk libiseb alla 1,6 m kõrguselt nõlvakult ja peatub pärast 80 m pikkuse horisontaalse teeosa läbimist. Leida hõõrdetegur horisontaalsel teeosal eeldusel, et nõlvakul võib hõõrdumist mitte arvestada.`,
  steps: [
    mc(R`Energia jäävus:`, [R`*$mgh = \mu mgs$`, R`$mgh = \frac{mv^2}{2}$ ja rohkem polegi vaja||Küsitakse hõõrdetegurit: kogu energia kulub hõõrdetööle.`]),
    num(R`Hõõrdetegur:`, 0.02, '', { final: true, label: R`\mu` })
  ],
  sol: R`Nõlvakul hõõrdumist pole, seega kogu potentsiaalne energia läheb horisontaalsel teeosal hõõrdetööks. Energia jäävus $mgh = \mu mgs$, mass ja $g$ taanduvad:
$$\mu = \frac{h}{s} = \frac{1.6}{80} = 0.020$$`,
  ans: R`0,020`
});

P({ id: '276', b: 7, k: 'S',
  text: R`Mootorrattur sõidab horisontaalset teed mööda. Milline peab olema minimaalne kiirus, et ta saaks väljalülitatud mootoriga teha surmasõlme raadiusega 4,0 m? Hõõrdumist, õhutakistust ja pöörlemistele kuluvat energiat mitte arvestada.`,
  steps: [num(R`Minimaalne kiirus:`, 14, 'm/s', { final: true, label: R`v`, hint: R`$\frac{mv^2}{2} = 2mgR + \frac{mgR}{2}$` })],
  sol: R`Lagipunktis annab raskusjõud üksi kesktõmbe (minimaalne kiirus): $v_t^2 = gR$. Energia jäävus maapinnalt lagipunkti (kõrgus $2R$):
$$\frac{mv^2}{2} = 2mgR + \frac{mv_t^2}{2} = 2mgR + \frac{mgR}{2}$$
Mass taandub: $v^2 = 5gR = 5\cdot 9.8\cdot 4 = 196 \Rightarrow v = 14\ \text{m/s}$.`,
  ans: R`14 m/s`
});

P({ id: '280', b: 7, k: 'S',
  text: R`Milline on minimaalne kiirus, mille peab andma kehale maapinnal, et see lahkuks Maa gravitatsioonilise mõju piirkonnast. Õhu takistust mitte arvestada.`,
  steps: [num(R`Teine kosmiline kiirus ($R = 6400\ \text{km}$):`, 11200, 'm/s', { final: true, label: R`v_2`, hint: R`$v_2 = \sqrt{2gR}$` })],
  sol: R`See on teine kosmiline kiirus. Kineetilisest energiast peab piisama gravitatsioonilise seose ületamiseks: $\frac{mv^2}{2} = G\frac{Mm}{R}$, millest $v = \sqrt{\frac{2GM}{R}}$. Pinnal $GM = gR^2$, seega $v_2 = \sqrt{2gR}$:
$$v_2 = \sqrt{2gR} = \sqrt{2\cdot 9.8\cdot 6.4\cdot 10^6} \approx 11.2\ \text{km/s}$$`,
  ans: R`11,1 km/s`
});

P({ id: '285', b: 7, k: 'S',
  text: R`Kaks kerakujulist kuuli massiga 4 ja 3 kg liiguvad teineteisele vastu kiirusega 5 ja 2 m/s. Kui palju energiat kulub kuulide deformeerimiseks nende absoluutselt mitteelastsel tsentraalsel põrkel?`,
  steps: [
    num(R`Ühine kiirus pärast põrget:`, 2, 'm/s', { label: R`v` }),
    num(R`Deformeerimiseks kulunud energia:`, 42, 'J', { final: true, label: R`Q` })
  ],
  sol: R`Kuulid liiguvad teineteisele vastu, üks kiirus negatiivne. Impulsi jäävus ($m_1 = 4$, $m_2 = 3\ \text{kg}$, $v_1 = 5$, $v_2 = -2\ \text{m/s}$):
$$v = \frac{m_1v_1 + m_2v_2}{m_1 + m_2} = \frac{20 - 6}{7} = 2\ \text{m/s}$$
Deformeerimiseks kulunud energia = kineetiliste energiate vahe:
$$Q = \frac{m_1v_1^2}{2} + \frac{m_2v_2^2}{2} - \frac{(m_1 + m_2)v^2}{2} = 50 + 6 - 14 = 42\ \text{J}$$`,
  ans: R`0,04 kJ`
});

})();
