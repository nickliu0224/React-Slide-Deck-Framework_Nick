import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// NOTE: In a real deployment, these values should come from process.env or be replaced with actual keys.
// For this generated code to run without crashing, we provide a mock config, 
// BUT YOU MUST REPLACE THESE WITH YOUR REAL FIREBASE CONFIG.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE", 
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();