//the main array that contains the data
let todoList = [];
let input;
let gets = false; //temp value to help filling the ordered list
let submit = document.getElementById("submit");
let SecondButtonText = document.getElementById("showCompleted").innerText;
//rebuild the list with the corrrect data
function makeIt() {
    clearOutputList();
    fillOutputList(todoList, gets);
}
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("submit").addEventListener("click", addItem);
    document.getElementById("showCompleted").addEventListener("click", listOrder);
    document.getElementById("myList").addEventListener('click', hide, false);
}, false);
//add items to main array and list and rebuild the list with
//the new item
function addItem() {
    document.getElementById("error").innerHTML = "";
    input = document.getElementById("myText").value;
    document.getElementById("myText").value = "";
    //if checkInput is true means input is illegal else legal.
    if (checkInput(input)) {
        return true;
    }
    add2List(input);
    clearOutputList();
    fillOutputList(todoList, gets);
}

//get the pressed item and rebuild he list with the needed data
function hide(e) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].todo === e.target.innerHTML) {
            todoList[i].done = true;
        }
    }
    document.getElementById("error").innerHTML = "";
    makeIt();
}

//convert the boolian value and change the inner text of the button
function listOrder() {
    if (gets) {
        gets = false;
    } else gets = true;
    makeIt();
    document.getElementById("error").innerHTML = "";
    if (SecondButtonText === "show completed") {
        document.getElementById("showCompleted").innerText = "back";
        SecondButtonText = "back";
        return;
    }
    if (SecondButtonText === "back") {
        document.getElementById("showCompleted").innerText = "show completed";
        SecondButtonText = "show completed";
        return;
    }
}

//fill the list with the needed data as the needed list to show
function fillOutputList(array, gets) {
    let temp;
    for (let i = 0; i < array.length; i++) {
        temp = array[i].todo;
        if (array[i].done === gets) {
            let node = document.createElement("LI");
            let textnode = document.createTextNode(temp);
            node.appendChild(textnode);
            document.getElementById("myList").appendChild(node);
        }
    }
}

//dekete all the items from the list
function clearOutputList() {
    var list = document.getElementById("myList");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

//add new opject to the main array
function add2List(input) {
    todoList.push({
        todo: input,
        done: false
    });
}

//check input if legal
function checkInput(array) {
    if (!array.trim() || array == null) {
        document.getElementById("error").innerHTML = "please enter non empty todo";
        return true;
    }
    for (var i = 0; i < todoList.length; i++) {
        if (array === todoList[i].todo) {
            document.getElementById("error").innerHTML = "this todo alreday exists";
            return true;
        }
    }
    return false;
}