      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyDsxPprL1gV6Q1phuMVVJONCsEcSnXu8OA",
        authDomain: "shopping-list-1e7e0.firebaseapp.com",
        databaseURL: "https://shopping-list-1e7e0-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "shopping-list-1e7e0",
        storageBucket: "shopping-list-1e7e0.appspot.com",
        messagingSenderId: "996375894573",
        appId: "1:996375894573:web:71e7ec9f8befb838edf6a4",
        measurementId: "G-GBXPM70S20"
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app); 
      import {getDatabase, ref, set, child, update, remove, onValue, push, get, runTransaction}
      from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
    const db = getDatabase();

  // read data
  const listRef = ref(db, 'list/');
  let entriesArray;
  function getData() {
    onValue(listRef, (snapshot) => {
      const dataObject = snapshot.val();
      console.log('Loading Data...');
      const timestamp = Math.floor(new Date().getTime() / 1000);
      console.log('Loaded Data at '+ timestamp);
      entriesArray = Object.entries(dataObject);
    }, (error) => {
      console.log("Error retrieving data:", error);
    });
  }
  // write data
  function pushData(name, value) {
  const itemRef = child(listRef, name);

  // Use a transaction to check if the item exists and update its value
  // or add it if it doesn't exist
  runTransaction(itemRef, (currentData) => {
    if (currentData === null) {
      // Item doesn't exist, create a new one with the initial value
      return value;
    } else {
      // Item exists, update its value by adding the new value
      return currentData + value;
    }
  })
    .then(() => {
      console.log(`Data for ${name} updated successfully!`);
    })
    .catch((error) => {
      console.log(`Error updating data for ${name}:`, error);
    });
}
// delete data
function deleteItem(name) {
  const itemRef = ref(db, `list/${name}`);
  remove(itemRef)
    .then(() => {
      console.log(`Item '${name}' deleted successfully!`);
    })
    .catch((error) => {
      console.log(`Error deleting item '${name}':`, error);
    });
}

  //exports
  export { getData };
  export { pushData };
  export { deleteItem };
