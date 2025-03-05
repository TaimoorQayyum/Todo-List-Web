let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const prioritySelect = document.getElementById('prioritySelect');

            if (taskInput.value.trim() === '') return;

            const task = {
                id: Date.now(),
                text: taskInput.value.trim(),
                priority: prioritySelect.value,
                completed: false,
            };

            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }

        function toggleComplete(id) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            saveTasks();
            renderTasks();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            // Sort tasks by priority (high first) and completion status
            const sortedTasks = tasks.sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority] || a.completed - b.completed;
            });

            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div>
                        <span class="task-text">${task.text}</span>
                        <span class="priority ${task.priority}">${task.priority.toUpperCase()}</span>
                    </div>
                    <div class="task-actions">
                        <button onclick="toggleComplete(${task.id})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        // Initial render
        renderTasks();

        // Enter key support
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });