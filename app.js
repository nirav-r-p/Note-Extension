//Select DOM
require('dotenv').config()
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
  //Prevent natural behaviour
    e.preventDefault();
  //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
  //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
  //Save to local - do this last
  //Save to local
    saveLocalTodos(todoInput.value);
  //
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
  //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
  //attach final Todo
    todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
        todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
    switch (e.target.value) {
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}
function getDate() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
var marker;
    if (day == 1 || day == 21) {
        marker = "st";
    } else if (day == 2 || day == 22) {
        marker = "nd";
    } else if (day == 3 || day == 23) {
        marker = "rd";
    } else {
        marker = "th";
    }
document.getElementById('date').innerHTML = monthNames[monthIndex] + ' ' + day + marker + ' ' + year;
}
function theWord(callback) {
    var baseUrl = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=";
    var apiKey = process.env.TO_WORD_API_KEY;
    var apiUrl = baseUrl + apiKey;
//A promise is needed here, as without it the second API call would return before pronounceIt() can execute the callback, and we would get, well, nothing, instead of the actual word.
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: "GET",
            url: apiUrl,
            dataType: "json",
            success: function(data) {
                $("#word").append(data.word);
                $("#defin").append(data.definitions[0].text);
                resolve();
            }
        });
});
}
function pronounceIt() {
    var baseUrl = "https://api.wordnik.com/v4/word.json/"
    var apiKey = process.env.PRONOUNCE_API_KEY;
    var word = $("#word").text();
    var apiUrl = baseUrl + word + "/pronunciations?useCanonical=false&typeFormat=ahd&limit=50&api_key=" + apiKey;
    $("#link").attr("href", "http://www.dictionary.com/browse/" + word + "?s=t"); //link to dictionary.com page
$.ajax({
        type: "GET",
        url: apiUrl,
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                var input = data[0].raw;
                var output = "[" + input.slice(1,-1) + "]";
                $("#pronun").append(output);
            }
        }
    });
}
$(document).ready(function() {
    getDate();
    theWord().then(pronounceIt);
});