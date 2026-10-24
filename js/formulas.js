/* Valemid konspektist (harjutustunni konspekt), teemade kaupa. */
window.FORMULAS = {
1: `<h4>Diferentsiaalvõrrandid</h4>
<p>$v = \\dot x = \\dfrac{dx}{dt}, \\qquad a = \\dot v = \\ddot x$</p>
<p>Kiirus on teepikkuse tuletis aja järgi, kiirendus on kiiruse tuletis aja järgi.</p>
<h4>Integraalvõrrandid</h4>
<p>$v = \\int a\\,dt, \\qquad x = \\int v\\,dt$</p>
<p>Kui algus- ja lõpphetk on antud: $x(t_2)-x(t_1) = \\int_{t_1}^{t_2} v\\,dt$. Määramata integraali korral tuleb integreerimiskonstant ($v_0$, $x_0$) leida lisatingimusest.</p>
<h4>Ühtlaselt muutuv liikumine ($a = \\text{const}$)</h4>
<p>$x = x_0 + v_0 t + \\dfrac{at^2}{2}, \\qquad v = v_0 + at$</p>
<p>$v^2 - v_0^2 = 2as$ (tuleneb kahest eelmisest)</p>
<h4>Vertikaalne liikumine (vaba langemine)</h4>
<p>$z = z_0 + v_0 t - \\dfrac{gt^2}{2}, \\qquad v = v_0 - gt$</p>
<p>$g = 9.8\\ \\text{m/s}^2$. Üles visatud kehal $v_0 > 0$, alla visatud kehal $v_0 < 0$.</p>
<h4>Kaldpind (hõõrdumiseta)</h4>
<p>$a = g\\sin\\alpha$, kus $\\sin\\alpha = \\dfrac{h}{l}$</p>`,

2: `<h4>Kohavektor, kiirus, kiirendus</h4>
<p>$\\vec r = \\vec i\\,x + \\vec j\\,y + \\vec k\\,z$</p>
<p>$\\vec v = \\dot{\\vec r} = \\vec i\\,\\dot x + \\vec j\\,\\dot y + \\vec k\\,\\dot z, \\qquad \\vec a = \\dot{\\vec v}$</p>
<p>Moodul: $|\\vec u| = \\sqrt{u_x^2 + u_y^2 + u_z^2}$</p>
<p>Nihe: $\\Delta\\vec r = \\vec r(t_2) - \\vec r(t_1)$. Kiirusvektor on alati trajektoori puutuja suunas.</p>
<h4>Läbitud teepikkus</h4>
<p>$s = \\int_{t_1}^{t_2} v\\,dt$</p>
<h4>Horisondi suhtes nurga $\\alpha$ all visatud keha</h4>
<p>$v_x = v_0\\cos\\alpha, \\qquad x = v_0 t\\cos\\alpha$</p>
<p>$v_z = v_0\\sin\\alpha - gt, \\qquad z = z_0 + v_0 t\\sin\\alpha - \\dfrac{gt^2}{2}$</p>
<p>Horisontaalne vise: $\\alpha = 0$, seega $v_x = v_0$, $v_z = -gt$.</p>
<p>Kõrgeimas punktis $v_z = 0$, maapinnal $z = 0$.</p>
<p>Nurk kiiruse ja horisondi vahel: $\\tan\\beta = \\dfrac{v_z}{v_x}$</p>`,

3: `<h4>Pöördliikumise suurused</h4>
<p>$\\omega = \\dot\\varphi, \\qquad \\varepsilon = \\dot\\omega = \\ddot\\varphi$</p>
<p>$\\omega = \\int\\varepsilon\\,dt, \\qquad \\varphi = \\int\\omega\\,dt$</p>
<h4>Ühtlaselt muutuv pöörlemine ($\\varepsilon = \\text{const}$)</h4>
<p>$\\omega = \\omega_0 + \\varepsilon t, \\qquad \\varphi = \\omega_0 t + \\dfrac{\\varepsilon t^2}{2}$</p>
<p>$\\omega^2 - \\omega_0^2 = 2\\varepsilon\\varphi$</p>
<h4>Seosed</h4>
<p>Pöördenurk ja pöörete arv: $\\varphi = 2\\pi N$</p>
<p>Nurkkiirus ja sagedus: $\\omega = 2\\pi\\upsilon = \\dfrac{2\\pi}{T}$ (sagedus $\\upsilon$ ühikus p/s ehk 1/s)</p>
<p>Joonkiirus: $v = \\omega r$, kaare pikkus: $s = \\varphi r$</p>
<h4>Kiirendused ringjoonel</h4>
<p>$a_t = \\dot v = \\varepsilon r$ (puutuja sihis)</p>
<p>$a_n = \\dfrac{v^2}{r} = \\omega^2 r$ (keskpunkti poole)</p>
<p>$a = \\sqrt{a_t^2 + a_n^2}$</p>`,

4: `<h4>Newtoni II seadus</h4>
<p>$\\vec F_{res} = m\\vec a$ (resultantjõud on kõigi kehale mõjuvate jõudude vektorsumma)</p>
<p>Mitme keha korral kirjuta II seadus iga keha jaoks eraldi. Positiivseks suunaks vali liikumise suund. Venimatu niit: kõigil kehadel sama kiirendus, ühe niidi tõmme on igal pool sama.</p>
<h4>Hõõrdejõud</h4>
<p>$F_h = \\mu N$. Horisontaalsel pinnal $N = mg$, seega $F_h = \\mu mg$.</p>
<p>Kaldpinnal: $N = mg\\cos\\alpha$, $F_h = \\mu mg\\cos\\alpha$. Raskusjõu komponent piki kaldpinda: $mg\\sin\\alpha$.</p>
<p>Hõõrdejõud on suunatud liikumisele vastu.</p>
<h4>Rõhk</h4>
<p>$p = \\dfrac{F}{S}$, ringi pindala $S = \\dfrac{\\pi d^2}{4}$</p>
<h4>Kinemaatikast</h4>
<p>$s = \\dfrac{at^2}{2}$ (paigalt), $v = at$, $v^2 = 2as$</p>`,

5: `<h4>Keha kaal</h4>
<p>Üles kiirenev lift / tõstuk: $T - mg = ma \\Rightarrow T = m(g + a)$</p>
<p>Alla kiirenev: $T = m(g - a)$</p>
<h4>Kesktõmbejõud</h4>
<p>$F = \\dfrac{mv^2}{r} = m\\omega^2 r$, $\\omega = 2\\pi\\upsilon$</p>
<p>Kesktõmbejõu rolli täidab mõni päris jõud (niidi tõmme, hõõrdejõud, gravitatsioon) või jõudude resultant.</p>
<p>Vertikaalne ringjoon: ülemises punktis $T + mg = \\dfrac{mv^2}{r}$, alumises $T - mg = \\dfrac{mv^2}{r}$.</p>
<h4>Gravitatsioon</h4>
<p>$F = \\gamma\\dfrac{Mm}{r^2}$, $\\gamma = 6.67\\cdot10^{-11}\\ \\text{N}\cdot\text{m}^2/\\text{kg}^2$</p>
<p>Ringorbiit: $\\gamma\\dfrac{Mm}{r^2} = \\dfrac{mv^2}{r} = m\\omega^2 r$, $\\omega = \\dfrac{2\\pi}{T}$</p>
<p>Maa pinnal: $g = \\gamma\\dfrac{M}{R^2}$</p>
<p>Kera mass: $M = \\rho V = \\rho\\cdot\\dfrac{4\\pi R^3}{3}$</p>`,

6: `<h4>Töö</h4>
<p>$A = Fs\\cos\\alpha$ (konstantne jõud, sirgjooneline tee)</p>
<p>$A = \\int F\\,ds$ (muutuv jõud)</p>
<h4>Võimsus ja kasutegur</h4>
<p>$N = \\dfrac{A}{t} = Fv$, $\\eta = \\dfrac{A_{kasulik}}{A_{kogu}}$</p>
<h4>Energia</h4>
<p>Kineetiline: $E_k = \\dfrac{mv^2}{2}$</p>
<p>Potentsiaalne Maa lähedal: $E_p = mgh$</p>
<p>Elastne deformatsioon: $E_p = \\dfrac{kx^2}{2}$, $F = kx$</p>
<p>Gravitatsiooniline: $E_p = -\\gamma\\dfrac{Mm}{r}$ (nullnivoo lõpmatuses)</p>
<h4>Töö ja energia seos</h4>
<p>Kehale tehtud töö = energia muut: $A = \\Delta E_k$ (+ $\\Delta E_p$, + hõõrdetöö)</p>
<h4>Elastsus</h4>
<p>$\\sigma = \\dfrac{F}{S} = E\\dfrac{\\Delta l}{l}$, venitamise töö $A = \\dfrac{ES(\\Delta l)^2}{2l}$</p>
<h4>Teine kosmiline kiirus</h4>
<p>$v_2 = \\sqrt{\\dfrac{2\\gamma M}{R}} = \\sqrt{2gR}$</p>`,

7: `<h4>Impulss</h4>
<p>$\\vec p = m\\vec v$, jõuimpulss $\\vec F\\Delta t = \\Delta\\vec p$</p>
<h4>Impulsi jäävuse seadus</h4>
<p>Suletud süsteemis: $\\sum m_i\\vec v_i = \\text{const}$, s.t. $\\vec p_0 = \\vec p$.</p>
<p>Kui ainult mingi telje sihis välisjõudude summa on null, säilib impulsi projektsioon sellel teljel.</p>
<p>Vektoritena: liida komponendid eraldi ($p_x$, $p_y$), moodul $p = \\sqrt{p_x^2 + p_y^2}$.</p>
<h4>Mehaanilise energia jäävus</h4>
<p>$E_k + E_p = \\text{const}$ (kui hõõrdumist ei ole)</p>
<p>Pendel: $h = l(1 - \\cos\\alpha)$, $v^2 = 2gh$</p>
<h4>Põrked</h4>
<p>Mitteelastne: kehad liiguvad edasi koos, $m_1v_1 + m_2v_2 = (m_1 + m_2)v$.</p>
<p>Eraldunud soojus: $Q = \\dfrac{m_1v_1^2}{2} + \\dfrac{m_2v_2^2}{2} - \\dfrac{(m_1+m_2)v^2}{2}$</p>
<p>Elastne põrge: kehtivad nii impulsi kui ka mehaanilise energia jäävus.</p>
<p>$v_1' = \\dfrac{2m_2v_2 + (m_1 - m_2)v_1}{m_1 + m_2}$, $v_2' = \\dfrac{2m_1v_1 + (m_2 - m_1)v_2}{m_1 + m_2}$</p>`
};
