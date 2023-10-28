let form = document.querySelector(".form");
let text = document.querySelector(".text");
let ul = document.querySelector(".listTodo");
let button = document.querySelector("button");
let filter = document.querySelector(".textFilter");
let filterTodo = document.querySelector(".filterTodo");
let todos = [];

run();

function run() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    ul.addEventListener("click", deleteTodo);
    button.addEventListener("click", removeEveryTodo);
    filter.addEventListener("keyup", filterTodos);
}
function filterTodos(e) {
    let todoInput = e.target.value.toLowerCase().trim();
    let filtreInput = document.querySelectorAll(".todoLi");
    if (filtreInput.length > 0) {
        filtreInput.forEach(todo => {
            if (todo.textContent.toLowerCase().trim().includes(todoInput)) {
                todo.setAttribute("style", "display: block");
            }
            else{
                todo.setAttribute("style", "display: none !important");
            }
        })
    }
    else {
        alert("Filtreleme yapmak için en az 1 todo olmalıdır.")
    }

}
function removeEveryTodo() {
    localStorage.clear();
    let todoListesi = document.querySelectorAll(".todoLi");
    if (todoListesi.length > 0) {
        todoListesi.forEach(todo => {
            todo.remove();
        });
    }
    else {
        alert("Silincek öğe yok")
    }
}
function deleteTodo(e) {
    let liTodo = e.target.parentElement.parentElement;
    if (e.target.className === "fa-solid fa-x") {
        //ul.removeChild(liTodo); li silmek
        liTodo.remove();
    }
    storageRemove(liTodo.textContent)
}
function storageRemove(removeTodo) {
    checkStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }

    })
    localStorage.setItem('todos', JSON.stringify(todos))
}
function pageLoaded() {
    checkStorage();
    todos.forEach(todo => {
        addTodoUI(todo);
    })
}

function addTodo(e) {
    e.preventDefault();
    let textTodo = text.value.trim();
    if (textTodo == null || textTodo == "") {
        alert("boş değer girmeyiniz")
    }
    else {
        addTodoUI(textTodo)
        addTodolocalStorage(textTodo);
    }
}
function addTodoUI(newTodo) {
    let li = document.createElement("li");
    li.className = "todoLi";
    li.textContent = newTodo;
    li.style.borderBottomColor = "gray";
    let a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";
    let i = document.createElement("i");
    i.className = "fa-solid fa-x"
    a.appendChild(i);
    li.appendChild(a);
    ul.appendChild(li);
    text.value = " "

}

function addTodolocalStorage(newTodo) {
    checkStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function checkStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}