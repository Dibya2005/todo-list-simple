// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  updateLocalStorage();
  renderTasks();
  taskInput.value = "";
});

// Render Task List
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleComplete(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "deleteBtn";
    delBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Mark Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Save to Local Storage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
