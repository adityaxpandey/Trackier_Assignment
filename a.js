// Event listener to switch from login to registration page
document.getElementById('go-to-register').addEventListener('click', function() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'block';
});

// Event listener to switch from registration to login page
document.getElementById('go-to-login').addEventListener('click', function() {
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Redirect to the dashboard after login
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('projects-section').style.display = 'block';
});

// Switch to the projects section
document.getElementById('projects-tab').addEventListener('click', function() {
    document.getElementById('projects-section').style.display = 'block';
    document.getElementById('task-board-section').style.display = 'none';
    document.getElementById('project-details-section').style.display = 'none';
});

// Switch to the task board section
document.getElementById('task-board-tab').addEventListener('click', function() {
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('task-board-section').style.display = 'block';
    document.getElementById('project-details-section').style.display = 'none';
});

// Switch back to the projects section from the project details section
document.getElementById('back-to-projects-btn').addEventListener('click', function() {
    document.getElementById('project-details-section').style.display = 'none';
    document.getElementById('projects-section').style.display = 'block';
    document.getElementById('task-board-section').style.display = 'none';
});

// Create a new project
document.getElementById('new-project-btn').addEventListener('click', function() {
    const projectName = prompt("Enter Project Name:");
    const projectDescription = prompt("Enter Project Description:");
    
    if (projectName && projectDescription) {
        const projectList = document.getElementById('project-list');
        const newProject = document.createElement('div');
        newProject.className = 'project-card';
        newProject.innerHTML = `
            <h3>${projectName}</h3>
            <p>${projectDescription}</p>
            <button class="view-project-details-btn" data-name="${projectName}" data-description="${projectDescription}">View Details</button>
        `;
        projectList.appendChild(newProject);
    }
});

// View project details when clicking on "View Details"
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('view-project-details-btn')) {
        const projectName = e.target.getAttribute('data-name');
        const projectDescription = e.target.getAttribute('data-description');
        
        document.getElementById('projects-section').style.display = 'none';
        document.getElementById('task-board-section').style.display = 'none';
        document.getElementById('project-details-section').style.display = 'block';
        
        const projectDetailsTitle = document.getElementById('project-details-title');
        projectDetailsTitle.textContent = `Details of ${projectName}`;
        
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear existing tasks
        
        // Sample tasks for demonstration
        const sampleTasks = [
            { name: 'Task 1', description: 'Description of Task 1', status: 'Backlog' },
            { name: 'Task 2', description: 'Description of Task 2', status: 'In Progress' }
        ];
        
        sampleTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <h4>${task.name}</h4>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
            `;
            taskList.appendChild(taskItem);
        });
        
        // Add functionality to add new tasks
        document.getElementById('add-task-btn').addEventListener('click', function() {
            const taskName = prompt("Enter Task Name:");
            const taskDescription = prompt("Enter Task Description:");
            const taskStatus = prompt("Enter Task Status (Backlog, In Discussion, In Progress, Done):");

            if (taskName && taskDescription && taskStatus) {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <h4>${taskName}</h4>
                    <p>${taskDescription}</p>
                    <p>Status: ${taskStatus}</p>
                `;
                taskList.appendChild(taskItem);

                updateTaskBoard(taskName, taskDescription, taskStatus);
            }
        });
    }
});

// Update task board with new tasks
function updateTaskBoard(taskName, taskDescription, taskStatus) {
    const columnId = taskStatus.toLowerCase().replace(' ', '-');
    const column = document.getElementById(columnId);
    
    if (column) {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <h4>${taskName}</h4>
            <p>${taskDescription}</p>
        `;
        column.appendChild(taskCard);
    }
}
