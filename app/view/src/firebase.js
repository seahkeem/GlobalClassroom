import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAX1V0K0tW96Hgzga4wv4kNJuKMpwucVMQ",
  authDomain: "ucvme-131a0.firebaseapp.com",
  projectId: "ucvme-131a0",
  storageBucket: "ucvme-131a0.appspot.com",
  messagingSenderId: "576777328676",
  appId: "1:576777328676:web:675e52a4540c2ac9bbe0b1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {
  storage
}