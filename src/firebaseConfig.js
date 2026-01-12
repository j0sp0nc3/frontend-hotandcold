// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCD9RqRnAhxMn204sZDnB9uLi4AEwb9esQ",
  authDomain: "hotandcold-nuevo-245ed.firebaseapp.com",
  projectId: "hotandcold-nuevo-245ed",
  storageBucket: "hotandcold-nuevo-245ed.firebasestorage.app",
  messagingSenderId: "314129479730",
  appId: "1:314129479730:web:348b70311579f7ce11a42b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exporta para usarlos en otros archivos
export { app, db, auth, storage };
