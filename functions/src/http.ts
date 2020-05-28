import * as functions from 'firebase-functions';

import * as express from 'express';
import * as cors from 'cors';


import * as admin from 'firebase-admin';
admin.initializeApp();

export const basicHTTP = functions.https.onRequest((request, response) => {
    response.send('Hello from Test!');
});



const app = express();
app.use(cors({ origin: true }));

app.delete('/cat', (request, response) => {

  response.send('{"message": "this is a test"}');
});

app.get('/dog', (request, response) => {
  response.send('DOG');
});

export const api = functions.https.onRequest(app);