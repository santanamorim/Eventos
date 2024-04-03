import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCASKAVZx1cvlmqZqf2_5tiLFidZBKiL14",
  authDomain: "eventos-632c5.firebaseapp.com",
  databaseURL: "https://eventos-632c5-default-rtdb.firebaseio.com",
  projectId: "eventos-632c5",
  storageBucket: "eventos-632c5.appspot.com",
  messagingSenderId: "22976328664",
  appId: "1:22976328664:web:817cdd142fd3d41fb8f8ad"
};

const app = initializeApp(firebaseConfig);

export default app;