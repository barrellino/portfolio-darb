PORTFOLIO DARB - VERSIONE JSON + ANTEPRIMA AUTOMATICA

Questa versione NON usa database.

COME FUNZIONA:
- I lavori sono salvati nel file works.json.
- Il sito legge works.json e mostra le card.
- Per ogni sito con link valido, l'anteprima viene generata automaticamente tramite servizio screenshot online.
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

ANTEPRIME:
Le preview automatiche usano:
https://image.thum.io

Alcuni siti possono non mostrare anteprime se bloccano screenshot o se il servizio è lento.
In quel caso la card mostra comunque le iniziali del progetto.

PUBBLICAZIONE CONSIGLIATA:
- Metti questi file su GitHub.
- Collega GitHub a Netlify.
- Quando modifichi works.json su GitHub, Netlify aggiorna il sito automaticamente.
