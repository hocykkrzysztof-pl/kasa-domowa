// Konfiguracja projektu Firebase (Ustawienia projektu → Twoje aplikacje → Konfiguracja SDK).
// Te wartości nie są tajne: dostęp do danych chronią reguły w firestore.rules.
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDVRT70lDdHTKDdv8l1DcyPHdaEVlms8n8",
  // logowanie obsługuje strona pomocnicza w repozytorium hocykkrzysztof-pl.github.io (__/auth),
  // dzięki temu Safari na iPhonie nie blokuje powrotu do aplikacji
  authDomain: "hocykkrzysztof-pl.github.io",
  projectId: "kasa-domowa",
  storageBucket: "kasa-domowa.firebasestorage.app",
  messagingSenderId: "317469557085",
  appId: "1:317469557085:web:3243d767826614f04628b4",
};
