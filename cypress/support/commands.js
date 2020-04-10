// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
    apiKey: "AIzaSyBrY0znyz3oRt7wSx6blaPLXpR4yfeds8k",
    authDomain: "yami-backend.firebaseapp.com",
    databaseURL: "https://yami-backend.firebaseio.com",
    projectId: "yami-backend",
    storageBucket: "yami-backend.appspot.com",
    messagingSenderId: "910952399452",
    appId: "1:910952399452:web:e93e9a184e6a326c151c99",
    measurementId: "G-ZLFXZ3MC8W"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase })