// todo.js

// Initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteTask(index);
        };
        taskItem.appendChild(deleteButton);

        // Create toggle complete button
        taskItem.onclick = () => {
            toggleComplete(index);
        };
        taskList.appendChild(taskItem);
    });
}

// Function to add task
function addTask(taskText) {
    tasks.push({ text: taskText, completed: false });
    updateLocalStorage();
    renderTasks();
}

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Function to toggle completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Function to filter tasks
function filterTasks(filter) {
    renderTasks();
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(item => {
        const task = tasks[item.index];
        if (filter === 'completed' && !task.completed) {
            item.style.display = 'none';
        } else if (filter === 'active' && task.completed) {
            item.style.display = 'none';
        }
    });
}

// Function to clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    updateLocalStorage();
    renderTasks();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners for adding task
document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    if (taskInput.value) {
        addTask(taskInput.value);
        taskInput.value = ''; // Clear input field
    }
});

// Event listener for clear completed
document.getElementById('clear-completed').addEventListener('click', clearCompleted);

// Initial render
renderTasks();