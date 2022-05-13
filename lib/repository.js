import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAni3yED1F1xE23-x00-s15rKp_Hmjph_w",
  authDomain: "sep6-6733b.firebaseapp.com",
  projectId: "sep6-6733b",
  storageBucket: "sep6-6733b.appspot.com",
  messagingSenderId: "681323377586",
  appId: "1:681323377586:web:c70d835564d758eada6aab",
  databaseURL: "https://sep6-6733b.eur3.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMovies(){
  const moviesCol = collection(db, 'movies');
  //For quering use the following example 
  /**
   * // Create a reference to the cities collection
    const citiesRef = db.collection('cities');

    // Create a query against the collection
    const queryRef = citiesRef.where('state', '==', 'CA');

    const citiesRef = db.collection('cities');
    const snapshot = await citiesRef.where('capital', '==', true).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });

    You can also use: 
    const nameQueryRes = await citiesRef.where('name', '>=', 'San Francisco').get();
    const nameQueryRes = await citiesRef.where('name', '<=', quaryText+ '\~')
   */
  const moviesSnapshot = await getDocs(moviesCol);
  const moviesList = moviesSnapshot.docs.map(doc => doc.data());
  return moviesList;
}

/**
 * Sample function for fetching database items
 *
 * @returns {string} some string
 */
function database() {
  return 'tbd';
}

export default {
  database,
  getMovies
};
