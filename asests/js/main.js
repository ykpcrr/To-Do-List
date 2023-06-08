let input = document.querySelector("#todoadd");
let btn = document.querySelector("#todosave");
let todos = document.querySelector("#todos");

btn.addEventListener("click", () => {
  if (input.value == "") {
    alert("Boş To-Do gönderemezsin");
  } else {
    let todo = document.createElement("p");
    todos.appendChild(todo);
    todo.setAttribute("id", "todo");
    todo.innerHTML = input.value;

    saveTodoToLocalStorage(input.value);

    input.value = "";
  }
});

input.addEventListener("keyup", e => {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoList = document.querySelectorAll("p");

  todoList.forEach(function (todo) {
    if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
      todo.setAttribute("style", "display: block");
    } else {
      todo.setAttribute("style", "display : none");
    }
  });
});

let tododelete = document.querySelector("#delete");

tododelete.addEventListener("click", () => {
  todos.innerHTML = "";
  localStorage.removeItem("todos");
});

window.addEventListener("load", () => {
  showTodosFromLocalStorage();
});

function saveTodoToLocalStorage(todo) {
  let existingTodos = localStorage.getItem("todos");
  let todosArray = existingTodos ? JSON.parse(existingTodos) : [];
  todosArray.push(todo);
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function showTodosFromLocalStorage() {
  let existingTodos = localStorage.getItem("todos");
  if (existingTodos) {
    let todosArray = JSON.parse(existingTodos);
    todosArray.forEach(todo => {
      addTodoToList(todo);
    });
  }
}

function addTodoToList(todo) {
  let todoElement = document.createElement("p");
  todoElement.textContent = todo;
  todos.appendChild(todoElement);
}

let todo = document.querySelector("#todo");
todos.addEventListener("dblclick", event => {
  let target = event.target;
  if (target.tagName == "P") {
    target.remove();
    updateLocalStorage();
  }
});
