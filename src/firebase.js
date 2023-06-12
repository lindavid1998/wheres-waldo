import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAmKNAcGlMGxQ4xw4zpDjjwae5Mplt99B0',
	authDomain: 'where-s-waldo-e0bd4.firebaseapp.com',
	projectId: 'where-s-waldo-e0bd4',
	storageBucket: 'where-s-waldo-e0bd4.appspot.com',
	messagingSenderId: '284645946788',
	appId: '1:284645946788:web:ebcd30d58368e91a45bd31',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
