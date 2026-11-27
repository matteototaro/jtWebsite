# Come pubblicare un nuovo post

Vale per Windows, macOS e Linux. I comandi vanno lanciati nella cartella del sito.

## 0. Solo la prima volta su un computer nuovo

Installa **Git** e **Hugo extended 0.147.8**, la stessa versione che usa Netlify:

| Sistema | Comando |
|---|---|
| Windows | `winget install Git.Git` e `winget install Hugo.Hugo.Extended --version 0.147.8` |
| macOS | `brew install git hugo` (controlla poi che `hugo version` dica *extended*) |
| Linux | installa `git` dal gestore pacchetti; Hugo extended da https://github.com/gohugoio/hugo/releases/tag/v0.147.8 |

Poi scarica il sito:

```
git clone --recurse-submodules https://github.com/matteototaro/jtWebsite.git
cd jtWebsite
```

Se la cartella c'è già, aggiornala con `git pull`.

## 1. Crea il post

```
hugo new content posts/2026-lisbona
```

Per un post di foto analogiche usa `analogs/` al posto di `posts/`. Il comando crea la cartella `content/posts/2026-lisbona/` con dentro `index.md`.

## 2. Metti le foto nella cartella

Copia le foto in `content/posts/2026-lisbona/`. Chiamale `01.jpg`, `02.jpg` e così via: escono in quest'ordine. Vanno bene anche `.png` o `.webp`.

Non serve fare altro. Durante il build Hugo:
- ruota e ridimensiona le foto, e le converte in WebP;
- **cancella tutti i metadati (GPS compreso)**;
- non pubblica mai i file originali.

Unico consiglio: evita foto oltre i 10 MB, perché appesantiscono il repo.

## 3. Compila `index.md`

Apri `index.md` e cambia solo questi campi:

- `title`: il titolo
- `place`: il luogo, per esempio `"Lisbon, Portugal"`
- `description`: una frase
- `draft: false`, quando il post è pronto da pubblicare

Le didascalie sono facoltative. Togli il `#` davanti a `captions:` e aggiungi una riga per ogni foto: `01.jpg: "testo"`.

## 4. Guarda l'anteprima

```
hugo server -D
```

Apri http://localhost:1313 nel browser. Per fermarla premi `Ctrl+C`. L'opzione `-D` mostra anche le bozze.

## 5. Pubblica

```
git add content
git commit -m "Nuovo post: Lisbona"
git push
```

Netlify ricompila il sito da solo in un paio di minuti.

**Senza installare niente**: su github.com apri il repo, entra in `content/posts/`, scegli *Add file → Create new file* e scrivi `2026-lisbona/index.md`. Copia il testo da un post esistente, salva, poi trascina le foto con *Add file → Upload files*. Il limite è circa 25 MB per file e 100 file alla volta.

## Altro

- **Aggiornare il tema**: `./update-theme.sh` (su Windows da *Git Bash*). Crea un branch, non tocca `master`.
- **Post vecchi**: usano ancora lo shortcode `gallery-image` con le foto su Cloudinary. Continuano a funzionare così come sono.
