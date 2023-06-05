var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("radius");
var input_qnty = document.getElementById("qnty-aria");
var table = document.getElementById('result');
var table_element = document.getElementsByTagName("tr");

var shop_list = [];

function initList() {
  shop_list = [];
}

function addItem(itemName, quantity) {
  var lowercaseItemName = itemName.toLowerCase();
  var foundItem = false;

  for (var i = 0; i < shop_list.length; i++) {
    var item = shop_list[i];
    if (item[0].toLowerCase() === lowercaseItemName) {
      item[1] += quantity;
      foundItem = true;
      break;
    }
  }

  if (!foundItem) {
    shop_list.push([itemName, quantity]);
  }

  displayArray(shop_list);
}

function displayArray(arr) {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

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
