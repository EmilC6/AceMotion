import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyClt8Bqkd_hUA5LbKHXaI0FqsppS-CIjwc",
  authDomain: "acemotion-de3bf.firebaseapp.com",
  projectId: "acemotion-de3bf",
  storageBucket: "acemotion-de3bf.firebasestorage.app",
  messagingSenderId: "66184308515",
  appId: "1:66184308515:web:967dac4d4dab97eb160e96",
  measurementId: "G-5J4BW363TB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;