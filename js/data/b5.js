/* 5. Keha kaal, kesktõmbejõud, gravitatsioon. Tunnis: 144, 147, 149, 170, 176, 194. Kodus: 145, 150, 161, 171, 195. */
(function () {
const R = String.raw;

function hangScene(label, force) {
  return {
    w: 360, h: 220, bg: SC.ceiling(130, 230, 20) + SC.rope([[180, 20], [180, 85]]),
    bodies: [{ id: 'K', x: 180, y: 130, w: 80, h: 80, label }],
    forces: ['mg', force, 'N', 'F'].filter((v, i, a) => a.indexOf(v) === i), dirs: SC.DIR4,
    ans: { K: { mg: 'down', [force]: 'up' } },
    why: { N: 'Keha ripub trossi otsas, ta ei toetu pinnale.', F: 'Muid jõude peale raskusjõu ja trossi tõmbe ei ole.' },
    dirWhy: { [force]: 'Tross tõmbab keha üles.' }
  };
}

function loopScene() {
  return {
    w: 360, h: 260, bg: `<circle cx="180" cy="130" r="90" class="dash"/><circle cx="180" cy="130" r="3" class="fill"/>` + SC.rope([[180, 130], [180, 52]]) + SC.rope([[180, 130], [180, 208]]),
    bodies: [{ id: 'top', x: 180, y: 40, w: 24, h: 24, shape: 'circle', label: '' }, { id: 'bot', x: 180, y: 220, w: 24, h: 24, shape: 'circle', label: '' }],
    forces: ['mg', 'T', 'N'], dirs: SC.DIR4,
    ans: { top: { mg: 'down', T: 'down' }, bot: { mg: 'down', T: 'up' } },
    why: { N: 'Kivi on nööri otsas, ta ei toetu pinnale.' },
    dirWhy: { 'top.T': 'Ülemises punktis tõmbab nöör kivi keskpunkti poole, s.t. alla.', 'bot.T': 'Alumises punktis tõmbab nöör kivi keskpunkti poole, s.t. üles.', mg: 'Raskusjõud on alati alla.' }
  };
}

function diskScene(label) {
  return {
    w: 360, h: 200, bg: `<line x1="60" y1="150" x2="320" y2="150" stroke-width="4"/><line x1="70" y1="150" x2="70" y2="195"/><line class="dash" x1="70" y1="20" x2="70" y2="150"/><text x="78" y="30">pöörlemistelg</text>`,
    bodies: [{ id: 'K', x: 290, y: 122, w: 46, h: 56, label }],
    forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.DIR4,
    ans: { K: { mg: 'down', N: 'up', Fh: 'left' } },
    why: { F: 'Peale raskusjõu, toereaktsiooni ja hõõrdejõu ei mõju midagi. „Kesktõmbejõud“ ei ole eraldi jõud, selle rolli täidab siin hõõrdejõud.' },
    dirWhy: { Fh: 'Hõõrdejõud hoiab keha ringjoonel, seega on suunatud pöörlemistelje (ringi keskpunkti) poole.' }
  };
}

P({ id: '144', b: 5, k: 'T',
  text: R`Tõstuki mass on 800 kg. Millise kiirendusega ja mis suunas liigub tõstuk, kui tõstukit hoidvale trossile mõjub jõud: 1) 12 kN, 2) 6,0 kN?`,
  given: R`<b>Andmed:</b> $m = 800\ \text{kg}$, $T_1 = 12\ \text{kN}$, $T_2 = 6\ \text{kN}$.<br><b>Leida:</b> $a_1$, $a_2$ ja suund.`,
  steps: [
    frc(R`Joonesta tõstukile mõjuvad jõud.`, hangScene('tõstuk', 'T')),
    mc(R`Võtame positiivseks suunaks „üles“. Newtoni II seadus:`, [R`*$ma = T - mg$`, R`$ma = T + mg$||Raskusjõud on alla, seega miinusega.`, R`$ma = mg - T$||See on õige, kui positiivne suund on alla. Kokkuleppe järgi võtsime „üles“.`]),
    num(R`1) Kiirendus, kui $T = 12\ \text{kN}$:`, 5.2, 'm/s²', { final: true, label: R`a_1` }),
    num(R`2) Kiirendus, kui $T = 6\ \text{kN}$:`, -2.3, 'm/s²', { final: true, label: R`a_2`, alts: [{ a: 2.3, msg: 'Arv on õige, aga märk näitab suunda. $T < mg$, seega kiirendus on alla (negatiivne).' }] }),
    mc(R`Mida tähendab negatiivne kiirendus teisel juhul?`, [R`*Kiirendus on suunatud alla (tõstuk laskub kiirenevalt või tõuseb aeglustuvalt)`, R`Tõstuk seisab||Siis oleks $T = mg$.`])
  ],
  sol: R`Positiivseks suunaks üles. Newtoni II seadus tõstukile (trossi tõmme $T$ üles, raskusjõud $mg$ alla):
$$ma = T - mg \Rightarrow a = \frac{T}{m} - g$$
Asendame $m = 800\ \text{kg}$ ($\frac{T}{m}$ annab kN/kg = m/s²):
<br>1) $T = 12\ \text{kN}$: $a = \frac{12000}{800} - 9.8 = 15 - 9.8 = 5.2\ \text{m/s}^2$ (positiivne, s.t. üles).
<br>2) $T = 6\ \text{kN}$: $a = \frac{6000}{800} - 9.8 = 7.5 - 9.8 = -2.3\ \text{m/s}^2$ (miinus, s.t. alla).`,
  ans: R`1) 5,2 m/s² üles (tõuseb); 2) 2,3 m/s² alla (laskub).`
});

P({ id: '147', b: 5, k: 'T',
  text: R`Autot tõstev helikopter tõuseb kiirendusega 50 cm/s². Helikopteri mass on 4,5 t, auto mass 1,5 t. Leidke: 1) helikopteri tiivikule mõjuv tõstejõud, 2) tõmbejõud helikopterit autoga ühendavas trossis.`,
  given: R`<b>Andmed:</b> $a = 0.5\ \text{m/s}^2$, $M = 4500\ \text{kg}$, $m = 1500\ \text{kg}$.<br><b>Leida:</b> $F_t$, $T$.`,
  steps: [
    frc(R`Joonesta jõud helikopterile ja autole eraldi.`, {
      w: 360, h: 250, bg: SC.rope([[180, 85], [180, 175]]),
      bodies: [{ id: 'H', x: 180, y: 60, w: 110, h: 46, label: 'helikopter' }, { id: 'A', x: 180, y: 200, w: 80, h: 44, label: 'auto' }],
      forces: ['Ft', 'Mg', 'mg', 'T', 'N'], dirs: SC.DIR4,
      ans: { H: { Ft: 'up', Mg: 'down', T: 'down' }, A: { mg: 'down', T: 'up' } },
      why: { 'A.Ft': 'Tiivik tõstab helikopterit, autole mõjub ainult tross.', 'H.mg': 'Helikopteri raskusjõud on Mg (M on helikopteri mass).', 'A.Mg': 'Auto raskusjõud on mg.', N: 'Kumbki ei toetu pinnale.' },
      dirWhy: { 'H.T': 'Tross tõmbab helikopterit alla (auto ripub tema küljes).', 'A.T': 'Tross tõmbab autot üles.' }
    }),
    mc(R`Kumb valem annab trossi tõmbe?`, [R`*Autole: $ma = T - mg \Rightarrow T = m(g + a)$`, R`$T = mg$||Auto liigub kiirendusega üles, tross peab tõmbama rohkem kui $mg$.`, R`$T = (M + m)(g + a)$||See on tõstejõud.`]),
    num(R`Trossi tõmme:`, 15450, 'N', { final: true, label: R`T`, alts: [{ a: 1500 * (9.8 + 50), msg: 'Kiirendus 50 cm/s² = 0,5 m/s².' }] }),
    num(R`Tõstejõud:`, 61800, 'N', { final: true, label: R`F_t`, hint: R`Kogu süsteem: $F_t = (M + m)(g + a)$` })
  ],
  sol: R`Kiirendus $a = 50\ \text{cm/s}^2 = 0.5\ \text{m/s}^2$. Vaatame kõigepealt autot, millele mõjub ainult tross ja raskusjõud.

<b>Trossi tõmme.</b> Newtoni II seadus autole ($ma = T - mg$):
$$T = m(g + a) = 1500(9.8 + 0.5) = 1500\cdot 10.3 \approx 15\ \text{kN}$$

<b>Tõstejõud.</b> Vaatame kogu süsteemi (helikopter + auto): tõstejõud peab kandma mõlema raskuse ja andma kiirenduse:
$$F_t = (M + m)(g + a) = 6000\cdot 10.3 \approx 62\ \text{kN}$$`,
  ans: R`1) 62 kN; 2) 15 kN`
});

P({ id: '149', b: 5, k: 'T',
  text: R`Nööri otsa seotud kivi tiirleb ühtlaselt vertikaaltasandis. Leidke kivi mass, kui on teada, et nööri maksimaalse ja minimaalse tõmbe vahe on 9,81 N.`,
  steps: [
    frc(R`Joonesta kivile mõjuvad jõud ringi ülemises ja alumises punktis.`, loopScene(), R`Mõlemas punktis peab resultantjõud olema suunatud keskpunkti poole ja võrduma $\frac{mv^2}{r}$.`),
    mc(R`Kirjuta kesktõmbe tingimus mõlemas punktis.`, [R`*Ülal $T_1 + mg = \frac{mv^2}{r}$, all $T_2 - mg = \frac{mv^2}{r}$`, R`Ülal $T_1 - mg = \frac{mv^2}{r}$, all $T_2 + mg = \frac{mv^2}{r}$||Ülal on mõlemad jõud keskpunkti poole (alla), all on raskusjõud keskpunktist eemale.`, R`Mõlemas punktis $T = \frac{mv^2}{r}$||Raskusjõud on puudu.`], '', '', { wide: true }),
    mc(R`Millega võrdub $T_2 - T_1$?`, [R`*$2mg$`, R`$mg$||Lahuta võrrandid: $T_2 - mg - T_1 - mg = 0$.`, R`$\frac{2mv^2}{r}$||Kiirusega liikmed taanduvad, sest kiirus on sama.`]),
    num(R`Kivi mass:`, 0.5005, 'kg', { final: true, label: R`m` })
  ],
  sol: R`Mõlemas punktis peab resultantjõud andma kesktõmbe $\frac{mv^2}{r}$ (keskpunkti poole). Ülal on nii tõmme kui raskusjõud alla, all on tõmme üles ja raskusjõud alla:
$$\text{ülal:}\quad T_1 + mg = \frac{mv^2}{r}, \qquad \text{all:}\quad T_2 - mg = \frac{mv^2}{r}$$
Lahutame võrrandid (kiirusega liige taandub, sest kiirus on sama):
$$T_2 - T_1 = 2mg \Rightarrow m = \frac{T_2 - T_1}{2g} = \frac{9.81}{2\cdot 9.8} \approx 0.5\ \text{kg}$$`,
  ans: R`500 g`
});

P({ id: '170', b: 5, k: 'T',
  text: R`Määrake Maa ja Kuu vaheline kaugus, kui Maa raadius on 6400 km, Maa keskmine tihedus 5,5 g/cm³, Kuu tiirlemise periood ümber Maa 27 ööpäeva.`,
  given: R`<b>Andmed:</b> $R = 6.4\cdot 10^6\ \text{m}$, $\rho = 5500\ \text{kg/m}^3$, $T = 27\cdot 86400\ \text{s}$, $G = 6.67\cdot 10^{-11}$.<br><b>Leida:</b> $r$.`,
  steps: [
    mc(R`Mis hoiab Kuud orbiidil?`, [R`*Maa gravitatsioonijõud täidab kesktõmbejõu rolli: $G\frac{Mm}{r^2} = m\omega^2 r$`, R`Kuu ja Maa vahel mõjub tõukejõud||Gravitatsioon on alati tõmbejõud.`]),
    mc(R`Maa massi saab tiheduse kaudu:`, [R`*$M = \rho\cdot\frac{4\pi R^3}{3}$`, R`$M = \rho\cdot 4\pi R^2$||See on pindala korda tihedus, ühik ei sobi.`, R`$M = \frac{\rho}{V}$||$\rho = \frac{M}{V}$, seega $M = \rho V$.`]),
    mc(R`Asenda $\omega = \frac{2\pi}{T}$ ja $M$. Kaugus avaldub:`, [R`*$r = \sqrt[3]{\frac{G\rho R^3T^2}{3\pi}}$`, R`$r = \sqrt{\frac{G\rho R^3T^2}{3\pi}}$||$r$ on võrrandis kolmandas astmes: $r^3 = \frac{G MT^2}{4\pi^2}$.`, R`$r = \frac{G\rho R^3T^2}{3\pi}$||Juur on puudu.`]),
    num(R`Tihedus SI-ühikutes:`, 5500, '', { label: R`\rho`, units: [['kg/m³', 1], ['g/cm³', 1000]], ex: R`$1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$` }),
    num(R`Maa ja Kuu vaheline kaugus:`, 3.815e8, 'm', { final: true, label: R`r` })
  ],
  sol: R`Maa gravitatsioonijõud täidab kesktõmbejõu rolli (konspektist $F = G\frac{Mm}{r^2}$, kesktõmme $m\omega^2 r$, $\omega = \frac{2\pi}{T}$):
$$G\frac{Mm}{r^2} = m\left(\frac{2\pi}{T}\right)^2 r$$
Mass $m$ taandub; avaldame $r^3$:
$$r^3 = \frac{GMT^2}{4\pi^2}$$
Maa massi asendame tiheduse kaudu $M = \rho\frac{4\pi R^3}{3}$:
$$r = \sqrt[3]{\frac{G\rho R^3T^2}{3\pi}}$$
Asendame $\rho = 5500\ \text{kg/m}^3$, $R = 6.4\cdot 10^6\ \text{m}$, $T = 27\cdot 86400\ \text{s}$:
$$r \approx 3.8\cdot 10^8\ \text{m} = 0.38\ \text{Gm} \ (\approx 380\,000\ \text{km})$$`,
  ans: R`0,38 Gm (380 000 km)`
});

P({ id: '176', b: 5, k: 'T',
  text: R`Näidake, et tehiskaaslase tiirlemisperiood tsentraalkeha pinna lähedal sõltub ainult tsentraalkeha tihedusest.`,
  steps: [
    mc(R`Pinna lähedal on orbiidi raadius $r \approx R$. Kesktõmbe tingimus:`, [R`*$G\frac{Mm}{R^2} = m\left(\frac{2\pi}{T}\right)^2R$`, R`$G\frac{Mm}{R} = \frac{mv^2}{R}$||Gravitatsioonijõud on pöördvõrdeline kauguse ruuduga.`]),
    mc(R`Asendame $M = \rho\frac{4\pi R^3}{3}$. Mis juhtub raadiusega?`, [R`*$R^3$ taandub, jääb $\frac{4\pi^2}{T^2} = \frac{4\pi G\rho}{3}$`, R`Raadius jääb valemisse||Kontrolli: vasakul $\frac{M}{R^3}$, mis on võrdeline tihedusega.`]),
    mc(R`Tiirlemisperiood:`, [R`*$T = \sqrt{\frac{3\pi}{G\rho}}$`, R`$T = \sqrt{\frac{G\rho}{3\pi}}$||Murd on ümberpööratud: suurem tihedus annab lühema perioodi.`, R`$T = \frac{3\pi}{G\rho}$||Juur on puudu.`])
  ],
  sol: R`Pinna lähedal on orbiidi raadius $r \approx R$. Gravitatsioonijõud = kesktõmbejõud ($\omega = \frac{2\pi}{T}$):
$$G\frac{Mm}{R^2} = m\frac{4\pi^2}{T^2}R$$
Asendame massi tiheduse kaudu $M = \rho\frac{4\pi R^3}{3}$. Raadius $R^3$ taandub mõlemalt poolt:
$$\frac{4\pi^2}{T^2} = \frac{4\pi G\rho}{3} \Rightarrow T = \sqrt{\frac{3\pi}{G\rho}}$$
Valemisse jäi ainult tihedus $\rho$ (ja konstandid $G$, $\pi$), seega periood sõltubki ainult tsentraalkeha tihedusest.`,
  ans: R`$T = \sqrt{\dfrac{3\pi}{G\rho}}$`
});

P({ id: '194', b: 5, k: 'T',
  text: R`Horisontaalse ketta äärel istub inimene. Ketas pöörleb ümber vertikaalse telje. Millise sagedusega peab ketas pöörlema, et inimene libiseks temalt maha? Ketta raadius on 2,5 m ja hõõrdetegur 0,50?`,
  given: R`<b>Andmed:</b> $R = 2.5\ \text{m}$, $\mu = 0.5$.<br><b>Leida:</b> $\upsilon$.`,
  steps: [
    frc(R`Joonesta inimesele mõjuvad jõud (külgvaade, telg vasakul).`, diskScene('inimene')),
    mc(R`Inimene püsib kettal, kuni hõõrdejõud suudab anda vajaliku kesktõmbejõu. Piirjuhul:`, [R`*$\mu mg = m\omega^2R$`, R`$\mu mg = m\omega R$||Kesktõmbejõud on $m\omega^2 R$.`, R`$mg = m\omega^2R$||Hõõrdetegur on puudu.`]),
    mc(R`Sagedus avaldub:`, [R`*$\upsilon = \frac{1}{2\pi}\sqrt{\frac{\mu g}{R}}$`, R`$\upsilon = 2\pi\sqrt{\frac{\mu g}{R}}$||$\omega = 2\pi\upsilon$, seega jagada $2\pi$-ga.`, R`$\upsilon = \sqrt{\frac{\mu g}{R}}$||See on nurkkiirus.`]),
    num(R`Sagedus, millest alates inimene libiseb:`, 0.2228, 'Hz', { final: true, label: R`\upsilon`, alts: [{ a: 1.4, msg: 'See on nurkkiirus $\\omega$ (rad/s). Sagedus on $\\upsilon = \\frac{\\omega}{2\\pi}$.' }] })
  ],
  sol: R`Inimest hoiab ringjoonel hõõrdejõud, mis annab kesktõmbe. Piirjuhul on hõõre maksimaalne ($\mu mg$) ja võrdub vajaliku kesktõmbega $m\omega^2 R$, mass taandub:
$$\mu mg = m\omega^2R \Rightarrow \omega = \sqrt{\frac{\mu g}{R}}$$
Sagedus (konspektist $\omega = 2\pi\upsilon$):
$$\upsilon = \frac{\omega}{2\pi} = \frac{1}{2\pi}\sqrt{\frac{\mu g}{R}} = \frac{1}{2\pi}\sqrt{\frac{0.5\cdot 9.8}{2.5}} \approx 0.22\ \text{Hz}$$`,
  ans: R`Sagedus peab olema suurem kui 0,22 Hz.`
});

/* ---- Kodused ---- */

P({ id: '145', b: 5, k: 'K',
  text: R`Lifti lakke on kinnitatud vedrukaal, mille otsas ripub keha massiga 1,0 kg. Mida näitab vedrukaal, kui lift 1) tõuseb kiirendusega 2,0 m/s², 2) laskub kiirendusega 1,0 m/s²?`,
  steps: [
    frc(R`Joonesta kehale mõjuvad jõud.`, hangScene('1 kg', 'F')),
    num(R`1) Lift tõuseb kiirendusega 2 m/s²:`, 11.8, 'N', { final: true, label: R`F_1`, hint: R`$F = m(g + a)$` }),
    num(R`2) Lift laskub kiirendusega 1 m/s²:`, 8.8, 'N', { final: true, label: R`F_2`, hint: R`$F = m(g - a)$` })
  ],
  sol: R`Vedrukaal näitab trossi tõmmet $F$. Newtoni II seadus kehale ($m = 1\ \text{kg}$): $ma = F - mg$, millest $F = m(g \pm a)$ (tõusul $+a$, laskumisel $-a$):
<br>1) Tõuseb, $a = 2\ \text{m/s}^2$: $F = m(g + a) = 1\cdot 11.8 = 11.8 \approx 12\ \text{N}$.
<br>2) Laskub, $a = 1\ \text{m/s}^2$: $F = m(g - a) = 1\cdot 8.8 = 8.8\ \text{N}$.`,
  ans: R`12 N; 8,8 N`
});

P({ id: '150', b: 5, k: 'K',
  text: R`Kera massiga 100 g on seotud 30 cm pikkuse niidi külge ning tiirleb ühtlaselt kiirusega 2,1 m/s vertikaaltasapinnas. Leidke niiti pingutav jõud ringjoone ülemises ning alumises punktis.`,
  steps: [
    frc(R`Joonesta jõud ülemises ja alumises punktis.`, loopScene()),
    num(R`Vajalik kesktõmbejõud $\frac{mv^2}{r}$:`, 1.47, 'N', { label: R`\frac{mv^2}{r}` }),
    num(R`Tõmme ülemises punktis:`, 0.49, 'N', { final: true, label: R`T_1`, hint: R`$T_1 = \frac{mv^2}{r} - mg$` }),
    num(R`Tõmme alumises punktis:`, 2.45, 'N', { final: true, label: R`T_2` })
  ],
  sol: R`Vajalik kesktõmbejõud ($m = 0.1\ \text{kg}$, $v = 2.1\ \text{m/s}$, $r = 0.3\ \text{m}$):
$$\frac{mv^2}{r} = \frac{0.1\cdot 2.1^2}{0.3} \approx 1.47\ \text{N}$$
Ülemises punktis annavad kesktõmbe tõmme ja raskusjõud koos ($T_1 + mg = \frac{mv^2}{r}$), alumises tõmme miinus raskusjõud ($T_2 - mg = \frac{mv^2}{r}$); $mg = 0.98\ \text{N}$:
$$T_1 = \frac{mv^2}{r} - mg = 1.47 - 0.98 \approx 0.49\ \text{N}, \qquad T_2 = \frac{mv^2}{r} + mg = 1.47 + 0.98 \approx 2.5\ \text{N}$$`,
  ans: R`0,49 N; 2,5 N`
});

P({ id: '161', b: 5, k: 'K',
  text: R`Millise maksimaalse kiirusega saab jalgrattur sõita 50 m raadiusega kurvil, kui asfaldi ja jalgratta kummide vaheline hõõrdetegur on 0,30? Kui suure nurga võrra peab ta ennast seejuures kallutama?`,
  steps: [
    frc(R`Joonesta jalgratturile mõjuvad jõud (eestvaade, kurvi keskpunkt on vasakul).`, {
      w: 360, h: 200, bg: SC.ground(20, 340, 160) + `<text x="20" y="40">← kurvi keskpunkt</text>`,
      bodies: [{ id: 'J', x: 200, y: 115, w: 34, h: 90, label: '' }],
      forces: ['mg', 'N', 'Fh', 'F'], dirs: SC.DIR4,
      ans: { J: { mg: 'down', N: 'up', Fh: 'left' } },
      why: { F: 'Hõõrdejõud ongi see, mis jalgratturit kurvis hoiab.' },
      dirWhy: { Fh: 'Hõõrdejõud on suunatud kurvi keskpunkti poole.' }
    }),
    mc(R`Maksimaalse kiiruse tingimus:`, [R`*$\mu mg = \frac{mv^2}{R}$`, R`$mg = \frac{mv^2}{R}$||Kesktõmbe annab hõõrdejõud $\mu mg$.`]),
    num(R`Maksimaalne kiirus:`, 12.12, 'm/s', { final: true, label: R`v` }),
    mc(R`Kallutamisnurk vertikaalist: resultant $N$ ja $F_h$ peab läbima massikeskme. Seega:`, [R`*$\tan\alpha = \frac{F_h}{N} = \frac{v^2}{gR} = \mu$`, R`$\sin\alpha = \mu$||Jõud on risti, tuleb kasutada tangensit.`]),
    num(R`Nurk:`, 16.7, '°', { final: true, label: R`\alpha` })
  ],
  sol: R`Kurvis annab kesktõmbe hõõrdejõud. Maksimaalsel kiirusel on hõõre maksimaalne, mass taandub:
$$\mu mg = \frac{mv^2}{R} \Rightarrow v = \sqrt{\mu gR} = \sqrt{0.3\cdot 9.8\cdot 50} \approx 12\ \text{m/s}$$
Kallutamisnurk: resultant $N$ ja $F_h$ peab läbima massikeskme, seega
$$\tan\alpha = \frac{F_h}{N} = \frac{v^2}{gR} = \mu = 0.3 \Rightarrow \alpha \approx 17°$$`,
  ans: R`12 m/s; 17°`
});

P({ id: '171', b: 5, k: 'K',
  text: R`Kuu tiirleb ümber Maa kiirusega 1,02 km/s. Kuu keskmine kaugus Maast on 384000 km. Leidke Maa mass.`,
  steps: [
    mc(R`Orbiidi tingimus:`, [R`*$G\frac{Mm}{r^2} = \frac{mv^2}{r} \Rightarrow M = \frac{v^2r}{G}$`, R`$M = \frac{vr}{G}$||Kiirus on ruudus.`]),
    num(R`Maa mass:`, 5.99e24, 'kg', { final: true, label: R`M` })
  ],
  sol: R`Kuud hoiab orbiidil gravitatsioonijõud, mis annab kesktõmbe (konspektist $G\frac{Mm}{r^2} = \frac{mv^2}{r}$). Kuu mass $m$ taandub, avaldame Maa massi:
$$M = \frac{v^2 r}{G}$$
Teisendame: $v = 1.02\ \text{km/s} = 1020\ \text{m/s}$, $r = 384\,000\ \text{km} = 3.84\cdot 10^8\ \text{m}$:
$$M = \frac{1020^2\cdot 3.84\cdot 10^8}{6.67\cdot 10^{-11}} \approx 5.99\cdot 10^{24}\ \text{kg}$$`,
  ans: R`5,99·10²⁴ kg`
});

P({ id: '195', b: 5, k: 'K',
  text: R`Ketas pöörleb ümber vertikaaltelje sagedusega 30 pööret minutis. Kettal 20 cm kaugusel pöörlemisteljest lebab keha. Millise hõõrdeteguri $\mu$ korral keha ja ketta vahel ei hakka keha libisema?`,
  steps: [
    frc(R`Joonesta kehale mõjuvad jõud.`, diskScene('keha')),
    num(R`Nurkkiirus:`, 3.1416, 'rad/s', { label: R`\omega`, hint: R`30 p/min = 0,5 p/s` }),
    mc(R`Keha ei libise, kui:`, [R`*$\mu mg \geq m\omega^2r$`, R`$\mu mg \leq m\omega^2r$||Hõõrdejõud peab olema vähemalt nii suur kui vajalik kesktõmbejõud.`]),
    num(R`Vähim hõõrdetegur:`, 0.2014, '', { final: true, label: R`\mu` })
  ],
  sol: R`Teisendame sageduse: $30\ \text{p/min} = 0.5\ \text{p/s}$, nurkkiirus $\omega = 2\pi\upsilon = 2\pi\cdot 0.5 = \pi\ \text{rad/s}$.
<br>Keha ei libise, kui hõõrdejõud suudab anda vajaliku kesktõmbe: $\mu mg \geq m\omega^2 r$, mass taandub:
$$\mu \geq \frac{\omega^2 r}{g} = \frac{\pi^2\cdot 0.2}{9.8} = \frac{9.87\cdot 0.2}{9.8} \approx 0.20$$`,
  ans: R`$\mu \geq 0.20$`
});

/* ---- Sarnased ---- */

P({ id: '141', b: 5, k: 'S',
  text: R`Terastraat peab vastu tõmbele 4400 N. Millise suurima kiirendusega võib tõsta traadi otsa kinnitatud keha massiga 400 kg, et traat ei katkeks?`,
  steps: [num(R`Suurim kiirendus:`, 1.2, 'm/s²', { final: true, label: R`a`, hint: R`$T - mg = ma$`, tol: 0.03 })],
  sol: R`Suurim lubatud tõmme $T = 4400\ \text{N}$. Newtoni II seadus tõstetavale kehale ($ma = T - mg$), avaldame kiirenduse ($m = 400\ \text{kg}$):
$$a = \frac{T}{m} - g = \frac{4400}{400} - 9.8 = 11 - 9.8 = 1.2\ \text{m/s}^2$$`,
  ans: R`1,2 m/s²`
});

P({ id: '142', b: 5, k: 'S',
  text: R`Lifti kabiinis viibiv inimene riputas vedrukaalu otsa keha massiga 1,0 kg ja märkas, et tõusmise algmomendil oli vedrukaalu näit 12 N. Kui suure kiirendusega liikus lift sel momendil?`,
  steps: [num(R`Kiirendus:`, 2.2, 'm/s²', { final: true, label: R`a` })],
  sol: R`Vedrukaalu näit on tõmme $F = 12\ \text{N}$. Newtoni II seadus kehale ($ma = F - mg$), avaldame kiirenduse ($m = 1\ \text{kg}$):
$$a = \frac{F}{m} - g = \frac{12}{1} - 9.8 = 2.2\ \text{m/s}^2$$`,
  ans: R`2,2 m/s²`
});

P({ id: '143', b: 5, k: 'S',
  text: R`Niidi otsas rippuv keha massiga 200 g laskub kiirendusega 1,01 m/s². Kui suur on niiti pingutav jõud?`,
  steps: [num(R`Niidi tõmme:`, 1.758, 'N', { final: true, label: R`T`, hint: R`$T = m(g - a)$` })],
  sol: R`Keha laskub kiirendusega, niidi tõmme on raskusjõust väiksem. Newtoni II seadus ($ma = mg - T$), avaldame tõmbe ($m = 0.2\ \text{kg}$):
$$T = m(g - a) = 0.2(9.8 - 1.01) \approx 1.76\ \text{N}$$`,
  ans: R`1,76 N`
});

P({ id: '146', b: 5, k: 'S',
  text: R`Lift, milles seisab inimene massiga 70 kg, tõuseb kiirendusega 2,0 m/s². Kui suur on inimese jalgade rõhumisjõud lifti põrandale? Kui suur on see jõud siis, kui lift laskub sama kiirendusega? Kui suure kiirendusega peaks lift laskuma, et lifti põrandale mõjuv jõud oleks null?`,
  steps: [
    num(R`Rõhumisjõud tõusmisel:`, 826, 'N', { final: true, label: R`N_1` }),
    num(R`Rõhumisjõud laskumisel:`, 546, 'N', { final: true, label: R`N_2` }),
    num(R`Kiirendus, mille korral jõud on null:`, 9.8, 'm/s²', { final: true, label: R`a` })
  ],
  sol: R`Põranda rõhumisjõud $N$ võrdub põranda toereaktsiooniga (Newtoni III seadus). Newtoni II seadus inimesele ($m = 70\ \text{kg}$, $a = 2\ \text{m/s}^2$):
<br>Tõusmisel $ma = N - mg$: $N_1 = m(g + a) = 70\cdot 11.8 = 826\ \text{N}$.
<br>Laskumisel $N_2 = m(g - a) = 70\cdot 7.8 = 546\ \text{N}$.
<br>Jõud on null, kui $g - a = 0$, s.t. $a = g = 9.8\ \text{m/s}^2$ (vaba langemine).`,
  ans: R`0,83 kN; 0,55 kN; 9,8 m/s²`
});

P({ id: '148', b: 5, k: 'S',
  text: R`Kuulike massiga 100 g tiirleb mööda ringjoont ümber horisontaalse telje 30 cm pikkuse niidi otsas. Niit kannatab tõmmet kuni 7,0 N. Millise nurkkiiruse juures ta katkeb?`,
  steps: [
    mc(R`Kus on niidi tõmme suurim?`, [R`*Alumises punktis: $T = m\omega^2r + mg$`, R`Ülemises punktis||Ülal aitab raskusjõud kesktõmmet anda, seega tõmme on väiksem.`]),
    num(R`Nurkkiirus:`, 14.17, 'rad/s', { final: true, label: R`\omega` })
  ],
  sol: R`Tõmme on suurim alumises punktis, kus see peab andma kesktõmbe ja kandma raskusjõudu: $T = m\omega^2 r + mg$. Avaldame nurkkiiruse ($m = 0.1\ \text{kg}$, $r = 0.3\ \text{m}$, $T = 7\ \text{N}$, $mg = 0.98\ \text{N}$):
$$\omega = \sqrt{\frac{T - mg}{mr}} = \sqrt{\frac{7 - 0.98}{0.1\cdot 0.3}} \approx 14\ \text{rad/s}$$`,
  ans: R`14 rad/s`
});

P({ id: '152', b: 5, k: 'S',
  text: R`Lennuk teeb „surmasõlme“ raadiusega 100 m. Kui suur jõud surub lendurit istmele sõlme ülemises ja alumises punktis? Lennuki kiirus on 40 m/s, lenduri mass 70 kg?`,
  steps: [
    num(R`Kesktõmbejõud:`, 1120, 'N', { label: R`\frac{mv^2}{r}` }),
    num(R`Ülemises punktis:`, 434, 'N', { final: true, label: R`N_1`, hint: R`$N_1 + mg = \frac{mv^2}{r}$` }),
    num(R`Alumises punktis:`, 1806, 'N', { final: true, label: R`N_2` })
  ],
  sol: R`Vajalik kesktõmbejõud ($m = 70\ \text{kg}$, $v = 40\ \text{m/s}$, $r = 100\ \text{m}$):
$$\frac{mv^2}{r} = \frac{70\cdot 1600}{100} = 1120\ \text{N}$$
Istme surve $N$ = lenduri toereaktsioon. Ülal annavad kesktõmbe iste ja raskusjõud koos ($N_1 + mg = \frac{mv^2}{r}$), all iste miinus raskusjõud ($N_2 - mg = \frac{mv^2}{r}$); $mg = 686\ \text{N}$:
$$N_1 = 1120 - 686 \approx 0.43\ \text{kN}, \qquad N_2 = 1120 + 686 \approx 1.8\ \text{kN}$$`,
  ans: R`0,43 kN; 1,8 kN`
});

P({ id: '173', b: 5, k: 'S',
  text: R`Kui suur on raskuskiirendus Kuu pinnal? Kuu mass on 81 korda väiksem Maa massist, raadius aga 3,7 korda väiksem Maa raadiusest.`,
  steps: [
    mc(R`$g = G\frac{M}{R^2}$. Kuidas muutub $g$?`, [R`*$g_K = g\cdot\frac{3.7^2}{81}$`, R`$g_K = g\cdot\frac{3.7}{81}$||Raadius on ruudus.`, R`$g_K = g\cdot\frac{81}{3.7^2}$||Väiksem mass annab väiksema $g$.`]),
    num(R`Raskuskiirendus Kuul:`, 1.656, 'm/s²', { final: true, label: R`g_K` })
  ],
  sol: R`Konspektist raskuskiirendus pinnal $g = G\frac{M}{R^2}$. Kuu ja Maa suhe (G taandub):
$$\frac{g_K}{g} = \frac{M_K}{M}\cdot\frac{R^2}{R_K^2}$$
Kuu mass on 81 korda väiksem ($\frac{M_K}{M} = \frac{1}{81}$), raadius 3,7 korda väiksem ($\frac{R^2}{R_K^2} = 3.7^2 = 13.69$):
$$g_K = g\cdot\frac{13.69}{81} = 9.8\cdot 0.169 \approx 1.7\ \text{m/s}^2$$`,
  ans: R`1,7 m/s²`
});

P({ id: '177', b: 5, k: 'S',
  text: R`Leidke maapinna lähedal ($h \ll R$, kus $h$ – kõrgus maapinnast, $R$ – Maa raadius) ringorbiidil tiirleva tehiskaaslase tiirlemisperiood.`,
  steps: [
    mc(R`Orbiidil $mg = m\frac{4\pi^2}{T^2}R$. Periood:`, [R`*$T = 2\pi\sqrt{\frac{R}{g}}$`, R`$T = 2\pi\sqrt{\frac{g}{R}}$||Kontrolli ühikut: peab tulema sekund.`]),
    num(R`Periood ($R = 6400\ \text{km}$):`, 5077, 's', { final: true, label: R`T`, ex: R`5077 s ≈ 84,6 min ≈ 1 h 24 min` })
  ],
  sol: R`Maapinna lähedal ($h \ll R$) annab raskusjõud kesktõmbe: $mg = m\frac{4\pi^2}{T^2}R$. Mass taandub, avaldame perioodi:
$$T = 2\pi\sqrt{\frac{R}{g}}$$
Asendame $R = 6.4\cdot 10^6\ \text{m}$, $g = 9.8\ \text{m/s}^2$:
$$T = 2\pi\sqrt{\frac{6.4\cdot 10^6}{9.8}} \approx 5080\ \text{s} \approx 1\ \text{h}\ 24\ \text{min}$$`,
  ans: R`1 h 24 min`
});

P({ id: '179', b: 5, k: 'S',
  text: R`Tehiskaaslane tiirleb ümber Maa mööda ringjoont nii, et tema kõrgus maapinnast võrdub Maa raadiusega. Kui suur on tehiskaaslase joonkiirus?`,
  steps: [
    mc(R`Orbiidi raadius on $2R$. Kiirus:`, [R`*$v = \sqrt{\frac{G M}{2R}} = \sqrt{\frac{gR}{2}}$`, R`$v = \sqrt{gR}$||See on pinna lähedal ($r = R$).`]),
    num(R`Joonkiirus:`, 5600, 'm/s', { final: true, label: R`v` })
  ],
  sol: R`Orbiidi raadius on $r = R + h = 2R$ (kõrgus võrdub Maa raadiusega). Gravitatsioon annab kesktõmbe $G\frac{Mm}{r^2} = \frac{mv^2}{r}$, millest $v = \sqrt{\frac{GM}{r}}$. Kasutades pinnal $GM = gR^2$ ja $r = 2R$:
$$v = \sqrt{\frac{GM}{2R}} = \sqrt{\frac{gR^2}{2R}} = \sqrt{\frac{gR}{2}} = \sqrt{\frac{9.8\cdot 6.4\cdot 10^6}{2}} \approx 5.6\ \text{km/s}$$`,
  ans: R`5,6 km/s`
});

})();
