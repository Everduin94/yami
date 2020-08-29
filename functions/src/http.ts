import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

admin.initializeApp();

const INDEX_NOT_FOUND = '{ "message": "Index not found"';
const DECK_ALREADY_EXISTS = `{ "message": "Deck already exists. Will not update!"`;

const app = express();
app.use(cors({ origin: true }));

app.post('/decks', (request, response) => {
  const db = admin.firestore();
  const body = request.body;
  if (body.type === 'deck') {

    const aggregateDeck =  db.collection('aggregateDeck').doc(body.userId);
    aggregateDeck.get().then(doc => {
      
      const decks = validDeck(doc);
      if (!decks) return;
      const foundIndex = decks.findIndex(d => d.id === body.id);
      if (foundIndex === -1) response.send(INDEX_NOT_FOUND);
      else if (decks.find(d => d.value === body.update)) response.send(DECK_ALREADY_EXISTS);
      else {
        decks[foundIndex].value = body.update;
        aggregateDeck.set({decks});
        response.send(JSON.stringify(decks));
      }
      
    }).catch(err => {
      console.log(err);
    })
  
  } else {
    const aggregateDeck =  db.collection('aggregateDeck').doc(body.userId);
    aggregateDeck.get().then(doc => {
      const dbDecks = validDeck(doc);
      if (!dbDecks) return;
      const decks = dbDecks.map(d => {
        if (d.group === body.name) return {...d, group: body.update};
        else return d;
      });

      aggregateDeck.set({decks});
      response.send(decks);
    });

  }
});

app.delete('/decks', (request, response) => {

  const db = admin.firestore();

  const body = request.body;
  if (body.type === 'deck') {

    const flash_cards = db.collection('flash_cards').doc(body.userId).collection('items').where('deck', '==', body.id);
    flash_cards.get().then(qs => {
      const batch = db.batch();
      qs.forEach(i => batch.delete(i.ref));
      return batch.commit();
    });

    const aggregateDeck =  db.collection('aggregateDeck').doc(body.userId);
    aggregateDeck.get().then(doc => {
      const decks = validDeck(doc);
      if (!decks) return;
      const foundIndex = decks.findIndex(d => d.id === body.id);
      if (foundIndex === -1) response.send(INDEX_NOT_FOUND);
      else {
        decks.splice(foundIndex, 1);
        aggregateDeck.set({decks});
        response.send(JSON.stringify(decks));
      }
    })

  } else { // Group

    const aggregateDeck =  db.collection('aggregateDeck').doc(body.userId);
    aggregateDeck.get().then(doc => {
      const dbDecks = validDeck(doc);
      if (!dbDecks) return;
      
      const decks = dbDecks.map(d => {
        if (d.group === body.name) return {...d, group: ""};
        else return d;
      });

      aggregateDeck.set({decks});
      response.send(decks);
    });
    
  }

});

function validDeck(doc: any): any[] | null {
  const data = doc.data();
  if (!data) return null;
  const decks: any[] = data.decks;
  if (!decks) return null;
  return decks;
}

export const api = functions.https.onRequest(app);