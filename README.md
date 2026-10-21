# Füüsika KT kordamine

Interaktiivne harjutusleht füüsika kontrolltööks (Füüs. ül. kogu I, mehaanika).
Töötab GitHub Pagesis, serverit ega andmebaasi pole vaja.

## Sisu

- 75 tunnis ja kodus lahendatud ülesannet ning 48 sarnast ülesannet samast kogust (kokku 123).
- Iga ülesanne on jaotatud sammudeks: valemi valik, avaldamine, vahetulemused, lõppvastus koos ühikuga, jõudude joonestamine, sammude järjestamine, sobitamine.
- Igal sammul on vihje, „Näita vastust“ ja selgitus. Täielik lahenduskäik avaneb eraldi nupust.
- Arvude kontroll lubab umbes 3% erinevust (ümardamine, g = 9,8 või 9,81). Valede vastuste korral ütleb leht, mis on tõenäoliselt viga (märk, suurusjärk, ühik, ümardamine).
- Filtrid teema, tüübi (tunnis / kodus / sarnane) ja oleku järgi, juhuslik järjekord.
- Edusammud salvestatakse brauseri `localStorage`-isse.
- Valemite sahtel konspekti valemitega.

## Failid

```
index.html
css/style.css
js/core.js        abifunktsioonid (valemid, arvude lugemine, ühikud, joonised)
js/forces.js      jõudude joonestamise komponent
js/app.js         lehe loogika
js/formulas.js    valemid teemade kaupa
js/data/b1–b7.js  ülesanded teemade kaupa
```

Valemid kuvatakse KaTeX-iga (laaditakse jsDelivr CDN-ist).

## Avaldamine GitHub Pagesis

1. Commit ja push:
   ```
   git add .
   git commit -m "Füüsika KT kordamise leht"
   git push
   ```
2. GitHubis repo lehel: **Settings → Pages**.
3. **Source**: *Deploy from a branch*. **Branch**: `main` (või `master`), kaust `/ (root)`. Vajuta **Save**.
4. Paari minuti pärast on leht aadressil `https://<kasutajanimi>.github.io/lasja/`.

Kohapeal proovimiseks: ava `index.html` brauseris või käivita kaustas `python -m http.server` ja mine aadressile `http://localhost:8000`.
