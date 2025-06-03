const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTodosFromStorage);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoText = input.value.trim();
    if (todoText === "") return;

    addTodoToList(todoText);
    saveTodoToLocalStorage(todoText);
    input.value = "";
});


function addTodoToList(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;
    li.appendChild(span);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.addEventListener("click", ()=> {
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", ()=> {
        li.remove();
        deleteTodoFromLocalStorage(text);
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}


function saveTodoToLocalStorage(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        addTodoToList(todo);
    });
}

function deleteTodoFromLocalStorage(todoToDelete) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo !== todoToDelete);
    localStorage.setItem("todos", JSON.stringify(todos));
}
