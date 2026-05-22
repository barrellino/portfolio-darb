PORTFOLIO DARB - VERSIONE JSON + ANTEPRIMA AUTOMATICA THUM.IO

Questa versione NON usa database.

COME FUNZIONA:
- I lavori sono salvati nel file works.json.
- Il sito legge works.json e mostra le card.
- Per ogni sito con link valido, l'anteprima viene generata automaticamente con Thum.io.
- Non devi caricare foto manualmente.

COME AGGIUNGERE UN LAVORO:
1. Apri works.json.
2. Aggiungi un blocco come questo:

{
  "title": "Nome progetto",
  "url": "https://miosito.it",
  "tag": "Website",
  "description": "Descrizione breve del progetto."
}

3. Salva.
4. Se usi GitHub + Netlify, fai commit del file.
5. Netlify aggiornerà il sito e tutti vedranno la nuova card.

ANTEPRIME AUTOMATICHE:
Le preview automatiche usano Thum.io:
https://image.thum.io

Alcuni siti possono impiegare diversi secondi/minuti la prima volta.
Se un sito non viene catturato, la card mostra comunque le iniziali.

IMPORTANTE:
Thum.io può avere limiti gratuiti o tempi di attesa. È normale che il primo caricamento sia più lento.
