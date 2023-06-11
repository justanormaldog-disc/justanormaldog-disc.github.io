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

var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("radius");
var input_qnty = document.getElementById("qnty-aria");
var table = document.getElementById('result');
var table_element = document.getElementsByTagName("tr");

//
// ----------------non firebase----------------
//

//flags
modal_checkbox = false;
var shop_list = []; // Declare shop_list variable outside initList()

function initList() {
    shop_list = [];
}

function CAUitem(itemName, quantity) {
    for (var i = 0; i < shop_list.length; i++) {
        var modal = document.getElementsByClassName("modal");
        var modalP = document.getElementById("modal-p");
        var nosee = document.getElementById("nosee");
        if (shop_list[i][0].toLowerCase() === itemName.toLowerCase()) {
            if (modal_checkbox == false) {
            modalP.innerHTML = "An item already exists with the same name. If you continue, " + quantity + " will be added onto the item '" + itemName + "'s quantity.";
            modal[0].style.display = "block";
            modal[0].style.zIndex = 9999;
            modal[0].style.top = "50%"; // Adjust the position based on your modal design
            modal[0].style.left = "50%"; // Adjust the position based on your modal design
            nosee.style.display = "block";
            iterate = i;
            qnty = quantity;
            objName = itemName;
            }else {
                shop_list[i][1] += quantity;
                //upd databse
                pushData(itemName, quantity);
            }
            displayArray(shop_list);
            return;

        }
    }
    // If item is not found, add it to the shopping list
    //push to database
    pushData(itemName, quantity);
    shop_list.push([itemName, quantity]);
    displayArray(shop_list);
}
// modal button functions
function btnOk() {
    var modal = document.getElementsByClassName("modal");
    var nosee = document.getElementById("nosee");
    modal[0].style.display = "none";
    nosee.style.display = "none";
    shop_list[iterate][1] += qnty;
    //push/upd to database
    pushData(objName, qnty);
    displayArray(shop_list);
    checkbox();
}

function btnCancel() {
    var modal = document.getElementsByClassName("modal");
    var nosee = document.getElementById("nosee");
    modal[0].style.display = "none";
    nosee.style.display = "none";
    displayArray(shop_list);
    checkbox();
}

//checks if the checkbox is ticked
function checkbox() {
    var checkbox = document.getElementById("modal-checkbox");
    if (checkbox.checked == true) {
        modal_checkbox = true;
    }
}
//
initList();

input_button.addEventListener("click", function() {
    if (input_aria.value !== "" && input_qnty.value !== "") {
        CAUitem(input_aria.value, parseFloat(input_qnty.value, 10));
        //clears textbox(s)
        input_aria.value = "";
        input_qnty.value = "";
    }else {
        alertPopup();
    }
});

//concentates and displays the array
function displayArray(arr) {
    tr = document.getElementsByClassName("tab");
    while (tr.length != 0) {
        table.deleteRow(1);
    };

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var name = item[0];
        var value = item[1];
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var del = document.createElement("input");
        del.type = "button";
        del.setAttribute('class', 'del-btn'); 
        row.setAttribute("class", "tab");
        del.value = 'Delete';
        cell1.innerHTML = name;
        cell2.innerHTML = value;
        cell3.appendChild(del);
        del.setAttribute("data-index", i); // Use data-index to store the index of the item
        //event listener
        del.addEventListener("click", function() {
            var index = parseInt(this.getAttribute("data-index"));
            var row = this.parentNode.parentNode;
            if (row.tagName === 'TR') {
                table.deleteRow(row.rowIndex);
                // delete from database
                deleteItem(shop_list[index][0]);
                shop_list.splice(index, 1);
                
                updateIndices(); // Update the indices after deletion
            }
        });
    }
  
    updateIndices(); // Update the indices initially
}

function updateIndices() {
    var delButtons = document.getElementsByClassName('del-btn');
    for (var i = 0; i < delButtons.length; i++) {
        delButtons[i].setAttribute("data-index", i);
    }
}

//search box

function searchItems() {
    var rows, searchValue
    rows = document.getElementsByClassName("tab");
    for (var i = 0; i < rows.length; i++) {
        searchValue = document.getElementById("search-bar").value;
        if (rows[i].childNodes[0].innerHTML.indexOf(searchValue) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }

}

function alertPopup() {
    var x = 100;
    var y = 0;
    var div = document.createElement("div");
    div.setAttribute('class', 'alert');
    div.innerHTML = "Invalid Input! Please enter a value into both input boxes.";
    document.getElementById("container").appendChild(div);

    setTimeout(function() {
        var intervalId = setInterval(function() {
            x -= 2;
            y += 1;
            div.style.opacity = x / 100;
            if (y === 50) {
                div.remove();
                clearInterval(intervalId);
            }
        }, 1);
    }, 2500);
}

//update database
function updDatabase() {
    getData();
    shop_list = entriesArray;
}
