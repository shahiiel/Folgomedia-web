// Firebase Configuration
// =============================================
// INSTRUCTIONS: Replace the placeholder values below
// with your Firebase project config from:
// https://console.firebase.google.com → Project Settings → Web App
// =============================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDetndROOdVuap6XSPAGx2jkAGH46M1OVg",
    authDomain: "folgo-leads-a426a.firebaseapp.com",
    projectId: "folgo-leads-a426a",
    storageBucket: "folgo-leads-a426a.firebasestorage.app",
    messagingSenderId: "503898581538",
    appId: "1:503898581538:web:50293bb3d23202c5a1f87b",
    measurementId: "G-W9023F7BFZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Save Lead (Public)
export async function saveLead(data) {
    try {
        const docRef = await addDoc(collection(db, 'leads'), {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message || '',
            createdAt: serverTimestamp(),
            type: data.type || 'lead' // distinguish between leads and estimates
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving lead:', error);
        return { success: false, error: error.message };
    }
}

// Login User (Admin)
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Fetch Leads (Admin)
export async function fetchLeads() {
    try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const leads = [];
        querySnapshot.forEach((doc) => {
            leads.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: leads };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export { auth, onAuthStateChanged };
