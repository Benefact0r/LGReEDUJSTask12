document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updateCounters = () => {
        const totalTaskCount = tasks.length;
        const completedTaskCount = tasks.filter(task => task.completed).length;
        totalTasks.textContent = totalTaskCount;
        completedTasks.textContent = completedTaskCount;
    };

    const saveTasksToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("task");
            if (task.completed) {
                taskItem.classList.add("completed");
            }

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                if (task.completed) {
                    taskItem.classList.add("completed");
                } else {
                    taskItem.classList.remove("completed");
                }
                saveTasksToLocalStorage();
                updateCounters();
            });

            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1); // Remove task from array
                saveTasksToLocalStorage();
                renderTasks();
                updateCounters();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskSpan);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });

        updateCounters();
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return alert("Please enter a task");

        const newTask = {
            text: taskText,
            completed: false,
        };

        tasks.push(newTask); // Add task to array
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = ""; // Clear input
    };

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    renderTasks(); // Initial render on page load
});
