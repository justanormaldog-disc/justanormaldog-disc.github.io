var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("radius");
var input_qnty = document.getElementById("qnty-aria");
var table = document.getElementById('result');
var table_element = document.getElementsByTagName("tr");

var shop_list = []; // Declare shop_list variable outside initList()

function initList() {
    shop_list = [];
    console.log(input_aria);
}

// revise CAUitem for bug fix
function CAUitem(itemName, quantity) {
    for (let i = 0; i < shop_list.length; i++) {
        if (shop_list[i][0].toLowerCase() === itemName.toLowerCase()) {
            shop_list[i][1] += quantity;
            displayArray(shop_list);
            return;
        }
    }
    // If item is not found, add it to the shopping list
    shop_list.push([itemName, quantity]);
    displayArray(shop_list);
}
//
initList();

input_button.addEventListener("click", function() {
    if (input_aria.value !== "" && input_qnty.value !== "") {
        CAUitem(input_aria.value, parseFloat(input_qnty.value, 10));
        //clears textbox(s)
        input_aria.value = "";
        input_qnty.value = "";
    }
});

//concentates and displays the array
function displayArray(arr) {
    // Clear existing rows with id="tab"
    var tabRows = document.querySelectorAll('#result tr[id="tab"]');
    tabRows.forEach(function(row) {
        row.parentNode.removeChild(row);
    });

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
