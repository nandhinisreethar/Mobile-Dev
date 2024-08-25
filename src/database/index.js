import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
//const firebaseConfig = {
  
  // Include here the Firebase configuration for your project.

//};

const firebaseConfig = {
  apiKey: "AIzaSyBT-Bc35YTvRb94rBvlmnAfNqdhPIrWf9A",
  authDomain: "info-6129-b8fbd.firebaseapp.com",
  projectId: "info-6129-b8fbd",
  storageBucket: "info-6129-b8fbd.appspot.com",
  messagingSenderId: "871729875510",
  appId: "1:871729875510:web:49c227754b16d7ff7e6697"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/**
 * Adds a data to the list of tasks.
 * 
 * @param {object} data 
 *   The data to be added.
 * @returns 
 *   If successful, returns the id of the added tasks. 
 *   If error, returns null.
 */
export async function save(data) {
  try {
    const dbCollection = collection(db, 'tasks');
    const docRef = await addDoc(dbCollection, data);
    return docRef.id;
  } catch (e) {
    return null;
  }
}

/**
 * Loads all documents from the Tasks collection.
 * 
 * @returns 
 *   Array with the tasks.
 */
export async function load() {
  const data = [];

  const querySnapshot = await getDocs(collection(db, 'tasks'));
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id
    });
  });

  return data;
}

/**
 * Update a task in the database.
 * 
 * @param {string} id 
 *   The id of the task to be updated.
 * @param {object} data 
 *   The updated data.
 * @returns 
 *   Whether the data was updated.
 */
export async function update(id, data) {
  try {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, data);
    return true;
  }
  catch (e) {
    return false;
  }
}

/**
 * Deletes a task from the string.
 * 
 * @param {string} id 
 *   The id of the task to be removed.
 * @returns 
 *   Whether the task was removed.
 */
export async function remove(id) {
  try {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
    return true;
  }
  catch (e) {
    return false;
  }
}