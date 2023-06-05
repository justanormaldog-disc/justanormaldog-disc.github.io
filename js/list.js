var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("radius");
var input_qnty = document.getElementById("qnty-aria");
var table = document.getElementById('result');
var table_element = document.getElementsByTagName("tr");

var shop_list = [];

function initList() {
    shop_list = [];
}

function CAUitem(itemName, quantity, addToCurrent = true) {
    var lowercaseItemName = itemName.toLowerCase();
    var itemFound = false;
    for (let i = 0; i < shop_list.length; i++) {
        if (shop_list[i][0].toLowerCase() === lowercaseItemName) {
            if (addToCurrent) {
                shop_list[i][1] += quantity;
            } else {
                shop_list[i][1] = quantity;
            }
            itemFound = true;
            break;
        }
    }
    if (!itemFound) {
        shop_list.push([itemName, quantity]);
    }
    displayArray(shop_list);
}

initList();

input_button.addEventListener("click", function() {
    if (input_aria.value !== "" && input_qnty.value !== "") {
        CAUitem(input_aria.value, parseFloat(input_qnty.value), true);
        input_aria.value = "";
        input_qnty.value = "";
    }
});

function displayArray(arr) {
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
        del.className = "del-btn";
        row.setAttribute("class", "tab");
        del.value = 'Delete';
        cell1.innerHTML = name;
        cell2.innerHTML = value;
        cell3.appendChild(del);
        del.setAttribute("data-index", i);
        del.addEventListener("click", function() {
            var index = parseInt(this.getAttribute("data-index"));
            var row = this.parentNode.parentNode;
            if (row.tagName === 'TR') {
                table.deleteRow(row.rowIndex);
                shop_list.splice(index, 1);
                updateIndices();
            }
        });
    }
  
    updateIndices();
}

function updateIndices() {
    var delButtons = document.getElementsByClassName('del-btn');
    for (var i = 0; i < delButtons.length; i++) {
        delButtons[i].setAttribute("data-index", i);
    }
}
