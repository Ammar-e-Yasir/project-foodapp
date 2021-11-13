import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, orderBy, doc, setDoc, getDoc, deleteDoc, addDoc, collection, getDocs, query, updateDoc, onSnapshot, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseApp = initializeApp({


    apiKey: "AIzaSyCwIVO6Ijr_u6Zw1T4XShTtbnMeEPlXAnQ",
    authDomain: "project-foodapp.firebaseapp.com",
    projectId: "project-foodapp",
    storageBucket: "project-foodapp.appspot.com",
    messagingSenderId: "1048679853388",
    appId: "1:1048679853388:web:d79d5c1a18b72c412233e9",
    measurementId: "G-CGFDMR64YC"
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    signOut,
    updateDoc,
    onSnapshot,
    getFirestore,
    orderBy,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteDoc,


};
