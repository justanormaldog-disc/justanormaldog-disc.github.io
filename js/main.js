var user,comment,item;
var input_aria = document.getElementById("input-aria");
var input_button = document.getElementById("input-form");
user = 'Ballzy man who dares cross me';

//list of comments
const COMMENTS = [
"Keep on adding!",
"Dont stop the clock!",
"Longer and longer and longer the list shall grow...",
"A list for everyone! Even your pets!",
"A looooooooooooooooooooooong list",
"Could a Dachshund be this long?",
"Out of comments...",
"Unleash your shopping superpowers and keep on adding to the list!",
"Don't let the shopping clock stop ticking! Add more items!",
"Never heard of too much?",
"Remember, this list isn't just for you, it's for your pets too! A shopping extravaganza for everyone!",
"Expand the shopping horizons! Keep those items coming!",
"Unlock the infinite potential of your shopping list and let it grow endlessly!",
"Embrace the shopping marathon and make the list go on and on!",
"From essentials to extravagance, this list has room for it all!",
"Unleash your inner shopaholic and let this list reach new lengths!",
"Is there a limit to shopping desires? Not on this list!",
"Overflow this list with all your shopping dreams and desires!",
"Remember, this list isn't just a collection of items, it's a testament to your shopping prowess!"
]
//list of placeholders
aria = [
"Meat Pie",
"Ice-Cream",
"Pizza",
"Cake",
"Broccoli",
"Carrots",
"Biscuits",
"Beetroot",
"Maple Syrup",
"Pancake Mix",
"Bread",
"Rice",
"Tamato Sauce",
"Milk",
"Potatoes",
"Eggs",
"Chicken",
"Butter",
"Canned Tuna",
"Noodles",
"Meatballs",
"Sugar & Salt"
]
function init() {
// run functions and other
document.getElementById("name").innerHTML = 'Hello, ' + user ;
input_aria.placeholder = aria[Math.floor(Math.random()*aria.length)] + "...";
document.getElementById("comment").innerHTML = item;
createComment();


 }
function createComment() {
    //grabs a random comment and displays it
    item = COMMENTS[Math.floor(Math.random()*COMMENTS.length)];
    document.getElementById("comment").innerHTML = item;
}

/*
===== ========    ===     =====    ========
==       ==      == ==    ==   ==     ==
=====    ==     ==   ==   =====       ==
  ===    ==    =========  ==   ==     ==
=====    ==    ==      == ==    ==    ==
*/
//init

init()
