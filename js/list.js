var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("radius");
var input_qnty = document.getElementById("qnty-aria");
var table = document.getElementById('result');
var table_element = document.getElementsByTagName("tr");

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
            let qnty = quantity;
            let name = itemName;
            let info = 'An item already exists with the same name. If you continue, ${qnty} will be added onto the item \'${name}\'s quantity.';
            modalP.innerHTML = info;
            modal[0].style.display = "block";
            modal[0].style.zIndex = 9999;
            modal[0].style.top = "50%"; // Adjust the position based on your modal design
            modal[0].style.left = "50%"; // Adjust the position based on your modal design
            nosee.style.display = "block";
            iterate = i;
            qnty = quantity;
            }else {
                shop_list[i][1] += quantity;
            }
            displayArray(shop_list);
            return;

        }
    }
    // If item is not found, add it to the shopping list
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
