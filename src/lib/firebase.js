import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { browser } from '$app/environment';

const firebaseConfig = {
  apiKey: "AIzaSyDN0J2BPQMFf94PTf9vFUP06ch_mnWgwKk",
  authDomain: "whats-that-baby-name.firebaseapp.com",
  databaseURL: "https://whats-that-baby-name-default-rtdb.firebaseio.com",
  projectId: "whats-that-baby-name",
  storageBucket: "whats-that-baby-name.firebasestorage.app",
  messagingSenderId: "745159343349",
  appId: "1:745159343349:web:c82e326848131219d099bc",
  measurementId: "G-RXPG66NEMR"
};

// Initialize Firebase (only in browser and only if it hasn't been initialized)
let app = null;
let database = null;

if (browser) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  database = getDatabase(app);
}

export { app, database };